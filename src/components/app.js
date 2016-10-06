const {DOM, createClass, createFactory} = require("react");
const {connect} = require("react-redux");
const {addStackingContext} = require("../actions/stacking-context");
const DomContainer = createFactory(require("./dom-container"));
const StackingContextTree = createFactory(require("./stacking-context-tree"));
const { todo } = require("../actions/stacking-context");

const App = createFactory(createClass({
  displayName: "App",

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(addStackingContext("../sandbox/absolute-occluded-by-relative.html"));
  },

  render() {
    const {
      dispatch,
      stackingContext
    } = this.props;

    return div(
        {}, // props
        // App will only render SplitView, which will render DomContainer + dropdown on left
        //  and the TreeView on right
        DomContainer({html: "(DOM Container goes here)"}),
        StackingContextTree({tree: stackingContext.tree})
    );
  }
}));

function mapStateToProps(state) {
  return state;
}

module.exports = connect(mapStateToProps)(App);
