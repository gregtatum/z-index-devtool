const Redux = require("redux");
const {default: thunkMiddleware} = require("redux-thunk");
const reducers = require("../src/reducers");

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
