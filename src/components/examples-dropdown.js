const {DOM, createClass} = require("react");
const {div, select, option, label, span} = DOM;
const React = require("react");
const {getText} = require("@tatumcreative/get");

const ExamplesDropdown = createClass({
  displayName: "ExamplesDropdown",

  render() {
    const {store} = this.context;
    const {url} = store.getState().stackingContext;
    return div({className: "examples-dropdown devtools-toolbar"},
      label({title: "Change the markup example"},
        span({}, "Example: "),
        select(
          {
            value: url,
            onChange: (event) => {
              this.props.fetchNewExampleHtml(event.target.value);
              //store.dispatch(fetchNewDomText(event.target.value));
            }
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

ExamplesDropdown.contextTypes = {
  store: React.PropTypes.object
};

module.exports = ExamplesDropdown;
