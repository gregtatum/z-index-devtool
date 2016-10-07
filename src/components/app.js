const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const {
  fetchNewDomText,
  getStackingContext
} = require("../actions/stacking-context");
const DomContainer = createFactory(require("./dom-container"));
const StackingContextTreeView = createFactory(require("./stacking-context-tree-view"));

const { todo } = require("../actions/stacking-context");

const App = createFactory(createClass({
  displayName: "App",

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchNewDomText("../sandbox/absolute-occluded-by-relative.html"));
  },

  render() {
    const {
      dispatch,
      stackingContext
    } = this.props;

    return div(
        {id:"splitter"},
        // App will only render SplitView, which will render DomContainer + dropdown on left
        //  and the TreeView on right
        DomContainer({
          text: stackingContext.text,
          newTextReceived: (div) => {
            debugger;
            dispatch(getStackingContext(div))
          },
        }),
        StackingContextTreeView({tree: stackingContext.tree})
    );
  }
}));

function mapStateToProps(state) {
  return state;
}

module.exports = connect(mapStateToProps)(App);
