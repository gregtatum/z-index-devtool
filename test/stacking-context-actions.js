/*

!!!!!!!!!!! This is pseudo-code only!

*/
const test = require('test');
const createStoreFixure = require('./store-fixture')
const {expandNode, collapseNode} = require('../src/actions/stacking-context')

test("Node expanding works", t => {
  const store = createStoreFixture()
  const tree = store.getState().stackingContext.tree;
  const [nodeA, nodeB, nodeC] = tree.nodes;

  store.dispatch(expandNode(nodeA))
  let expandedNodes = store.getState().stackingContext.expandedNodes
  t.equals(expandedNodes.length, 1, "The expanded nodes has one thing in it.")
  t.equals(expandedNodes.get(0), nodeA, "The only thing in here is nodeA.")

  store.dispatch(expandNode(nodeB))
  expandedNodes = store.getState().stackingContext.expandedNodes
  // todo

  store.dispatch(expandNode(nodeC))
  expandedNodes = store.getState().stackingContext.expandedNodes
  // todo

  store.dispatch(collapseNode(nodeB))
  expandedNodes = store.getState().stackingContext.expandedNodes
  // todo

})
