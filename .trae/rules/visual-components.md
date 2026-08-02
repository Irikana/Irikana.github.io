# 牧羊人图书馆 - 视觉组件标准

> 本文档定义了项目中所有 UI 组件的标准样式。
> 开发新页面或修改现有页面时，应直接复制对应组件的样式代码，
> 以确保全站视觉一致性。

---

## 1. 信息提示框（Callout Boxes）

### 蓝色信息框 — `.function-box-blue`

**用途**：一般性信息提示、功能说明、补充说明、"暂无条目"等中性通知。默认首选的信息框类型。

**主馆标准（style.css）**：

```css
.function-box-blue {
  background-color: #f8faff;
  padding: var(--space-md);
  margin: var(--space-sm) 0;
  position: relative;
  overflow: hidden;
  border: var(--line-width) solid #d0dce8;
  border-left: 4px solid var(--color-accent);
}
```

**知识馆内联等效写法**（用于 knowledge-hall/ 页面，因不依赖 CSS 变量）：

```css
.function-box-blue {
  border-left: 4px solid #2980b9;
  background: #f0f7fd;
  padding: 18px 22px;
  border-radius: 0;
  color: #2980b9;
  font-size: 15px;
  line-height: 1.7;
}
```

**暗色模式覆盖**（知识馆页面内联）：

```css
@media (prefers-color-scheme: dark) {
  .function-box-blue {
    background: #1a1e24;
    border-left-color: #2a3544;
    color: #7ab8e0;
  }
}
```

**HTML 模板**：

```html
<div class="function-box-blue">
  此处填写信息内容。
</div>
```

**规范要求**：
- font-size 必须为 **15px**
- line-height 必须为 **1.7**
- 知识馆页面必须使用内联写法（硬编码颜色值），不可依赖 CSS 变量
- 主馆页面使用 style.css 中的变量版本

---

### 灰色引用框 — `.quote-box-grey`

**用途**：引用性说明、参考来源说明、补充背景资料。

**主馆标准（style.css）**：

```css
.quote-box-grey {
  background-color: var(--color-bg-subtle);
  padding: var(--space-md);
  margin: var(--space-sm) 0;
  position: relative;
  overflow: hidden;
  border: var(--line-width) solid var(--color-border);
  border-left: 3px solid var(--color-text-light);
  font-style: italic;
  color: var(--color-text-secondary);
}
```

**暗色模式覆盖**（style.css 内置）：

```css
@media (prefers-color-scheme: dark) {
  .quote-box-grey {
    background-color: var(--color-bg-muted);
    border-color: var(--color-border);
    border-left-color: var(--color-text-light);
    color: var(--color-text-secondary);
  }
}
```

**HTML 模板**：

```html
<div class="quote-box-grey">
  此处为引用或参考性文字内容。
</div>
```

---

### 红色警告框 — `.notice-box-red`

**用途**：仅用于真正需要警示的内容（Alpha/Beta 阶段重要建设状态提醒、内容时效性警示、需要读者特别注意的约束条件）。**未经作者明确许可不得使用。**

**主馆标准（style.css）**：

```css
.notice-box-red {
  background-color: #fef9f9;
  padding: var(--space-md);
  margin: var(--space-md) 0;
  position: relative;
  overflow: hidden;
  border: var(--line-width) solid #f5c6c6;
  border-left: 4px solid #e74c3c;
  color: #a93226;
  font-size: 15px;
  line-height: 1.8;
}
```

**知识馆内联等效写法**：

```css
.notice-box-red {
  border-left: 4px solid #c0392b;
  background: #fdf2f2;
  padding: 18px 22px;
  color: #c0392b;
  font-size: 17px;
  line-height: 1.8;
}
```

**暗色模式覆盖**（知识馆页面内联）：

```css
@media (prefers-color-scheme: dark) {
  .notice-box-red {
    background: #2a1a1a;
    border-left-color: #5c3030;
    color: #e0a0a0;
  }
}
```

**HTML 模板**：

```html
<div class="notice-box-red">
  此处为警告/警示内容。
</div>
```

**规范要求**：
- 默认优先使用蓝色信息框（`.function-box-blue`）或灰色引用框（`.quote-box-red`）
- 创建日期 / 版本信息 → 使用蓝色框
- 参考性说明 / 引用来源 → 使用灰色框
- 页面状态通知（如"尚未开发"）→ 不应使用红色框

---

### 通用 Callout — `.callout`

**用途**：带图标的灵活提示框（Notion 风格），支持图标+文本并排布局。

**标准样式（style.css）**：

