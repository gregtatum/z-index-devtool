const {DOM, createClass} = require("react");
const {div} = DOM;
const React = require("react");
const {computeBoundingRect} = require("../actions/stacking-context");

/**
 * Container for the DOM. Takes in a single <div> element and displays it.
 */
const DomContainer = createClass({

  componentDidUpdate(prevProps, prevState) {
    if (this.props.text !== prevProps.text) {
      this.props.newTextReceived(this._div);
    }
  },

  render() {
    const {text} = this.props;
    const {store} = this.context;
    return div({
      className: "dom-container",
      ref: (div) => this._div = div,
      dangerouslySetInnerHTML: {__html: text},
      onScroll: () => {
        store.dispatch(computeBoundingRect(store.getState().stackingContext.selElt))
      }
    });
  }
});

DomContainer.contextTypes = {
  store: React.PropTypes.object
};

module.exports = DomContainer;
