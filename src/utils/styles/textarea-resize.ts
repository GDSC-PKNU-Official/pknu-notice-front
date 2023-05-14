export function areaResize(area: HTMLTextAreaElement) {
  area.style.height = 'auto';
  area.style.height = `${area.scrollHeight - 20}px`;
  area.style.lineHeight = '1.5';
}
