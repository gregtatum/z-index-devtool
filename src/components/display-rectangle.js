const {DOM, createClass} = require("react");
const {div, canvas} = DOM;
const React = require("react");

const DisplayRectangle = createClass({
    componentDidMount() {
        this.updateCanvas();
    },

    extractFromStore() {
      const {store} = this.context;
      const {selNode} = store.getState().stackingContext;
      var boundingRect = undefined;
      if (selNode){
        //Won't adapt responsively, i think....
        boundingRect = selNode.el.getBoundingClientRect();
        console.log(boundingRect);
      }
      return boundingRect;
    },

    updateCanvas() {
      const boundingRect = this.extractFromStore();
      const ctx = this.refs.canvas.getContext('2d');
      if (boundingRect){
        ctx.fillRect(boundingRect.left,boundingRect.top, boundingRect.width, boundingRect.height);
      } else {
        ctx.fillRect(10,10, 50, 50);
      }
    },

    render: function() {
      const boundingRect = this.extractFromStore();
      const hasNodeClass = (boundingRect) ? 'has-node' : 'no-node';
      return canvas(
        {
            className: "display-rectangle "+hasNodeClass,
            ref:'canvas'
        }
      );

  }
});

DisplayRectangle.contextTypes = {
  store: React.PropTypes.object
};

module.exports = DisplayRectangle;
