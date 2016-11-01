const {DOM, createClass, createFactory} = require("react");
const {div, span} = DOM;
const React = require("react");

const StackingContextNodeInfo = createClass({
  // USING selNode TO DISPLAY THE STACKING CONTEXT INFO BASED ON SELECTED NODE
  render() {
    const {store} = this.context;
    const {selNode} = store.getState().stackingContext;
    let nodeProperties = selNode ? getStackingContextInfo(selNode) : undefined;

    return div({
      className: "node-info"
    },
    nodeProperties);
  }

});

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
    "Is Isolated: " + properties.isIsolated + "\n");
};

StackingContextNodeInfo.contextTypes = {
    store: React.PropTypes.object
  };

module.exports = StackingContextNodeInfo;
