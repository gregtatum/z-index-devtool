const {DOM, createClass} = require("react");
const {div, button} = DOM;
const React = require("react");
const {selectStackingContextNode} = require("../actions/stacking-context");

const StackingContextNode = createClass({
  render() {
    let {
      node,
      depth,
      focused,
      arrow,
      isExpanded,
      toggleNode,
    } = this.props;
    const {store} = this.context;
    const {selNode} = store.getState().stackingContext;

    // console.log("node: " + node);
    // console.log("depth: " + depth);
    // console.log("focused: " + focused);
    // console.log("arrow: " + arrow);
    // console.log("isExpanded: " + isExpanded);
    return div(
      {
        className: "stacking-context-node",
        style: {paddingLeft: depth * 10 + "px"},
        key: node.key,
        onClick: (event) => {
          // if (selNode) {
          //   selNode.el.classList.remove("selected-node");
          // }
          // node.el.classList.add("selected-node");
          // store.dispatch(selectStackingContextNode(node));
        }
      },
      button({
        className: "arrow",
        onClick: () => {
          console.log('toggle')
          toggleNode(node)
        }
      }, "+"),
      nodeToString(node.el),
      getStackingContextInfo(node)
    );
  }
});

function nodeToString(el) {
  return el.tagName.toLowerCase() +
    (el.id.trim() !== "" ? "#" + el.id.trim() : "") +
    (el.className && el.className.trim && el.className.trim() !== "" ? "." + el.className.trim().split(" ").join(".") : "");
};

function getStackingContextInfo(node) {
  // TODO edit this to display the properties and remove unnecessary isstacked stuff
  return (node.isStackingContext ? " [CONTEXT] " : "") +
    (node.isStacked ? "[z-index: " + node.index + "]" : "");
};

StackingContextNode.contextTypes = {
  store: React.PropTypes.object
};

module.exports = StackingContextNode;
