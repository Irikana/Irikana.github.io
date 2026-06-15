---
name: "sl-layout-design"
description: "牧羊人图书馆排版与视觉设计规范。在修改样式、添加UI组件、调整页面布局、使用信息框/折叠块/标签等视觉组件时自动调用。"
---

# 牧羊人图书馆 - 排版与视觉设计规范

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

### 扁平化设计原则
- **全站统一使用扁平化设计风格，禁用圆角**
- 所有 UI 组件的 `border-radius` 必须为 `0` 或不设置
- 按钮使用直角边框，配合细线框和微妙的阴影/过渡效果
- 面板、弹窗、输入框等均采用方形设计

### 红色警告框使用原则
- **未经作者明确许可，不得使用红色警告框（`.notice-box-red`）**
- 默认优先使用蓝色信息框（`.function-box-blue`）或灰色引用框（`.quote-box-grey`）
- 创建日期/版本信息 → 蓝色框
- 参考性说明/引用来源 → 灰色框
- 页面状态通知 → 不用红色框
- 仅 Alpha/Beta 重要建设状态提醒、内容时效性警示、需特别注意的约束条件 → 可用红色框（需许可）

---

## 1. 信息提示框（Callout Boxes）

### 蓝色信息框 — `.function-box-blue`
**用途**：一般性信息提示、功能说明、补充说明、"暂无条目"等中性通知。默认首选。

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

**知识馆内联等效写法**：
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

**暗色模式覆盖（知识馆内联）**：
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

**规范要求**：font-size 必须为 15px，line-height 必须为 1.7。知识馆页面必须使用内联写法。

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

**HTML 模板**：
```html
<div class="quote-box-grey">
  此处为引用或参考性文字内容。
</div>
```

---

### 红色警告框 — `.notice-box-red`
**用途**：仅用于真正需要警示的内容。**未经作者明确许可不得使用。**

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

**暗色模式覆盖（知识馆内联）**：
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

---

### 通用 Callout — `.callout`
**用途**：带图标的灵活提示框（Notion 风格）。

**标准样式**：
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
.callout .icon, .callout img.icon {
  flex-shrink: 0;
  width: 20px; height: 20px;
  font-size: 18px;
}
.callout p { margin: 0; font-size: 15px; color: var(--color-text-secondary); }
.callout h1, .callout h2, .callout h3 {
  margin: 0 0 var(--space-xs) 0;
  font-size: 15px; font-weight: 600;
  color: var(--color-text);
}
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

**用途**：可展开/收起的长内容区域。

**标准样式**：
```css
details {
  border: var(--line-width) solid var(--color-border);
  padding: var(--space-md);
  margin: var(--space-sm) 0;
  background-color: var(--color-bg-subtle);
}
details summary {
  font-size: 15px; font-weight: 600;
  color: var(--color-text);
  cursor: pointer; list-style: none;
  display: flex; align-items: center;
  gap: var(--space-sm); padding: 0;
}
details summary::-webkit-details-marker { display: none; }
details summary::before {
  content: '▸'; flex-shrink: 0; font-size: 12px;
  color: var(--color-accent); transition: transform 0.2s ease;
}
details[open] summary::before { content: '▾'; }
details summary:hover { color: var(--color-accent); }
details > .indented, details > div {
  margin-top: var(--space-md); padding-left: var(--space-md);
  font-size: 15px; line-height: 1.8; color: var(--color-text-secondary);
}
details details {
  margin: var(--space-sm) 0;
  background-color: transparent;
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
```

---

## 3. 文章类型标签 & 属性标签

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

```css
.article-tag {
  display: inline-block; font-size: 11px; font-weight: 600;
  padding: 2px 8px; vertical-align: middle; letter-spacing: 0.5px;
  border-radius: 0;
  background-color: #f5f5f5; color: #666; border: 1px solid #ddd;
}
.article-tag.tag-ai {
  background-color: #fff8e6; color: #b8860b; border: 1px solid #f0d68c;
}
.article-tag.tag-edited {
  background-color: #fce4ec; color: #c62828; border: 1px solid #f8bbd0;
}
```

**HTML 模板**：
```html
<span class="article-type-badge">录音文章</span>
<span class="article-tag">新闻</span>
<span class="article-tag tag-ai">包含AI</span>
<span class="article-tag tag-edited">有删减</span>
```

---

## 4. 已废弃标记 — `.deprecated-badge`

```css
.deprecated-badge {
  display: inline-block; font-size: 11px; font-weight: 600;
  color: #e74c3c; background-color: #fef9f9;
  border: 1px solid #f5c6c6;
  padding: 2px 8px; margin-left: 8px;
  vertical-align: middle; letter-spacing: 0.5px;
}
```

```html
<span class="deprecated-badge">已废弃</span>
```

---

## 5. 搜索高亮 — `.sl-highlight`

```css
.sl-highlight {
  background-color: #fff3a6;
  padding: 1px 3px; border-radius: 0;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(255, 200, 0, 0.25);
  color: var(--color-text);
}
@media (prefers-color-scheme: dark) {
  .sl-highlight { background-color: #5c4d00; color: #fff8dc; }
}
```

---

## 6. 设计令牌速查表（CSS 变量）

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

## 7. 响应式断点汇总

| 断点 | 适用场景 | 关键变化 |
|------|----------|----------|
| `≤375px` | 小屏手机 | 字体进一步缩小，间距收紧 |
| `≤768px` | 手机/平板竖屏 | 单列布局，侧边栏变顶部，浮动按钮缩小 |
| `769px–1024px` | 平板横屏 | 导航仪宽度收窄 |
| `≥1024px` | 桌面端 | 标准布局 |

---

## 8. CSS 规范

- 使用 CSS 变量（`:root`）管理颜色、间距等设计令牌
- 保持响应式设计兼容（桌面端 / 平板 / 手机）
- 支持暗色模式（`@media (prefers-color-scheme: dark)`）
- **全站禁用圆角**：所有 `border-radius` 必须为 `0` 或不设置

---

## 相关资源

- **完整视觉组件标准**: `.trae/rules/visual-components.md`
- **项目开发规范**: `.trae/rules/project_rules.md`