```css
.callout {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-md);
  border: var(--line-width) solid var(--color-border);
  background-color: var(--color-bg-subtle);
  margin: var(--space-sm) 0;
  line-height: 1.7;
}

.callout .icon,
.callout img.icon {
  flex-shrink: 0;
  width: 20px; height: 20px;
  font-size: 18px;
  margin-right: 0;
}

.callout p { margin: 0; font-size: 15px; color: var(--color-text-secondary); }

.callout h1, .callout h2, .callout h3 {
  margin: 0 0 var(--space-xs) 0;
  font-size: 15px; font-weight: 600;
  color: var(--color-text);
}

.block-color-gray_background.callout { background-color: var(--color-bg-muted); }
```

**HTML 模板**：

```html
<div class="callout">
  <span class="icon">ℹ️</span>
  <p>此处为 callout 提示内容。</p>
</div>
```

---

## 2. 折叠块 — `<details>`

**用途**：可展开/收起的长内容区域，如详细说明、扩展阅读等。

**标准样式（style.css）**：

```css
details {
  border: var(--line-width) solid var(--color-border);
  padding: var(--space-md);
  margin: var(--space-sm) 0;
  background-color: var(--color-bg-subtle);
}

details summary {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 0;
  transition: color 0.15s ease;
}

details summary::-webkit-details-marker { display: none; }

details summary::before {
  content: '▸';
  flex-shrink: 0;
  font-size: 12px;
  color: var(--color-accent);
  transition: transform 0.2s ease;
}

details[open] summary::before { content: '▾'; }

details summary:hover { color: var(--color-accent); }

details > .indented,
details > div {
  margin-top: var(--space-md);
  padding-left: var(--space-md);
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

details > .indented p,
details > div p {
  margin: var(--space-xs) 0;
  line-height: 1.8;
}

/* 嵌套折叠块 */
details details {
  margin: var(--space-sm) 0;
  background-color: transparent;
  border-color: var(--color-border);
}
```

**HTML 模板**：

```html
<details>
  <summary>点击展开的标题</summary>
  <div>
    <p>折叠内容的正文放在这里。</p>
  </div>
</details>

<!-- 嵌套示例 -->
<details>
  <summary>外层标题</summary>
  <div>
    <p>外层内容。</p>
    <details>
      <summary>内层标题</summary>
      <div><p>内层内容。</p></div>
    </details>
  </div>
</details>
```

**注意事项**：
- 展开箭头通过 `::before` 伪元素实现（▸ / ▾）
- 嵌套 details 的背景设为 `transparent` 以区分层级
- 内容区字体 15px，行高 1.8，颜色使用次要文本色

---

## 3. 文章元数据区 — `.article-meta`

**用途**：文章页顶部的元信息展示（作者、日期、分类等）。

**标准样式（style.css）**：

```css
.article-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-md);
  padding: var(--space-sm) 0;
  margin-bottom: var(--space-lg);
  border-bottom: var(--line-width) solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-light);
}

.article-meta-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.article-meta-label {
  font-weight: 600;
  color: var(--color-text-secondary);
}

.article-meta-value {
  color: var(--color-text-light);
}
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

## 3.5 页面日期显示 — `.page-date`

**用途**：页面标题下方展示创建日期，用于标注创建时间的页面。

**标准样式（style.css）**：

```css
.page-date {
  text-align: center;
  font-size: 13px;
  color: var(--color-text-light);
  margin-top: calc(var(--space-xs) * -1);
  margin-bottom: var(--space-md);
}
```

**HTML 模板**：

```html
<div class="page-date">创建于 2026年1月7日</div>
```

---

## 3.6 文章页脚元数据 — `.article-footer-meta`

**用途**：文章页底部元信息区域（上边框分隔），用于展示补充说明、注释等内容。

**标准样式（style.css）**：

```css
.article-footer-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-md);
  padding: var(--space-sm) 0;
  margin-top: var(--space-xl);
  border-top: var(--line-width) solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-light);
}

.article-footer-meta-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.article-footer-label {
  font-weight: 600;
  color: var(--color-text-secondary);
}

.article-footer-value {
  color: var(--color-text-light);
  font-style: italic;
}
```

**HTML 模板**：

```html
<div class="article-footer-meta">
  <div class="article-footer-meta-item">
    <span class="article-footer-label">补充说明：</span>
    <span class="article-footer-value">此处为补充说明或注释内容。</span>
  </div>
</div>
```

---

## 3.7 文章性质标签 & 标签 — `.article-type-badge` / `.article-tag`

**用途**：在文章元数据中标注文章性质（创作方式）和属性标签。性质不等于分类（library/ 下每个子目录是一个文章分类）。

**性质标签（`.article-type-badge`）**：

| 性质 | 含义 |
|------|------|
| 录音文章 | 录音转文字创作 |
| 手写文章 | 手写转文字创作 |
| 信息文章 | 打字直接创作 |
| 实验性文章 | 主要用于测试某些东西，可能可读性较低（`type-experimental` 紫色徽标） |

**属性标签（`.article-tag`）**：

| 标签类名 | 含义 | 视觉 |
|----------|------|------|
| `.article-tag` | 通用标签（如"新闻"） | 灰色背景 |
| `.tag-ai` | 包含AI生成/辅助内容 | 金色背景 |
| `.tag-edited` | 有删减/修改 | 红色背景 |

**标准样式（style.css）**：

```css
.article-type-badge,
.article-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  vertical-align: middle;
  letter-spacing: 0.5px;
  border-radius: 0;
}

