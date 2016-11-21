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

function isElement(el) {
  return el.nodeType && el.nodeType === Node.ELEMENT_NODE;
}

function getStackingContextProperties(el) {
  if (!isElement(el)) {
    return undefined;
  }

  let win = getWin(el);
  let style = win.getComputedStyle(el);
  let parentEl = el.parentNode;
  let parentStyle = parentEl && isElement(parentEl)
                    ? win.getComputedStyle(parentEl)
                    : {};
  let nodeProperties = {
    isStacked: style.zIndex !== "auto",
    zindex: style.zIndex,
    isRoot: el === el.ownerDocument.documentElement,
    position: style.position,
    isFlexItem: parentStyle.display === "flex" || parentStyle.display === "inline-flex",
    opacity: style.opacity,
    transform: style.transform,
    mixBlendMode: style.mixBlendMode,
    filter: style.filter,
    perspective: style.perspective,
    isIsolated: style.isolation === "isolate",
    willChange: style.willChange,
    hasTouchOverflowScrolling: style.WebkitOverflowScrolling === "touch"
  }

  nodeProperties.isStackingContext = isStackingContext(nodeProperties);

  return nodeProperties;
}

function isStackingContext(properties) {
  let willChange = properties.willChange.split(", ").some(p => {
    return p === "position" || p === "opacity" ||
           p === "transform" || p === "filter" ||
           p === "perspective" || p === "isolation";
  });
  return properties.isRoot ||
         (properties.isStacked && (properties.position === "relative" || properties.position === "absolute")) ||
         (properties.isStacked && properties.isFlexItem) ||
         properties.opacity !== "1"||
         properties.transform !== "none"||
         properties.mixBlendMode !== "normal"||
         properties.filter !== "none"||
         properties.perspective !== "none"||
         properties.isIsolated ||
         properties.position === "fixed" ||
         willChange ||
         properties.hasTouchOverflowScrolling;
}

function getStackingContextTree(root, treeNodes = [], parentElement) {
  let counter = 0;
  for (let child of root.children) {
    let newNode;
    if (child.tagName === "DIV" || child.tagName === "SPAN") {
      let stackingContextProperties = getStackingContextProperties(child);
      let parentStackingContext = (parentElement === undefined) ? undefined :
                                  (parentElement.properties.zindex === "auto") ? parentElement.parentStackingContext :
                                  parentElement;
      let index = (parentElement === undefined) ? stackingContextProperties.zindex :
                  (parentElement.properties.zindex === "auto") ? stackingContextProperties.zindex :
                  parentElement.index + " > " + stackingContextProperties.zindex;
      newNode = {
        el: child,
        key: (parentElement === undefined) ? counter++ : parentElement.key + "-" + counter++,
        index,
        nodes: [],
        stackingContextChildren: [],
        parentElement,
        parentStackingContext,
        properties: stackingContextProperties
      };
      treeNodes.push(newNode);
    }

    // Recurse through children.
    var childrenNodes;
    if (child.childElementCount) {
      childrenNodes = getStackingContextTree(child,
                             (newNode && (newNode.properties.zindex !== "auto")) ? newNode.nodes : treeNodes,
                             newNode || parent);
      if (newNode.properties.zindex !== "auto") {
         newNode.stackingContextChildren = childrenNodes;
      }
    }
  }

  treeNodes = sortNodesByZIndex(treeNodes);
  console.log(treeNodes);
  return treeNodes;
}

function sortNodesByZIndex(tree) {
  tree.sort(function(a, b){return a.index > b.index});
  return tree;
}

function childrenElementsAreStacked(node) {
  for (let child of node.children) {
    let stackingContextProperties = getStackingContextProperties(child);
    if (stackingContextProperties.isStacked || stackingContextProperties.isStackingContext) {
      return true;
    } else if (child.childElementCount) {
      childrenElementsAreStacked(child);
    }
  }
  return false;
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

function flattenTreeWithDepth(tree = [], depth = 0) {
  return tree.reduce((previousValue, node) => {
    return [
      ...previousValue,
      Object.assign({depth}, node),
      ...flattenTreeWithDepth(node.nodes, depth + 1)
    ];
  }, [])
}

module.exports = {
  getStackingContextTree,
  outputNode,
  outputTree,
  findNode,
  compareNodes,
  flattenTreeWithDepth
};
