(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.getText = function(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest()
    req.responseType = "text"
    req.addEventListener("load", function() {
      if(this.status >= 200 && this.status < 300) {
        resolve(this.response)
      } else {
        reject(this)
      }
    })
    req.open("GET", url)
    req.send()
  })
}

exports.getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest()
    req.responseType = "text"
    req.addEventListener("load", function() {
      if(this.status >= 200 && this.status < 300) {
        try {
          // Try parsing this ourselves, instead of using responseType "json".
          // We can't detect the error in JSON if using the built-in.
          resolve(JSON.parse(this.response))
        } catch(error) {
          reject(error)
        }
      } else {
        reject(this)
      }
    })
    req.open("GET", url)
    req.send()
  })
}

exports.getImageData = function(url) {
  return new Promise(function(resolve, reject) {
    var img = new Image()
    img.addEventListener('load', () => {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      resolve(ctx.getImageData(0, 0, canvas.width, canvas.height))
    })
    img.addEventListener('error', reject)
    img.src = url
  })
}

exports.getImage = function(url) {
  return new Promise(function(resolve, reject) {
    var img = new Image()
    img.addEventListener('load', () => {
      resolve(img)
    })
    img.addEventListener('error', reject)
    img.src = url
  })
}

},{}],2:[function(require,module,exports){
/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 *
 * A stacking context is formed, anywhere in the document, by any element which is either
 *
 * - the root element (HTML),
 * - positioned (absolutely or relatively) with a z-index value other than "auto",
 * - a flex item with a z-index value other than "auto",that is the parent element display: flex|inline-flex,
 * - elements with an opacity value less than 1. (See the specification for opacity),
 * - elements with a transform value other than "none",
 * - elements with a mix-blend-mode value other than "normal",
 * - elements with a filter value other than "none",
 * - elements with a perspective value other than "none",
 * - elements with isolation set to "isolate",
 * - position: fixed
 * - specifying any attribute above in will-change even if you don't specify values for these attributes directly
 * - elements with -webkit-overflow-scrolling set to "touch"
 */
function getWin(el) {
  return el.ownerDocument.defaultView;
}

function isStacked(el) {
  return getWin(el).getComputedStyle(el).zIndex !== "auto";
}

function isElement(el) {
  return el.nodeType && el.nodeType === Node.ELEMENT_NODE;
}

function isStackingContext(el) {
  if (!isElement(el)) {
    return false;
  }

  let win = getWin(el);
  let style = win.getComputedStyle(el);
  let parentEl = el.parentNode;
  let parentStyle = parentEl && isElement(parentEl)
                    ? win.getComputedStyle(parentEl)
                    : {};

  let isRoot = el === el.ownerDocument.documentElement;
  let isPositioned = style.position === "relative" || style.position === "absolute";
  let hasNonAutoZIndex = isStacked(el);
  let isFlexItem = parentStyle.display === "flex" || parentStyle.display === "inline-flex";
  let isNotOpaque = style.opacity !== "1";
  let isTransformed = style.transform !== "none";
  let hasMixBlendMode = style.mixBlendMode !== "normal";
  let isFiltered = style.filter !== "none";
  let hasPerspective = style.perspective !== "none";
  let isIsolated = style.isolation === "isolate";
  let isFixed = style.position === "fixed";
  let willChange = style.willChange.split(", ").some(p => {
    return p === "position" || p === "opacity" ||
           p === "transform" || p === "filter" ||
           p === "perspective" || p === "isolation";
  });
  let hasTouchOverflowScrolling = style.WebkitOverflowScrolling === "touch";

  return isRoot ||
         (hasNonAutoZIndex && isPositioned) ||
         (hasNonAutoZIndex && isFlexItem) ||
         isNotOpaque ||
         isTransformed ||
         hasMixBlendMode ||
         isFiltered ||
         hasPerspective ||
         isIsolated ||
         isFixed ||
         willChange ||
         hasTouchOverflowScrolling;
}

function getStackingContextTree(root, treeNodes = [], parent) {
  for (let child of root.children) {
    let isChildStacked = isStacked(child);
    let isChildStackingContext = isStackingContext(child);
    let newNode;

    if (isChildStacked || isChildStackingContext) {
      newNode = {
        el: child,
        isStacked: isChildStacked,
        index: isChildStacked ? parseInt(getComputedStyle(child).zIndex, 10) : undefined,
        isStackingContext: isChildStackingContext,
        nodes: [],
        parent
      };
      treeNodes.push(newNode);
    }

    // Recurse through children.
    if (child.childElementCount) {
      getStackingContextTree(child,
                             newNode && isChildStackingContext ? newNode.nodes : treeNodes,
                             newNode || parent);
    }
  }

  return treeNodes;
}

function outputNode({el, isStackingContext, isStacked, index}) {
  return el.tagName.toLowerCase() +
         (el.id.trim() !== "" ? "#" + el.id.trim() : "") +
         (el.className && el.className.trim && el.className.trim() !== "" ? "." + el.className.trim().split(" ").join(".") : "") +
         (isStackingContext ? " [CONTEXT]" : "") +
         (isStacked ? ` [${index}]` : "");
}

function outputTree(tree, indent = "", output = []) {
  for (let node of tree) {
    let out = outputNode(node);
    output.push(indent + outputNode(node));
    if (node.nodes) {
      outputTree(node.nodes, indent + "  ", output);
    }
  }
  return output;
}

function findNode(tree, node) {
  for (let item of tree) {
    if (item.el === node) {
      return item;
    }
    if (item.nodes) {
      let candidate = findNode(item.nodes, node);
      if (candidate) {
        return candidate;
      }
    }
  }
}

function compareNodes(tree, node1, node2) {
  // Get the item in the stack tree corresponding to node1.
  let item1 = findNode(tree, node1);
  // And get the list of its parent leading up to the root.
  let parents1 = [];
  let item = item1;
  while (item.parent) {
    parents1.push(item.parent);
    item = item.parent;
  }

  // Do the same for node2.
  let item2 = findNode(tree, node2);
  let parents2 = [];
  item = item2;
  while (item.parent) {
    parents2.push(item.parent);
    item = item.parent;
  }

  // Now find the common root in these 2 lists of parents and the sub branches from it.
  let commonRoot;
  let subParents1 = [];
  let subParents2 = [];
  for (let parent1 of parents1) {
    subParents1.push(parent1);
    subParents2 = [];
    for (let parent2 of parents2) {
      subParents2.push(parent2);
      if (parent1 === parent2) {
        commonRoot = parent1;
        break;
      }
    }
    if (commonRoot) {
      break;
    }
  }
  subParents1.reverse().push(item1);
  subParents2.reverse().push(item2);

  // And now display only these 2 sub branches, from the common
  // root to node1 and node2.
  console.log(subParents1.map(outputNode).join(" --> "));
  console.log(subParents2.map(outputNode).join(" --> "));
}

module.exports = {
  getStackingContextTree,
  outputNode,
  outputTree,
  findNode,
  compareNodes
};

},{}],3:[function(require,module,exports){
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

  // Start by loading the first  example.
  loadExample({ target: select });

  // For each button on the page, add a handler to run loadExample when clicked.
  select.addEventListener("change", loadExample);
}

init();

},{"./index":2,"@tatumcreative/get":1}]},{},[3]);
