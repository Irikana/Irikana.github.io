# 牧羊人图书馆 · 移动端内容管理 App 实施方案

## Context（背景与动机）

作者因懒惰/忙碌，无法每次有新文章或想法时及时开电脑上传至图书馆网站。当前更新流程依赖电脑 + 编辑器 + git，门槛高、摩擦大，导致内容产出与网站更新脱节。

**目标**：做一个 Android App，让作者在手机上即可完成"撰写文章/新闻/知识 → 自动生成符合规范的 HTML → 一键提交到 GitHub → 触发现有 Jekyll 工作流自动部署"的全链路，并支持修改已有内容、查看版本与日志。

**预期成果**：作者在手机上 5 分钟内完成一篇新闻的撰写与发布，无需开电脑。

***

## 决策摘要（已与作者确认）

| 决策项    | 选定方案                                    |
| ------ | --------------------------------------- |
| 手机系统   | Android                                 |
| 架构方案   | **方案 A：App 直连 GitHub REST API（无服务器）**   |
| 软件形态   | 能打包成 APK 安装的原生 App 体验                   |
| 技术栈    | **React Native + Expo（TypeScript）**     |
| 功能范围   | 撰写文章/新闻/知识 + 发布新闻卡片 + 修改已有内容 + 查看日志/版本  |
| 海报新闻规矩 | 左侧1个最新海报 + 右侧6个文字新闻按时排序；新增海报替换最旧文字新闻并重排 |
| 英文版同步  | 仅同步卡片标题+日期到 en/index.html，正文不翻译         |
| 撰写能力   | App 内置编辑器，直接撰写正文（核心功能，非附属）              |

***

## 一、架构方案 A 详述

### 工作原理

```
[Android App] --(GitHub REST API + PAT)--> [Irikana.github.io 仓库]
                                                  |
                                                  v
                                         [Jekyll GitHub Actions] --自动部署--> [GitHub Pages 站点]
```

App 直接调用 GitHub Contents API（单文件读写）和 Git Data API（多文件原子提交）操作仓库。commit 落到 `main` 分支后，现有 `.github/workflows/jekyll-gh-pages.yml` 自动构建部署到 Pages。**无需任何新增基础设施**。

### 为什么选方案 A（而非 B 自建服务器 / D Serverless）

* **单用户个人工具**：方案 B/D 的服务端控制层（限流、审计、多租户、密钥托管）在单用户场景下无用武之地

* **零运维**：作者是学生 + addon 开发者，不应承担服务器运维负担

* **复用现有部署链路**：已有 Jekyll 工作流，App 只需 commit

* **成本为零**：GitHub API 认证用户 5000 req/hour，单用户绰绰有余

* **作者技能对齐**：作者熟悉 JS/JSON，GitHub REST API 是 JSON 接口，整条技术栈友好

### 认证与安全

* **Token 类型**：fine-grained Personal Access Token

* **权限范围**：仅 `Irikana/Irikana.github.io` 仓库，仅 `Contents: Read and write`，**不**授予 admin/workflow/keys

* **过期**：设 1 年，到期前 30 天 App 提醒续期

* **存储**：`expo-secure-store`（底层 Android Keystore，加密 at-rest，绑定设备解锁）

* **可选增强**：`expo-local-authentication` 指纹门禁

* **应急**：GitHub 设置页一键吊销，App 检测 401 引导重输

***

## 二、技术栈：React Native + Expo

### 选型理由

* 作者是 Minecraft Bedrock addon 开发者，**熟悉 JS/JSON**，TS 学习成本低，能自行维护扩展

* Expo 提供 `expo-secure-store`、`expo-image-picker`、`expo-image-manipulator`、`expo-file-system`、`react-native-webview` 等开箱即用模块，覆盖全部需求

* EAS Build 云端生成签名 APK（免费 30 次/月），无需本地配 Android Studio + Gradle

* 能打包成真 APK 装到手机，体验接近原生

### 备选

若作者未来追求极致原生体验且愿投入学习时间，可转 Kotlin + Jetpack Compose，但 `src/lib/` 下的 API 客户端和模板生成器逻辑可几乎原样移植。

***

## 三、App 功能模块设计

### 模块1：认证模块

* Token 输入页 → 验证（`GET /user` + `GET /repos/Irikana/Irikana.github.io`）→ Keystore 加密存储

* Auth Gate：根 `_layout.tsx` 检测 Token，无则跳登录页

### 模块2：GitHub API 客户端（核心基础设施）

`src/lib/github-client.ts` 封装所有 REST API 调用。

**关键端点**：

