# 牧羊人图书馆 - 结构页面模板使用说明

## 更新日期
2026年2月5日

## 更新内容
根据index.html的内容，在structure_page.html模板中添加了**新闻轮播功能**作为可选示例。

---

## 一、新增功能概览

### 1. 新闻轮播模块（可选功能）
- **功能描述**：用于展示最新的新闻、公告或重要信息
- **特点**：
  - 支持左右切换浏览
  - 支持键盘左右箭头导航
  - 自动按日期排序（最新在前）
  - 响应式设计，适配移动端和桌面端
  - 悬停预览效果

---

## 二、如何启用新闻轮播功能

### 步骤1：取消CSS样式注释（无需操作）
CSS样式已经自动添加到文件中，位于第一个`<style>`标签的末尾，包含：
- `.news-card` - 新闻卡片样式
- `.news-carousel-container` - 轮播容器样式
- `.news-carousel-track` - 轮播轨道样式
- `.news-carousel-nav-btn` - 导航按钮样式
- `.news-carousel-card` - 卡片样式

### 步骤2：取消HTML内容注释
在`<!-- 主要内容区域 -->`中，找到以下注释部分：

```html
<!-- 可选功能：新闻轮播模块（示例） -->
<!-- 说明：如需使用新闻轮播功能，请取消以下代码注释并根据实际需求修改内容 -->
```

将下面的代码块取消注释，并替换成你实际的内容：

```html
<div class="gjs-row notice-header section-header-repeat bg-reset" style="background-color:white;">
  <div class="gjs-cell">
    <div id="section-news" class="section-title-text-main" style="background-color:#c1e1c1;">新闻</div>
    <div class="gjs-row yellowgreen-bg content-bg-white-sub" style="background-color:white;">
      <div class="gjs-cell">
        <div class="center-align">
          <div class="news-carousel-container" id="news-carousel">
            <button class="news-carousel-nav-btn prev" id="carousel-prev" aria-label="上一篇">‹</button>
            <div class="news-carousel-wrapper">
              <div class="news-carousel-track" id="carousel-track">
                <!-- 新闻卡片 1 -->
                <div class="news-carousel-card" data-date="2026-02-04">
                  <div class="news-card">
                    <div class="news-card-content">
                      <a href="你的链接" target="_blank" class="news-card-image">
                        <img src="你的图片URL" alt="新闻图片">
                      </a>
                      <div class="news-card-info">
                        <h3 class="news-card-title">新闻标题</h3>
                        <p class="news-card-date">2026年2月4日</p>
                        <p class="news-card-hint">点击图片了解更多</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 可以添加更多新闻卡片，保持相同结构 -->
              </div>
            </div>
            <button class="news-carousel-nav-btn next" id="carousel-next" aria-label="下一篇">›</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**参数说明**：
- `data-date`：新闻日期（YYYY-MM-DD格式），用于自动排序
- `href`：新闻详情页链接
- `img src`：新闻图片URL
- `news-card-title`：新闻标题
- `news-card-date`：显示日期文本
- `news-card-hint`：提示文本（如"点击图片了解更多"）

### 步骤3：取消JavaScript逻辑注释
在文件末尾的`<script>`标签中，找到以下注释部分：

```html
<!-- 可选功能：新闻轮播JavaScript逻辑（示例） -->
<!-- 说明：如需使用新闻轮播功能，请取消以下代码注释 -->
```

将下方的JavaScript代码取消注释：

```javascript
(function initNewsCarousel() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  if (!track || !prevBtn || !nextBtn) return;
  
  // ... 其余代码保持不变
})();
```

### 步骤4：更新目录导航（可选）
如果你希望新闻板块也出现在左侧便携式导航仪的目录中，可以在`<div id="quick-nav-toc-container">`中添加：

```html
<!-- 新闻板块 -->
<div data-target="section-news" class="quick-nav-toc-item">• 新闻</div>
```

---

## 三、自定义配置

### 修改轮播样式
如需调整轮播外观，可修改以下CSS类：

```css
/* 轮播容器宽度 */
.news-carousel-container {
  max-width: 800px; /* 可根据需要调整 */
}

/* 卡片间距 */
.news-card {
  padding: 20px; /* 可根据需要调整 */
}

/* 导航按钮样式 */
.news-carousel-nav-btn {
  width: 50px; /* 按钮大小 */
  height: 50px;
  background-color: #556b2f; /* 按钮颜色 */
}
```

### 添加更多新闻卡片
复制现有的`<div class="news-carousel-card" data-date="...">`块，修改内容即可。

### 禁用自动排序
如需手动控制新闻顺序，可以修改JavaScript中的排序逻辑：

```javascript
// 原代码：按日期排序
cards.sort((a, b) => {
  const dateA = new Date(a.dataset.date);
  const dateB = new Date(b.dataset.date);
  return dateB - dateA;
});

// 修改为：保持HTML中的原始顺序（删除sort部分）
// cards.forEach(card => track.appendChild(card)); // 可选
```

---

## 四、兼容性说明

- **浏览器支持**：所有现代浏览器（Chrome、Firefox、Safari、Edge）
- **移动端支持**：已适配移动端，在`@media (max-width: 768px)`中有专门的样式
- **键盘导航**：支持左右箭头键切换

---

## 五、注意事项

1. **日期格式**：`data-date`必须使用`YYYY-MM-DD`格式
2. **图片尺寸**：建议使用正方形或4:3比例的图片，最佳宽度为200px-400px
3. **链接有效性**：确保新闻链接和图片URL均可正常访问
4. **数量建议**：建议新闻卡片数量不超过10个，以免影响加载速度
5. **注释清理**：启用功能后，记得删除示例中不需要的注释

---

## 六、文件修改记录

### 修改文件
- `structure_page.html`

### 新增内容
1. **CSS样式**（约120行）
   - 新闻卡片样式
   - 轮播容器样式
   - 导航按钮样式
   - 响应式适配样式

2. **HTML结构**（注释形式）
   - 新闻轮播示例代码
   - 包含完整的HTML结构说明

3. **JavaScript逻辑**（注释形式）
   - 轮播初始化函数
   - 事件绑定逻辑
   - 键盘导航支持

---

## 七、技术支持

如有问题或需要进一步定制，请参考：
- 主页示例：`index.html`
- 模板文件：`structure_page.html`
- 样式文件：`css/style.css`（可选）

---

**牧羊人图书馆 Shepherd's Library**
© 2026 薛柯道 KeDao Xue
