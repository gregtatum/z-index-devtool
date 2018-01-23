import React, { DOM, createFactory, createClass, createElement } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import createStore from "./store.js";

import { connectToInspectedWindow } from "./bootstrap";

const { div } = DOM;

import {
  fetchNewDomText,
  getStackingContextTree,
  selectStackingContextNode,
  toggleNode,
  toggleSelector
} from "./actions/stacking-context";

import SCTreeView from "./components/stacking-context-tree-view";
import SCNodeInfo from "./components/stacking-context-node-info";
const StackingContextTreeView = createFactory(SCTreeView);
const StackingContextNodeInfo = createFactory(SCNodeInfo);

let Panel = createFactory(
  createClass({
    displayName: "Panel",
    componentDidMount() {
      const { dispatch } = this.props;
      connectToInspectedWindow({ dispatch });
      getStackingContextTree("body");
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
