const {getText} = require("@tatumcreative/get");
const constants = require("../constants");
const {getStackingContextTree} = require("../stacking-context")

function fetchNewDomText (url) {
  return function(dispatch, getState) {
    getText(url).then(
      text => {
        dispatch({
          type: constants.NEW_DOM_TEXT,
          text: text
        });
      },
      console.error.bind(console)
    );
  }
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

module.exports = {
  fetchNewDomText,
  getStackingContext
}
