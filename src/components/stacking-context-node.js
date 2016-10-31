const {DOM, createClass} = require("react");
const {div} = DOM;
const React = require("react");
const {selectStackingContextNode} = require("../actions/stacking-context");

const StackingContextNode = createClass({
    render: function() {
    const {node} = this.props;
    const {store} = this.context;
    const {selNode} = store.getState().stackingContext;
    return div(
        {className: "stacking-context-node",
        style: {paddingLeft: node.depth * 10 + "px"},
        onClick: (event) => {
          store.dispatch(selectStackingContextNode(node));
        }
        },
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
  return (node.isStackingContext ? " [CONTEXT] " : "") +
      (node.isStacked ? "[z-index: " + node.index + "]": "");
};

StackingContextNode.contextTypes = {
  store: React.PropTypes.object
};

module.exports = StackingContextNode;
