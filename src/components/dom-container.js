const {DOM, createClass} = require("react");
const {div} = DOM;
const React = require("react");
const {
  expandNode,
  selectStackingContextNode,
  computeBoundingRect,
  toggleSelector
} = require("../actions/stacking-context");

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
    let isSelectorActive = store.getState().stackingContext.isSelectorActive;
    return div({
      className: "dom-container",
      ref: (div) => this._div = div,
      style: isSelectorActive ? {cursor: "pointer"} : {},
      dangerouslySetInnerHTML: {__html: text},
      onScroll: () => {
        store.dispatch(computeBoundingRect(store.getState().stackingContext.selElt))
      },
      onClick: (event) => {
        // only allow 'click to select' if selector button is active
        if (isSelectorActive) {
          event.persist();
          let element = document.elementFromPoint(event.clientX, event.clientY);
          let tree = store.getState().stackingContext.tree;
          let node = getTreeObject(element, tree);
          if (node) {
            store.dispatch(selectStackingContextNode(node));
            let parent = node.parentStackingContext;
            while (parent) {
              store.dispatch(expandNode(parent));
              parent = parent.parentStackingContext;
            }
            store.dispatch(toggleSelector()); // disable selector
          }
        }
      }
    });
  }
});

function getTreeObject(el, tree) {
  let nodeObject;
  for (let child of tree) {
    if (child.el === el) {
      nodeObject = child;
    }
    else if (nodeObject === undefined && child.stackingContextChildren) {
      nodeObject = getTreeObject(el, child.stackingContextChildren);
    }
  }
  return nodeObject;
}

DomContainer.contextTypes = {
  store: React.PropTypes.object
};

module.exports = DomContainer;
