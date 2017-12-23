function setTheme(name) {
  document.documentElement.className = `theme-${name}`;
}

browser.devtools.panels.onThemeChanged.addListener(theme => {
  setTheme(theme);
});
setTheme(browser.devtools.panels.themeName);