.article-type-badge {
  background-color: #e8f4fd;
  color: #2980b9;
  border: 1px solid #b3d9f2;
}

.article-type-badge.type-experimental {
  background-color: #f3e8fd;
  color: #7d3c98;
  border: 1px solid #d7b8ec;
}

.article-tag {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}

.article-tag.tag-ai {
  background-color: #fff8e6;
  color: #b8860b;
  border: 1px solid #f0d68c;
}

.article-tag.tag-edited {
  background-color: #fce4ec;
  color: #c62828;
  border: 1px solid #f8bbd0;
}
```

**HTML 模板**（嵌入 article-meta 中）：

```html
<span class="article-meta-item">
  <span class="article-meta-label">文章性质：</span>
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

## 4. 新闻卡片

> **结构说明**：新闻区现为"左侧海报 + 右侧文字列表"结构（`#news-text-list` / `.news-featured-text-card` / `.news-featured-poster`），旧的轮播容器已废弃。以下以 `index.html` 实际结构为权威源。

### 主页新闻区整体结构

新闻区为"左侧 1 个最新海报新闻 + 右侧 6 个按时间排序的文字新闻"布局：

```html
<div class="news-featured">
  <!-- 左侧：最新海报新闻（始终保持 1 个） -->
  <div class="news-featured-poster">
    <a href="{文章链接}" target="_blank" rel="noopener noreferrer" class="news-featured-image">
      <img src="./image/poster/{路径}/{文件名}.png" alt="{描述}" loading="lazy" width="400" height="300">
    </a>
    <div class="news-featured-info">
      <h3 class="news-featured-title">{标题}</h3>
      <p class="news-featured-date">{YYYY年M月D日}</p>
    </div>
  </div>
  <!-- 右侧：文字新闻列表（最多 6 条，按 data-date 降序） -->
  <div class="news-featured-text-list" id="news-text-list">
    <a href="{文章链接}" target="_blank" rel="noopener noreferrer" class="news-featured-text-card" data-date="YYYY-MM-DD">
      <span class="card-title">{标题}</span>
      <span class="card-date">{YYYY年M月D日}</span>
    </a>
    <!-- ...最多 6 条 -->
  </div>
</div>
```

### 类型一：文字新闻卡片 — `.news-featured-text-card`

**用途**：右侧文字列表中的单条新闻卡片。

```html
<a href="{文章链接}" target="_blank" rel="noopener noreferrer" class="news-featured-text-card" data-date="YYYY-MM-DD">
  <span class="card-title">{标题}</span>
  <span class="card-date">{YYYY年M月D日}</span>
</a>
```

**关键规则**：
- `data-date` 格式：`YYYY-MM-DD`，用于排序（按日期降序）
- 卡片只放标题+日期，**不放正文内容**
- 右侧列表最多 6 条，超出时移除最旧一条（`data-date` 最小者）

### 类型二：海报新闻 — `.news-featured-poster`

**用途**：左侧 featured 海报位，始终展示最新 1 个海报新闻。

```html
<div class="news-featured-poster">
  <a href="{文章链接}" target="_blank" rel="noopener noreferrer" class="news-featured-image">
    <img src="./image/poster/{路径}/{文件名}.png" alt="{描述}" loading="lazy" width="400" height="300">
  </a>
  <div class="news-featured-info">
    <h3 class="news-featured-title">{标题}</h3>
    <p class="news-featured-date">{YYYY年M月D日}</p>
  </div>
</div>
```

**关键规则**：
- 海报位始终保持 1 个
- 新增海报新闻时替换左侧 poster；被替换的旧海报新闻降级为文字新闻插入右侧列表（若右侧已满 6 条则挤出最旧一条）
- 海报图片路径：`./image/poster/{路径}/{文件名}.png`
- 中英文主页的新闻卡片需同步添加

### news.html 列表项 — `.news-list-item-text-only`

**用途**：`news.html` 新闻列表页的单条新闻条目。

```html
<a href="{文章链接}" target="_blank" class="news-list-item-text-only">
  <h3 class="news-list-item-title">{标题}</h3>
  <p class="news-list-item-date">{YYYY年M月D日}</p>
  <p class="news-list-item-hint">点击此处了解更多</p>
</a>
```

### 容量与排序规矩

