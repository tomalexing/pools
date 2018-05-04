/**
 * Disable pull-to-refresh while keeping body as the scrolling element.
 */
export default function noPullToRefresh() {
  const permittedAtTop = 'pan-x pan-down pinch-zoom';

  window.addEventListener('scroll', () => {
    if (document.body.scrollTop >= 1) {
      document.body.style.setProperty('touch-action', 'auto');
    } else {
      document.body.style.setProperty('touch-action', permittedAtTop);
    }
  });
  document.body.style.touchAction = permittedAtTop;
}