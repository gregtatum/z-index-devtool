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
  if (sender.url != browser.runtime.getURL("/devtools/panel/panel.html")) {
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
