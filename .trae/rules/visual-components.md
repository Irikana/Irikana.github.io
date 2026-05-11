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
  border-left: 3px solid var(--color-accent);
}

.function-box-blue::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background-color: var(--color-accent);
}
```

**知识馆内联等效写法**（用于 knowledge-hall/ 页面，因不依赖 CSS 变量）：

```css
.function-box-blue {
  border-left: 4px solid #2980b9;
  background: #f0f7fd;
  padding: 18px 22px;
  border-radius: 2px;
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

.quote-box-grey::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background-color: var(--color-text-light);
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

## 4. 新闻卡片

### 类型一：文字新闻（无海报）

**类名**：`.news-card-text-only`

**完整结构**：

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

**关键规则**：
- `data-date` 格式：`YYYY-MM-DD`，用于轮播排序（按日期降序）
- `news-card-hint` 固定为："点击此处了解更多"
- **不得将正文内容放入 hint**
- 新卡片插入到 `#carousel-track` 最前面

### 类型二：海报新闻（有海报图片）

**类名**：`.news-card-content`

**完整结构**：

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

**关键规则**：
- `news-card-hint` 固定为："点击海报了解更多"
- 海报图片路径：`./image/poster/{路径}/{文件名}.png`
- 中英文主页的新闻卡片需同步添加

### 新闻轮播容器结构

```html
<div class="news-carousel-container">
  <div class="news-carousel-wrapper">
    <div class="news-carousel-track" id="carousel-track">
      <!-- 新闻卡片插入于此 -->
    </div>
  </div>
  <button class="news-carousel-nav-btn prev">&#8249;</button>
  <button class="news-carousel-nav-btn next">&#8250;</button>
</div>
```

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
  border-radius: 4px;
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
  border-radius: 2px;
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

## 附录：响应式断点汇总

| 断点 | 适用场景 | 关键变化 |
|------|----------|----------|
| `≤375px` | 小屏手机 | 字体进一步缩小，间距收紧 |
| `≤768px` | 手机/平板竖屏 | 单列布局，侧边栏变顶部，浮动按钮缩小 |
| `769px–1024px` | 平板横屏 | 导航仪宽度收窄 |
| `≥1024px` | 桌面端 | 标准布局 |
