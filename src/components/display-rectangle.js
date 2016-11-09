const {DOM, createClass} = require("react");
const {div, canvas} = DOM;
const React = require("react");
const {computeBoundingRect} = require("../actions/stacking-context");

const DisplayRectangle = createClass({
    getBoundingRect(elt) {
      const {store} = this.context;
      this.setState({
        boundingRect: store.getState().stackingContext.displayRect
      })
    },

    //experiments with using MutationObserver
    //as yet unsuccessful
    observeMutations(elt) {
      //disconnect any old observer
      if (this.state.observer){
        this.state.observer.disconnect();
      }
      //if there is an element add a new observer
      if (elt){
        const observer = new MutationObserver(function(){
          console.log("mutation observed!");
          const {store} = this.context;
          store.dispatch(computeBoundingRect(elt));
        });
        observer.observe(elt, {attributes:true, childList: true, subtree: true});
        this.setState({
          observer: observer
        });
      }
    },

    handleResize() {
      const {store} = this.context;
      store.dispatch(computeBoundingRect(this.props.elt));
    },

    getInitialState(){
      return {
        observer: undefined,
        handleResize: this.handleResize.bind(this)
      };
    },

    componentWillReceiveProps(props) {
      this.getBoundingRect(props.elt);
      //this.observeMutations(props.elt);
    },

    componentWillMount() {
      window.addEventListener('resize', this.state.handleResize);
      this.getBoundingRect(this.props.elt);
      //this.observeMutations(this.props.elt);
    },

    componentWillUnmount() {
       window.removeEventListener('resize', this.state.handleResize);
      //this.observeMutations(undefined);
    },

    render: function() {
      const boundingRect = this.state.boundingRect;
      //not really used right now, but if introduce toggling behaviour could
      //be useful...
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
