const {DOM, createClass} = require("react");
const {div, button, span} = DOM;
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

    const notStackingContextStyle = {
      style: {opacity: '0.7'},
      title: "This element is not part of the stacking context."
    }

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

          // USING selNode TO DISPLAY THE STACKING CONTEXT INFO BASED ON SELECTED NODE
          store.dispatch(selectStackingContextNode(node));
        },
      },
      button({
        className: "arrow",
        onClick: () => {
          console.log('toggle')
          toggleNode(node)
        }
      }, "+"),
      span (node.properties.isStackingContext? {} : notStackingContextStyle,
        nodeToString(node.el),
        getStackingContextInfo(node))
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
