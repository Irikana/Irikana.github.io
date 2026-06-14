---
name: "sl-structural-work"
description: "牧羊人图书馆结构工作规范。在修改导航组件、全局性结构变更、版本控制、更新日志记录、视觉组件同步、文件组织时自动调用。"
---

# 牧羊人图书馆 - 结构工作规范

## 核心原则

### 开发前检查流程
- **每次开发前必须检查更新日志**
- 查看 `updateLog/` 目录中最新的更新日志文件
- 确认当前版本号和最近的变更内容
- 确保新开发的内容与已有变更不冲突

### 文字与图片内容保护
- 不要随意修改文字图片内容，开发时保留原话
- 仅在用户明确要求修改内容时方可改动文字或图片
- 提示词中提供的原话可用于开发

### 设计确认机制
遇到以下情况应主动向用户确认：
- 需求存在多种合理实现方式时
- 涉及视觉风格选择时
- 用户意图不明确时
- 需要删除或大幅重构现有功能时

### 全局变更原则
**当修改全局性/结构性功能时，必须将变更应用到所有包含此功能的页面。**

以下类型的变更属于全局性变更，必须搜索全项目并逐一应用：
- 导航相关：侧边栏、便携式导航仪、顶部导航栏（nav）、面包屑/位置显示
- 浮动组件：浮窗、回到顶部按钮、语言切换等
- 页面骨架：header/footer 结构、页面布局模板
- 全局样式：字体大小、圆角、间距等设计令牌的变更

**操作流程**：
1. 使用 Grep 搜索全项目确定所有包含目标组件/样式的文件
2. 对每个匹配文件执行相同的修改
3. 覆盖范围包括：主馆（library/）、知识馆（knowledge-hall/）、英文版（en/）、文章页（paper/）、日志页（updateLog/）
4. 除非用户特别强调仅修改特定文件或目录，否则默认全局应用

---

## 版本控制

### 版本号规则
- 采用 `alpha-{自定义编号}`（如 `alpha-001`、`alpha-016`）
- 编号完全由作者自主控制，不绑定日期
- 当前版本：**alpha-016**

### 更新日志规则
- **每次开发的净变更保存于更新日志当中**
- 日志文件存放在 `updateLog/` 目录
- **命名格式：`updateLog_{YYYY-MM-DD}.html`**（按日期命名）
- **禁止为同一天内的每次小修改都新建独立的日志文件**
- 同一天内的所有变更应合并到同一个日期命名的日志文件中
- 分店分行列出变更（主馆 / 知识馆 / 规范 各自独立列出）
- **净变更定义**：对比上一次版本所做的最终更改
- 同一版本开发过程中，修正部分不写入日志
- 日志只记录最终新增/变更的内容，不记录中间过程

