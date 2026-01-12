// 元件說明:錨點滑動事件 (參數1:domId, 參數2: 'smooth' or 'instant')
const scrollToElement = (domId, style = 'smooth') => {
  const ww = window.innerWidth;
  const scroll = window.scrollY;

  const target = document.querySelector(`#${domId}`);
  if (target) {
    const padding = ww > 766 ? 0 : 40;
    const h = target.getBoundingClientRect().top + scroll - padding;
    window.scrollTo({ top: h, behavior: style });
  }
};

export default scrollToElement;
