const React = require("react");
const ReactDOM = require("react-dom");
const {createElement} = require("react");
const StackingContextTree = require("./components/stacking-context-tree");
const {getText} = require("@tatumcreative/get");

const {
  getStackingContextTree,
  outputNode,
  outputTree,
  findNode,
  compareNodes
} = require("./stacking-context");

function main() {
  const element = document.querySelector("#app")
  const treeProps = {};

  function render() {
    ReactDOM.render(createElement(StackingContextTree, treeProps), element);
  }

  render();

  getText("../sandbox/absolute-occluded-by-relative.html").then(text => {
    // Set the container to have that HTML
    const container = document.querySelector("#container");
    container.innerHTML = text;

    const tree = getStackingContextTree(container);

    // Log the stacking context tree.
    console.clear();
    console.log("Stacking Context Tree:", tree);
    console.log("\nOutput tree:");
    console.log("--------------------");
    console.log(outputTree(tree).join("\n"));

    // Add experiments here!
  }, console.error.bind(console));

}

main();
