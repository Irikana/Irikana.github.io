# 牧羊人图书馆 - 开发规范

## 核心原则

### 开发前检查流程
- **每次开发前必须检查更新日志**
- 在开始任何代码修改之前，必须先查看 `updateLog/` 目录中最新的更新日志文件
- 确认当前版本号和最近的变更内容
- 确保新开发的内容与已有变更不冲突
- 如果发现需要更新的内容未记录在日志中，先补充日志再进行开发

### 文字与图片内容保护
- **不要随意修改文字图片内容，开发时保留原话**
- 所有页面中的原有文字、链接、图片路径、JavaScript 逻辑均不得擅自修改
- 仅在用户明确要求修改内容时方可改动文字或图片
- **提示词中提供的原话可用于开发**——用户在需求描述中给出的具体文本可直接用于代码实现

### 设计确认机制
- **设计思路如不明确可向用户提问以确认**
- 遇到以下情况应主动向用户确认：
  - 需求存在多种合理实现方式时
  - 涉及视觉风格选择时
  - 用户意图不明确时
  - 需要删除或大幅重构现有功能时

### 全局变更原则
- **当修改全局性/结构性功能时，必须将变更应用到所有包含此功能的页面**
- 以下类型的变更属于全局性变更，必须搜索全项目并逐一应用：
  - 导航相关：侧边栏、导航仪（便携式导航仪）、顶部导航栏（nav）、面包屑/位置显示
  - 浮动组件：浮窗、回到顶部按钮、语言切换等
  - 页面骨架：header/footer 结构、页面布局模板
  - 全局样式：字体大小、圆角、间距等设计令牌的变更
- **操作流程**：
  1. 使用 Grep 搜索全项目确定所有包含目标组件/样式的文件
  2. 对每个匹配文件执行相同的修改
  3. 覆盖范围包括但不限于：主馆（library/）、知识馆（knowledge-hall/）、英文版（en/）、文章页（paper/）、日志页（updateLog/）
  4. 除非用户**特别强调**仅修改特定文件或目录，否则默认全局应用
- 此规则的目的是避免遗漏，确保站点一致性

### 红色警告框使用原则

### 警告框授权机制
- **未经作者明确许可，不得对任何内容使用红色警告框（`.notice-box-red`）**
- 默认情况下，优先使用蓝色信息框（`.function-box-blue`）或灰色引用框（`.quote-box-grey`）
- 只有作者明确指示某处需要用"警示""警告""注意"等语气时，方可使用红色框
- 此规则的目的是避免滥用警告语气，保持网站的平和氛围

- 红色提示框（`.notice-box-red`）仅用于真正需要警示的内容
- 以下场景**不应**使用红色框：
  - 创建日期 / 版本信息（改用蓝色信息框 `.function-box-blue`）
  - 参考性说明 / 引用来源说明
  - 页面状态通知（如"尚未开发"）
- 以下场景**可以**使用红色框：
  - Alpha/Beta 阶段的重要建设状态提醒
  - 内容时效性警示
  - 需要读者特别注意的约束条件

### 扁平化设计原则
- **全站统一使用扁平化设计风格，禁用圆角**
- 所有 UI 组件的 `border-radius` 必须为 `0` 或不设置（默认为 0）
- 按钮使用直角边框，配合细线框和微妙的阴影/过渡效果
- 面板、弹窗、输入框等均采用方形设计
- 此规则的目的是保持网站简洁、专业的视觉一致性

## 版本控制

### 版本号规则
- 采用 **方案B**：`alpha-{自定义编号}`（如 `alpha-001`、`alpha-004`）
- 编号完全由作者自主控制，不绑定日期
- 当前版本：**alpha-015**

### 更新日志规则
- **每次开发的净变更保存于更新日志当中**
- 日志文件存放在 `updateLog/` 目录
- **命名格式：`updateLog_{YYYY-MM-DD}.html`**（按日期命名，而非按 alpha 编号）
- **禁止为同一天内的每次小修改都新建独立的日志文件**
- 同一天内的所有变更应合并到同一个日期命名的日志文件中
- 分店分行列出变更（主馆 / 知识馆 / 规范 各自独立列出）
- **净变更定义**：对比上一次版本所做的最终更改
- 同一版本开发过程中，如果加入的内容有错误修正，修正部分**不写入日志**——因为修正包含在该内容的加入过程中
- 日志只记录最终新增/变更的内容，不记录中间过程的修修补补