| 操作        | 端点                                                 | 方法                           |
| --------- | -------------------------------------------------- | ---------------------------- |
| 读单文件      | `/repos/{owner}/{repo}/contents/{path}?ref=main`   | GET                          |
| 列目录       | `/repos/{owner}/{repo}/contents/{dir}?ref=main`    | GET                          |
| 列全树       | `/repos/{owner}/{repo}/git/trees/main?recursive=1` | GET                          |
| 写/更新单文件   | `/repos/{owner}/{repo}/contents/{path}`            | PUT（更新需带 `sha`）              |
| 获取 ref    | `/repos/{owner}/{repo}/git/refs/heads/main`        | GET                          |
| 创建 tree   | `/repos/{owner}/{repo}/git/trees`                  | POST（`base_tree` + `tree[]`） |
| 创建 commit | `/repos/{owner}/{repo}/git/commits`                | POST                         |
| 更新 ref    | `/repos/{owner}/{repo}/git/refs/heads/main`        | PATCH                        |

**两类操作策略**：

* 单文件操作（文章创建、单文件编辑、单图上传）→ Contents API PUT

* 多文件原子操作（新闻发布流程）→ **Git Data API**（Trees + Commits + Refs），单次 commit 改多文件

**中文路径编码**：URL 路径段 `encodeURIComponent`，JSON body 的 `path` 字段用原始 UTF-8。

**速率限制**：解析 `X-RateLimit-Remaining` 头，剩余 <100 时 UI 提示。

### 模块3：文章/新闻/知识撰写模块（核心）

这是作者最关注的能力——**App 内直接撰写内容**。

**表单字段**（依据实际文章结构）：

| 字段     | 类型               | 必填 | 说明                                 |
| ------ | ---------------- | -- | ---------------------------------- |
| 标题     | text             | 是  | 用于 `<title>`、`page-title-main`、文件名 |
| 作者     | text             | 是  | 默认"薛柯道"                            |
| 创建日期   | date             | 是  | 默认今天                               |
| 文章类型   | dropdown         | 是  | 录音文章/手写文章/信息文章                     |
| 标签     | multi-select     | 否  | 新闻/包含AI/有删减/无                      |
| 录音时长   | text             | 条件 | 仅录音文章显示                            |
| **正文** | **Markdown 编辑器** | 是  | 见下文                                |
| 补充说明   | text             | 否  | 生成 `.article-footer-meta`          |
| 含数学公式  | switch           | 否  | true 则注入 MathJax                   |

**正文编辑器**（重点）：

* **MVP**：Markdown 编辑器（`@expensify/react-native-live-markdown-renderer` 或 textarea + 实时预览），上传时用 `marked` 转 `<p>` 段落

* **进阶**：富文本编辑器（`react-native-pell-rich-editor` 基于 WebView contenteditable），支持加粗/斜体/链接/标题/列表

* 支持视觉组件快捷插入：信息框（蓝/灰/红）、折叠块、MathJax 公式（开关）、图片引用

* 实时预览：`react-native-webview` 渲染生成 HTML，作者确认后再上传

**HTML 模板生成器**：`src/templates/article.ts` 硬编码模板字符串，从现有合规文章（如 `library/paper/visual-component-standards-created.html`）提炼，产出含完整骨架：
`<head>`(含 style.css + 可选 MathJax) → `<header>`(logo+slogan+标题) → `<main>`(article-meta + 正文 + 可选 footer-meta) → `<footer>`(版权) → `.mobile-nav` + `.quick-nav` + 两 `.float-button` → `<script>`(PAGE\_DISPLAY\_NAME + scrollToTop 等 + `library-dynamic.js`)

**上传前校验**：正则检查生成 HTML 含必需类名（`article-meta`、`article-type-badge`、`left-align`、`copyright-color`/`copyright-text`、`mobile-nav`、`quick-nav`、`float-button`、`PAGE_DISPLAY_NAME`），缺项阻断上传。

**知识馆内容**：知识馆页面用内联 CSS（不依赖 style.css 变量），模板生成器需单独一套知识馆模板（依据 `knowledge-hall/categories/*.html` 提炼）。Phase 2 支持。

### 模块4：新闻发布模块（原子化核心）

**新闻规矩**（作者确认，需补入规范）：

> 主页新闻区结构：左侧 1 个最新带海报新闻（`.news-featured-poster`）+ 右侧 6 个按时间排序的文字新闻（`.news-featured-text-card`）。
>
> * 新增**文字新闻**：插入到 `#news-text-list`，保留最新的 6 条，超出的最旧一条移除
>
> * 新增**海报新闻**：替换左侧 featured poster；被替换的旧海报新闻降级为文字新闻插入右侧列表（若右侧已满则挤出最旧的一条）
>
> * 始终按 `data-date` 降序排列

