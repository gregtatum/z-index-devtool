const {getText} = require("@tatumcreative/get");

const {
  getStackingContextTree,
  outputNode,
  outputTree,
  findNode,
  compareNodes
} = require("./index");

// Load an example.
function loadExample(event) {
  // Select the container element, and then find the example url.
  const container = document.querySelector("#container");
  const exampleUrl = event.target.value;

  // Get the text at the url.
  getText(exampleUrl).then(text => {
    // Set the container to have that HTML
    container.innerHTML = text;

    const tree = getStackingContextTree(container);

    // Log the stacking context tree.
    console.clear();
    console.log("Loading:" + exampleUrl);
    console.log("Stacking Context Tree:", tree);
    console.log("\nOutput tree:");
    console.log("--------------------");
    console.log(outputTree(tree).join("\n"));

    // Add experiments here!
  });
}

// Initiate the example.
function init() {
  // Get the select element.
  const select = document.querySelector("select");

  // Start by loading the first example.
  loadExample({ target: select });

  // For each button on the page, add a handler to run loadExample when clicked.
  select.addEventListener("change", loadExample);
}

init();
