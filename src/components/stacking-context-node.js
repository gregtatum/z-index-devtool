const {DOM, createClass} = require("react");
const {div, button, span} = DOM;
const React = require("react");
const {
  selectStackingContextNode,
  computeBoundingRect
} = require("../actions/stacking-context");

const StackingContextNode = createClass({
  render() {
    const {
      node,
      depth,
      isFocused,
      arrow,
      isExpanded // used automagically in 'arrow'
    } = this.props;
    const {store} = this.context;

    let className = "stacking-context-node";
    if (isFocused) {
      className += " selected-node";
    }

    return div(
      {
        className,
        style: {paddingLeft: depth * 10 + "px"},
        key: node.key
      },
      span({},
        arrow,
        span({
          onClick: () => {
            store.dispatch(selectStackingContextNode(node));
            store.dispatch(computeBoundingRect(node.el));
          },
          style: node.properties.isStackingContext? {} : {opacity: '0.7'},
          title: node.properties.isStackingContext? "" : "This element is not part of the stacking context."
        },
        nodeToString(node.el),
        getStackingContextInfo(node))
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
  let properties = node.properties;
  return (properties.isStackingContext ? " [CONTEXT] " : " [NOT CONTEXT] ") +
    (properties.isStacked ? "[z-index: " + properties.zindex + "]" : "");
};

StackingContextNode.contextTypes = {
  store: React.PropTypes.object
};

module.exports = StackingContextNode;
