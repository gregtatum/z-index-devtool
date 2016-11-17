const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const {
  fetchNewDomText,
  getStackingContext,
  toggleNode,
} = require("../actions/stacking-context");

const MainView = createFactory(require("./main-view"));
const StackingContextTreeView = createFactory(require("./stacking-context-tree-view"));

const { todo } = require("../actions/stacking-context");

const App = createFactory(createClass({
  displayName: "App",

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchNewDomText("examples/absolute-occluded-by-relative.html"));
  },

  render() {
    const {
      dispatch,
      stackingContext
    } = this.props;

    return div(
        {id:"split-view"},
        // App will only render SplitView, which will render DomContainer + dropdown on left
        //  and the TreeView on right
        MainView({
          //props for dom container
          text: stackingContext.text,
          newTextReceived: (div) => {
            dispatch(getStackingContext(div))
          },
          //props for example dropdown
          fetchNewExampleHtml: (url) => {
            dispatch(fetchNewDomText(url))
          },
          //props for display rectangle
          elt: stackingContext.selElt
        }),
        StackingContextTreeView({
          tree: stackingContext.tree,
          expandedNodes: stackingContext.expandedNodes,
          selNode: stackingContext.selNode,
          toggleNode: node => dispatch(toggleNode(node))
        })
    );
  }
}));

function mapStateToProps(state) {
  return state;
}

module.exports = connect(mapStateToProps)(App);
