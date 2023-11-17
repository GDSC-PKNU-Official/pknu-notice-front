export default function openLink(link: string | null) {
  if (!link) return;

  window.open(link, '_blank');
}
