const constants = require("../constants");

const DEFAULT_STATE = {
  tree: undefined,
  containerElement: undefined,
  text: undefined,
  selNode: undefined,
  selElt: undefined,
  expandedNodes: new Set(),
  reasons: [],
  url: "stacking-context-1.html"
}

const handlers = {};

handlers[constants.NEW_DOM_TEXT] = function(state, action) {
  return Object.assign({}, state, {
    text: action.text,
    url: action.url
  });
};

handlers[constants.ADD_STACKING_CONTEXT] = function(state, action) {
  return Object.assign({}, state, {
    containerElement: action.containerElement,
    tree: action.tree
  });
};

handlers[constants.SELECT_NODE] = function(state, action) {
  return Object.assign({}, state, {
    selNode: action.selNode,
    selElt: action.selElt
  });
};

handlers[constants.EXPAND_NODE] = function(state, action) {
  const expandedNodes = new Set(state.expandedNodes);
  expandedNodes.add(action.node);
  return Object.assign({}, state, {
    expandedNodes
  });
};

handlers[constants.COLLAPSE_NODE] = function(state, action) {
  const expandedNodes = new Set(state.expandedNodes);
  expandedNodes.delete(action.node);
  return Object.assign({}, state, {
    expandedNodes
  });
};

function update(state = DEFAULT_STATE, action) {
  const handle = handlers[action.type];
  if (handle) {
    return handle(state, action);
  }
  return state;
}

module.exports = update;
