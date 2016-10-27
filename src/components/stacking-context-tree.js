const {DOM, createClass, createFactory} = require("react");
const {div, span} = DOM;
const StackingContextNode = createFactory(require("./stacking-context-node"));
const Tree = createFactory(require("./tree"));
const {flattenTreeWithDepth} = require("./../stacking-context/");

const StackingContextTree = createClass({
    render() {
      const {tree, expandedNodes, toggleNode} = this.props;
      const nodes = flattenTreeWithDepth(tree);

      if (tree != undefined) {
        // console.info(tree);
        // console.info(nodes);
        return Tree({
          // all top-level nodes
          getRoots: () => tree, // all top-level nodes
          getChildren: node => node.nodes,
          getParent: node => node.parent,
          getKey: node => node.key,
          /*
          until arrow and expanding/collapsed is implemented, all nodes will be considered
          "collapsed" (if they are expanded, they will show in duplicate)
           */
          isExpanded: node => expandedNodes.has(node),
          renderItem: (node, depth, focused, arrow, isExpanded) => {
            // console.warn(node);
            return StackingContextNode(
              {
                node: node,
                depth,
                focused,
                arrow,
                isExpanded,
                toggleNode,
              }
              // And here is the label for this node.
              // span({ className: "stacking-context-node-label" }, node.label)
              // ...nodes.map(node => StackingContextNode({node}))
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