**涉及文件**（一次原子提交）：

| 文件                                      | 操作    | 修改点                               |
| --------------------------------------- | ----- | --------------------------------- |
| `library/paper/{标题}.html`               | 新建    | 完整文章页                             |
| `index.html`                            | 修改    | `#news-text-list` 内插入卡片 + 维持6条上限  |
| `en/index.html`                         | 修改    | 同上，仅标题/日期用英文                      |
| `news.html`                             | 修改    | 列表区插入 `.news-list-item-text-only` |
| `updateLog/updateLog_{YYYY-MM-DD}.html` | 新建或追加 | 同日合并                              |

**卡片 HTML 片段**（以实际 index.html 为准，非规范文档）：

```html
<a href="./library/paper/{标题}.html" target="_blank" rel="noopener noreferrer" class="news-featured-text-card" data-date="{YYYY-MM-DD}">
  <span class="card-title">{标题}</span>
  <span class="card-date">{YYYY年M月D日}</span>
</a>
```

**插入策略**：字符串锚点定位（非 HTML 解析，避免序列化破坏现有格式）。

* 锚点：`'id="news-text-list">\n'`，在其后插入新卡片

* 维持6条上限：插入后用正则截取最新6条 `<a class="news-featured-text-card" ...>...</a>`

* 排序：从所有卡片提取 `data-date`，按降序重排

**原子提交流程**（Git Data API，5 文件单次 commit）：

```
1. GET /git/refs/heads/main → latestCommitSha
2. GET /git/commits/{latestCommitSha} → rootTreeSha
3. POST /git/trees { base_tree: rootTreeSha, tree: [5个文件] } → newTreeSha
4. POST /git/commits { message, tree: newTreeSha, parents: [latestCommitSha] } → newCommitSha
5. PATCH /git/refs/heads/main { sha: newCommitSha }
```

第 5 步若 422（non-fast-forward），重新从第 1 步开始，最多重试 3 次。**真正原子**：第 5 步失败则整个 commit 不落地，仓库状态不变。

### 模块5：内容编辑模块

* 文件浏览器：`GET /git/trees/main?recursive=1` 一次性拉全树，常用目录快捷入口（`library/paper/`、`updateLog/`、`knowledge-hall/`）

* 编辑器：MVP 纯文本编辑（HTML/CSS/JS），进阶加语法高亮

* 关键文件保护：编辑 `index.html`/`css/style.css`/`js/library-dynamic.js`/`.github/workflows/*` 时弹警告

* 保存：PUT Contents 带 `sha`；409 冲突时展示 diff 让作者选择覆盖/合并/放弃

* 草稿：AsyncStorage 自动保存

### 模块6：图片上传模块

* `expo-image-picker` 选图 → `expo-image-manipulator` 压缩（最长边 1200px）→ `expo-file-system` 读 base64 → Contents API PUT 到 `image/poster/{分类}/{文件名}.png`

* 分类 dropdown（现有：SOTM、update），允许新建

### 模块7：日志/版本查看模块

* 版本号：GET `js/library-dynamic.js`，正则 `/var\s+Ver\s*=\s*\{\s*v:\s*'([^']+)'/` 提取（当前 alpha-017，约第 493 行）

* 日志列表：GET `updateLog/` 目录，按文件名降序

* 日志渲染：`react-native-webview` 渲染完整 HTML（最保真）

* Phase 3：版本号升级工具（改正则 + 创建日志骨架）

***

## 四、规范更新（执行阶段必须完成）

作者明确要求：**将"6文字新闻+海报替换"规矩补入规范**，因为目前规范文档（`.trae/rules/project_rules.md` 的"新闻卡片创建规范"章节）描述的是已过时的 `#carousel-track` 轮播结构，与实际 `#news-text-list` 不符，且未提及 6 条上限和海报替换逻辑。

**执行步骤**：

1. 修改 `.trae/rules/project_rules.md` → "新闻卡片创建规范"章节：

   * 将 `#carousel-track` / `.news-carousel-card` 结构描述改为实际结构 `#news-text-list` / `.news-featured-text-card` / `.news-featured-poster`

   * 新增"新闻区容量规矩"小节：左侧1海报+右侧6文字，新增海报替换+降级逻辑，按 data-date 降序
2. 修改 `.trae/rules/visual-components.md` → "新闻卡片"章节：同步上述结构更正
3. 同步 `.trae/skills/sl-news-upload/SKILL.md`（若存在且描述过时）
4. 记录更新日志

