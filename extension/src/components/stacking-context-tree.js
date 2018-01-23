import { DOM, createClass, createFactory } from "react";
import SCNode from "./stacking-context-node";
import _Tree from "./tree";

const { div } = DOM;
const StackingContextNode = createFactory(SCNode);
const Tree = createFactory(_Tree);

const StackingContextTree = createClass({
  render() {
    const {
      tree,
      expandedNodes,
      selectedNode,
      selectNode,
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
          return StackingContextNode({
            node,
            depth,
            isFocused: selectedNode === node,
            arrow,
            isExpanded
          });
        },
        focused: selectedNode,
        onFocus: node => {
          selectNode(node);
        },
        onExpand: toggleNode,
        onCollapse: toggleNode,
        itemHeight: 10
      });
    } else {
      return div({ id: "tree" });
    }
  }
});

export default StackingContextTree;