### 更新日志结构
每个日志文件中按以下分区记录：
1. **主馆变更** — index.html / library/* / css/style.css 等
2. **知识馆变更** — knowledge-hall/* （如有）
3. **规范变更** — .trae/rules/* （如有）

---

## 文件组织

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
│   ├── paper/              # 文章
│   ├── works/              # 创作作品
│   └── misc/               # 杂物（练习、笔记等）
│       └── math-exercises/ # 数学练习
├── knowledge-hall/         # 知识馆（分馆）
│   ├── index.html          # 知识馆主页
│   └── categories/         # 知识分类
├── updateLog/              # 更新日志
│   └── updateLog_{YYYY-MM-DD}.html
└── .trae/rules/            # 开发规范
    └── project_rules.md
```

### 文件命名规范
- **目录名和文件名一律使用英文**，禁止使用中文命名
- 目录名使用小写连字符（kebab-case），如 `math-exercises`
- 文件名使用小写连字符，如 `exercise-01.html`
- 页面标题（`<title>` 和显示文本）可以使用中文，但文件路径必须为英文

---

## 导航组件

### 便携式导航仪 — `.quick-nav`
- 主馆页面左侧固定的快速导航栏（悬停展开）
- 默认宽度 36px，悬停展开至 200px
- 包含：`.quick-nav-section`（分组标签）、`.quick-nav-divider`（分隔线）、`.quick-nav-toc-*`（目录树系列）

### 知识馆侧边栏 — `.kh-sidebar` + `.kh-nav-item`
- 知识馆所有页面的左侧固定侧边栏
- 宽度 220px，固定定位
- 响应式（≤768px）：侧边栏变为顶部，宽度 100%

**标准结构**：
```html
<aside class="kh-sidebar">
  <div class="kh-logo-area">
    <img src="../image/logo.png" alt="牧羊人图书馆 Logo">
    <div class="kh-site-title">知识馆</div>
    <div class="kh-equality">所有知识都是平等的</div>
  </div>
  <div class="kh-nav-divider"></div>
  <a href="index.html" class="kh-nav-item">知识馆主页 </a>
  <a href="categories/phenomenon.html" class="kh-nav-item">现象 </a>
  <a href="categories/recallable.html" class="kh-nav-item">可回忆知识 </a>
  <a href="categories/traceable.html" class="kh-nav-item">可追溯知识 </a>
  <div class="kh-nav-divider"></div>
  <a href="../index.html" class="kh-nav-item">图书馆主页 </a>
  <a href="../library/library.html" class="kh-nav-item">图书馆入口 </a>
</aside>
```

### 移动端底部导航 — `.mobile-nav`
- 移动端（≤768px）显示的底部固定导航栏
- 默认隐藏，通过 JS 或媒体查询控制

---

## 跳转链接图标规范

**适用类名**：`.ext-link` `.quick-nav-item` `.kh-nav-item` `.mobile-nav-link`

- 使用 CSS `::after` 伪元素自动添加 SVG 箭头图标
- **禁止**在 HTML 文本中手动添加 `↗` 或其他箭头符号
- 链接文本末尾必须保留**一个空格**，作为文字与图标的视觉分隔
- 正确：`<a href="..." class="kh-nav-item">知识馆主页 </a>`
- 错误：`<a href="..." class="kh-nav-item">知识馆主页↗</a>`（双重图标）
- 错误：`<a href="..." class="kh-nav-item">知识馆主页</a>`（无空格）
- `.link-to-page::after` 设为 `content: none`，不重复添加跳转箭头图标
- `.link-to-page` 内禁止使用 `<span class="icon">` 或其他内联图标元素

---

## 浮窗组件

### 知识馆浮窗 — `.knowledge-hall-float`
- 主页右侧悬浮的知识馆入口浮窗
- 固定定位，右侧 `var(--space-lg)`，顶部 `var(--space-lg)`
- 宽度 260px，可拖拽，可关闭

### 语言切换浮窗 — `.lang-switch-float`
- 位置在知识馆浮窗下方 120px 处
- 宽度 240px

### 浮动按钮 — `.float-button`
- 回到顶部（`.back-to-top`）：底部 `calc(var(--space-lg) + 52px)`
- 导航枢纽（`.nav-hub`）：底部 `var(--space-lg)`

---

## 页面跳转按钮 — `.link-to-page`

**主馆标准**：
```css
.link-to-page {
  display: inline-flex; align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border: var(--line-width) solid var(--color-border);
  text-decoration: none !important;
  color: var(--color-accent) !important;
  font-weight: 500; font-size: 15px;
  transition: all 0.15s ease;
  margin: var(--space-sm) 0;
}
```

**知识馆内联写法**：
```css
.link-to-page {
  display: inline-block; padding: 8px 20px;
  background: #2c3e50; color: #fff;
  text-decoration: none; border-radius: 0;
  font-size: 14px; transition: background 0.2s;
  margin-top: 8px;
}
```

---

## 视觉组件标准完整同步流程

当修改 `visual-components.md`（权威源）中的任何组件定义时，**必须按以下顺序依次执行**：

### 第一步：修改权威源
编辑 `.trae/rules/visual-components.md` 中对应组件的定义

### 第二步：同步 CSS 主馆定义
1. 在 `css/style.css` 中更新该组件的标准样式规则
2. 同步更新 `@media (prefers-color-scheme: dark)` 暗色模式规则
3. 同步更新响应式断点规则

### 第三步：同步 StyleEnforcer 安全网
1. 在 `js/library-dynamic.js` 的 `StyleEnforcer.init()` 注入样式字符串中更新对应规则
2. 确保亮色、`.force-dark-mode`、暗色媒体查询三份拷贝全部同步

### 第四步：同步 visual-components.html
1. 更新 `library/visual-components.html` 中对应的章节内容
2. 保持 HTML 的章节编号和 ID 与 MD 一致

### 第五步：全项目页面同步（安全替换）
- 对于类名重命名/属性值变更等机械性替换，使用 `.trae/scripts/sync-components.ps1` 脚本或手动 Grep 替换
- **安全边界**：只替换 class 属性、`<style>` 块、`style="..."` 属性、JS 字符串中的类名字面量
- **禁止替换**：HTML 标签之间的正文文字内容

### 第六步：验证
用 Grep 验证旧类名/旧值是否已完全清除（排除 notionExport/ 目录）

### 第七步：记录日志
将净变更记录到当日 `updateLog/updateLog_{YYYY-MM-DD}.html`

### 同步范围清单

| 区域 | 路径 | 说明 |
|------|------|------|
| CSS 主馆 | `css/style.css` | 标准定义 + 暗色 + 响应式 |
| 动态功能 | `js/library-dynamic.js` | StyleEnforcer + 其他模块引用 |
| 视觉组件 MD | `.trae/rules/visual-components.md` | 权威源 |
| 视觉组件 HTML | `library/visual-components.html` | 可视化参考页 |
| 主馆页面 | `index.html`, `navigator.html`, `library/*.html`, `library/paper/*.html` | 所有主馆 HTML |
| 英文版页面 | `en/index.html`, `en/library/*.html` | 所有英文版 HTML |
| 知识馆页面 | `knowledge-hall/*.html`, `knowledge-hall/categories/*.html` | 所有知识馆 HTML |
| 日志页面 | `updateLog/*.html` | 更新日志页 |
| **不同步** | `notionExport/`, `.trae/`, `template/`, `docs/`, `.arts/` | 排除目录 |

---

## StyleEnforcer 样式安全网机制

- `library-dynamic.js` 中的 `StyleEnforcer` 模块是全站视觉组件样式的最终安全网
- 通过 JS 动态注入 `<style id="sl-style-enforcer">` 标签，使用 `!important` 强制覆盖信息框/警告框/引用框的样式
- 覆盖范围：`.function-box-blue`、`.notice-box-red`、`.quote-box-grey`
- 三种模式均会覆盖：亮色模式、`.force-dark-mode`、`@media (prefers-color-scheme: dark)`
- **修改视觉组件样式时的操作流程**：
  1. 先修改 `css/style.css` 中的标准定义
  2. 再修改 `visual-components.md` 中的文档
  3. 最后同步更新 `library-dynamic.js` 中 `StyleEnforcer.init()` 的注入样式字符串
  4. 三处保持一致

---

## 同步脚本使用说明

项目提供了 `.trae/scripts/sync-components.ps1` 脚本用于安全的批量类名替换：

```powershell
# 基本用法：重命名一个类名
.\sync-components.ps1 -OldName "content-bg-yellow" -NewName "content-main"

# 多个替换（按顺序执行）
.\sync-components.ps1 -OldName "content-bg-yellow","yellowgreen-bg" -NewName "content-main","bg-transparent"

# 仅预览不实际修改（DryRun 模式）
.\sync-components.ps1 -OldName "old-class" -NewName "new-class" -DryRun

# 排除特定目录
.\sync-components.ps1 -OldName "old" -NewName "new" -ExcludeDirs "updateLog","en"
```

**脚本安全机制**：
- 只匹配 `class="..."`、`<style>` 块、`style="..."` 属性中的内容
- 不触碰标签间的正文文字
- 自动跳过 `notionExport/` 目录
- 支持 `-DryRun` 预览模式

---

## HTML 代码规范

- 使用语义化标签：`<header>` `<nav>` `<main>` `<footer>` `<section>` `<article>`
- 统一 2 空格缩进
- 为 `img` 标签添加语义化的 `alt` 属性
- 移除空标签和自动生成的垃圾类名（如 `c28806` 等）

---

## 版本号显示 — `.sl-version`

- 由 `library-dynamic.js` 的 `VersionDisplay` 模块自动追加到页脚版权区
- 格式：`· alpha-016`
- 仅在存在 `.copyright-color` 或 `.copyright-text` 元素时才注入

---

## Toast 提示 — `#sl-toast`

- 收藏操作时的浮动提示框，从顶部滑入、1.5秒后自动消失
- 由 `library-dynamic.js` 的 `BM.showToast()` 动态创建
- 使用纯内联样式，不依赖 CSS 类
- 扁平化设计（无 border-radius）

---

## 相关资源

- **完整视觉组件标准**: `.trae/rules/visual-components.md`
- **项目开发规范**: `.trae/rules/project_rules.md`
- **同步脚本**: `.trae/scripts/sync-components.ps1`