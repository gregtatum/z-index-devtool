const {DOM, createClass, createFactory} = require("react");
const {div, span} = DOM;
const StackingContextNode = createFactory(require("./stacking-context-node"));
const Tree = createFactory(require("./tree"));
const {flattenTreeWithDepth} = require("./../stacking-context/");

const StackingContextTree = createClass({
    render() {
      const {tree} = this.props;
      const nodes = flattenTreeWithDepth(tree);

      if (tree != undefined) {
        // console.info(tree);
        // console.info(nodes);
        return Tree({
          // all top-level nodes
          getRoots: () => [tree], // all top-level nodes
          // returns list of nodes if the item is an array (ie top-level, looking at roots)
          getChildren: item => (item.length > 0) ? item : item.nodes,
          getParent: item => item.parent,
          getKey: item => item.key,
          /*
          until arrow and expanding/collapsed is implemented, all nodes will be considered
          "collapsed" (if they are expanded, they will show in duplicate)
           */
          isExpanded: () => false,
          renderItem: (item, depth, focused, arrow, isExpanded) => {
            // console.warn(item);
            return StackingContextNode(
              {
                node: item,
                depth,
                focused,
                arrow,
                isExpanded,
              }
              // And here is the label for this item.
              // span({ className: "stacking-context-node-label" }, item.label)
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