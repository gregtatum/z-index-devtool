const {getText: getTextModule} = require("@tatumcreative/get");
const constants = require("../constants");
const {getStackingContextTree} = require("../stacking-context");
const {getMockTree} = require('../../test/fixtures/tree-fixture');

function fetchNewDomText (url, getText = getTextModule) {
  return function(dispatch, getState) {
    return getText(url).then(
      text => {
        dispatch({
          type: constants.NEW_DOM_TEXT,
          text: text,
          url: url
        });
      },
      console.error.bind(console)
    );
  };
}

function getStackingContext(containerElement) {
  return function(dispatch, getState) {
    const tree = getStackingContextTree(containerElement);
    dispatch({
      type: constants.ADD_STACKING_CONTEXT,
      containerElement,
      tree
    });
  }
}

function getMockStackingContext(containerElement) {
  return function(dispatch, getState) {
    const tree = getMockTree();
    dispatch({
      type: constants.ADD_STACKING_CONTEXT,
      containerElement,
      tree
    });
  }
}

function selectStackingContextNode(node) {
  return function(dispatch, getState) {
    dispatch({
      type: constants.SELECT_NODE,
      selNode: node
    });
  }
}

function toggleNode(node) {
  return function(dispatch, getState) {
    const {expandedNodes} = getState().stackingContext;
    return dispatch(
      expandedNodes.has(node)
        ? collapseNode(node)
        : expandNode(node)
    );
  }
}

function expandNode(node) {
  return {
    type: constants.EXPAND_NODE,
    node: node
  }
}

function collapseNode(node) {
  return {
    type: constants.COLLAPSE_NODE,
    node: node
  }
}

module.exports = {
  fetchNewDomText,
  getStackingContext,
  getMockStackingContext,
  selectStackingContextNode,
  toggleNode,
  expandNode,
  collapseNode,
}
