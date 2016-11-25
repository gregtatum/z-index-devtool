const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const StackingContextNode = createFactory(require("./stacking-context-node"));
const Tree = createFactory(require("./tree"));

const StackingContextTree = createClass({
    render() {
      const {
        tree,
        expandedNodes,
        selectedNode,
        selectNode,
        computeBoundingRect,
        toggleNode
      } = this.props;

      if (tree != undefined) {
        return Tree({
          getRoots: () => tree, // all top-level nodes
          getChildren: node => node.stackingContextChildren,
          getParent: node => node.parentStackingContext,
          getKey: node => node.key,
          isExpanded: node => expandedNodes.has(node),
          renderItem: (node, depth, isFocused, arrow, isExpanded) => {
            return StackingContextNode(
              {
                node,
                depth,
                isFocused: selectedNode === node,
                arrow,
                isExpanded,
              }
            );
          },
          focused: selectedNode,
          onFocus: node => {selectNode(node); computeBoundingRect(node);},
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
