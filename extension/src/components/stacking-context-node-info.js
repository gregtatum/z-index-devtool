const { DOM, createClass, createFactory } = require("react");
const { div, span } = DOM;
const React = require("react");

const StackingContextNodeInfo = createClass({
  // USING selectedNode TO DISPLAY THE STACKING CONTEXT INFO BASED ON SELECTED NODE
  render() {
    const { store } = this.context;
    const { selectedNode } = store.getState().stackingContext;
    if (selectedNode) {
      return div(
        {
          className: "node-info footer"
        },
        div({ className: "devtools-toolbar" }, "Stacking Context Node Info"),
        createHeader(),
        getStackingContextInfo(selectedNode)
      );
    } else {
      return div({ className: "node-info footer" });
    }
  }
});

function createHeader() {
  return div(
    { className: "header" },
    span({ className: "stacking-context-info-label" }, "Property"),
    span({ className: "stacking-context-info-value" }, "Value")
  );
}

function createTableRow(property, value) {
  return div(
    {
      key: property,
      className: "stacking-context-info-row"
    },
    span({ className: "stacking-context-info-label" }, property),
    span({ className: "stacking-context-info-value highlight-value" }, value)
  );
}

function getStackingContextInfo(node) {
  let properties = node.properties;
  let tableRows = [];
  let willChange = properties.willChange.split(", ").some(p => {
    return (
      p === "position" ||
      p === "opacity" ||
      p === "transform" ||
      p === "filter" ||
      p === "perspective" ||
      p === "isolation"
    );
  });
  // As a default, display the position and z-index info for all nodes
  tableRows.push(createTableRow("Z-Index", properties.zindex));
  tableRows.push(createTableRow("Position", properties.position));
  if (properties.filter !== "none")
    tableRows.push(createTableRow("Filter", properties.filter));
  if (properties.mixBlendMode !== "normal")
    tableRows.push(createTableRow("Mix-Blend-Mode", properties.mixBlendMode));
  if (properties.opacity !== "1")
    tableRows.push(createTableRow("Opacity", properties.opacity));
  if (properties.perspective !== "none")
    tableRows.push(createTableRow("Perspective", properties.perspective));
  if (properties.transform !== "none")
    tableRows.push(createTableRow("Transform", properties.transform));
  if (willChange)
    tableRows.push(createTableRow("Will-Change", properties.willChange));
  if (properties.hasTouchOverflowScrolling)
    tableRows.push(
      createTableRow(
        "Has Touch Overflow-Scrolling",
        properties.hasTouchOverflowScrolling
      )
    );
  if (properties.isStacked && properties.isFlexItem)
    tableRows.push(createTableRow("Is a Flex Item:", properties.isFlexItem));
  if (properties.isIsolated)
    tableRows.push(createTableRow("Is Isolated", properties.isIsolated));

  return div({ className: "stacking-context-info-table" }, tableRows);
}

StackingContextNodeInfo.contextTypes = {
  store: React.PropTypes.object
};

module.exports = StackingContextNodeInfo;
