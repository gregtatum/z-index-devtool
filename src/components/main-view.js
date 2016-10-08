const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const {
  fetchNewDomText,
  getStackingContext
} = require("../actions/stacking-context");
const DomContainer = createFactory(require("./dom-container"));

const MainView = createClass({
  displayName: "MainView",

    render() {
      const {
        text,
        newTextReceived
      } = this.props;

      return div(
        {className: "main-view"},
        //Examples dropdown goes here,
        div(
          {className: "placeholder"},
          "Placeholder for Dropdown"
        ),
        DomContainer({
          text: text,
          newTextReceived: newTextReceived
        })
      );
    }
});

module.exports = MainView;
