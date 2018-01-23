import { DOM, createClass } from "react";
const { div, span } = DOM;

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
        "In Context"
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

export default StackingContextTreeHeader;
