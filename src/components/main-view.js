const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const {
  fetchNewDomText,
  getStackingContext
} = require("../actions/stacking-context");
const DomContainer = createFactory(require("./dom-container"));
const ExamplesDropdown = createFactory(require("./examples-dropdown"));
const DisplayRectangle = createFactory(require("./display-rectangle"));

const MainView = createClass({
  displayName: "MainView",

    render() {
      const {
        text,
        newTextReceived,
        fetchNewExampleHtml
      } = this.props;

      return div(
        {className: "main-view"},
        //Examples dropdown goes here,
        ExamplesDropdown({
          fetchNewExampleHtml: fetchNewExampleHtml
        }),
        DomContainer({
          text: text,
          newTextReceived: newTextReceived
        }),
        DisplayRectangle({})
      );
    }
});

module.exports = MainView;
