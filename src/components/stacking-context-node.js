const {DOM, createClass} = require("react");
const {div} = DOM;

const StackingContextNode = createClass({
    render: function() {
    const {node} = this.props;
    console.log(node);
    return div(
        {className: "stacking-context-node",
        style: {paddingLeft: node.depth * 10 + "px"},
        onClick: (event) => {
          //dispatch action?
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

module.exports = StackingContextNode;
