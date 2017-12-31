const {DOM, createClass} = require("react");
const {div, span} = DOM;
const React = require("react");
const {
  selectStackingContextNode,
  computeBoundingRect,
  highlightElement
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
      className += " focused";
    }

    if (!node.properties.isStackingContext) {
      className += " not-in-context";
    }

    let nodeZ = {className: "stacking-context-node-z"};
    if (node.properties.zindex === "auto") {
      nodeZ.title = "'auto' is equivalent to having a Z-Index of 0";
    }

    return div(
      {
        className,
        key: node.key,
        onMouseOver: () => {
          store.dispatch(highlightElement(node.el));
          store.dispatch(computeBoundingRect(node));
        },
        onMouseLeave: () => {
          store.dispatch(highlightElement(undefined));
          store.dispatch(computeBoundingRect(undefined));
        },
        onClick: () => {
          store.dispatch(selectStackingContextNode(node));
          store.dispatch(computeBoundingRect(node));
        }
      },

      span({className: "stacking-context-node-context"},
          node.properties.isStackingContext ? "✔" : "✘"
      ),

      span(nodeZ,
        node.properties.zindex
      ),

      span(
        {
          className: "stacking-context-node-name",
          style: {paddingLeft: depth * 10 + "px"},
        },
        arrow,
        span({
          onClick: () => {
            store.dispatch(selectStackingContextNode(node));
            store.dispatch(computeBoundingRect(node.el));
          },
          title: node.properties.isStackingContext? "" : "This element is not part of the stacking context."
        },
        getNodeContainerName(node.el))
      )
    );
  }
});

function getNodeContainerName(el) {
  return el.tagName.toLowerCase() +
    (el.id.trim() !== "" ? "#" + el.id.trim() : "") +
    (el.className && el.className.trim && el.className.trim() !== "" ? "." + el.className.trim().split(" ").join(".") : "");
};

StackingContextNode.contextTypes = {
  store: React.PropTypes.object
};

module.exports = StackingContextNode;
