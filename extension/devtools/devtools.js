function onShown() {
  console.log("shown");
}

function onHidden() {
  console.log("hidden");
}
browser.devtools.panels
  .create("Z Index", "icons/stack.svg", "devtools/panel/panel.html")
  .then(panel => {
    panel.onShown.addListener(onShown);
    panel.onHidden.addListener(onHidden);
  });
