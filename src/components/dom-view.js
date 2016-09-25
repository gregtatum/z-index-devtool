const {DOM, createClass, createFactory} = require("react");
const {div} = DOM;

const DomView= createFactory(createClass({
  displayName: "DOMView",

  render() {
    return div(
      {id:"container"}
    );
  }
}));

module.exports = DomView
