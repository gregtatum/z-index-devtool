const {DOM, createClass, createFactory} = require("react");
const {div,span} = DOM;
const StackingContextNode = createFactory(require("./stacking-context-node"));
const Tree = createFactory(require("./tree"));
const {flattenTreeWithDepth} = require("./../stacking-context/")

const StackingContextTree = createClass({

  // _renderItem(node) {
  //   console.log(node);
  //   return StackingContextNode({node});
  // },

  render() {
    const {tree} = this.props;
    const nodes = flattenTreeWithDepth(tree);

    if (tree != undefined) {
      return Tree({
          root: tree[0],
          getRoots: () => [this.props.node],
          getChildren: () => [],
          getParent: item => item.parent,
          getKey: () => {},
          renderItem: (item, depth, focused, arrow, expanded) => {
            console.log(item);
            console.log(depth);
            console.log(focused);
            console.log(arrow);
            console.log(expanded);
            return div(
              {
                // Apply 10px nesting per expansion depth.
                style: { marginLeft: depth + "px" }
              },
              // Here is the expando arrow so users can toggle expansion and
              // collapse state.
              arrow,
              // And here is the label for this item.
              ...nodes.map((node) => StackingContextNode({node}))
            );
          },
          isExpanded: () => {},
          itemHeight: 20
      });
    } else {
      return div(
        {id: "tree"},
        // "nodes" is undefined until add-stacking-context action is executed
        // so app complains about being unable to display a Tree due to the undefined props given
        // Tree({
        //     root: tree[0],
        //     getRoots: () => [this.props.node],
        //     getChildren: item => item.nodes,
        //     getParent: item => item.parent,
        //     getKey: () => {},
        //     renderItem: () => {},
        //     isExpanded: () => {},
        //     itemHeight: 20
        // }),
        ...nodes.map((node) => StackingContextNode({node}))
      );
    }

    // const testdiv = document.createElement('div');
    // testdiv.setAttribute('id','testtreenode1');
    // var nodes = [
    //   {el: testdiv,
    //   key: "testtreenode1",
    //   index: 2,
    //   inStacked: true,
    //   isStackingContext: true,
    //   nodes:[],
    //   parent: undefined
    //   },
    //   {el: div({key: "testtreenode2"}),
    //   key: "testtreenode2",
    //   index: 5,
    //   inStacked: true,
    //   isStackingContext: true,
    //   nodes:[],
    //   parent: undefined
    //   }
    // ];
    // console.log(nodes[0]);
    // return Tree({
    //   //root: tree[0],
    //   getRoots: () => [this.props.node],
    //   getParent: item => item.parent,
    //   getChildren: item => nodes,
    //   getKey: () => {},
    //   renderItem: () => StackingContextNode({node: nodes[0]}),
    //   isExpanded: () => {},
    //   itemHeight: 20
    // })
  }
});

module.exports = StackingContextTree;
