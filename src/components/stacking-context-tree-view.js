const {DOM, createClass, createFactory} = require("react");
const {div, button} = DOM;
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
      tree, expandedNodes, selectedNode, selectNode, computeBoundingRect, toggleNode, isSelectorActive
    } = this.props;

    let buttonClass = "devtools-button command-button";
    if (isSelectorActive)
      buttonClass += " active";

    return div(
      {className: "tree-view"},
      div({className: "devtools-toolbar"},
        button({
          className: buttonClass,
          id: "command-button-pick",
          title: "Select an element on the page",
          checked: isSelectorActive ? "true" : "",
          onClick: this.props.toggleSelector
        }),
        "Stacking Context Tree"),
        StackingContextTreeHeader(),
        StackingContextTree({tree, expandedNodes, selectedNode, selectNode, computeBoundingRect, toggleNode})
    );
  }
}));

module.exports = StackingContextTreeView;
