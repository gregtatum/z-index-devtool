"use strict";
// Connection to the content script
let csPort;
browser.runtime.onConnect.addListener(port => {
  csPort = port;

  csPort.onMessage.addListener(message => {
    message.tabId = csPort.sender.tab.id;
    // send the message to the panel
    sendMessageToPanel(message);
  });
});

// Connection to the devtools Panel
browser.runtime.onMessage.addListener((request, sender, send) => {
  const urls = [
    browser.runtime.getURL("/devtools/devtools-page.html"),
    browser.runtime.getURL("/devtools/panel/panel.html")
  ];
  if (!urls.includes(sender.url)) {
    return;
  }
  sendToContentScript(request);
});

function sendToContentScript(message) {
  if (!csPort) {
    return;
  }
  csPort.postMessage(message);
}

function sendMessageToPanel(message) {
  browser.runtime.sendMessage(message);
}
