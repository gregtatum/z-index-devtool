function onShown() {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    action: "INIT",
    data: {}
  });
}

function onHidden() {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    action: "DESTROY",
    data: {}
  });
}
browser.devtools.panels
  .create("Z Index", "icons/stack.svg", "devtools/panel/panel.html")
  .then(panel => {
    panel.onShown.addListener(onShown);
    panel.onHidden.addListener(onHidden);
  });
