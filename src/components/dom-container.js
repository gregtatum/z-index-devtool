const {DOM, createClass} = require("react");
const {div} = DOM;

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

      return div({
        className: "dom-container",
        ref: (div) => this._div = div,
        dangerouslySetInnerHTML: {__html: text}
      });
    }
});

module.exports = DomContainer;
