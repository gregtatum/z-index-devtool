const React = require("react");
const ReactDOM = require("react-dom");
const {createFactory} = require("react");
const {getText} = require("@tatumcreative/get");
const {Provider} = require("react-redux");
const createStore = require("./store.js");

const app = React.createElement(require("./components/app"))

function main() {
  const reduxApp = React.createElement(Provider, {store: createStore()}, app);
  ReactDOM.render(reduxApp, document.querySelector("#app"));
};

main();

// TODO - Migrate this into an action and reducer.

/*

const {
  getStackingContextTree,
  outputNode,
  outputTree,
  findNode,
  compareNodes
} = require("./stacking-context");

function main() {
  const element = document.querySelector("#app")

  function render(props) {
    console.log(props);
    ReactDOM.render(StackingContextTree(props), element);
  }

  render({});

  getText("../sandbox/absolute-occluded-by-relative.html").then(text => {
    // Set the container to have that HTML
    const container = document.querySelector("#container");
    container.innerHTML = text;

    const tree = getStackingContextTree(container);

    // Log the stacking context tree.
    // console.clear();
    console.log("Stacking Context Tree:", tree);
    console.log("\nOutput tree:");
    console.log("--------------------");
    console.log(outputTree(tree).join("\n"));

    render({tree});

    // Add experiments here!
  }, console.error.bind(console));

}
*/