- 左侧海报位 **1 个**，右侧文字列表 **最多 6 条**
- 始终按 `data-date` 降序排列右侧列表
- 新增文字新闻 → 插入右侧列表，满 6 条挤出最旧
- 新增海报新闻 → 替换左侧 poster，旧 poster 降级到右侧列表

---

## 5. 浮窗

### 知识馆浮窗 — `.knowledge-hall-float`

**用途**：主页右侧悬浮的知识馆入口浮窗。

**标准结构（HTML + CSS）**：

```html
<div class="knowledge-hall-float" id="kh-float">
  <div class="kh-float-header">
    <span class="kh-float-title">知识馆</span>
    <button class="kh-float-close" onclick="document.getElementById('kh-float').classList.add('hidden')">&times;</button>
  </div>
  <div class="kh-float-body">
    <p class="kh-float-desc">牧羊人图书馆分馆，存放和查阅知识之地</p>
    <a href="./knowledge-hall/index.html" class="kh-float-link">进入知识馆</a>
  </div>
</div>
```

**核心样式（style.css）**：

```css
.knowledge-hall-float {
  position: fixed;
  right: var(--space-lg);
  top: var(--space-lg);
  width: 260px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 999;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: move;
}

.knowledge-hall-float.hidden {
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
}

.kh-float-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-bg-subtle);
  border-bottom: 1px solid var(--color-border);
  cursor: grab;
}

.kh-float-title {
  font-size: 14px; font-weight: 700;
  color: var(--color-accent); letter-spacing: 0.5px;
}

.kh-float-close {
  background: none; border: none;
  font-size: 18px;
  color: var(--color-text-light);
  cursor: pointer;
}

.kh-float-body { padding: var(--space-md); }

.kh-float-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-sm) 0;
  line-height: 1.6;
}

.kh-float-link {
  display: inline-flex;
  align-items: center; gap: 4px;
  font-size: 14px; font-weight: 600;
  color: var(--color-accent);
  text-decoration: none !important;
  padding: 6px 14px;
  border: 1px solid var(--color-accent);
  transition: all 0.15s ease;
}

.kh-float-link:hover {
  background-color: var(--color-accent);
  color: #fff !important;
}
```

### 语言切换浮窗 — `.lang-switch-float`

结构与知识馆浮窗类似，位置在知识馆浮窗下方 120px 处。

```css
.lang-switch-float {
  position: fixed;
  right: var(--space-lg);
  top: calc(var(--space-lg) + 120px);
  width: 240px;
  /* 其余属性同 knowledge-hall-float */
}
```

---

## 6. 导航组件

### 便携式导航仪 — `.quick-nav`

**用途**：主馆页面左侧固定的快速导航栏（悬停展开）。

**核心样式要点**：

```css
.quick-nav {
  position: fixed; left: 0; top: 50%;
  transform: translateY(-50%);
  width: 36px;
  background-color: var(--color-bg);
  border: var(--line-width) solid var(--color-border);
  border-left: none;
  z-index: 1001;
  font-size: 12px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  padding: var(--space-md) var(--space-xs);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
}

/* 悬停时展开 */
.quick-nav:hover { width: 200px; padding: var(--space-md); }

/* 标题竖排 */
.quick-nav-title {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  white-space: nowrap;
}
.quick-nav:hover .quick-nav-title {
  writing-mode: horizontal-tb;
}

/* 导航项 */
.quick-nav-item {
  font-size: 14px; font-weight: 500;
  white-space: nowrap;
  /* 悬停时右移 + 高亮 */
}
.quick-nav-item:hover {
  color: var(--color-accent);
  background-color: var(--color-bg-subtle);
  transform: translateX(2px);
}
```

**子组件**：
- `.quick-nav-section` — 分组标签
- `.quick-nav-divider` — 分隔线
- `.quick-nav-toc-*` — 目录树系列（parent/item/toggle/children/child-item）

### 知识馆侧边栏导航 — `.kh-sidebar` + `.kh-nav-item`

**用途**：知识馆所有页面的左侧固定侧边栏。

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

**核心样式（内联，每个知识馆页面均包含）**：

```css
.kh-body { display: flex; min-height: 100vh; }

.kh-sidebar {
  position: fixed; left: 0; top: 0; bottom: 0;
  width: 220px; background: #fafafa;
  border-right: 1px solid #e0e0e0;
  padding: 24px 16px;
  display: flex; flex-direction: column;
  z-index: 100;
}

.kh-main {
  margin-left: 220px; flex: 1;
  padding: 40px 48px; max-width: 900px;
}

.kh-nav-item {
  display: block;
  padding: 10px 12px;
  color: #555;
  text-decoration: none;
  border-radius: 0;
  margin: 2px 0;
  font-size: 14px;
  transition: all 0.15s;
}

.kh-nav-item:hover { background: #f0f0f0; color: #2c3e50; }
```

**响应式断点（≤768px）**：

