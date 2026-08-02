---
name: "sl-news-upload"
description: "牧羊人图书馆新闻上传规范。在创建新闻、添加新闻卡片、更新新闻区时自动调用，确保新闻创建完整流程正确执行。"
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

## 主页新闻区结构

> **重要**：新闻区现为"左侧海报 + 右侧文字列表"结构（`#news-text-list` / `.news-featured-text-card` / `.news-featured-poster`），旧的轮播容器已废弃。以 `index.html` 实际结构为权威源。

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

### 文字新闻卡片 — `.news-featured-text-card`

```html
<a href="{文章链接}" target="_blank" rel="noopener noreferrer" class="news-featured-text-card" data-date="YYYY-MM-DD">
  <span class="card-title">{标题}</span>
  <span class="card-date">{YYYY年M月D日}</span>
</a>
```

### 海报新闻 — `.news-featured-poster`

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

### news.html 列表项 — `.news-list-item-text-only`

```html
<a href="{文章链接}" target="_blank" class="news-list-item-text-only">
  <h3 class="news-list-item-title">{标题}</h3>
  <p class="news-list-item-date">{YYYY年M月D日}</p>
  <p class="news-list-item-hint">点击此处了解更多</p>
</a>
```

---

## 新闻区容量与排序规矩

- 左侧海报位始终保持 **1 个**最新海报新闻
- 右侧文字列表始终保持 **最多 6 条**文字新闻，按 `data-date` 降序排列
- 新增**文字新闻**：插入到 `#news-text-list`，若已满 6 条则移除最旧一条（`data-date` 最小者），再按 `data-date` 降序重排
- 新增**海报新闻**：替换左侧 `.news-featured-poster`；被替换的旧海报新闻降级为文字新闻插入右侧列表（若右侧已满 6 条则挤出最旧一条），再按 `data-date` 降序重排
- 始终按 `data-date` 降序排列右侧列表

---

## 新闻卡片关键规则

- `data-date` 属性格式为 `YYYY-MM-DD`，用于排序（按日期降序）
- 新闻卡片只放标题+日期，**不放正文内容**，正文放在链接指向的独立文章页
- 海报图片路径：`./image/poster/{路径}/{文件名}.png`
- 中英文主页的新闻卡片需同步添加，内容对应翻译（英文版仅同步卡片标题+日期，正文不翻译）

---

---

## SlyWrite App 自动发布（补充）

当使用 SlyWrite App（`shepherd-library-app`）的「新闻发布」功能时，App 会自动完成以下操作（无需人工执行本技能的第一步到第三步）：

1. 上传文章到 `library/paper/{英文标题}.html`
2. 更新 `index.html` 新闻区（文字新闻插入 `#news-text-list` / 海报新闻替换 `.news-featured-poster` 并降级旧海报）
3. 更新 `news.html` 列表项
4. 更新 `en/index.html`（英文标题卡片）
5. 同步 `library.html` 普通文章列表

App 暂不自动写更新日志（本技能的第四步），发布新闻后需手动在当日 updateLog 中补充记录。

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
