const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const StackingContextNode = createFactory(require("./stacking-context-node"));
const Tree = createFactory(require("./tree"));

const StackingContextTree = createClass({
    render() {
      const {
        tree,
        expandedNodes,
        selNode,
        toggleNode
      } = this.props;

      if (tree != undefined) {
        return Tree({
          getRoots: () => tree, // all top-level nodes
          getChildren: node => node.nodes,
          getParent: node => node.parentStackingContext,
          getKey: node => node.key,
          isExpanded: node => expandedNodes.has(node),
          renderItem: (node, depth, isFocused, arrow, isExpanded) => {
            return StackingContextNode(
              {
                node,
                depth,
                isFocused: selNode === node,
                arrow,
                isExpanded,
              }
            );
          },
          onExpand: toggleNode,
          onCollapse: toggleNode,
          itemHeight: 10
        });
      } else {
        return div({id: "tree"});
      }
    }
  });

module.exports = StackingContextTree;