```css
@media (max-width: 768px) {
  .kh-sidebar {
    position: static; width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 16px;
  }
  .kh-body { flex-direction: column; }
  .kh-main { margin-left: 0; padding: 24px 16px; }
}
```

**注意**：
- 链接文本末尾必须保留**一个空格**（箭头图标由 `::after` 伪元素自动添加）
- 禁止在 HTML 中手动写入 `↗` 或其他箭头符号

### 移动端底部导航 — `.mobile-nav`

**用途**：移动端（≤768px）显示的底部固定导航栏。

```css
.mobile-nav {
  display: none;  /* 默认隐藏，通过 JS 或媒体查询控制 */
  position: fixed; bottom: 0; left: 0; right: 0;
  background-color: var(--color-bg);
  border-top: var(--line-width) solid var(--color-border);
  z-index: 1000;
  flex-direction: column;
}

.mobile-nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-xs) var(--space-md);
  border: var(--line-width) solid var(--color-border);
  font-size: 12px; font-weight: 500;
}
```

---

## 7. 按钮 & 链接

### 浮动按钮 — `.float-button`

**用途**：回到顶部、导航枢纽等固定位置的圆形按钮。

```css
.float-button {
  position: fixed;
  right: var(--space-lg);
  width: 44px; height: 44px;
  background-color: var(--color-bg);
  color: var(--color-text-secondary);
  border: var(--line-width) solid var(--color-border);
  cursor: pointer;
  font-size: 11px; font-weight: 600;
  z-index: 1000;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.3;
  letter-spacing: 0.5px;
}

.float-button:hover {
  background-color: var(--color-accent);
  color: var(--color-bg);
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
}

.back-to-top { bottom: calc(var(--space-lg) + 52px); }
.nav-hub { bottom: var(--space-lg); }
```

**HTML 模板**：

```html
<button title="回到顶部" class="float-button back-to-top"
  onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
  回到<br>顶部
</button>
```

### 页面跳转按钮 — `.link-to-page`

**用途**：Notion 风格的内联跳转按钮。

**主馆标准（style.css）**：

```css
.link-to-page {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border: var(--line-width) solid var(--color-border);
  text-decoration: none !important;
  color: var(--color-accent) !important;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.15s ease;
  margin: var(--space-sm) 0;
}

.link-to-page:hover {
  background-color: var(--color-bg-subtle);
  border-color: var(--color-accent);
  text-decoration: none !important;
}
```

**知识馆内联写法**：

```css
.link-to-page {
  display: inline-block;
  padding: 8px 20px;
  background: #2c3e50;
  color: #fff;
  text-decoration: none;
  border-radius: 0;
  font-size: 14px;
  transition: background 0.2s;
  margin-top: 8px;
}
.link-to-page:hover { background: #1a252f; }
```

**注意**：`.link-to-page::after` 设为 `content: none`，不重复添加跳转箭头图标。

### 外部/跨页链接 — `.ext-link`

**用途**：标识"离开当前页面"的外部链接或跨页面链接。

**跳转图标机制**（统一适用于以下类名）：

适用类名：`.ext-link` `.quick-nav-item` `.kh-nav-item` `.mobile-nav-link`

```css
/* 自动添加 SVG 箭头的 ::after 伪元素 */
.ext-link::after,
.quick-nav-item::after,
.kh-nav-item::after,
.mobile-nav-link::after {
  content: url("data:image/svg+xml,...");
  margin-left: 6px;
  opacity: 0.6;
}

/* 悬停时箭头右移 */
.ext-link:hover::after,
.kh-nav-item:hover::after,
.mobile-nav-link:hover::after {
  transform: translateX(3px);
}

/* link-to-page 不显示跳转箭头图标 */
.link-to-page::after { content: none; }
```

**规范要求**：
- 链接文本末尾必须保留**一个空格**
- 正确：`<a href="..." class="kh-nav-item">知识馆主页 </a>`
- 错误：`<a href="..." class="kh-nav-item">知识馆主页↗</a>`（双重图标）
- 错误：`<a href="..." class="kh-nav-item">知识馆主页</a>`（无空格）

---

## 8. 文章列表 — `.article-list`

**用途**：文章目录列表。

```css
.article-list {
  list-style: none; padding: 0;
  margin: var(--space-md) 0;
}

.article-list li {
  padding: var(--space-xs) 0;
  border-bottom: 1px dashed var(--color-border);
}

.article-list li:last-child { border-bottom: none; }

.article-list a { font-weight: 500; }
/* 链接自带箭头图标（::after） */
```

**HTML 模板**：

```html
<ul class="article-list">
  <li><a href="path/to/article.html">文章标题一</a></li>
  <li><a href="path/to/article.html">文章标题二</a></li>
</ul>
```

---

## 9. 已废弃标记 — `.deprecated-badge`

**用途**：标记已废弃的内容。