### 更新日志结构
```
updateLog/
├── updateLog_alpha-001.html   # 早期日志（历史遗留）
├── updateLog_alpha-002.html   # 早期日志（历史遗留）
├── updateLog_alpha-003.html   # 早期日志（历史遗留）
└── updateLog_2026-05-10.html  # 按日期命名的新格式
```

每个日志文件中按以下分区记录：
1. **主馆变更** — index.html / library/* / css/style.css 等
2. **知识馆变更** — knowledge-hall/* （如有）
3. **规范变更** — .trae/rules/* （如有）

## 代码规范

### HTML 结构
- 使用语义化标签：`<header>` `<nav>` `<main>` `<footer>` `<section>` `<article>`
- 统一 2 空格缩进
- 为 `img` 标签添加语义化的 `alt` 属性
- 移除空标签和自动生成的垃圾类名（如 `c28806` 等）

### CSS 规范
- 使用 CSS 变量（`:root`）管理颜色、间距等设计令牌
- 保持响应式设计兼容（桌面端 / 平板 / 手机）
- 支持暗色模式（`@media (prefers-color-scheme: dark)`）

### 文件组织
```
Irikana.github.io/
├── index.html              # 主页
├── navigator.html          # 导航枢纽
├── css/style.css           # 全局样式
├── image/                  # 图片资源
├── library/                # 图书馆主馆
│   ├── intro.html          # 图书馆入门
│   ├── rule.html           # 图书馆规则
│   ├── feature.html        # 图书馆功能
│   ├── library.html        # 图书馆入口
│   └── paper/              # 文章
├── knowledge-hall/         # 知识馆（分馆）
│   ├── index.html          # 知识馆主页
│   └── categories/         # 知识分类
├── updateLog/              # 更新日志
│   └── updateLog_{YYYY-MM-DD}.html
└── .trae/rules/            # 开发规范
    └── project_rules.md    # 本文件
```

## 页面布局规范

### 主页（index.html）板块结构
主页的大板块为三级：
1. **新闻** — 轮播展示最新动态
2. **前情提要** — 包含子板块：
   - 图书馆入门
   - 图书馆规则
   - 图书馆功能
3. **入口** — 图书馆入口

知识馆以浮窗/浮动按钮形式出现，不作为大板块占据主内容区。

### 知识馆风格规范
- 整洁、简约的设计
- 文字醒目，适当增大字体
- 取消顶部导航栏（nav），改用侧边栏导航
- 侧边栏包含：三种知识分类入口、回到图书馆主页、进入图书馆入口

### 新闻卡片创建规范

当用户提供时间、标题和内容要求创建新闻时，遵循以下标准：

**新闻卡片两种类型：**

1. **文字新闻（无海报）** — 使用 `news-card-text-only` 类：
```html
<div class="news-carousel-card" data-date="YYYY-MM-DD">
  <div class="news-card">
    <a href="{链接}" target="_blank" class="news-card-text-only">
      <h3 class="news-card-title">{标题}</h3>
      <p class="news-card-date">{YYYY年M月D日}</p>
      <p class="news-card-hint">点击此处了解更多</p>
    </a>
  </div>
</div>
```

2. **海报新闻（有海报图片）** — 使用 `news-card-content` 类：
```html
<div class="news-carousel-card" data-date="YYYY-MM-DD">
  <div class="news-card">
    <div class="news-card-content">
      <a href="{链接}" target="_blank" class="news-card-image">
        <img src="./image/poster/{路径}/{文件名}.png" alt="{描述}">
      </a>
      <div class="news-card-info">
        <h3 class="news-card-title">{标题}</h3>
        <p class="news-card-date">{YYYY年M月D日}</p>
        <p class="news-card-hint">点击海报了解更多</p>
      </div>
    </div>
  </div>
</div>
```

**关键规则：**
- `data-date` 属性格式为 `YYYY-MM-DD`，用于轮播排序（按日期降序）
- `news-card-hint` 固定为短引导语："点击此处了解更多"（文字新闻）或"点击海报了解更多"（海报新闻），**不得将正文内容放入 hint**
- 新闻正文内容应放在链接指向的目标页面中，而非卡片内
- 中英文主页的新闻卡片需同步添加，内容对应翻译
- 新新闻卡片插入到 `#carousel-track` 内的最前面（轮播会自动按 date 排序）

**新闻创建完整流程**：

当用户要求创建新新闻时，必须按以下步骤依次完成：

1. **创建独立文章页**：每条新闻必须有对应的独立 HTML 页面存放正文内容
   - 文章页放在 `library/paper/` 目录下
   - 文件名使用中文标题（如 `视觉组件标准已创建.html`）
   - 使用标准文章页面模板（header + main + footer + mobile-nav + quick-nav + float buttons + JS + article-meta 元数据区）
   - 正文内容放入 main 区域，使用标准的段落/标题/信息框等组件排版

2. **添加新闻卡片**：在主页（index.html）和英文主页（en/index.html）的新闻区域添加对应卡片
   - 文字新闻使用 `.news-card-text-only` 类（轮播卡片）
   - 海报新闻使用 `.news-card-content` 类（轮播卡片）
   - 卡片只放标题+日期+hint，不放正文内容

3. **同步新闻列表页**：在 news.html 中同步添加该新闻条目

4. **记录更新日志**：将变更记录到 updateLog 中

### 跳转链接图标规范

当需要为外部链接、跨页面链接或导航项添加跳转指示图标时，遵循以下标准：

**图标实现方式：**
- 使用 CSS `::after` 伪元素自动添加 SVG 箭头图标
- 适用类名：`.ext-link` `.quick-nav-item` `.kh-nav-item` `.mobile-nav-link`
- **禁止**在 HTML 文本中手动添加 `↗` 或其他箭头符号

**文字与图标间距规范：**
- 链接文本末尾必须保留**一个空格**，作为文字与图标的视觉分隔
- 正确示例：`<a href="..." class="kh-nav-item">知识馆主页 </a>`
- 错误示例：`<a href="..." class="kh-nav-item">知识馆主页↗</a>` （双重图标）
- 错误示例：`<a href="..." class="kh-nav-item">知识馆主页</a>` （无空格）

**适用场景：**
- 侧边栏导航项（`.kh-nav-item`）
- 快速导航项（`.quick-nav-item`）
- 外部链接（`.ext-link`）
- 移动端导航链接（`.mobile-nav-link`）
- 所有需要明确标识为"跳转/离开当前页面"的链接

**特殊例外：**
- `.link-to-page` 类已有内置图标样式，其 `::after` 设为 `content: none`，不重复添加
- `.link-to-page` 内**禁止使用 `<span class="icon">`** 或任何其他内联图标元素，仅保留纯文字

### 标准文档同步原则
- **当在视觉组件标准（visual-components.md）中修改组件定义时，必须将变更同步到全局所有使用该组件的页面**
- 操作流程：修改标准文档 → Grep 搜索全项目所有使用该组件的文件 → 逐一同步修改
- 此规则确保标准文档始终与实际代码保持一致，避免"标准写了但没执行"的情况

### StyleEnforcer 样式安全网机制
- **`library-dynamic.js` 中的 `StyleEnforcer` 模块是全站视觉组件样式的最终安全网**
- 该模块通过 JS 动态注入 `<style id="sl-style-enforcer">` 标签，使用 `!important` 强制覆盖信息框/警告框/引用框的样式
- **覆盖范围**：`.function-box-blue`（蓝色信息框）、`.notice-box-red`（红色警告框）、`.quote-box-grey`（灰色引用框）
- **三种模式均会覆盖**：
  - 亮色模式（默认）：半透明背景 + 深色文字，确保可读性
  - `.force-dark-mode`（手动切换暗色）：深色半透明背景 + 浅色文字
  - `@media (prefers-color-scheme: dark)`（系统偏好暗色）：同上暗色样式
- **为什么需要 StyleEnforcer**：知识馆页面使用内联硬编码 CSS，不依赖主馆 style.css 的 CSS 变量；不同页面的内联样式可能不一致或遗漏暗色模式适配。StyleEnforcer 作为统一兜底，确保所有页面的信息框在任何主题模式下都显示正确
- **修改视觉组件样式时的操作流程**：
  1. 先修改 `css/style.css` 中的标准定义（主馆）
  2. 再修改 `visual-components.md` 中的文档
  3. 最后同步更新 `library-dynamic.js` 中 `StyleEnforcer.init()` 的注入样式字符串
  4. 三处保持一致，StyleEnforcer 作为最终保障
