const {DOM, createClass} = require("react");
const {div, span, button} = DOM;
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

    let className = "stacking-context-node";
    if (focused) {
      className += " selected-node";
    }

    return div(
      {
        className,
        style: {paddingLeft: depth * 10 + "px"},
        key: node.key,
        onClick: (event) => {
          // if (selNode) {
          //   selNode.el.classList.remove("selected-node-dom");
          // }
          // node.el.classList.add("selected-node-dom");
          // store.dispatch(selectStackingContextNode(node));
        }
      },
      button({
        className: "arrow",
        onClick: () => {
          toggleNode(node)
        }
      }, isExpanded ? "-" : "+"),
      span({
        className: "label",
        onClick: () => {
          store.dispatch(selectStackingContextNode(node));
        }
      },
        nodeToString(node.el),
        getStackingContextInfo(node)
      )
    );
  }
});

function nodeToString(el) {
  return el.tagName.toLowerCase() +
    (el.id.trim() !== "" ? "#" + el.id.trim() : "") +
    (el.className && el.className.trim && el.className.trim() !== "" ? "." + el.className.trim().split(" ").join(".") : "");
};

function getStackingContextInfo(node) {
  return (node.isStackingContext ? " [CONTEXT] " : "") +
    (node.isStacked ? "[z-index: " + node.index + "]" : "");
};

StackingContextNode.contextTypes = {
  store: React.PropTypes.object
};

module.exports = StackingContextNode;
