const Redux = require("redux");
const {default: thunkMiddleware} = require("redux-thunk");
const reducers = require("../../src/reducers");
const {
  fetchNewDomText,
  getMockStackingContext
} = require('../../src/actions/stacking-context');

function getStore() {
  return Redux.createStore(
    reducers,
    Redux.applyMiddleware(thunkMiddleware)
  );
};

function createStoreFixture(){
  return getStore();
};

module.exports = {createStoreFixture}
