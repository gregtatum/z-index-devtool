const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const StackingContextTree = createFactory(require("./stacking-context-tree"));
const { todo } = require("../actions/stacking-context");

const StackingContextTreeView= createFactory(createClass({
  displayName: "StackingContextTreeView",

  componentWillMount() {
    const {dispatch} = this.props;
  },

  render() {
    const {
      tree
    } = this.props;

    return div(
      {className: "sidebar"},
      StackingContextTree({tree: tree})
    );
  }
}));

module.exports = StackingContextTreeView
