// 跟随鼠标的水印。外观交给 CSS class（.watermark-follow），
// 页面可以自己写一条规则覆盖；JS 只负责定位和防删。
const src = `(function(){
  if (window.__wmInstalled) return;
  window.__wmInstalled = true;

  const DEFAULT_CLASS = 'watermark-follow';
  const DEFAULT_TEXT = 'Made by luyanci(GitHub: luyanci)';

  // <script src="loader.js" data-class="my-wm" data-text="xxx"></script>
  const self = document.currentScript;
  const opts = (self && self.dataset) || {};
  const cls = opts.wmClass || DEFAULT_CLASS;
  const text = opts.wmText || DEFAULT_TEXT;

  // 默认样式全部落在 class 上，页面用同名 class 或更高优先级选择器即可覆盖。
  const style = document.createElement('style');
  style.id = 'wm-default-style';
  style.textContent = '.' + cls + '{'
    + 'position:fixed;left:0;top:0;'
    + 'pointer-events:none;user-select:none;white-space:nowrap;'
    + 'font-size:16px;color:rgba(0,0,0,.25);'
    + 'z-index:2147483647;will-change:transform;'
    + '}';
  (document.head || document.documentElement).appendChild(style);

  const wm = document.createElement('div');
  wm.className = cls;
  wm.textContent = text;

  function mount() {
    if (!document.body.contains(wm)) document.body.appendChild(wm);
  }

  // rAF 节流：鼠标再快也只在一帧里写一次样式。
  let fx = 0, fy = 0, queued = false;
  function flush() {
    queued = false;
    wm.style.transform = 'translate(' + (fx + 12) + 'px,' + (fy + 12) + 'px)';
  }
  document.addEventListener('mousemove', (e) => {
    fx = e.clientX;
    fy = e.clientY;
    if (!queued) {
      queued = true;
      requestAnimationFrame(flush);
    }
  }, { passive: true });

  // 守护：被删掉、被隐藏、被改样式就补回来。
  const guard = () => {
    mount();
    if (wm.style.display === 'none') wm.style.display = '';
    if (wm.style.visibility === 'hidden') wm.style.visibility = '';
    if (wm.className !== cls) wm.className = cls;
  };
  new MutationObserver(guard).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });

  mount();
  document.addEventListener('DOMContentLoaded', mount);
})();`;

// 编码（中文安全版）
const b64 = btoa(encodeURIComponent(src).replace(/%([0-9A-F]{2})/g, (m, p1) => String.fromCharCode('0x' + p1)));
console.log(b64);