```css
.deprecated-badge {
  display: inline-block;
  font-size: 11px; font-weight: 600;
  color: #e74c3c;
  background-color: #fef9f9;
  border: 1px solid #f5c6c6;
  padding: 2px 8px;
  margin-left: 8px;
  vertical-align: middle;
  letter-spacing: 0.5px;
}
```

**HTML**：

```html
<span class="deprecated-badge">已废弃</span>
```

---

## 10. 设计令牌速查表（CSS 变量）

| 变量名 | 亮色值 | 暗色值 | 用途 |
|--------|--------|--------|------|
| `--color-text` | `#1a1a1a` | `#e8e6e3` | 主文本色 |
| `--color-text-secondary` | `#555555` | `#a0a0a0` | 次要文本色 |
| `--color-text-light` | `#888888` | `#707070` | 辅助文本色 |
| `--color-border` | `#e0e0e0` | `#333333` | 边框色 |
| `--color-border-dark` | `#cccccc` | `#444444` | 深边框色 |
| `--color-bg` | `#ffffff` | `#1a1a1a` | 背景色 |
| `--color-bg-subtle` | `#fafafa` | `#222222` | 浅背景色 |
| `--color-bg-muted` | `#f5f5f5` | `#2a2a2a` | 弱化背景色 |
| `--color-accent` | `#2c3e50` | `#5d9ccc` | 强调色 |
| `--color-accent-hover` | `#1a252f` | `#8ecfff` | 强调悬停色 |
| `--space-xs` | `4px` | — | 超小间距 |
| `--space-sm` | `8px` | — | 小间距 |
| `--space-md` | `16px` | — | 中间距 |
| `--space-lg` | `24px` | — | 大间距 |
| `--space-xl` | `32px` | — | 超大间距 |
| `--space-xxl` | `48px` | — | 特大间距 |
| `--line-width` | `1px` | — | 线宽 |
| `--radius-sm` | `0px` | — | 小圆角 |
| `--radius-md` | `0px` | — | 中圆角 |

---

## 11. 自动目录 — `.auto-toc`（已隐藏）

**用途**：文章页内容区顶部的自动生成目录，根据页面 `<h2>`~`<h3>` 标题构建。由 `library-dynamic.js` 的 TOC 模块自动生成。

> **变更说明**：内联目录（`.auto-toc`）现已默认隐藏（`display: none`），不再占用页面空间。目录功能完全由悬浮目录按钮（`#sl-toc-float-btn`）提供，点击左侧 📖 按钮即可弹出目录面板。

**核心类名**：
- `.auto-toc` — 目录容器（已隐藏，仅作为数据源供悬浮按钮克隆）
- `.auto-toc-header` — 标题栏（可点击展开/收起）
- `.auto-toc-title` — "📖 目录" 文字
- `.auto-toc-toggle` — 折叠三角按钮
- `.auto-toc-list` / `.auto-toc-link` — 目录列表和链接
- `.auto-toc-level-3` — 三级标题缩进

**标准样式（style.css）**：

```css
.auto-toc {
  display: none;
  background: linear-gradient(135deg, var(--color-bg-subtle), var(--color-bg-muted));
  border: 1px solid var(--color-border);
  padding: 14px 18px;
  margin-bottom: var(--space-lg);
}

.auto-toc-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px; padding-bottom: 8px;
  border-bottom: 1px dashed var(--color-border);
  cursor: pointer; user-select: none;
}

.auto-toc-title { font-size: 13px; font-weight: 700; color: var(--color-accent); }

.auto-toc-toggle { background:none; border:none; font-size:11px; color:var(--color-text-light); cursor:pointer; }
.auto-toc.collapsed .auto-toc-toggle { transform: rotate(-90deg); }
.auto-toc.collapsed .auto-toc-list { display: none; }

.auto-toc-link {
  display: block; font-size: 13px; color: var(--color-text-secondary);
  text-decoration: none; padding: 4px 10px; border-left: 2px solid transparent;
  transition: all 0.15s ease; line-height: 1.5;
}
.auto-toc-link:hover { color: var(--color-accent); border-left-color: var(--color-accent); }
.auto-toc-link.active { color: var(--color-accent); font-weight: 600; }
.auto-toc-level-3 { padding-left: 16px; }
```

**HTML 模板**（JS 自动生成）：

```html
<nav class="auto-toc" id="auto-toc">
  <div class="auto-toc-header">
    <span class="auto-toc-title">&#128214; 目录</span>
    <button type="button" class="auto-toc-toggle">▼</button>
  </div>
  <div class="auto-toc-list" id="toc-list">
    <a href="#section-id" class="auto-toc-link auto-toc-level-2">章节标题</a>
    <a href="#sub-section-id" class="auto-toc-link auto-toc-level-3">子章节</a>
  </div>
</nav>
```

