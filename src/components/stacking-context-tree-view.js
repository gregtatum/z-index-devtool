const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const StackingContextTree = createFactory(require("./stacking-context-tree"));
const StackingContextNodeInfo = createFactory(require("./stacking-context-node-info"));
const StackingContextTreeHeader = createFactory(require("./stacking-context-tree-header"));
const { todo } = require("../actions/stacking-context");

const StackingContextTreeView = createFactory(createClass({
  displayName: "StackingContextTreeView",

  componentWillMount() {
    const {dispatch} = this.props;
  },

  render() {
    const {
      tree, expandedNodes, selNode, toggleNode
    } = this.props;

    return div(
      {className: "tree-view"},
      div({className: "devtools-toolbar"}, "Stacking Context Tree"),
      StackingContextTreeHeader(),
      StackingContextTree({tree, expandedNodes, selNode, toggleNode})
    );
  }
}));

module.exports = StackingContextTreeView;
