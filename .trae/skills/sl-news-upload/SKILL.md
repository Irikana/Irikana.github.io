---
name: "sl-news-upload"
description: "牧羊人图书馆新闻上传规范。在创建新闻、添加新闻卡片、更新新闻轮播时自动调用，确保新闻创建完整流程正确执行。"
---

# 牧羊人图书馆 - 新闻上传规范

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
- 文章类型和属性标签仅在用户明确指示时方可添加
- 新闻卡片的标题、日期、链接等元数据仅在用户提供时填写，不自行编造

---

## 新闻创建完整流程

当用户要求创建新新闻时，**必须按以下步骤依次完成所有四步**：

### 第一步：创建独立文章页

每条新闻必须有对应的独立 HTML 页面存放正文内容。

- 文章页放在 `library/paper/` 目录下
- 文件名使用中文标题（如 `视觉组件标准已创建.html`）
- 使用标准文章页面模板（header + main + footer + mobile-nav + quick-nav + float buttons + JS + article-meta 元数据区）
- 正文内容放入 main 区域，使用标准的段落/标题/信息框等组件排版

### 第二步：添加新闻卡片

在主页（`index.html`）和英文主页（`en/index.html`）的新闻区域添加对应卡片。

### 第三步：同步新闻列表页

在 `news.html` 中同步添加该新闻条目。

### 第四步：记录更新日志

将变更记录到当日 `updateLog/updateLog_{YYYY-MM-DD}.html`。

---

## 新闻卡片两种类型

### 类型一：文字新闻（无海报）— `.news-card-text-only`

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

### 类型二：海报新闻（有海报图片）— `.news-card-content`

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

---

## 新闻卡片关键规则

- `data-date` 属性格式为 `YYYY-MM-DD`，用于轮播排序（按日期降序）
- `news-card-hint` 固定为短引导语：
  - 文字新闻 → "点击此处了解更多"
  - 海报新闻 → "点击海报了解更多"
- **不得将正文内容放入 hint**，新闻正文内容应放在链接指向的目标页面中
- 中英文主页的新闻卡片需同步添加，内容对应翻译
- 新新闻卡片插入到 `#carousel-track` 内的最前面（轮播会自动按 date 排序）
- 海报图片路径：`./image/poster/{路径}/{文件名}.png`

---

## 新闻轮播容器结构

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

## 更新日志记录

新闻创建完成后，需记录更新日志。日志记录的完整规范（命名格式、分区结构、净变更定义等）见 **`sl-structural-work`** 技能。

新闻相关的典型日志分区：
1. **主馆变更** — index.html / en/index.html 新闻卡片 / library/paper/ 新文章页
2. **知识馆变更** — （通常无）
3. **规范变更** — （通常无）

---

## 相关资源

- **完整视觉组件标准**: `.trae/rules/visual-components.md`
- **项目开发规范**: `.trae/rules/project_rules.md`