**注意事项**：
- 由 JS 自动生成，无需手写 HTML
- 内联目录已隐藏（`display: none`），仅作为数据源供悬浮目录按钮克隆
- 悬浮目录按钮始终可见，不再依赖滚动位置触发
- 点击悬浮目录项平滑滚动到对应标题，当前项高亮显示

---

## 12. 版本号显示 — `.sl-version`

**用途**：在页脚版权区动态注入当前版本号（如 `· alpha-012`），由 `library-dynamic.js` 的 `VersionDisplay` 模块自动追加。

**标准样式（style.css）**：

```css
.sl-version {
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.5px;
}
```

**JS 生成逻辑**：

```javascript
// library-dynamic.js 中 VersionDisplay.init()
var span = E('span');
span.className = 'sl-version';
span.innerHTML = ' · ' + this.ver;  // ver 值为 'alpha-012'
footer.appendChild(span);
```

**注意事项**：
- 仅在存在 `.copyright-color` 或 `.copyright-text` 元素时才注入
- 若已存在 `.sl-version` 元素则跳过（防重复）
- 版本号字符串在 `VersionDisplay.ver` 属性中统一管理

---

## 13. Toast 提示 — `#sl-toast`

**用途**：收藏操作（添加/取消/移除）时的浮动提示框，从顶部滑入、1.5秒后自动消失。由 `library-dynamic.js` 的 `BM.showToast()` 动态创建。

**内联样式**（JS 动态设置，无 CSS 类定义）：

```javascript
t.style.cssText = 'position:fixed;top:-40px;left:50%;transform:translateX(-50%);'
  + 'background:#2c3e50;color:#fff;padding:8px 20px;font-size:13px;'
  + 'z-index:10000;transition:top 0.3s ease;'
  + 'box-shadow:0 4px 12px rgba(0,0,0,0.15);letter-spacing:0.3px;';
```

**动画行为**：
1. 创建时初始 `top: -40px`（屏幕外上方）
2. 10ms 后 `top: 20px`（滑入可视区）
3. 1500ms 后 `top: -40px`（滑出）
4. 300ms 过渡完成后从 DOM 移除

**触发场景**：
- `BM.showToast('收藏成功')` — 添加收藏时
- `BM.showToast('已取消收藏')` — 取消收藏时
- `BM.showToast('已移除收藏')` — 从面板移除时

**注意事项**：
- 每次显示前会先移除已存在的旧 toast（防重叠）
- 使用纯内联样式，不依赖 CSS 类
- 扁平化设计（无 border-radius）

---

## 14. 阅读进度条 — `#sl-reading-progress`

**用途**：文章页顶部显示的阅读进度指示条，随页面滚动实时更新宽度。

**标准样式（style.css）**：

```css
#sl-reading-progress {
  position: fixed;
  top: 0; left: 0;
  height: 6px;
  background-color: #7fb3d5;
  z-index: 9999;
  transition: width 0.1s ease-out;
  width: 0;
  pointer-events: none;
}
```

**JS 生成逻辑**：

```javascript
// library-dynamic.js 中 ReadingProgress 模块自动创建
var bar = document.createElement('div');
bar.id = 'sl-reading-progress';
document.body.appendChild(bar);
// scroll 事件中动态计算：scrollTop / (docHeight - clientHeight) * 100%
```

**注意事项**：
- 仅在存在 `<main>` 或 `.kh-main` 或 `#main-content` 的页面创建
- 使用 passive scroll listener，不影响滚动性能
- 由 StyleEnforcer 注入兜底样式（确保知识馆等非 style.css 页面也生效）

---

## 15. 搜索高亮 — `.sl-highlight`

**用途**：从搜索结果跳转到目标页面后，高亮匹配关键词的标记元素。

**标准样式（style.css）**：

```css
.sl-highlight {
  background-color: #fff3a6;
  padding: 1px 3px;
  border-radius: 0;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(255, 200, 0, 0.25);
  color: var(--color-text);
}
```

**暗色模式覆盖**：

```css
@media (prefers-color-scheme: dark) {
  .sl-highlight {
    background-color: #5c4d00;
    color: #fff8dc;
  }
}
```

**工作流程**：
1. 用户搜索关键词 → Search.doSearch() 在结果 URL 后附加 `?q=关键词`
2. 用户点击结果 → 页面加载后 SearchHighlight.init() 读取 URL 参数
3. 用 TreeWalker 遍历正文文本节点 → 匹配处插入 `<mark class="sl-highlight">`
4. 首个匹配项自动滚动到视口中央
5. 高亮完成后用 `history.replaceState()` 清除 URL 参数

**注意事项**：
- 跳过 SCRIPT/STYLE/TEXTAREA/INPUT/SELECT/MARK/CODE/PRE 标签内的文本
- 大小写不敏感匹配
- 高亮后 URL 参数立即清除，刷新页面不会重复高亮

