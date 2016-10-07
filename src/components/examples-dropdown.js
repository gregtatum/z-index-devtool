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
    const container = document.querySelector("#container");
    // Get the text at the url.
    getText(e.target.value).then(text => {
      container.innerHTML = text;
    });
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
    var items = [{
        name: "stacking-context-1.html",
        path: "../sandbox/stacking-context-1.html"
    }, {
        name: "stacking-context-2.html",
        path: "../sandbox/stacking-context-2.html"
    }, {
        name: "stacking-context-3.html",
        path: "../sandbox/stacking-context-3.html"
    }];

    for (var item of items) {
      options.push(
        option(
          {key:item.name,
          value: item.path
          },
          item.name
        )
      )
    }
    return options;
  }
})

module.exports = ExamplesDropdown;
