const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {Provider} = require("react-redux");
const createStore = require("../store.js");

const app = createFactory(require("./app"));

const SplitView = createClass({
  displayName: "SplitView",

  render() {
    return div(
      {id:"app"},
      app(this.props),
      div(
        {id:"container"}
      )
    );
  }

});

module.exports = SplitView;
