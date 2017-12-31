const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;
const {connect} = require("react-redux");

const DomContainer = createFactory(require("./dom-container"));
const ExamplesDropdown = createFactory(require("./examples-dropdown"));
const DisplayRectangle = createFactory(require("./display-rectangle"));

const MainView = createClass({
  displayName: "MainView",

  render() {
    const {
      text,
      newTextReceived,
      fetchNewExampleHtml,
      elt
    } = this.props;

    return div(
      {className: "main-view"},
      ExamplesDropdown({fetchNewExampleHtml}),
      DomContainer({text, newTextReceived}),
      DisplayRectangle({elt: elt})
    );
  }
});

module.exports = MainView;
