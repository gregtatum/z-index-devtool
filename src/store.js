const Redux = require("redux");
const {default: thunkMiddleware} = require("redux-thunk");
const loggerMiddleware = require("redux-logger")({logErrors: false});
const reducers = require("./reducers");

module.exports = function getStore() {
  return Redux.createStore(
    reducers,
    Redux.applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
};
