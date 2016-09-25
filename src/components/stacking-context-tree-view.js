const {DOM, createClass, createFactory} = require("react");
const {connect} = require("react-redux");

const {addStackingContext} = require("../actions/stacking-context");

const StackingContextTree = createFactory(require("./stacking-context-tree"));
const { todo } = require("../actions/stacking-context");

const StackingContextTreeView= createFactory(createClass({
  displayName: "StackingContextTreeView",

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(addStackingContext("../sandbox/absolute-occluded-by-relative.html"));
  },

  render() {
    const {
      dispatch,
      stackingContext
    } = this.props;

    return StackingContextTree({tree: stackingContext.tree});
  }
}));

module.exports = StackingContextTreeView
