const {DOM, createClass} = require("react");
const {div, select, option, label, span} = DOM;
const {getText} = require("@tatumcreative/get");

const ExamplesDropdown = createClass({
  displayName: "ExamplesDropdown",

  getInitialState() {
    return { selectValue: "stacking-context-1.html" };
  },

  handleChange(e) {
    // TODO, remove any state from component, do this from Redux
    this.setState({selectValue: e.target.value});
    this.props.fetchNewExampleHtml(e.target.value);
  },

  render() {
    return div({className: "examples-dropdown devtools-toolbar"},
      label({title: "Change the markup example"},
        span({}, "Example: "),
        select(
          {
            value: this.state.selectValue,
            onChange: this.handleChange
          },
          files.map(file => option(
            {key:file.name, value: file.path},
            file.name
          ))
        )
      )
    );
  }
})

// No native JavaScript way to get the list of html files
const files = [{
    name: "absolute-occluded-by-relative",
    path: "examples/absolute-occluded-by-relative.html"
}, {
    name: "adding-z-index",
    path: "examples/adding-z-index.html"
}, {
    name: "fixed-occluded-by-relative",
    path: "examples/fixed-occluded-by-relative.html"
}, {
    name: "stacking-and-float",
    path: "examples/stacking-and-float.html"
}, {
    name: "stacking-context-1",
    path: "examples/stacking-context-1.html"
}, {
    name: "stacking-context-2",
    path: "examples/stacking-context-2.html"
}, {
    name: "stacking-context-3",
    path: "examples/stacking-context-3.html"
}, {
    name: "stacking-context",
    path: "examples/stacking-context.html"
}, {
    name: "stacking-without-z-index",
    path: "examples/stacking-without-z-index.html"
}, {
    name: "z-index-onclick",
    path: "examples/z-index-onclick.html"
}];

module.exports = ExamplesDropdown;
