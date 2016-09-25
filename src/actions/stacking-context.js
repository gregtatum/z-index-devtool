const {getText} = require("@tatumcreative/get");
const constants = require("../constants");
const {getStackingContextTree} = require("../stacking-context")

function addStackingContext(url) {
  return function(dispatch, getState) {

    getText(url).then(text => {
      // Set the container to have that HTML
      console.warn("Uh oh, we're touching the DOM without using React :(");
      const containerElement = document.querySelector("#container");
      containerElement.innerHTML = text;

      const tree = getStackingContextTree(containerElement);

      dispatch({
        type: constants.ADD_STACKING_CONTEXT,
        containerElement,
        tree
      });
    }, console.error.bind(console));
  }
}

module.exports = {
  addStackingContext
}
