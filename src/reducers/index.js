const Redux = require("redux");

module.exports = Redux.combineReducers({
  stackingContext: require("./stacking-context")
});