**注意**：此规范更新是 App 开发的前置依赖——App 模板生成器以规范为权威源，规范必须先与现实对齐。

***

## 五、仓库与项目结构

### 仓库策略：单独新建仓库

新建 `Irikana/shepherd-library-app`（推荐私有），与网站仓库 `Irikana.github.io` 分离。

**理由**：

* 网站仓库所有文件进 Jekyll 构建，App 源码（.ts/node\_modules）不应污染

* App 通过 API 操作网站仓库，两仓库无代码耦合

* App 仓库可独立设 CI（EAS Build 触发）、issue、release

### App 项目结构（Expo Router）

```
shepherd-library-app/
├── app/                       # Expo Router 文件式路由
│   ├── _layout.tsx            # 根布局 + Auth Gate
│   ├── index.tsx              # 首页（功能入口卡片 + 版本号展示）
│   ├── login.tsx              # Token 输入页
│   ├── compose/
│   │   ├── article.tsx        # 撰写文章/新闻/知识
│   │   └── preview.tsx        # HTML 预览（WebView）
│   ├── news/
│   │   └── publish.tsx        # 新闻发布（含多文件 diff 确认）
│   ├── editor/
│   │   ├── browser.tsx        # 仓库文件浏览器
│   │   └── edit.tsx           # 文件编辑器
│   ├── image/
│   │   └── upload.tsx         # 图片上传
│   └── logs/
│       ├── index.tsx          # 日志列表
│       └── [filename].tsx     # 单条日志渲染
├── src/
│   ├── lib/
│   │   ├── github-client.ts   # GitHub REST API 封装
│   │   ├── git-data.ts        # Git Data API 原子提交
│   │   ├── auth.ts            # Token 存取
│   │   ├── rate-limit.ts      # 速率限制追踪
│   │   └── path-codec.ts      # 中文路径编码
│   ├── templates/
│   │   ├── article.ts         # 文章 HTML 模板生成器
│   │   ├── knowledge.ts       # 知识馆页面模板
│   │   ├── news-card.ts       # 新闻卡片片段生成器
│   │   ├── news-list-item.ts  # news.html 列表项生成器
│   │   ├── update-log.ts      # 更新日志 HTML 模板
│   │   └── validators.ts      # HTML 合规性校验
│   ├── components/
│   │   ├── MetaForm.tsx       # 元数据表单
│   │   ├── MarkdownEditor.tsx # 正文编辑器
│   │   ├── HtmlPreview.tsx    # WebView 预览
│   │   ├── FileTree.tsx       # 文件树
│   │   └── DiffViewer.tsx     # diff 展示
│   └── store/                 # Zustand 状态
├── app.json                   # Expo 配置
├── eas.json                   # EAS Build 配置
├── package.json
└── README.md
```

***

## 六、MVP 分期

### 第一期 MVP（目标：手机上发一篇文章）

* 认证模块（Token + Keystore + 验证）

* GitHub API 客户端（Contents API 读写 + 速率限制）

* **撰写模块**（表单 + Markdown 编辑器 + 实时预览 + HTML 模板生成 + 上传到 `library/paper/`）

* 版本号只读展示

* 出一个可安装 APK

### 第二期（核心生产工具）

* 新闻发布模块（Git Data API 原子提交 5 文件 + 6条上限 + 海报替换逻辑）

* 更新日志创建/追加（同日合并）

* 英文版卡片同步（en/index.html）

* 内容编辑模块（文件树 + 单文件读写 + sha 冲突处理）

* 图片上传模块

* 离线草稿

### 第三期（完整体验）

* 知识馆页面撰写（独立模板）

* 富文本编辑器（加粗/斜体/链接/标题）

* 版本号升级工具

* MathJax 公式注入开关

* 部署状态轮询（Actions API）

* 海报新闻完整支持

***

## 七、关键挑战与解决方案

| 挑战                 | 方案                                                      |
| ------------------ | ------------------------------------------------------- |
| HTML 模板严格符合规范      | 模板硬编码 + 上传前正则校验必需类名 + 规范变更时同步更新模板发新版                    |
| 修改 index.html 插入卡片 | 字符串锚点定位（`id="news-text-list">\n`），非 HTML 解析，避免序列化破坏格式   |
| 多文件原子性             | Git Data API 单次 commit（Trees+Commits+Refs），第5步失败则整体不落地  |
| Token 安全           | fine-grained PAT + Keystore + 最小权限 + 1年过期 + 可选指纹门禁      |
| 中文文件名              | URL 段 encodeURIComponent，JSON body 用原始 UTF-8            |
| 6条上限维护             | 插入后正则提取所有 `news-featured-text-card`，按 data-date 降序截取前6条 |
| 规范与实际偏差            | 执行阶段先更新规范对齐实际，App 以更新后的规范为权威源                           |

