const Redux = require("redux");
const {default: thunkMiddleware} = require("redux-thunk");
const reducers = require("../../src/reducers");
const {
  fetchNewDomText,
  getMockStackingContext
} = require('../../src/actions/stacking-context');
const {mockGetTextModule} = require('./utils');

function getStore() {
  return Redux.createStore(
    reducers,
    Redux.applyMiddleware(thunkMiddleware)
  );
};

function createStoreFixture(){
  const store = getStore();
  return store.dispatch(
    fetchNewDomText('test/test.html', mockGetTextModule)
  ).then(() => {
    var node = {};
    store.dispatch(getMockStackingContext(node));
    return store;
  });
};

module.exports = {createStoreFixture}
