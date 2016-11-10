/*

!!!!!!!!!!! This is pseudo-code only!

*/
var assert = require('assert');
const {createStoreFixture} = require('./store-fixture');
const {textMarkup, mockGetTextModule} = require('./utils');
const {
  fetchNewDomText,
  getStackingContext,
  expandNode,
  collapseNode
} = require('../src/actions/stacking-context');
const {getDomElt, setupGlobals} = require('./dom');


const store = createStoreFixture();
setupGlobals();

describe('store fixture', function() {
  it('updates store url & text', function() {
    store.dispatch(
      fetchNewDomText('test/test.html', mockGetTextModule)
    ).then(() => {
      assert.equal(store.getState().stackingContext.url, 'test/test.html');
      assert.equal(store.getState().stackingContext.text, textMarkup);
    });
  });
  it('updates store tree', function() {
    var node = getDomElt(store.getState().stackingContext.text);
    store.dispatch(getStackingContext(node));
    //console.log(store.getState().stackingContext.tree);
    assert.notEqual(store.getState().stackingContext.tree, undefined);
    //assert.equal(store.getState().stackingContext.tree.length, 2);
  });
});



//test("Node expanding works", t => {
//  const store = createStoreFixture()
//  const tree = store.getState().stackingContext.tree;
//  const [nodeA, nodeB, nodeC] = tree.nodes;
//
//  store.dispatch(expandNode(nodeA))
//  let expandedNodes = store.getState().stackingContext.expandedNodes
//  t.equals(expandedNodes.length, 1, "The expanded nodes has one thing in it.")
//  t.equals(expandedNodes.get(0), nodeA, "The only thing in here is nodeA.")

//  store.dispatch(expandNode(nodeB))
//  expandedNodes = store.getState().stackingContext.expandedNodes
//  // todo

//  store.dispatch(expandNode(nodeC))
//  expandedNodes = store.getState().stackingContext.expandedNodes
  // todo

//  store.dispatch(collapseNode(nodeB))
//  expandedNodes = store.getState().stackingContext.expandedNodes
  // todo

//})