***

## 八、风险与限制

1. **GitHub API 速率限制**：认证 5000 req/hour，单用户不可能触达；优化用全树缓存
2. **Token 泄露**：Keystore 加密 + 最小权限，泄露影响仅限内容写入，可即时吊销
3. **离线编辑**：MVP 不支持，第二期加草稿；不做完整离线 git（成本过高）
4. **APK 分发**：EAS Build 云端出包 + sideload（免费30次/月），不走 Play Store
5. **Pages 构建延迟**：commit 后 1-2 分钟生效，App 提示；第三期可轮询 Actions 状态
6. **单文件 1MB 上限**：Contents API 限制，图片必须压缩（海报 PNG <500KB）
7. **规范文档过时**：执行阶段先清理规范（见第四节）

***

## 九、验证方式

### App 侧验证

1. **认证**：输入有效 PAT → 验证通过 → Keystore 存储 → 重启 App 自动登录
2. **撰写文章**：表单填写 → Markdown 正文 → 预览 HTML 渲染正确 → 上传 → GitHub 仓库出现新文件 → Pages 1-2 分钟后可访问
3. **新闻发布**：发布文字新闻 → 5 文件原子提交 → index.html 右侧列表最新6条含新卡 + 最旧一条被挤出 → en/index.html 同步 → news.html 同步 → 日志记录
4. **海报新闻**：发布海报 → 左侧 poster 替换 → 旧 poster 降级到右侧列表
5. **内容编辑**：浏览文件树 → 读 index.html → 改文字 → 保存 → 409 冲突时 diff 处理正确
6. **图片上传**：选图 → 压缩 → 上传到 `image/poster/{分类}/` → 路径可被文章引用
7. **版本/日志**：首页显示 alpha-017 → 日志列表按日期降序 → 点开渲染正确

### 网站侧验证

* App 提交后，访问 <https://irikana.github.io> 确认新内容已上线

* 检查 index.html 新闻区维持 1海报+6文字 结构

* 检查 en/index.html 卡片同步

* 检查 updateLog 当日文件含新条目

### 规范更新验证

* `rg "#carousel-track" .trae/rules/` 应无结果（已替换为 `#news-text-list`）

* `rg "6个|六条|海报替换" .trae/rules/` 应命中新增的规矩条款

***

## 十、待确认的设计点（执行阶段再定）

1. **海报新闻的图片来源**：App 选图上传 vs 引用已存在于 `image/poster/` 的图片
2. **知识馆页面撰写**：知识馆用内联 CSS，模板与主馆文章不同，Phase 3 单独处理
3. **正文编辑器选型**：MVP 用 Markdown 还是直接富文本（取决于作者偏好）
4. **App 仓库可见性**：私有（保护源码）vs 公开（便于 EAS Build 免费额度）
5. **是否加指纹门禁**：可选增强，看作者对安全的需求

***

## 关键参考文件（实施时对照）

* [visual-component-standards-created.html](file:///g:/PClite/shepherdsLibrary/Irikana.github.io/library/paper/visual-component-standards-created.html) — 文章页模板权威参考

* [restless.html](file:///g:/PClite/shepherdsLibrary/Irikana.github.io/library/paper/restless.html) — 文章页模板参考（含 article-footer-meta）

* [index.html](file:///g:/PClite/shepherdsLibrary/Irikana.github.io/index.html#L46-L90) — 新闻区结构（#news-text-list 锚点）

* [news.html](file:///g:/PClite/shepherdsLibrary/Irikana.github.io/news.html) — 新闻列表项结构

* [library-dynamic.js](file:///g:/PClite/shepherdsLibrary/Irikana.github.io/js/library-dynamic.js) — 版本号位置（约第493行 var Ver）

* [jekyll-gh-pages.yml](file:///g:/PClite/shepherdsLibrary/Irikana.github.io/.github/workflows/jekyll-gh-pages.yml) — 现有部署工作流

* [project\_rules.md](file:///g:/PClite/shepherdsLibrary/Irikana.github.io/.trae/rules/project_rules.md) — 待更新的规范（新闻卡片章节）

* [updateLog\_2026-06-14.html](file:///g:/PClite/shepherdsLibrary/Irikana.github.io/updateLog/updateLog_2026-06-14.html) — 日志模板参考

