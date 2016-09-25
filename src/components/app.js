const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const {addStackingContext} = require("../actions/stacking-context");

const StackingContextTreeView = createFactory(require("./stacking-context-tree-view"));
const DomView = createFactory(require("./dom-view"));

const { todo } = require("../actions/stacking-context");

const App = createFactory(createClass({
  displayName: "App",

  render() {
      return div(
        {id:"splitter"},
        StackingContextTreeView(this.props),
        DomView()
      );
  }
}));

function mapStateToProps(state) {
  return state;
}

module.exports = connect(mapStateToProps)(App);
