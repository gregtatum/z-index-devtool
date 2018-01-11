// listen and handle messages from the content script
// via the background script
const { addStackingContext } = require("./actions/stacking-context");

function connectToInspectedWindow({ dispatch }) {
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.tabId !== browser.devtools.inspectedWindow.tabId) {
      return;
    }
    switch (request.action) {
      case "SET_STACKING_CONTEXT_TREE":
        const { tree, selector } = request.data;
        dispatch(addStackingContext(tree, selector));
    }
  });
}
module.exports = { connectToInspectedWindow };
