const {DOM, createClass} = require("react");
const {div, button, span} = DOM;
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

    if (!node.properties.isStackingContext) {
      className += " not-in-context";
    }

    return div(
      {
        className,
        key: node.key,
        onClick: () => {
          store.dispatch(selectStackingContextNode(node));
        }
      },

      span({className: "stacking-context-node-context"},
          node.properties.isStackingContext ? "✔" : "✘"
      ),

      span({className: "stacking-context-node-z"},
        node.index
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
