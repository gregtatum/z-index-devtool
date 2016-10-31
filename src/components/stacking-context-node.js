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
        title: getStackingContextInfo(node),
        onClick: (event) => {
          // if (selNode) {
          //   selNode.el.classList.remove("selected-node");
          // }
          // node.el.classList.add("selected-node");
          // store.dispatch(selectStackingContextNode(node));
        },
        // onMouseOver: (event) => {
        //   document.getElementById("popup" + node.key).style.display = "block";
        // },
        // onMouseOut: (event) => {
        //   document.getElementById("popup" + node.key).style.display = "none";
        // }
      },
      button({
        className: "arrow",
        onClick: () => {
          console.log('toggle')
          toggleNode(node)
        }
      }, "+"),
      // div({
      //   id: "popup" + node.key,
      //   className: "popup",
      //   style: {display: "none", position: "absolute"}
      //   },
      //   getStackingContextInfo(node)
      // ),
      nodeToString(node.el)
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
  return ("Z-Index: " + properties.zindex + "\n" +
          "Filter: " + properties.filter + "\n" +
          "Mix-Blend-Mode: " + properties.mixBlendMode + "\n" +
          "Opacity: " + properties.opacity + "\n" +
          "Perspective: " + properties.perspective + "\n" +
          "Position: " + properties.position + "\n" +
          "Transform: " + properties.transform + "\n" +
          "Will-Change: " + properties.willChange + "\n"+
          "Has Touch Overflow-Scrolling: " + properties.hasTouchOverflowScrolling + "\n" +
          "Is a Flex Item: " + properties.isFlexItem + "\n" +
          "Is Isolated: " + properties.isIsolated + "\n")
};

StackingContextNode.contextTypes = {
  store: React.PropTypes.object
};

module.exports = StackingContextNode;
