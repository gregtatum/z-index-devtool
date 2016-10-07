const {DOM, createClass, createFactory} = require("react");
const {connect} = require("react-redux");
const {
  fetchNewDomText,
  getStackingContext
} = require("../actions/stacking-context");
const DomContainer = createFactory(require("./dom-container"));
const StackingContextTree = createFactory(require("./stacking-context-tree"));
const ExamplesDropdown = createFactory(require("./examples-dropdown"));
const { todo } = require("../actions/stacking-context");
const {div} = DOM;

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
        {}, // props
        // App will only render SplitView, which will render DomContainer + dropdown on left
        //  and the TreeView on right
        ExamplesDropdown({

          getNewExampleHtml: (url) => {
            dispatch(fetchNewDomText(url))
          },
        }),
        DomContainer({
          text: stackingContext.text,
          newTextReceived: (div) => {
            dispatch(getStackingContext(div))
          },
        }),
        StackingContextTree({tree: stackingContext.tree})
    );
  }
}));

function mapStateToProps(state) {
  return state;
}

module.exports = connect(mapStateToProps)(App);
