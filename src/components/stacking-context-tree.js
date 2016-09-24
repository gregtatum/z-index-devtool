const {DOM, createClass} = require("react");
const {div} = DOM;

const StackingContextTree = createClass({
  render: function() {
    const {} = this.props;

    return div(
      {className: "app"},
      ""
    );
  }
});

module.exports = StackingContextTree;
