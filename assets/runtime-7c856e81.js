const o=window._SVG_SPRITE_IDS_=window._SVG_SPRITE_IDS_||[],e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.style.position="absolute";e.style.width="0";e.style.height="0";function n(){document.body.insertBefore(e,document.body.firstChild)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n();function s(d,t){(o.indexOf(t)>-1||document.getElementById(t))&&console.warn(`Icon #${t} was duplicately registered. It must be globally unique.`),o.push(t),e.insertAdjacentHTML("beforeend",d)}export{s as a};