---

## 16. 悬浮目录按钮 — `#sl-toc-float-btn` / `.sl-toc-float-panel`

**用途**：页面左侧始终可见的 📖 按钮。点击弹出目录面板，无需回到页面顶部即可导航。内联目录已隐藏，此按钮是访问目录的唯一方式。

**核心组件**：

| 元素 | 类名/ID | 说明 |
|------|---------|------|
| 触发按钮 | `#sl-toc-float-btn` | 固定在便携式导航仪右侧（left:44px），垂直居中，始终可见 |
| 目录面板 | `#sl-toc-float-panel` | 点击按钮后滑出的浮动面板，含目录克隆 |
| 面板头部 | `.sl-toc-panel-header` | "目录"标题 + 关闭按钮（×） |
| 克隆列表 | `#toc-clone-list` | 原始 TOC 列表的深拷贝，独立于原始目录 |

**标准样式（style.css）关键要点**：

```css
/* 按钮始终可见（内联目录已隐藏） */
#sl-toc-float-btn {
  position: fixed; left: 44px; top: 50%;
  transform: translateY(-50%) scale(0);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
#sl-toc-float-btn.visible { transform: translateY(-50%) scale(1); opacity: 1; }

/* 面板默认隐藏偏移 */
#sl-toc-float-panel {
  position: fixed; left: 88px; top: 50%;
  transform: translateY(-50%) translateX(-10px);
  opacity: 0; pointer-events: none;
  max-height: 60vh; overflow-y: auto;
}
#sl-toc-float-panel.visible {
  transform: translateY(-50%) translateX(0);
  opacity: 1; pointer-events: auto;
}
```

**交互行为**：
1. **始终可见**：悬浮目录按钮在页面加载后始终显示（内联目录已隐藏，不再依赖滚动触发）
2. **点击按钮**：面板滑出 + 同步当前活跃章节高亮
3. **点击目录项**：平滑滚动到对应章节 + 关闭面板 + 更新原始 TOC 高亮
4. **IntersectionObserver 联动**：滚动经过章节时，同时更新原始 TOC 和克隆面板的高亮状态
5. **外部点击关闭**：点击面板和按钮以外的区域自动关闭

**响应式适配（≤768px）**：

```css
@media (max-width: 768px) {
  #sl-toc-float-btn { left: 4px; width: 32px; height: 32px; }
  #sl-toc-float-panel { left: 44px; width: calc(100vw - 52px); }
}
```

**注意事项**：
- 仅在页面存在 `#auto-toc`（即有 ≥2 个 h2/h3 标题）时才初始化
- 面板内的目录是原始 TOC 的 cloneNode(true)，两者独立但通过 href 同步高亮
- 与便携式导航仪（`.quick-nav`）并排显示，互不遮挡

---

## 17. 数学公式渲染 — MathJax 3

**用途**：全站数学公式统一使用 MathJax 3 渲染，禁止使用纯文本/Unicode 字符书写公式。

**引入方式**：在含数学公式的页面的 `<head>` 中（`</head>` 之前）添加：

```html
<script>
MathJax = {
  tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], displayMath: [['$$', '$$'], ['\\[', '\\]']] },
  svg: { fontCache: 'global' }
};
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
```

**行内公式**：用 `$...$` 包裹

```html
<p>牛顿第二定律 $F=ma$ 是经典力学的基础。</p>
<p>单摆周期公式为 $T=2\pi\sqrt{\dfrac{l}{g}}$。</p>
```

**独立公式**：用 `$$...$$` 包裹并居中显示

```html
<p style="text-align:center; margin:16px 0;">$$E = mc^2$$</p>
<p style="text-align:center; margin:16px 0;">$$\dfrac{1}{2}mv_0^2 + mgh = \dfrac{1}{2}mv^2$$</p>
```

**规范要求**：
- 不含数学公式的页面**不添加** MathJax（避免不必要的加载）
- 独立公式段落**不设置** `font-size`（由 MathJax 控制渲染尺寸）
- 变量字母（如 $m$、$v$、$g$）也用 `$...$` 包裹，确保排版一致
- 使用 `\dfrac` 而非 `\frac` 以保证分数在行内也有足够大小
- 下标用 `_`（如 `$v_0$`），上标用 `^`（如 `$v^2$`），希腊字母用 `\omega`、`\pi` 等

---

## 附录：响应式断点汇总

| 断点 | 适用场景 | 关键变化 |
|------|----------|----------|
| `≤375px` | 小屏手机 | 字体进一步缩小，间距收紧 |
| `≤768px` | 手机/平板竖屏 | 单列布局，侧边栏变顶部，浮动按钮缩小 |
| `769px–1024px` | 平板横屏 | 导航仪宽度收窄 |
| `≥1024px` | 桌面端 | 标准布局 |
