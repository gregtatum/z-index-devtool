const { getText: getTextModule } = require("@tatumcreative/get");
const constants = require("../constants");

function sendMessage(action, data) {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    action,
    data
  });
}

function fetchNewDomText(url, getText = getTextModule) {
  return function(dispatch, getState) {
    return getText(url).then(text => {
      dispatch({
        type: constants.NEW_DOM_TEXT,
        text: text,
        url: url
      });
    }, console.error.bind(console));
  };
}

function getStackingContextTree(elememtSelector) {
  sendMessage("GET_STACKING_CONTEXT_TREE", { selector: elememtSelector });
}

function addStackingContext(tree) {
  return function(dispatch, getState) {
    dispatch({
      type: constants.ADD_STACKING_CONTEXT,
      containerElement: ".dom-container",
      tree: JSON.parse(tree)
    });
  };
}

function selectStackingContextNode(node) {
  return function(dispatch, getState) {
    dispatch({
      type: constants.SELECT_NODE,
      selectedNode: node,
      selElt: node.el
    });
  };
}

function highlightElement(nodeKey) {
  sendMessage("HIGHLIGHT_ELEMENT", { nodeKey: nodeKey });
}

function toggleNode(node) {
  return function(dispatch, getState) {
    const { expandedNodes } = getState().stackingContext;
    return dispatch(
      expandedNodes.has(node) ? collapseNode(node) : expandNode(node)
    );
  };
}

function expandNode(node) {
  return {
    type: constants.EXPAND_NODE,
    node: node
  };
}

function collapseNode(node) {
  return {
    type: constants.COLLAPSE_NODE,
    node: node
  };
}

function toggleSelector() {
  return {
    type: constants.TOGGLE_SELECTOR
  };
}

module.exports = {
  fetchNewDomText,
  getStackingContextTree,
  addStackingContext,
  selectStackingContextNode,
  highlightElement,
  toggleNode,
  expandNode,
  collapseNode,
  toggleSelector
};
