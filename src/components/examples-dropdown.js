const {DOM, createClass} = require("react");
const {div, select, option} = DOM;
const {getText} = require("@tatumcreative/get");

const ExamplesDropdown = createClass({
  displayName: "ExamplesDropdown",

  getInitialState() {
    return { selectValue: 'stacking-context-1.html' };
  },

  handleChange(e) {
    this.setState({selectValue: e.target.value});
    this.props.fetchNewExampleHtml(e.target.value);
  },

  render() {
    return select(
      {value: this.state.selectValue,
      onChange: this.handleChange
      },
      this.renderDropdownItems()
    );
  },

  renderDropdownItems() {
    var options = [];

    for (var file of files) {
      options.push(
        option(
          {key:file.name,
          value: file.path
          },
          file.name
        )
      )
    }
    return options;
  }
})

// No native JavaScript way to get the list of html files
const files = [{
    name: "absolute-occluded-by-relative",
    path: "../sandbox/absolute-occluded-by-relative.html"
}, {
    name: "adding-z-index",
    path: "../sandbox/adding-z-index.html"
}, {
    name: "fixed-occluded-by-relative",
    path: "../sandbox/fixed-occluded-by-relative.html"
}, {
    name: "stacking-and-float",
    path: "../sandbox/stacking-and-float.html"
}, {
    name: "stacking-context-1",
    path: "../sandbox/stacking-context-1.html"
}, {
    name: "stacking-context-2",
    path: "../sandbox/stacking-context-2.html"
}, {
    name: "stacking-context-3",
    path: "../sandbox/stacking-context-3.html"
}, {
    name: "stacking-context",
    path: "../sandbox/stacking-context.html"
}, {
    name: "stacking-without-z-index",
    path: "../sandbox/stacking-without-z-index.html"
}, {
    name: "z-index-onclick",
    path: "../sandbox/z-index-onclick.html"
}];

module.exports = ExamplesDropdown;
