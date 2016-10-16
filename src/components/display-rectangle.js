const {DOM, createClass} = require("react");
const {div} = DOM;
const React = require("react");
//const {selectStackingContextNode} = require("../actions/stacking-context");

const DisplayRectangle = createClass({
    render: function() {
      const {store} = this.context;
      const st = store.getState().stackingContext;
      const {selNode} = store.getState().stackingContext;
      var boundingRect = undefined;
      debugger;
      if (selNode){
        boundingRect = selNode.el.getBoundingClientRect();
        console.log(boundingRect);
      }
      const displayValue = (boundingRect) ? 'block' : 'none';
      return div(
        {
            className: "display-rectangle",
            style: {display: displayValue}
        }
      );
  }
});

DisplayRectangle.contextTypes = {
  store: React.PropTypes.object
};

module.exports = DisplayRectangle;
