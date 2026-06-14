---
name: "sl-article-upload"
description: "牧羊人图书馆文章上传规范。在创建文章页面、添加文章元数据、配置MathJax公式渲染、设置文章标签时自动调用。"
---

# 牧羊人图书馆 - 文章上传规范

## 核心原则

### 文字与图片内容保护
- 不要随意修改文字图片内容，开发时保留原话
- 仅在用户明确要求修改内容时方可改动文字或图片
- 提示词中提供的原话可用于开发

### 设计确认机制
遇到以下情况应主动向用户确认：
- 需求存在多种合理实现方式时
- 涉及视觉风格选择时
- 用户意图不明确时

### 元数据保护
- **不私自增添标签和文章类型**，即不擅自添加 `.article-tag`、`.article-type-badge` 等元数据
- 文章类型（录音文章/手写文章/信息文章）和属性标签（tag-ai/tag-edited 等）仅在用户明确指示时方可添加
- 创建日期、作者等元数据字段也仅在用户提供时填写，不自行编造

---

## 文章页标准结构

文章页必须包含以下完整结构：

```
header + main + footer + mobile-nav + quick-nav + float buttons + JS + article-meta 元数据区
```

- 正文内容放入 `<main>` 区域
- 使用标准的段落/标题/信息框等组件排版
- 文件放在 `library/paper/` 目录下
- 文件名使用中文标题（如 `视觉组件标准已创建.html`）

---

## 文章元数据区 — `.article-meta`

**用途**：文章页顶部的元信息展示（作者、日期、分类等）。

**标准样式**：
```css
.article-meta {
  display: flex; flex-wrap: wrap; align-items: baseline;
  gap: var(--space-md); padding: var(--space-sm) 0;
  margin-bottom: var(--space-lg);
  border-bottom: var(--line-width) solid var(--color-border);
  font-size: 13px; color: var(--color-text-light);
}
.article-meta-item { display: inline-flex; align-items: center; gap: var(--space-xs); }
.article-meta-label { font-weight: 600; color: var(--color-text-secondary); }
.article-meta-value { color: var(--color-text-light); }
```

**HTML 模板**：
```html
<div class="article-meta">
  <span class="article-meta-item">
    <span class="article-meta-label">作者：</span>
    <span class="article-meta-value">薛柯道</span>
  </span>
  <span class="article-meta-item">
    <span class="article-meta-label">创建日期：</span>
    <span class="article-meta-value">2026年5月10日</span>
  </span>
  <span class="article-meta-item">
    <span class="article-meta-label">最后更新：</span>
    <span class="article-meta-value">2026年5月11日</span>
  </span>
</div>
```

---

## 页面日期显示 — `.page-date`

**用途**：页面标题下方展示创建日期。

```css
.page-date {
  text-align: center; font-size: 13px;
  color: var(--color-text-light);
  margin-top: calc(var(--space-xs) * -1);
  margin-bottom: var(--space-md);
}
```

```html
<div class="page-date">创建于 2026年1月7日</div>
```

---

## 文章页脚元数据 — `.article-footer-meta`

**用途**：文章页底部元信息区域（上边框分隔），用于展示补充说明、注释等。

```css
.article-footer-meta {
  display: flex; flex-wrap: wrap; align-items: baseline;
  gap: var(--space-md); padding: var(--space-sm) 0;
  margin-top: var(--space-xl);
  border-top: var(--line-width) solid var(--color-border);
  font-size: 13px; color: var(--color-text-light);
}
```

```html
<div class="article-footer-meta">
  <div class="article-footer-meta-item">
    <span class="article-footer-label">补充说明：</span>
    <span class="article-footer-value">此处为补充说明或注释内容。</span>
  </div>
</div>
```

---

## 文章类型标签 & 属性标签

### 类型标签 — `.article-type-badge`

| 类型 | 含义 |
|------|------|
| 录音文章 | 录音转文字创作 |
| 手写文章 | 手写转文字创作 |
| 信息文章 | 打字直接创作 |

