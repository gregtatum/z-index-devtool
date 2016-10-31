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

function selectStackingContextNode(node) {
  return function(dispatch, getState) {
    //const currState = getState();
    //const prevSelElt = currState.stackingContext.selElt;
    //if i use inline style, it becomes much more complicated to
    //remove without losing any borders that were originally in place
    //if (prevSelElt){
    //  prevSelElt.classList.remove("selected-node");
    //}
    //node.el.classList.add("selected-node");
    dispatch({
      type: constants.SELECT_NODE,
      selNode: node,
      selElt: node.el
    });
  }
}

module.exports = {
  fetchNewDomText,
  getStackingContext,
  selectStackingContextNode
}
