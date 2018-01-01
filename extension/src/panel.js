const React = require("react");
const ReactDOM = require("react-dom");
const { DOM, createFactory, createClass, createElement } = require("react");
const { div } = DOM;
const { Provider, connect } = require("react-redux");
const createStore = require("./store.js");

const {
  fetchNewDomText,
  getStackingContextTree,
  addStackingContext,
  selectStackingContextNode,
  computeBoundingRect,
  toggleNode,
  toggleSelector
} = require("./actions/stacking-context");

const StackingContextTreeView = createFactory(
  require("./components/stacking-context-tree-view")
);
const StackingContextNodeInfo = createFactory(
  require("./components/stacking-context-node-info")
);

let Panel = createFactory(
  createClass({
    displayName: "Panel",
    componentDidMount() {
      const { dispatch } = this.props;
      // Handle messages from the background script
      browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.tabId !== browser.devtools.inspectedWindow.tabId) {
          return;
        }
        switch (request.action) {
          case "SET_STACKING_CONTEXT_TREE":
            dispatch(addStackingContext(request.data.tree));
        }
      });
      getStackingContextTree(".dom-container");
    },
    render() {
      const { dispatch, stackingContext } = this.props;
      return div(
        { className: "sidebar" },
        StackingContextTreeView({
          tree: stackingContext.tree,
          expandedNodes: stackingContext.expandedNodes,
          selectedNode: stackingContext.selectedNode,
          isSelectorActive: stackingContext.isSelectorActive,
          selectNode: node => dispatch(selectStackingContextNode(node)),
          computeBoundingRect: node => dispatch(computeBoundingRect(node)),
          toggleNode: node => dispatch(toggleNode(node)),
          toggleSelector: node => dispatch(toggleSelector())
        }),
        StackingContextNodeInfo()
      );
    }
  })
);

Panel = connect(function(state) {
  return state;
})(Panel);

const reduxApp = createElement(
  Provider,
  { store: createStore() },
  createElement(Panel)
);
ReactDOM.render(reduxApp, document.querySelector("#panel"));
