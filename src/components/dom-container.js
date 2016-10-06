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
            // not sure how DOM will be passed in yet
            html
        );
    }
});

module.exports = DomContainer;
