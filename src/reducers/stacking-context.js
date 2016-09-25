const constants = require("../constants");

const DEFAULT_STATE = {
  tree: undefined
}

const handlers = {};

handlers[constants.ADD_STACKING_CONTEXT] = function(state, action) {
  return Object.assign({}, state, {
    containerElement: action.containerElement,
    tree: action.tree
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
