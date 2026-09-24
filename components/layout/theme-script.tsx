const themeScript = `(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    let preference = 'system';
    try { preference = localStorage.getItem('homedash-theme') || 'system'; } catch {}
    const theme = preference === 'dark' || (preference === 'system' && media.matches) ? 'dark' : 'light';
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  };
  apply();
  media.addEventListener('change', apply);
  window.addEventListener('storage', apply);
})();`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}
