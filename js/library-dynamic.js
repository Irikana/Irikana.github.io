/**
 * 牧羊人图书馆 动态功能 v1.7
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
      {t:'Minesia测试',u:toAbs(ROOT+'library/paper/minesia-first-public-test.html'),k:'Minesia 测试 公开 第一个'},
      {t:'周三狂热',u:toAbs(ROOT+'library/paper/wednesday-frenzy-and-difficult-review.html'),k:'周三 狂热 复习 困难 新闻'},
      {t:'语义化更新',u:toAbs(ROOT+'library/paper/semantic-visual-component-update.html'),k:'语义化 视觉组件 更新 标准'}
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
        h += '<a href="' + results[j].u + '" class="search-result-item">';
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
      var main = $q('.kh-main') || $q('#main-content') || $q('main');
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
            }
          }
        }, { rootMargin: '-15% 0px -70% 0px' });
        for (var n = 0; n < hs.length; n++) obs.observe(hs[n]);
      }
    }
  };

  /* ========== 3. READING META ========== */
  var RMeta = {
    init: function() {
      var content = $q('.left-align') || $q('.kh-content') || $q('.content-bg-yellow') || $q('main');
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
  var Ver = { v: 'alpha-015',
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
        '.quote-box-grey{background-color:var(--color-bg-subtle,!important);border:1px solid var(--color-border,!important);border-left:3px solid var(--color-text-light,!important);font-style:italic!important;color:var(--color-text-secondary)!important;padding:16px!important;margin:8px 0!important;}' +
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
        '.force-light-mode .quote-box-grey{background-color:#f5f5f5!important;border:1px solid #e0e0e0!important;border-left:3px solid #888!important;font-style:italic!important;color:#555!important;}';
      document.head.appendChild(style);
    }
  };

  /* ========== FLOAT BUTTON FIX ========== */
  var FloatFix = {
    init: function() {
      var btt = $q('.float-button.back-to-top:not([style*="relative"])');
      var nh = $q('.float-button.nav-hub:not([style*="relative"])');
      if (btt && !btt.onclick) btt.onclick = function() { window.scrollTo({top:0,behavior:'smooth'}); };
      if (nh && !nh.onclick) nh.onclick = function() { window.open('./navigator.html','_blank'); };
    }
  };

  /* ========== START ========== */
  function start() {
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
    console.log('%c✨ \u7267\u7f8a\u4eba\u56fe\u4e66\u9986\u52a8\u6001\u529f\u80fd v1.0 \u5df2\u52a0\u8f7d', 'color:#27ae60;font-weight:bold;font-size:14px');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

})();
