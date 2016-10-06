const {DOM, createClass} = require("react");
const {div} = DOM;

/**
 * Container for the DOM. Takes in a single <div> element and displays it.
 */
const DomContainer = createClass({
    render() {
        const {html} = this.props;

        return div(
            {className: "dom-container"},
            // DOM will be passed in via Redux's store
            html
        );
    }
});

module.exports = DomContainer;
