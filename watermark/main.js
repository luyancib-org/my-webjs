const src = `(function(){
const wm = document.createElement('div');
wm.className = 'watermark-follow';
wm.innerText = 'Made by luyanxi(GitHub: luyanci)';
Object.assign(wm.style, {
  position: 'fixed',
  pointerEvents: 'none',
  fontSize: '16px',
  color: 'rgba(0,0,0,0.25)',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  transform: 'translate(12px, 12px)',
  left: '0px',
  top: '0px',
  zIndex: '9999'
});
document.body.appendChild(wm);
document.addEventListener('mousemove', (e) => {
  wm.style.left = e.clientX + 'px';
  wm.style.top = e.clientY + 'px';
});
})();`;

// 编码（中文安全版）
const b64 = btoa(encodeURIComponent(src).replace(/%([0-9A-F]{2})/g, (m, p1) => String.fromCharCode('0x' + p1)));
console.log(b64);
