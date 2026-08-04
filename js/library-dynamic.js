/**
 * 牧羊人图书馆 动态功能 v1.2
 * 稳定版 - 全面修复
 */
(function() {

  function $(id) { return document.getElementById(id); }
  function $q(sel, root) { return (root || document).querySelector(sel); }
  function $qa(sel, root) { return (root || document).querySelectorAll(sel); }

  function storageGet(key, def) {
    try { var d = localStorage.getItem('sl_' + key); return d ? JSON.parse(d) : def; } catch(e) { return def; }
  }
  function storageSet(key, val) {
    try { localStorage.setItem('sl_' + key, JSON.stringify(val)); } catch(e) {}
  }

  var E = document.createElement.bind(document);
  var ROOT = (function() {
    var p = location.pathname;
    if (p.indexOf('/library/paper/') > -1) return '../../';
    if (p.indexOf('/library/') > -1) return '../';
    if (p.indexOf('/knowledge-hall/categories/') > -1) return '../../../';
    if (p.indexOf('/knowledge-hall/') > -1) return '../';
    if (p.indexOf('/en/library/paper/') > -1) return '../../../';
    if (p.indexOf('/en/library/') > -1) return '../../';
    if (p.indexOf('/en/') > -1) return '../';
    if (p.indexOf('/updateLog/') > -1) return '../';
    return './';
  })();

  function toAbs(url) {
    var a = E('a');
    a.href = url;
    return a.href;
  }

  /* ========== 1. SEARCH ========== */
  var Search = {
    data: [
      {t:'INSTLAB CLOUD Mobile或将问世',u:toAbs(ROOT+'library/paper/INSTLAB CLOUD Mobile Might Come Out Soon.html'),k:'INSTLAB CLOUD Mobile或将问世 INSTLAB CLOUD Mobile Might Come Out Soon 信息文章 新闻 新闻'},
      {t:'测试文章20260803N1',u:toAbs(ROOT+'misc/experimental/Test Paper 20260803N1.html'),k:'测试文章20260803N1 Test Paper 20260803N1 实验性文章'},
      {t:'SlyWrite的诞生',u:toAbs(ROOT+'library/paper/The Birth of SlyWrite.html'),k:'SlyWrite的诞生 The Birth of SlyWrite 信息文章 新闻'},
      {t:'牧羊人图书馆主页',u:toAbs(ROOT+'index.html'),k:'主页 图书馆 入门 规则 功能'},
      {t:'图书馆入门',u:toAbs(ROOT+'library/intro.html'),k:'介绍 牧羊人图书馆 存放知识之地'},
      {t:'图书馆规则',u:toAbs(ROOT+'library/rule.html'),k:'规则 使用规范 注意事项'},
      {t:'图书馆功能',u:toAbs(ROOT+'library/feature.html'),k:'功能 能力 特性 描述'},
      {t:'知识馆',u:toAbs(ROOT+'knowledge-hall/index.html'),k:'知识馆 分馆 分类 现象 可回忆 可追溯'},
      {t:'现象',u:toAbs(ROOT+'knowledge-hall/categories/phenomenon.html'),k:'现象 原始知识 被发现 被观察'},
      {t:'可回忆知识',u:toAbs(ROOT+'knowledge-hall/categories/recallable.html'),k:'可回忆 稳定 随时提出 想象 创造'},
      {t:'可追溯知识',u:toAbs(ROOT+'knowledge-hall/categories/traceable.html'),k:'可追溯 记录保存 考察 转换'},
      {t:'SOTM I 2026后记',u:toAbs(ROOT+'library/paper/SOTM-I-2026-postscript.html'),k:'柏大辅 Stella 电子 后摇滚 音乐 推荐'},
      {t:'记录的冲动',u:toAbs(ROOT+'library/paper/impulse-to-record.html'),k:'记录 冲动 写作 动机 录音文章'},
      {t:'视觉组件标准已创建',u:toAbs(ROOT+'library/paper/visual-component-standards-created.html'),k:'视觉组件 标准 样式 信息框 折叠块'},
      {t:'活跃开发阶段',u:toAbs(ROOT+'library/paper/library-may-enter-active-development.html'),k:'活跃开发 Alpha 更新'},
      {t:'Minesia更新',u:toAbs(ROOT+'library/paper/minesia-0.0.16-update.html'),k:'Minesia 更新 版本 公开测试'},
      {t:'知识馆启用',u:toAbs(ROOT+'library/paper/knowledge-hall-launch.html'),k:'知识馆 启用 分馆 分类'},
      {t:'Minesia测试',u:toAbs(ROOT+'library/misc/experimental/minesia-first-public-test.html'),k:'Minesia 测试 公开 第一个'},
      {t:'周三狂热',u:toAbs(ROOT+'library/paper/wednesday-frenzy-and-difficult-review.html'),k:'周三 狂热 复习 困难 新闻'},
      {t:'语义化更新',u:toAbs(ROOT+'library/paper/semantic-visual-component-update.html'),k:'语义化 视觉组件 更新 标准'},
      {t:'逆向法与单摆对称性',u:toAbs(ROOT+'library/paper/backwards-and-pendulum-symmetry.html'),k:'逆向法 单摆 对称性 物理 手写文章'},
      {t:'逆向法·下滑问题',u:toAbs(ROOT+'library/paper/backwards-sliding-problem.html'),k:'逆向法 下滑 物理 手写文章'},
      {t:'六月二日',u:toAbs(ROOT+'library/paper/june-second-diary.html'),k:'六月二日 日记 手写文章'},
      {t:'坐立不安',u:toAbs(ROOT+'library/paper/restless.html'),k:'坐立不安 信息文章 新闻'},
      {t:'坐立不安的材料对话',u:toAbs(ROOT+'library/paper/restless-material-dialog.html'),k:'坐立不安 材料 对话 AI'},
      {t:'睡过头',u:toAbs(ROOT+'library/paper/woke-up-late.html'),k:'睡过头 日记 手写文章'},
      {t:'测试新闻20260802',u:toAbs(ROOT+'library/paper/Test News on 20260802.html'),k:'测试新闻 20260802 信息文章 新闻'},
      {t:'测试新闻',u:toAbs(ROOT+'library/paper/testNewsOn20260802.html'),k:'测试新闻 信息文章 新闻'},
      {t:'测试文章',u:toAbs(ROOT+'library/misc/experimental/test-article.html'),k:'测试文章 实验性文章 移动端 App'}
    ],
    overlay: null,
    isOpen: false,

    init: function() {
      var btn = E('button');
      btn.id = 'sl-search-btn';
      btn.className = 'search-toggle-btn';
      btn.innerHTML = '&#128269;';
      btn.title = '\u7ad9\u5185\u641c\u7d22 (\u6309 / \u952e)';
      btn.setAttribute('type', 'button');
      var self = this;
      btn.addEventListener('click', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        self.toggle();
      });
      document.body.appendChild(btn);
      this.btnEl = btn;

      var ov = E('div');
      ov.id = 'sl-search-overlay';
      ov.className = 'search-overlay';
      ov.innerHTML =
        '<div class="search-container" id="sl-search-c">' +
          '<div class="search-header" id="sl-search-h">' +
            '<div class="search-input-wrapper"><span class="search-icon">&#128269;</span><input type="text" id="sl-si" class="search-input" placeholder="\u641c\u7d22\u6587\u7ae0\u3001\u9875\u9762\u3001\u77e5\u8bc6\u70b9..." autocomplete="off"></div>' +
            '<button type="button" class="search-close-btn" id="sl-sc" title="\u5173\u95ed">&times;</button>' +
          '</div>' +
          '<div class="search-results" id="sl-sr"><div class="search-help">\u8f93\u5165\u5173\u952e\u8bcd\u5f00\u59cb\u641c\u7d22</div></div>' +
        '</div>';
      document.body.appendChild(ov);
      this.overlay = ov;

      var closeBtn = $('sl-sc');
      if (closeBtn) closeBtn.onclick = function() { self.close(); };
      ov.onclick = function(e) { if (e.target === ov || e.target.id === 'sl-search-overlay') self.close(); };

      var inp = $('sl-si');
      if (inp) {
        inp.oninput = function() { setTimeout(function() { self.doSearch(inp.value); }, 180); };
        inp.onkeydown = function(e) {
          var items = $qa('.search-result-item');
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            var dir = e.key === 'ArrowDown' ? 1 : -1;
            var cur = -1;
            var items = $qa('.search-result-item');
            for (var i = 0; i < items.length; i++) { if (items[i].classList.contains('sel')) cur = i; }
            if (cur >= 0 && items[cur]) items[cur].classList.remove('sel');
            cur = Math.max(-1, Math.min(items.length - 1, cur + dir));
            if (cur >= 0 && items[cur]) { items[cur].classList.add('sel'); items[cur].scrollIntoView({block:'nearest'}); }
          }
          if (e.key === 'Enter') {
            var sel = $qa('.search-result-item.sel');
            if (sel.length > 0) sel[0].click();
          }
        };
      }

      document.addEventListener('keydown', function(e) {
        if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
          var t = document.activeElement ? document.activeElement.tagName : '';
          if (t !== 'INPUT' && t !== 'TEXTAREA' && t !== 'SELECT') {
            e.preventDefault();
            self.open();
          }
        }
        if (e.key === 'Escape' && self.isOpen) self.close();
      });

      // 动态补充：从 GitHub 仓库目录自动收录静态数据中缺失的文章（如 App 上传的新文章）
      this.fetchDynamic();
    },

    /**
     * 动态补充搜索条目：列出仓库文章目录，对静态 Search.data 中缺失的 html
     * 抓取其 <title> 生成条目。异步执行，不阻塞搜索。
     */
    fetchDynamic: function() {
      var self = this;
      var dirs = ['library/paper', 'library/misc/experimental', 'en/library/paper'];
      var existing = {};
      for (var i = 0; i < self.data.length; i++) {
        var u = self.data[i].u || '';
        var m = u.match(/library\/(?:paper|misc\/experimental)\/([^\/]+\.html)$/) || u.match(/en\/library\/paper\/([^\/]+\.html)$/);
        if (m) existing[m[1]] = true;
      }
      dirs.forEach(function(dir) {
        fetch('https://api.github.com/repos/Irikana/Irikana.github.io/contents/' + dir)
          .then(function(r) { return r.json(); })
          .then(function(files) {
            if (!Array.isArray(files)) return;
            var pending = files.filter(function(f) {
              return f.type === 'file' && /\.html$/i.test(f.name) && f.name !== 'index.html' && !existing[f.name];
            });
            pending.forEach(function(f) {
              fetch(f.download_url)
                .then(function(r) { return r.text(); })
                .then(function(html) {
                  var t = html.match(/<title>([^<]+)<\/title>/);
                  if (!t) return;
                  var title = t[1].replace(/^\s*牧羊人图书馆\s*-\s*/, '').trim();
                  var name = f.name.replace(/\.html$/, '');
                  var path = dir.indexOf('en/') === 0 ? 'en/' + dir + '/' + f.name : dir + '/' + f.name;
                  self.data.push({ t: title, u: toAbs(ROOT + path), k: title + ' ' + name });
                }).catch(function() {});
            });
          }).catch(function() {});
      });
    },

    toggle: function() { this.isOpen ? this.close() : this.open(); },
    open: function() {
      if (!this.overlay) this.init();
      if (!this.overlay) return;
      this.overlay.classList.add('active');
      this.isOpen = true;
      var inp = $('sl-si');
      if (inp) { setTimeout(function() { inp.focus(); inp.value = ''; }, 100); }
    },
    close: function() {
      if (!this.overlay) return;
      this.overlay.classList.remove('active');
      this.isOpen = false;
      var inp = $('sl-si');
      var res = $('sl-sr');
      if (inp) inp.value = '';
      if (res) res.innerHTML = '<div class="search-help">\u8f93\u5165\u5173\u952e\u8bcd\u5f00\u59cb\u641c\u7d22</div>';
    },

    doSearch: function(q) {
      var box = $('sl-sr');
      if (!box) return;
      if (!q || !q.trim()) { box.innerHTML = '<div class="search-help">\u8f93\u5165\u5173\u952e\u8bcd\u5f00\u59cb\u641c\u7d22</div>'; return; }
      q = q.toLowerCase().trim();
      var results = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].k.indexOf(q) > -1 || this.data[i].t.toLowerCase().indexOf(q) > -1) results.push(this.data[i]);
        if (results.length >= 10) break;
      }
      if (!results.length) { box.innerHTML = '<div class="search-no-results">\u672a\u627e\u5230 "' + q + '" \u76f8\u5173\u7ed3\u679c</div>'; return; }
      var h = '';
      for (var j = 0; j < results.length; j++) {
        h += '<a href="' + results[j].u + (results[j].u.indexOf('?') > -1 ? '&' : '?') + 'q=' + encodeURIComponent(q) + '" class="search-result-item">';
        h += '<span class="search-result-title">' + results[j].t + '</span>';
        h += '<span class="search-result-excerpt">' + results[j].k.substring(0, 70) + '</span></a>';
      }
      box.innerHTML = h;
    }
  };

  /* ========== 2. TOC (内联式，不挤内容) ========== */
  var TOC = {
    init: function() {
      if (location.pathname.indexOf('/knowledge-hall/index.html') > -1) return;
      var main = $q('.kh-main') || $q('#main-content') || $q('main') || $q('.content-main');
      if (!main) return;
      var hs = main.querySelectorAll('h2, h3');
      if (hs.length < 2) return;

      var nav = E('nav');
      nav.className = 'auto-toc';
      nav.id = 'auto-toc';
      nav.innerHTML =
        '<div class="auto-toc-header"><span class="auto-toc-title">&#128214; \u76ee\u5f55</span><button type="button" class="auto-toc-toggle" id="toc-toggle">&#9660;</button></div>' +
        '<div class="auto-toc-list" id="toc-list"></div>';
      main.insertBefore(nav, main.firstChild);
      nav.style.display = 'none';

      var list = $('toc-list');
      for (var i = 0; i < hs.length; i++) {
        var h = hs[i];
        if (!h.id) h.id = 'toc-' + i;
        var item = E('a');
        item.className = 'auto-toc-link auto-toc-level-' + h.tagName[1];
        item.textContent = h.textContent;
        item.href = '#' + h.id;
        (function(tid) {
          item.onclick = function(ev) {
            ev.preventDefault();
            var el = document.getElementById(tid);
            if (el) {
              var off = el.getBoundingClientRect().top + window.pageYOffset - 18;
              window.scrollTo({ top: off, behavior: 'smooth' });
            }
            var act = $qa('.auto-toc-link.active');
            for (var k = 0; k < act.length; k++) act[k].classList.remove('active');
            this.classList.add('active');
          };
        })(h.id);
        list.appendChild(item);
      }

      var toggleBtn = $('toc-toggle');
      var header = nav.querySelector('.auto-toc-header');
      if (toggleBtn && header) {
        toggleBtn.onclick = function(e) { if (e) e.stopPropagation(); nav.classList.toggle('collapsed'); };
        header.onclick = function(e) {
          if (e.target === toggleBtn) return;
          nav.classList.toggle('collapsed');
        };
      }

      if (typeof IntersectionObserver !== 'undefined') {
        var obs = new IntersectionObserver(function(entries) {
          for (var k = 0; k < entries.length; k++) {
            if (entries[k].isIntersecting) {
              var act = $qa('.auto-toc-link.active');
              for (var m = 0; m < act.length; m++) act[m].classList.remove('active');
              var ai = $q('.auto-toc-link[href="#' + entries[k].target.id + '"]');
              if (ai) ai.classList.add('active');
              if (typeof TocFloat !== 'undefined' && TocFloat.visible && TocFloat.panel) {
                var cloneAi = TocFloat.panel.querySelector('.auto-toc-link[href="#' + entries[k].target.id + '"]');
                if (cloneAi) {
                  var allClone = TocFloat.panel.querySelectorAll('.auto-toc-link.active');
                  for (var p = 0; p < allClone.length; p++) allClone[p].classList.remove('active');
                  cloneAi.classList.add('active');
                }
              }
            }
          }
        }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
        for (var n = 0; n < hs.length; n++) obs.observe(hs[n]);
      }
    }
  };

  /* ========== 3. READING META ========== */
  var RMeta = {
    init: function() {
      var content = $q('.left-align') || $q('.kh-content') || $q('.content-main') || $q('main');
      if (!content) return;
      var text = content.textContent || '';
      var cn = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
      var en = (text.match(/[a-zA-Z]+/g) || []).length;
      var mins = Math.max(1, Math.ceil((cn + en * 5) / 500));
      var meta = $q('.article-meta');
      if (!meta) return;
      var item = E('div');
      item.className = 'article-meta-item';
      item.innerHTML = '<span class="article-meta-label">&#128214; \u9605\u8bfb\uff1a</span><span class="article-meta-value">' + mins + ' \u5206\u949f \u00b7 ' + (cn + en).toLocaleString() + ' \u5b57</span>';
      meta.appendChild(item);
    }
  };

  /* ========== 4. THEME ========== */
  var Theme = {
    cur: 'system',
    icons: { system: '&#127767;', light: '&#9728;&#65039;', dark: '&#127769;' },
    tips: { system: '\u8ddf\u968f\u7cfb\u7edf', light: '\u6d45\u8272\u6a21\u5f0f', dark: '\u6df1\u8272\u6a21\u5f0f' },
    init: function() {
      this.cur = storageGet('theme', 'system');
      this.apply(this.cur);
      var btn = E('button');
      btn.id = 'sl-theme-btn';
      btn.className = 'theme-toggle-btn';
      btn.setAttribute('type', 'button');
      btn.onclick = function() { Theme.cycle(); };
      document.body.appendChild(btn);
      this.updateBtn(this.cur);
    },
    apply: function(t) {
      document.documentElement.classList.add('theme-transitioning');
      document.documentElement.classList.toggle('force-dark-mode', t === 'dark');
      document.documentElement.classList.toggle('force-light-mode', t === 'light');
      this.updateBtn(t);
      setTimeout(function() { document.documentElement.classList.remove('theme-transitioning'); }, 350);
    },
    cycle: function() {
      var o = ['system','light','dark'];
      this.cur = o[(o.indexOf(this.cur)+1)%3];
      storageSet('theme', this.cur);
      this.apply(this.cur);
    },
    updateBtn: function(t) {
      var b = $('sl-theme-btn');
      if (!b) return;
      b.innerHTML = this.icons[t] || this.icons.system;
      b.title = this.tips[t] + ' (\u70b9\u51fb\u5207\u6362)';
    }
  };

  /* ========== 5. BOOKMARKS ========== */
  var BM = {
    items: [],
    init: function() {
      this.items = storageGet('bookmarks', []);
      this.addBtn();
      this.makePanel();
    },
    addBtn: function() {
      if ($('sl-bm-btn')) return;
      var url = location.pathname;
      var title = document.title;
      var saved = false;
      for (var i = 0; i < this.items.length; i++) { if (this.items[i].url === url) { saved = true; break; } }
      var btn = E('button');
      btn.className = 'bookmark-btn' + (saved ? ' bookmarked' : '');
      btn.id = 'sl-bm-btn';
      btn.setAttribute('type', 'button');
      btn.innerHTML = saved ? '&#9733; \u5df2\u6536\u85cf' : '&#9734; \u6536\u85cf';
      btn.title = saved ? '\u53d6\u6d88\u6536\u85cf' : '\u6dfb\u52a0\u5230\u6536\u85cf\u5939';
      var self = this;
      btn.onclick = function(e) { if (e) e.preventDefault(); self.toggle(title, url, this); };
      var wrap = E('div');
      wrap.className = 'bookmark-btn-wrapper';
      wrap.appendChild(btn);
      var h1 = $q('h1') || $q('.page-title-main');
      if (h1 && h1.parentNode) h1.parentNode.insertBefore(wrap, h1.nextSibling);
      else document.body.appendChild(wrap);
    },
    toggle: function(title, url, btn) {
      var idx = -1;
      for (var i = 0; i < this.items.length; i++) { if (this.items[i].url === url) { idx = i; break; } }
      if (idx > -1) {
        this.items.splice(idx, 1);
        btn.className = 'bookmark-btn'; btn.innerHTML = '&#9734; \u6536\u85cf'; btn.title = '\u6dfb\u52a0\u5230\u6536\u85cf\u5939';
        BM.showToast('\u5df2\u53d6\u6d88\u6536\u85cf');
      } else {
        this.items.push({title:title,url:url});
        btn.className = 'bookmark-btn bookmarked'; btn.innerHTML = '&#9733; \u5df2\u6536\u85cf'; btn.title = '\u53d6\u6d88\u6536\u85cf';
        BM.showToast('\u6536\u85cf\u6210\u529f');
      }
      storageSet('bookmarks', this.items);
      this.refreshPanel(); this.refreshTrigger();
    },
    showToast: function(msg) {
      var ex = $('sl-toast'); if (ex && ex.parentNode) ex.parentNode.removeChild(ex);
      var t = E('div'); t.id = 'sl-toast'; t.textContent = msg;
      t.style.cssText = 'position:fixed;top:-40px;left:50%;transform:translateX(-50%);background:rgba(44,62,80,0.92);color:#fff;padding:8px 20px;font-size:13px;z-index:10000;transition:top 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.2);letter-spacing:0.3px;';
      document.body.appendChild(t);
      setTimeout(function() { t.style.top = '20px'; }, 10);
      setTimeout(function() { t.style.top = '-40px'; setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 300); }, 1500);
    },
    makePanel: function() {
      var panel = E('div'); panel.className = 'bookmarks-panel'; panel.id = 'bookmarks-panel';
      panel.innerHTML = '<div class="bookmarks-panel-header"><span class="bookmarks-panel-title">&#128278; \u6211\u7684\u6536\u85cf\u5939</span><button type="button" class="bookmarks-panel-close" onclick="document.getElementById(\'bookmarks-panel\').classList.remove(\'active\')">&times;</button></div><div class="bookmarks-panel-list" id="bm-list"></div>';
      document.body.appendChild(panel);
      var trig = E('button'); trig.className = 'bookmarks-trigger-btn'; trig.id = 'bm-trigger'; trig.setAttribute('type', 'button');
      trig.innerHTML = '&#128278; \u6536\u85cf (' + this.items.length + ')';
      trig.title = '\u6253\u5f00\u6536\u85cf\u5939\u9762\u677f';
      var self = this; trig.onclick = function() { panel.classList.add('active'); self.refreshPanel(); };
      document.body.appendChild(trig); this.refreshPanel();
    },
    refreshPanel: function() {
      var list = $('bm-list'), trig = $('bm-trigger');
      if (trig) trig.innerHTML = '&#128278; \u6536\u85cf (' + this.items.length + ')';
      if (!list) return;
      if (!this.items.length) { list.innerHTML = '<div class="bookmarks-empty">\u6682\u65e0\u6536\u85cf<br>&#9734; \u6309\u94ae\u6dfb\u52a0\u6587\u7ae0</div>'; return; }
      var h = '';
      for (var i = 0; i < this.items.length; i++) h += '<div class="bookmark-item"><a href="' + this.items[i].url + '" class="bookmark-item-link">' + this.items[i].title + '</a><button type="button" class="bookmark-remove-btn" data-idx="' + i + '">&times;</button></div>';
      list.innerHTML = h;
      var btns = list.querySelectorAll('.bookmark-remove-btn');
      var self = this;
      for (var j = 0; j < btns.length; j++) (function(idx) {
        btns[idx].onclick = function(e) {
          if (e) { e.stopPropagation(); e.preventDefault(); }
          self.items.splice(idx, 1);
          storageSet('bookmarks', self.items);
          self.refreshPanel();
          BM.showToast('\u5df2\u79fb\u9664\u6536\u85cf');
          var cu = location.pathname;
          var b = $('sl-bm-btn');
          if (b) {
            var s = false;
            for (var k = 0; k < self.items.length; k++) {
              if (self.items[k].url === cu) s = true;
            }
            if (!s) {
              b.className = 'bookmark-btn';
              b.innerHTML = '&#9734; \u6536\u85cf';
              b.title = '\u6dfb\u52a0\u5230\u6536\u85cf\u5939';
            }
          }
        };
      })(parseInt(btns[j].dataset.idx));
    },
    refreshTrigger: function() { var t=$('bm-trigger'); if(t) t.innerHTML='&#128278; \u6536\u85cf ('+this.items.length+')'; }
  };

  /* ========== 6. READING TOOLS ========== */
  var RTools = {
    s: null,
    init: function() {
      this.s = storageGet('readingTools') || {fontSize:100,maxWidth:'standard',focusMode:false};
      this.apply(); this.mkBar();
    },
    apply: function() {
      var el = $q('.kh-main') || $q('#main-content') || $q('.content-width-limiter') || $q('main');
      if (!el) return;
      el.style.setProperty('font-size', this.s.fontSize + '%', 'important');
      if (this.s.maxWidth === 'narrow') { el.style.maxWidth = '700px'; el.style.marginLeft = 'auto'; el.style.marginRight = 'auto'; }
      else if (this.s.maxWidth === 'wide') { el.style.maxWidth = '1200px'; el.style.marginLeft = 'auto'; el.style.marginRight = 'auto'; }
      else { el.style.maxWidth = ''; el.style.marginLeft = ''; el.style.marginRight = ''; }
      document.body.classList.toggle('focus-mode', this.s.focusMode);
    },
    mkBar: function() {
      var bar=E('div');bar.className='reading-tools-toolbar';bar.id='reading-tools';
      bar.classList.add('collapsed');
      bar.innerHTML='<div class="tools-header" id="tools-hdr"><span class="tools-title">&#128214; \u9605\u8bfb\u5de5\u5177</span><button type="button" class="tools-collapse-btn" id="tools-clp">&#9660;</button></div><div class="tools-body" id="rt-body"></div>';
      document.body.appendChild(bar);
      var clp = $('tools-clp'), hdr = $('tools-hdr');
      if (clp && hdr) {
        clp.onclick = function(e) {
          if (e) e.stopPropagation();
          bar.classList.toggle('collapsed');
        };
        hdr.onclick = function(e) {
          if (e.target === clp) return;
          bar.classList.toggle('collapsed');
        };
      }
      this.renderBody();
    },
    renderBody: function() {
      var body = $('rt-body');
      if (!body) return;
      body.innerHTML =
        this.gRow('\u5b57\u53f7', [
          {t:'A&#8722;', f:'RTools.fnt(-5)'},
          {t:this.s.fontSize+'%', id:'fsd'},
          {t:'A+', f:'RTools.fnt(5)'}
        ]) +
        this.gRow('\u884c\u5bbd', [
          {t:'\u7a84', c:this.s.maxWidth==='narrow', f:"RTools.setW('narrow')"},
          {t:'\u6807\u51c6', c:this.s.maxWidth==='standard', f:"RTools.setW('standard')"},
          {t:'\u5bbd', c:this.s.maxWidth==='wide', f:"RTools.setW('wide')"}
        ]) +
        this.gRow('', [
          {t:this.s.focusMode?'\u9000\u51fa\u4e13\u6ce8':'\u4e13\u6ce8\u6a21\u5f0f', hl:true, f:'RTools.tgFoc()'}
        ]) +
        this.gRow('', [
          {t:'\u6253\u5370', f:'window.print()'}
        ]);
      var btns = body.querySelectorAll('.tool-btn');
      for (var i = 0; i < btns.length; i++) (function(b) {
        var fn = b.getAttribute('data-fn');
        if (fn) b.onclick = function() { eval(fn); RTools.renderBody(); };
      })(btns[i]);
    },
    gRow: function(label, items) {
      var g = '<div class="tool-group">';
      if (label) g += '<span class="tool-group-label">' + label + '</span>';
      g += '<div class="tool-buttons">';
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var cls = 'tool-btn';
        if (it.c) cls += ' active';
        if (it.hl) cls += ' tool-btn-highlight';
        g += '<button type="button" class="' + cls + '"';
        if (it.id) g += ' id="' + it.id + '"';
        g += ' data-fn="' + (it.f || '') + '">' + it.t + '</button>';
      }
      g += '</div></div>';
      return g;
    },
    fnt:function(d){this.s.fontSize=Math.max(80,Math.min(150,this.s.fontSize+d));storageSet('readingTools',this.s);this.apply();},
    setW:function(w){this.s.maxWidth=w;storageSet('readingTools',this.s);this.apply();},
    tgFoc:function(){this.s.focusMode=!this.s.focusMode;storageSet('readingTools',this.s);this.apply();}
  };

  /* ========== 7. I18N ========== */
  var I18N = {
    init: function() {
      var isEn = location.pathname.indexOf('/en/') > -1;
      var sw = E('div'); sw.className = 'i18n-switcher';
      var targetUrl = isEn ? (ROOT + 'index.html') : (ROOT + 'en/index.html');
      var targetLabel = isEn ? '\u4e2d\u6587\u7248' : 'English';
      sw.innerHTML = '<span class="i18n-current-lang">'+(isEn?'EN':'\u4e2d\u6587')+'</span><a class="i18n-switch-link" href="'+targetUrl+'">'+targetLabel+'</a>';
      if (!$q('.lang-switch-float')) { var t=$q('.kh-sidebar')||$q('header'); if(t&&t.parentNode)t.parentNode.insertBefore(sw,t.nextSibling); else document.body.appendChild(sw); }
    }
  };

  /* ========== 8. VERSION ========== */
  var Ver = { v: 'alpha-020',
    init: function() {
      var footer = $q('.copyright-color') || $q('footer .copyright-text') || $q('.copyright-text');
      if (!footer || $q('.sl-version')) return;
      var s = E('span'); s.className = 'sl-version'; s.innerHTML = ' · '+this.v; footer.appendChild(s);
    }
  };

  /* ========== 9. QUICK NAV DRAG ========== */
  var QNDrag = {
    init: function() {
      var qn = $q('.quick-nav');
      if (!qn) return;
      var startY, startTop, dragging = false;
      qn.style.cursor = 'grab';
      qn.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.tagName === 'DIV' && e.target.classList.contains('quick-nav-content')) return;
        dragging = true;
        startY = e.clientY;
        startTop = qn.offsetTop;
        qn.style.cursor = 'grabbing';
        qn.style.transition = 'none';
        e.preventDefault();
      });
      document.addEventListener('mousemove', function(e) {
        if (!dragging) return;
        var dy = e.clientY - startY;
        var newTop = startTop + dy;
        var maxTop = window.innerHeight - qn.offsetHeight - 40;
        newTop = Math.max(40, Math.min(maxTop, newTop));
        qn.style.top = newTop + 'px';
      });
      document.addEventListener('mouseup', function() {
        if (!dragging) return;
        dragging = false;
        qn.style.cursor = 'grab';
        qn.style.transition = '';
        try { localStorage.setItem('sl_qn_top', qn.style.top); } catch(e) {}
      });
      // restore position
      try { var saved = localStorage.getItem('sl_qn_top'); if (saved) qn.style.top = saved; } catch(e) {}
    }
  };

  /* ========== STYLE ENFORCER (标准样式安全网) ========== */
  var StyleEnforcer = {
    init: function() {
      var style = E('style');
      style.id = 'sl-style-enforcer';
      style.textContent =
        /* 亮色模式（默认） */
        '.function-box-blue{background-color:rgba(248,250,255,0.85)!important;border:1px solid rgba(208,220,232,0.8)!important;border-left:4px solid #2c3e50!important;color:#1a3a5c!important;font-size:15px!important;line-height:1.7!important;padding:16px!important;margin:8px 0!important;}' +
        '.notice-box-red{background-color:rgba(254,249,249,0.85)!important;border:1px solid rgba(245,198,198,0.8)!important;border-left:4px solid #e74c3c!important;color:#a04030!important;font-size:15px!important;line-height:1.8!important;padding:16px!important;margin:16px 0!important;}' +
        '.quote-box-grey{background-color:var(--color-bg-subtle)!important;border:1px solid var(--color-border)!important;border-left:3px solid var(--color-text-light)!important;font-style:italic!important;color:var(--color-text-secondary)!important;padding:16px!important;margin:8px 0!important;}' +
        /* force-dark-mode 手动切换暗色 */
        '.force-dark-mode .function-box-blue{background-color:rgba(44,62,80,0.15)!important;border-color:rgba(93,156,204,0.3)!important;border-left-color:#5d9ccc!important;color:#c8d6e5!important;}' +
        '.force-dark-mode .notice-box-red{background-color:rgba(80,30,30,0.15)!important;border-color:rgba(200,100,100,0.2)!important;border-left-color:#c0392b!important;color:#e0a0a0!important;}' +
        '.force-dark-mode .quote-box-grey{background-color:rgba(255,255,255,0.04)!important;border-color:rgba(255,255,255,0.1)!important;border-left-color:rgba(255,255,255,0.25)!important;color:#a0a0a0!important;}' +
        /* 系统偏好暗色模式 (@media prefers-color-scheme: dark) */
        '@media (prefers-color-scheme: dark){' +
          '.function-box-blue{background-color:rgba(44,62,80,0.15)!important;border-color:rgba(93,156,204,0.3)!important;border-left-color:#5d9ccc!important;color:#c8d6e5!important;}' +
          '.notice-box-red{background-color:rgba(80,30,30,0.15)!important;border-color:rgba(200,100,100,0.2)!important;border-left-color:#c0392b!important;color:#e0a0a0!important;}' +
          '.quote-box-grey{background-color:rgba(255,255,255,0.04)!important;border-color:rgba(255,255,255,0.1)!important;border-left-color:rgba(255,255,255,0.25)!important;color:#a0a0a0!important;}' +
        '}' +
        /* force-light-mode 手动切换亮色（覆盖系统暗色偏好） */
        '.force-light-mode .function-box-blue{background-color:rgba(248,250,255,0.85)!important;border:1px solid rgba(208,220,232,0.8)!important;border-left:4px solid #2c3e50!important;color:#1a3a5c!important;}' +
        '.force-light-mode .notice-box-red{background-color:rgba(254,249,249,0.85)!important;border:1px solid rgba(245,198,198,0.8)!important;border-left:4px solid #e74c3c!important;color:#a04030!important;}' +
        '.force-light-mode .quote-box-grey{background-color:#f5f5f5!important;border:1px solid #e0e0e0!important;border-left:3px solid #888!important;font-style:italic!important;color:#555!important;}' +
        /* 阅读进度条 */
        '#sl-reading-progress{position:fixed;top:0;left:0;height:6px;background:#7fb3d5;z-index:9999;transition:width 0.1s ease-out;width:0;pointer-events:none;}' +
        /* 隐藏内联目录 */
        '.auto-toc{display:none!important;}' +
        /* 搜索高亮 */
        '.sl-highlight{background:#fff3a6;padding:1px 3px;border-radius:0;font-weight:600;box-shadow:0 1px 3px rgba(255,200,0,0.25);color:#1a1a1a;}' +
        '@media (prefers-color-scheme: dark){.sl-highlight{background:#5c4d00;color:#fff8dc;}}' +
        '.force-dark-mode .sl-highlight{background:#5c4d00;color:#fff8dc;}' +
        /* 悬浮目录按钮 */
        '#sl-toc-float-btn{position:fixed;left:44px;top:50%;transform:translateY(-50%) scale(0);width:36px;height:36px;background:#fff;border:1px solid var(--color-border,#e0e0e0);cursor:pointer;font-size:16px;z-index:998;display:flex;align-items:center;justify-content:center;transition:all 0.25s cubic-bezier(0.4,0,0.2,1);opacity:0;box-shadow:2px 0 8px rgba(0,0,0,0.06);}' +
        '#sl-toc-float-btn.visible{transform:translateY(-50%) scale(1);opacity:1;}' +
        '#sl-toc-float-btn:hover{background:#2c3e50;color:#fff;border-color:#2c3e50;}' +
        '#sl-toc-float-btn.active{background:#2c3e50;color:#fff;border-color:#2c3e50;}' +
        '@media (prefers-color-scheme: dark){#sl-toc-float-btn{background:#1a1a1a;border-color:#333;color:#ccc;}#sl-toc-float-btn:hover,#sl-toc-float-btn.active{background:#5d9ccc;color:#fff;border-color:#5d9ccc;}}' +
        '.force-dark-mode #sl-toc-float-btn{background:#1a1a1a;border-color:#333;color:#ccc;}.force-dark-mode #sl-toc-float-btn:hover,.force-dark-mode #sl-toc-float-btn.active{background:#5d9ccc;color:#fff;border-color:#5d9ccc;}' +
        /* 悬浮目录面板 */
        '#sl-toc-float-panel{position:fixed;left:88px;top:50%;transform:translateY(-50%) translateX(-10px);max-height:60vh;width:220px;background:#fff;border:1px solid var(--color-border,#e0e0e0);z-index:997;opacity:0;pointer-events:none;transition:all 0.22s cubic-bezier(0.4,0,0.2,1);overflow-y:auto;box-shadow:4px 8px 24px rgba(0,0,0,0.12);}' +
        '#sl-toc-float-panel.visible{transform:translateY(-50%) translateX(0);opacity:1;pointer-events:auto;}' +
        '.sl-toc-panel-header{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #e0e0e0;font-size:13px;font-weight:700;color:#2c3e50;letter-spacing:0.5px;position:sticky;top:0;background:#fff;}' +
        '.sl-toc-panel-close{background:none;border:none;font-size:18px;color:#888;cursor:pointer;line-height:1;}' +
        '.sl-toc-panel-close:hover{color:#e74c3c;}' +
        '#toc-clone-list{padding:8px 0;}' +
        '@media (prefers-color-scheme: dark){#sl-toc-float-panel{background:#1a1a1a;border-color:#333;}.sl-toc-panel-header{background:#1a1a1a;color:#c8d6e5;border-color:#333;}}' +
        '.force-dark-mode #sl-toc-float-panel{background:#1a1a1a;border-color:#333;}.force-dark-mode .sl-toc-panel-header{background:#1a1a1a;color:#c8d6e5;border-color:#333;}';
      document.head.appendChild(style);
    }
  };

  /* ========== FLOAT BUTTON FIX ========== */
  var FloatFix = {
    init: function() {
      var btt = $q('.float-button.back-to-top:not([style*="relative"])');
      var nh = $q('.float-button.nav-hub:not([style*="relative"])');
      if (btt && !btt.onclick) btt.onclick = function() { window.scrollTo({top:0,behavior:'smooth'}); };
      if (nh && !nh.onclick) nh.onclick = function() { window.open(ROOT + 'navigator.html','_blank'); };
    }
  };

  /* ========== MOBILE NAV TOGGLE ========== */
  var MobileNavToggle = {
    init: function() {
      var qn = $q('.quick-nav');
      if (!qn) return;
      var isMobile = window.innerWidth <= 768;
      if (!isMobile) return;
      var toggle = function(expand) {
        if (expand) {
          qn.classList.add('expanded');
          qn.style.width = '180px';
          qn.style.padding = '16px';
          var c = $q('.quick-nav-content', qn); if (c) c.style.display = 'block';
          var t = $q('.quick-nav-title', qn);
          if (t) { t.style.writingMode = 'horizontal-tb'; t.style.marginBottom = '16px'; t.style.paddingBottom = '8px'; t.style.borderBottom = '1px solid #e0e0e0'; }
          var h = $q('.quick-nav-hint', qn); if (h) h.style.display = 'none';
        } else {
          qn.classList.remove('expanded');
          qn.style.width = '32px';
          qn.style.padding = '8px 4px';
          var c = $q('.quick-nav-content', qn); if (c) c.style.display = 'none';
          var t = $q('.quick-nav-title', qn);
          if (t) { t.style.writingMode = 'vertical-rl'; t.style.marginBottom = '4px'; t.style.paddingBottom = '0'; t.style.borderBottom = 'none'; }
          var h = $q('.quick-nav-hint', qn); if (h) h.style.display = 'block';
        }
      };
      qn.addEventListener('click', function(ev) {
        if (qn.classList.contains('expanded')) toggle(false);
        else toggle(true);
      });
      document.addEventListener('click', function(ev) {
        if (qn.classList.contains('expanded') && !qn.contains(ev.target)) toggle(false);
      });
    }
  };

  /* ========== FLOAT CLOSE BUTTONS ========== */
  var FloatClose = {
    init: function() {
      var khClose = $q('.kh-float-close');
      if (khClose) khClose.addEventListener('click', function() {
        var f = $('knowledge-hall-float'); if (f) f.classList.add('hidden');
      });
      var langClose = $q('.lang-float-close');
      if (langClose) langClose.addEventListener('click', function() {
        var f = $('lang-switch-float'); if (f) f.classList.add('hidden');
      });
    }
  };

  /* ========== FLOAT DRAG (kh-float / lang-switch-float) ========== */
  var FloatDrag = {
    init: function() {
      this.makeDraggable($('knowledge-hall-float'), '.kh-float-header');
      this.makeDraggable($('lang-switch-float'), '.lang-float-header');
    },
    makeDraggable: function(el, headerSel) {
      if (!el) return;
      var hdr = $q(headerSel, el);
      if (!hdr) return;
      var dragging = false, sx, sy, ix, iy;
      hdr.addEventListener('mousedown', function(e) {
        dragging = true; sx = e.clientX; sy = e.clientY;
        var r = el.getBoundingClientRect(); ix = r.left; iy = r.top;
        el.style.transition = 'none';
        el.style.right = 'auto'; el.style.bottom = 'auto';
        el.style.left = ix + 'px'; el.style.top = iy + 'px';
        e.preventDefault();
      });
      document.addEventListener('mousemove', function(e) {
        if (!dragging) return;
        el.style.left = (ix + e.clientX - sx) + 'px';
        el.style.top = (iy + e.clientY - sy) + 'px';
      });
      document.addEventListener('mouseup', function() {
        if (!dragging) return;
        dragging = false; el.style.transition = '';
      });
    }
  };

  /* ========== NEWS SORTER ========== */
  var NewsSorter = {
    init: function() {
      var list = $('news-text-list');
      if (!list) return;
      var cards = Array.from(list.querySelectorAll('.news-featured-text-card[data-date]'));
      cards.sort(function(a, b) {
        return new Date(b.getAttribute('data-date')).getTime() - new Date(a.getAttribute('data-date')).getTime();
      });
      cards.forEach(function(c) { list.appendChild(c); });
    }
  };

  /* ========== READING PROGRESS BAR ========== */
  var ReadingProgress = {
    bar: null,
    init: function() {
      var main = $q('.kh-main') || $q('#main-content') || $q('main');
      if (!main) return;
      this.bar = E('div');
      this.bar.id = 'sl-reading-progress';
      document.body.appendChild(this.bar);
      window.addEventListener('scroll', this.update.bind(this), { passive: true });
      this.update();
    },
    update: function() {
      if (!this.bar) return;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      this.bar.style.width = pct + '%';
    }
  };

  /* ========== SEARCH HIGHLIGHT ========== */
  var SearchHighlight = {
    init: function() {
      var params = new URLSearchParams(location.search);
      var q = params.get('q');
      if (!q || !q.trim()) return;
      q = decodeURIComponent(q).trim();
      this.highlight(q);
      if (history.replaceState) {
        history.replaceState(null, '', location.pathname);
      }
    },
    highlight: function(q) {
      var main = $q('.kh-main') || $q('#main-content') || $q('main') || $q('.content-main') || document.body;
      if (!main) return;
      var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null, false);
      var nodes = [];
      while (walker.nextNode()) {
        if (walker.currentNode.parentNode &&
            !['SCRIPT','STYLE','TEXTAREA','INPUT','SELECT','MARK','CODE','PRE'].includes(walker.currentNode.parentNode.tagName)) {
          nodes.push(walker.currentNode);
        }
      }
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var text = node.textContent;
        if (text.toLowerCase().indexOf(q.toLowerCase()) === -1) continue;
        var idx = text.toLowerCase().indexOf(q.toLowerCase());
        var before = document.createTextNode(text.substring(0, idx));
        var mark = E('mark');
        mark.className = 'sl-highlight';
        mark.textContent = text.substring(idx, idx + q.length);
        var after = document.createTextNode(text.substring(idx + q.length));
        var parent = node.parentNode;
        parent.insertBefore(before, node);
        parent.insertBefore(mark, node);
        parent.insertBefore(after, node);
        parent.removeChild(node);
        if (i === 0 && mark.scrollIntoView) {
          setTimeout(function() { mark.scrollIntoView({block:'center'}); }, 300);
        }
      }
    }
  };

  /* ========== TOC FLOAT (悬浮目录按钮) ========== */
  var TocFloat = {
    btn: null,
    panel: null,
    tocEl: null,
    visible: false,
    init: function() {
      this.tocEl = $('auto-toc');
      if (!this.tocEl) return;
      this.btn = E('button');
      this.btn.id = 'sl-toc-float-btn';
      this.btn.className = 'sl-toc-float-btn';
      this.btn.innerHTML = '&#128214;';
      this.btn.title = '\u76ee\u5f55';
      this.btn.setAttribute('type', 'button');
      document.body.appendChild(this.btn);

      this.panel = E('div');
      this.panel.id = 'sl-toc-float-panel';
      this.panel.className = 'sl-toc-float-panel';

      var tocList = $('toc-list');
      if (tocList) {
        this.panel.innerHTML = '<div class="sl-toc-panel-header"><span>\u76ee\u5f55</span><button type="button" class="sl-toc-panel-close">&times;</button></div>';
        var clone = tocList.cloneNode(true);
        clone.id = 'toc-clone-list';
        this.panel.appendChild(clone);
      }

      document.body.appendChild(this.panel);

      var self = this;
      this.btn.addEventListener('click', function() { self.toggle(); });
      var closeBtn = this.panel.querySelector('.sl-toc-panel-close');
      if (closeBtn) closeBtn.addEventListener('click', function() { self.hide(); });

      document.addEventListener('click', function(e) {
        if (self.visible && !self.panel.contains(e.target) && e.target !== self.btn) {
          self.hide();
        }
      });

      var tocLinks = this.panel.querySelectorAll('.auto-toc-link');
      for (var k = 0; k < tocLinks.length; k++) {
        (function(link) {
          link.addEventListener('click', function(ev) {
            ev.preventDefault();
            var tid = link.getAttribute('href').substring(1);
            var el = document.getElementById(tid);
            if (el) {
              var off = el.getBoundingClientRect().top + window.pageYOffset - 18;
              window.scrollTo({ top: off, behavior: 'smooth' });
            }
            var act = $qa('.auto-toc-link.active');
            for (var m = 0; m < act.length; m++) act[m].classList.remove('active');
            link.classList.add('active');
            var origLink = $q('.auto-toc-list .auto-toc-link[href="#' + tid + '"]');
            if (origLink) origLink.classList.add('active');
            self.hide();
          });
        })(tocLinks[k]);
      }

      window.addEventListener('scroll', function() {
        if (!self.tocEl) return;
        var rect = self.tocEl.getBoundingClientRect();
        if (rect.top < 60) {
          self.btn.classList.add('visible');
        } else {
          self.btn.classList.remove('visible');
          if (self.visible) self.hide();
        }
      }, { passive: true });
      self.btn.classList.add('visible');
    },
    toggle: function() {
      this.visible ? this.hide() : this.show();
    },
    show: function() {
      this.visible = true;
      this.panel.classList.add('visible');
      this.btn.classList.add('active');
      this.syncActive();
    },
    hide: function() {
      this.visible = false;
      this.panel.classList.remove('visible');
      this.btn.classList.remove('active');
    },
    syncActive: function() {
      var curActive = $q('.auto-toc-list .auto-toc-link.active');
      if (!curActive) return;
      var href = curActive.getAttribute('href');
      var cloneActive = this.panel.querySelector('.auto-toc-link[href="' + href + '"]');
      if (cloneActive) {
        var allClone = this.panel.querySelectorAll('.auto-toc-link.active');
        for (var i = 0; i < allClone.length; i++) allClone[i].classList.remove('active');
        cloneActive.classList.add('active');
        cloneActive.scrollIntoView({ block: 'nearest' });
      }
    }
  };

  /* ========== START ========== */
  var _started = false;
  function start() {
    if (_started) return;
    _started = true;
    try { Search.init(); } catch(e) { console.warn('[SL] Search error:', e.message); }
    try { TOC.init(); } catch(e) { console.warn('[SL] TOC error:', e.message); }
    try { RMeta.init(); } catch(e) { console.warn('[SL] Meta error:', e.message); }
    try { Theme.init(); } catch(e) { console.warn('[SL] Theme error:', e.message); }
    try { BM.init(); } catch(e) { console.warn('[SL] Bookmark error:', e.message); }
    try { RTools.init(); } catch(e) { console.warn('[SL] Tools error:', e.message); }
    try { I18N.init(); } catch(e) { console.warn('[SL] I18N error:', e.message); }
    try { Ver.init(); } catch(e) { console.warn('[SL] Version error:', e.message); }
    try { QNDrag.init(); } catch(e) { console.warn('[SL] QNDrag error:', e.message); }
    try { StyleEnforcer.init(); } catch(e) { console.warn('[SL] StyleEnforcer error:', e.message); }
    try { FloatFix.init(); } catch(e) { console.warn('[SL] FloatFix error:', e.message); }
    try { MobileNavToggle.init(); } catch(e) { console.warn('[SL] MobileNavToggle error:', e.message); }
    try { FloatClose.init(); } catch(e) { console.warn('[SL] FloatClose error:', e.message); }
    try { FloatDrag.init(); } catch(e) { console.warn('[SL] FloatDrag error:', e.message); }
    try { NewsSorter.init(); } catch(e) { console.warn('[SL] NewsSorter error:', e.message); }
    try { ReadingProgress.init(); } catch(e) { console.warn('[SL] ReadingProgress error:', e.message); }
    try { SearchHighlight.init(); } catch(e) { console.warn('[SL] SearchHighlight error:', e.message); }
    try { TocFloat.init(); } catch(e) { console.warn('[SL] TocFloat error:', e.message); }
    console.log('%c✨ \u7267\u7f8a\u4eba\u56fe\u4e66\u9986\u52a8\u6001\u529f\u80fd v1.2 \u5df2\u52a0\u8f7d', 'color:#27ae60;font-weight:bold;font-size:14px');
  }

  function deferredStart() {
    if (_started) return;
    requestAnimationFrame(function() {
      if (_started) return;
      _started = false;
      start();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else if (document.readyState === 'interactive') deferredStart();
  else start();

})();
