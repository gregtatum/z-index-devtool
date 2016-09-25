const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const StackingContextNode = createFactory(require("./stacking-context-node"));
const {flattenTreeWithDepth} = require("./../stacking-context/")

const StackingContextTree = createClass({
  render: function() {
    const {tree} = this.props;
    const nodes = flattenTreeWithDepth(tree);

    return div(
        {className: "app"},
        ...nodes.map((node) => StackingContextNode({node}))
        );
  }
});

module.exports = StackingContextTree;
