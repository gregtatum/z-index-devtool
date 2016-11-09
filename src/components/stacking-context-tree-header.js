const {DOM, createClass} = require("react");
const {div, span} = DOM;

const StackingContextTreeHeader = createClass({
  displayName: "StackingContextTreeHeader",

  render() {
    return div(
      {
        className: "header"
      },

      span(
        {
          className: "stacking-context-node-context",
          title: "Is the node in the stacking context?"
        },
        ""
      ),

      span(
        {
          className: "stacking-context-node-z",
          title: "Z-Index value assigned to this node"
        },
        "Z-Index"
      ),

      span(
        {
          className: "stacking-context-node-name",
          title: "Tree view of the nodes"
        },
        "Stacking Context Node"
      )

    );
  }
});

module.exports = StackingContextTreeHeader;