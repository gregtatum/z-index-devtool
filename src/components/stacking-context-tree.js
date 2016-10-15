const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const StackingContextNode = createFactory(require("./stacking-context-node"));
const Tree = createFactory(require("./tree"));
const {flattenTreeWithDepth} = require("./../stacking-context/")

const StackingContextTree = createClass({
  render: function() {
    const {tree} = this.props;
    const nodes = flattenTreeWithDepth(tree);

    return div(
        {id: "tree"},
        // "nodes" is undefined until add-stacking-context action is executed
        // so app complains about being unable to display a Tree due to the undefined props given
        // Tree({
        //     root: tree[0],
        //     getRoots: () => [this.props.node],
        //     getParent: item => item.parent,
        //     getChildren: item => item.nodes,
        //     getKey: () => {},
        //     renderItem: () => {},
        //     isExpanded: () => {},
        //     itemHeight: 20
        // }),
        ...nodes.map((node) => StackingContextNode({node}))
        );
  }
});

module.exports = StackingContextTree;
