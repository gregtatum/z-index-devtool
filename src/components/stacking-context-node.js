const {DOM, createClass} = require("react");
const {div, span} = DOM;
const React = require("react");
const {selectStackingContextNode} = require("../actions/stacking-context");

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
        key: node.key,
      },

      span({className: "stacking-context-node-info2"},
        node.isStacked ? "(in stacking context)" : "(not in stacking context)"
      ),

      span({className: "stacking-context-node-info"},
        "z: " + node.index
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
          }
        },
        getNodeContainerName(node.el)
        )
      )
    );
  }
});

function getNodeContainerName(el) {
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
