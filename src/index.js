const React = require("react");
const ReactDOM = require("react-dom");
const { createFactory } = require("react");
const { Provider } = require("react-redux");
const createStore = require("./store.js");

const app = React.createElement(require("./components/app"));

function main() {
  const reduxApp = React.createElement(Provider, { store: createStore() }, app);
  ReactDOM.render(reduxApp, document.querySelector("#app"));
}

main();
