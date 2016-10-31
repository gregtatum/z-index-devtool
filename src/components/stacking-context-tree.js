const {DOM, createClass, createFactory} = require("react");
const {div, span} = DOM;
const StackingContextNode = createFactory(require("./stacking-context-node"));
const Tree = createFactory(require("./tree"));
const {flattenTreeWithDepth} = require("./../stacking-context/");

const StackingContextTree = createClass({
    render() {
      const {tree, expandedNodes, selNode, toggleNode} = this.props;
      const nodes = flattenTreeWithDepth(tree);

      if (tree != undefined) {
        return Tree({
          getRoots: () => tree, // all top-level nodes
          getChildren: node => node.nodes,
          getParent: node => node.parent,
          getKey: node => node.key,
          isExpanded: node => expandedNodes.has(node),
          renderItem: (node, depth, focused, arrow, isExpanded) => {
            return StackingContextNode(
              {
                node,
                depth,
                focused: selNode === node, //: store.getState().stackingContext.
                arrow,
                isExpanded,
                toggleNode,
              }
            );
          },
          itemHeight: 20
        });
      } else {
        return div({id: "tree"});
      }
    }
  });

module.exports = StackingContextTree;
