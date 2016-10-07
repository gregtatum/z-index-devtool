const constants = require("../constants");

const DEFAULT_STATE = {
  example: undefined
}

const handlers = {};

handlers[constants.RELOAD_STACKING_CONTEXT] = function(state, action) {
  return Object.assign({}, state, {
    containerElement: action.containerElement,
    tree: action.tree
  });
};

// function update(state = DEFAULT_STATE, action) {
//   const handle = handlers[action.type];
//   if (handle) {
//     return handle(state, action);
//   }
//   return state;
// }
//
// module.exports = update;
