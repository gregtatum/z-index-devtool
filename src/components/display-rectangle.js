const {DOM, createClass} = require("react");
const {div, canvas} = DOM;
const React = require("react");

const DisplayRectangle = createClass({
  render: function () {
    const {store} = this.context;
    const {selNode} = store.getState().stackingContext;
    var boundingRect = undefined;
    if (selNode) {
      //Won't adapt responsively, i think....
      boundingRect = selNode.el.getBoundingClientRect();
      console.log(boundingRect);
    }
    const hasNodeClass = (boundingRect) ? 'has-node' : 'no-node';
    return canvas(
      {
        className: "display-rectangle " + hasNodeClass
      }
    );
  }
});

DisplayRectangle.contextTypes = {
  store: React.PropTypes.object
};

module.exports = DisplayRectangle;
