var assert = require('assert');
const {createStoreFixture} = require('./fixtures/store-fixture');
const {textMarkup, mockGetTextModule} = require('./fixtures/utils');
const {
  expandNode,
  collapseNode
} = require('../src/actions/stacking-context');

describe('store fixture', function() {
    it('has url & text', function() {
      createStoreFixture().then((store) =>{
        assert.equal(store.getState().stackingContext.url, 'test/test.html');
        assert.equal(store.getState().stackingContext.text, textMarkup);
      });
    });
    it('has tree', function() {
      createStoreFixture().then((store) =>{
        assert.notEqual(store.getState().stackingContext.tree, undefined);
        assert.equal(store.getState().stackingContext.tree.length, 2);
      })
    });
});

describe('node expansion', function() {
  it('expand first tree node', function() {
    createStoreFixture().then((store) =>{
      let expandedNodes = store.getState().stackingContext.expandedNodes;
      const tree = store.getState().stackingContext.tree;
      store.dispatch(expandNode(tree[0]));
      assert.equal(expandedNodes.size, 1);
      assert.equal(expandedNodes.get(0), tree[0]);
    });
  });

  it('expand two tree nodes', function() {
    createStoreFixture().then((store) =>{
      let expandedNodes = store.getState().stackingContext.expandedNodes;
      const tree = store.getState().stackingContext.tree;
      store.dispatch(expandNode(tree[0]));
      store.dispatch(expandNode(tree[1]));
      assert.equal(expandedNodes.size, 2);
      assert.equal(expandedNodes.get(1), tree[1]);
    });
  });

  //todo: child nodes
});

describe('node collapse', function() {
  it('collapse first tree node', function() {
    createStoreFixture().then((store) =>{
      let expandedNodes = store.getState().stackingContext.expandedNodes;
      const tree = store.getState().stackingContext.tree;
      store.dispatch(expandNode(tree[0]));
      store.dispatch(expandNode(tree[1]));
      store.dispatch(collapseNode(tree[0]));
      assert.equal(expandedNodes.size, 1);
      assert.notEqual(expandedNodes.has(tree[0]), true);
    });
  });

  it('collapse two tree nodes', function() {
    createStoreFixture().then((store) =>{
      let expandedNodes = store.getState().stackingContext.expandedNodes;
      const tree = store.getState().stackingContext.tree;
      store.dispatch(expandNode(tree[0]));
      store.dispatch(expandNode(tree[1]));
      store.dispatch(collapseNode(tree[0]));
      store.dispatch(collapseNode(tree[1]));
      assert.equal(expandedNodes.size, 0);
      assert.notEqual(expandedNodes.has(tree[1]), true);
    });
  });

  //todo: child nodes
});
