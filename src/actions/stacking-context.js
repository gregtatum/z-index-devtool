const constants = require("../constants");

function addStackingContext(url) {
  return function(dispatch, getState) {
    // TODO.
    return dispatch({type: ADD_STACKING_CONTEXT});
  }
}

module.exports = {
  addStackingContext
}
