// 跟随鼠标的水印，可放在 <head> 里（此时 body 还不存在）。
// 外观交给 CSS class（.watermark-follow），页面可以自己写规则覆盖；
// JS 只负责定位、等 body 出现和防删。
const src = `(function(){
  if (window.__wmInstalled) return;
  window.__wmInstalled = true;

  const DEFAULT_CLASS = 'watermark-follow';
  const DEFAULT_TEXT = 'Made by luyanci(GitHub: luyanci)';

  // 支持 <script src="loader.js" data-wm-class="my-wm" data-wm-text="xxx">
  // 也支持内联在 head 里的写法。
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

  // body 可能还没解析出来，所以这里只是「试着挂一下」。
  function mount() {
    const body = document.body;
    if (!body) return false;
    if (!body.contains(wm)) body.appendChild(wm);
    return true;
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

  // 守护：被删掉、被隐藏、被改 class 就补回来。
  const guard = () => {
    mount();
    if (wm.style.display === 'none') wm.style.display = '';
    if (wm.style.visibility === 'hidden') wm.style.visibility = '';
    if (wm.className !== cls) wm.className = cls;
  };
  // 只盯「被删掉 / 被改 class」；样式上的隐藏用低频巡检兜住，
  // 免得 mousemove 写 transform 时自己触发自己。
  new MutationObserver(guard).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
  setInterval(guard, 1000);

  mount();
  if (!mount()) {
    document.addEventListener('DOMContentLoaded', mount);
    window.addEventListener('load', mount);
  }
})();`;

// 编码（中文安全版）
const b64 = btoa(encodeURIComponent(src).replace(/%([0-9A-F]{2})/g, (m, p1) => String.fromCharCode('0x' + p1)));
console.log(b64);
