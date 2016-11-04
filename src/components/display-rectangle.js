const {DOM, createClass} = require("react");
const {div, canvas} = DOM;
const React = require("react");

const DisplayRectangle = createClass({

    // TODO - The bounding rect needs to be updated if there are DOM mutation events
    // on the page that is being targetted. See
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver for more
    // information on correctly handling this.
    computeBoundingRect(elt) {
      this.setState({
        boundingRect: (elt) ? elt.getBoundingClientRect() : undefined
      })
    },

    getInitialState() {
      return {
        handleResize: this.handleResize.bind(this)
      }
    },

    handleResize() {
      this.computeBoundingRect(this.props.elt);
    },

    componentWillReceiveProps(props) {
      this.computeBoundingRect(props.elt);
    },

    componentWillMount() {
      this.computeBoundingRect(this.props.elt);
      window.addEventListener('resize', this.state.handleResize);
    },

    componentWillUnmount() {
      window.removeEventListener('resize', this.state.handleResize);
    },

    render: function() {
      const boundingRect = this.state.boundingRect;
      const hasNodeClass = (boundingRect) ? 'has-node' : 'no-node';
      return div(
        {
            className: "display-rectangle "+hasNodeClass,
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