```css
.article-type-badge {
  display: inline-block; font-size: 11px; font-weight: 600;
  padding: 2px 8px; vertical-align: middle; letter-spacing: 0.5px;
  border-radius: 0;
  background-color: #e8f4fd; color: #2980b9; border: 1px solid #b3d9f2;
}
```

### 属性标签 — `.article-tag`

| 标签类名 | 含义 | 视觉 |
|----------|------|------|
| `.article-tag` | 通用标签 | 灰色背景 |
| `.tag-ai` | 包含AI生成/辅助内容 | 金色背景 |
| `.tag-edited` | 有删减/修改 | 红色背景 |

**HTML 模板**（嵌入 article-meta 中）：
```html
<span class="article-meta-item">
  <span class="article-meta-label">文章类型：</span>
  <span class="article-meta-value"><span class="article-type-badge">录音文章</span></span>
</span>
<span class="article-meta-item">
  <span class="article-meta-label">标签：</span>
  <span class="article-meta-value">
    <span class="article-tag">新闻</span>
    <span class="article-tag tag-ai">包含AI</span>
    <span class="article-tag tag-edited">有删减</span>
  </span>
</span>
```

---

## 文章列表 — `.article-list`

**用途**：文章目录列表。

```css
.article-list { list-style: none; padding: 0; margin: var(--space-md) 0; }
.article-list li { padding: var(--space-xs) 0; border-bottom: 1px dashed var(--color-border); }
.article-list li:last-child { border-bottom: none; }
.article-list a { font-weight: 500; }
```

```html
<ul class="article-list">
  <li><a href="path/to/article.html">文章标题一</a></li>
  <li><a href="path/to/article.html">文章标题二</a></li>
</ul>
```

---

## 数学公式渲染 — MathJax 3

**全站数学公式统一使用 MathJax 3 渲染，禁止使用纯文本/Unicode 字符书写公式。**

### 引入方式
在含数学公式的页面的 `<head>` 中（`</head>` 之前）添加：

```html
<script>
MathJax = {
  tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], displayMath: [['$$', '$$'], ['\\[', '\\]']] },
  svg: { fontCache: 'global' }
};
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
```

### 行内公式
用 `$...$` 包裹：
```html
<p>牛顿第二定律 $F=ma$ 是经典力学的基础。</p>
```

### 独立公式
用 `$$...$$` 包裹并居中显示：
```html
<p style="text-align:center; margin:16px 0;">$$E = mc^2$$</p>
```

### 规范要求
- 不含数学公式的页面**不添加** MathJax（避免不必要的加载）
- 独立公式段落**不设置** `font-size`（由 MathJax 控制渲染尺寸）
- 变量字母（如 $m$、$v$、$g$）也用 `$...$` 包裹，确保排版一致
- 使用 `\dfrac` 而非 `\frac` 以保证分数在行内也有足够大小
- 下标用 `_`，上标用 `^`，希腊字母用 `\omega`、`\pi` 等

---

## 自动目录 — `.auto-toc`

- 由 `library-dynamic.js` 的 TOC 模块自动生成，无需手写 HTML
- 内联目录已隐藏（`display: none`），仅作为数据源供悬浮目录按钮克隆
- 悬浮目录按钮（`#sl-toc-float-btn`）始终可见，点击弹出目录面板
- 仅在页面存在 `#auto-toc`（即有 ≥2 个 h2/h3 标题）时才初始化

---

## 阅读进度条 — `#sl-reading-progress`

- 由 `library-dynamic.js` 的 ReadingProgress 模块自动创建
- 仅在存在 `<main>` 或 `.kh-main` 或 `#main-content` 的页面创建
- 无需手动添加

---

## 相关资源

- **完整视觉组件标准**: `.trae/rules/visual-components.md`
- **项目开发规范**: `.trae/rules/project_rules.md`