const {DOM, createClass} = require("react");
const {div, span} = DOM;
const React = require("react");
const {selectStackingContextNode} = require("../actions/stacking-context");

const StackingContextNode = createClass({
  render() {
    let {
      node,
      depth,
      focused,
      arrow,
      isExpanded // used automagically in 'arrow'
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
      },
      span({},
        arrow,
        nodeToString(node.el),
        getStackingContextInfo(node),
        // temporary solution for selecting a node
        // (to allow testing of node selection)
        span({
          style: {marginLeft: "5px", cursor: "pointer"},
          className: "select-icon",
          onClick: () => {
            store.dispatch(selectStackingContextNode(node));
          }
        }, "☚") // dat unicode tho
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
