const {DOM, createClass, createFactory} = require("react");
const {div, table, tr, td, th, tbody, span} = DOM;
const React = require("react");

const StackingContextNodeInfo = createClass({
  // USING selNode TO DISPLAY THE STACKING CONTEXT INFO BASED ON SELECTED NODE
  render() {
    const {store} = this.context;
    const {selNode} = store.getState().stackingContext;
    let nodeProperties = selNode ? getStackingContextInfo(selNode) : undefined;

    return div({
      className: "node-info footer"
    },
    div({className: "devtools-toolbar"}, "Stacking Context Node Info"),
    createHeader(),
    nodeProperties);
  }

});

function createHeader() {
  return div({className: "header"},
    span({className: "stacking-context-info-label"},
      "Property"
    ),
    span({className: "stacking-context-info-value",},
      "Value"
    )
  );
}

function createTableRow(property, value) {
  return div({key: property,
    className: "stacking-context-info-row"},
    span({className: "stacking-context-info-label"}, property),
    span({className: "stacking-context-info-value highlight-value"}, value));
}

function getStackingContextInfo(node) {
  let properties = node.properties;
  let tableRows = [];
  let willChange = properties.willChange.split(", ").some(p => {
    return p === "position" || p === "opacity" ||
           p === "transform" || p === "filter" ||
           p === "perspective" || p === "isolation";
  });
  tableRows.push(createTableRow("Z-Index", properties.zindex));
  tableRows.push(createTableRow("Position", properties.position));
  //if (properties.isStacked) tableRows.push(createTableRow("Z-Index", properties.zindex));
  if (properties.filter !== "none") tableRows.push(createTableRow("Filter", properties.filter));
  if (properties.mixBlendMode !== "normal") tableRows.push(createTableRow("Mix-Blend-Mode", properties.mixBlendMode));
  if (properties.opacity !== "1") tableRows.push(createTableRow("Opacity", properties.opacity));
  if (properties.perspective !== "none") tableRows.push(createTableRow("Perspective", properties.perspective));
  //if (properties.position !== "static") tableRows.push(createTableRow("Position", properties.position));
  if (properties.transform !== "none") tableRows.push(createTableRow("Transform", properties.transform));
  if (willChange) tableRows.push(createTableRow("Will-Change", properties.willChange));
  if (properties.hasTouchOverflowScrolling) tableRows.push(createTableRow("Has Touch Overflow-Scrolling", properties.hasTouchOverflowScrolling));
  if (properties.isStacked && properties.isFlexItem) tableRows.push(createTableRow("Is a Flex Item:", properties.isFlexItem));
  if (properties.isIsolated) tableRows.push(createTableRow("Is Isolated", properties.isIsolated));

  return div({className: "stacking-context-info-table"},
    tableRows
  );
};

StackingContextNodeInfo.contextTypes = {
    store: React.PropTypes.object
  };

module.exports = StackingContextNodeInfo;
