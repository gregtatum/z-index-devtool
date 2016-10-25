const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const StackingContextNode = createFactory(require("./stacking-context-node"));
const Tree = createFactory(require("./tree"));
const {flattenTreeWithDepth} = require("./../stacking-context/");

const StackingContextTree = createClass({
    render() {
      const {tree} = this.props;
      const nodes = flattenTreeWithDepth(tree);

      if (tree != undefined) {
        return Tree({
          // all top-level nodes
          getRoots: () => [tree], // all top-level nodes
          // returns list of nodes if the item is an array (ie top-level, looking at roots)
          getChildren: item => (item.length > 0) ? item : item.nodes,
          getParent: item => item.parent,
          getKey: item => item.key,
          isExpanded: () => {},
          renderItem: (item, depth, focused, arrow, expanded) => {
            return div(
              {
                className: "stacking-context-tree",
              },
              // Here is the expando arrow so users can toggle expansion and
              // collapse state.
              arrow,
              // And here is the label for this item.
              ...nodes.map(node => StackingContextNode({node}))
            );
          },
          itemHeight: 20
        });
      } else {
        return div({id: "tree"});
      }
    }
  })
  ;

module.exports = StackingContextTree;