const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const StackingContextTree = createFactory(require("./stacking-context-tree"));
const StackingContextNodeInfo = createFactory(require("./stacking-context-node-info"));
const { todo } = require("../actions/stacking-context");

const StackingContextTreeView= createFactory(createClass({
  displayName: "StackingContextTreeView",

  componentWillMount() {
    const {dispatch} = this.props;
  },

  render() {
    const {
      tree, expandedNodes, toggleNode
    } = this.props;

    return div(
      {className: "sidebar"},
      div({className: "devtools-toolbar"}, "Stacking Context Tree"),
      StackingContextTree({tree, expandedNodes, toggleNode}),
      StackingContextNodeInfo()
    );
  }
}));

module.exports = StackingContextTreeView
