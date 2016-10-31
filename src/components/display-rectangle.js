const {DOM, createClass} = require("react");
const {div, canvas} = DOM;
const React = require("react");

const DisplayRectangle = createClass({
    render: function() {
      const {elt} = this.props;
      const boundingRect = (elt) ? elt.getBoundingClientRect() : undefined;
      const hasNodeClass = (boundingRect) ? 'has-node' : 'no-node';
      return div(
        {
            className: "display-rectangle "+hasNodeClass,
            //ref:'canvas',//call save el
            style:{
              width:(boundingRect)? boundingRect.width +'px' : 0,
              height:(boundingRect)? boundingRect.height +'px' : 0,
              top: (boundingRect)? boundingRect.top +'px' : 0,
              left: (boundingRect)? boundingRect.left +'px' : 0
            }
        }
      );

  }
});

DisplayRectangle.contextTypes = {
  store: React.PropTypes.object
};

module.exports = DisplayRectangle;
