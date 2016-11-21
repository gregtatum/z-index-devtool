const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const StackingContextTree = createFactory(require("./stacking-context-tree"));
const StackingContextNodeInfo = createFactory(require("./stacking-context-node-info"));
const StackingContextTreeHeader = createFactory(require("./stacking-context-tree-header"));

const StackingContextTreeView = createFactory(createClass({
  displayName: "StackingContextTreeView",

  componentWillMount() {
    const {dispatch} = this.props;
  },

  render() {
    const {
      tree, expandedNodes, selectedNode, selectNode, computeBoundingRect, toggleNode
    } = this.props;

    return div(
      {className: "sidebar"},
      div({className: "devtools-toolbar"}, "Stacking Context Tree"),
      div({className: "tree-view"},
        StackingContextTreeHeader(),
        StackingContextTree({tree, expandedNodes, selectedNode, selectNode, computeBoundingRect, toggleNode}),
        StackingContextNodeInfo()
      )
    );
  }
}));

module.exports = StackingContextTreeView;
