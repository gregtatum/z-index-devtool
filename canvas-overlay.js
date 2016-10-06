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

function getNodeName(el) {
  return el.tagName.toLowerCase() +
         (el.id.trim() !== "" ? "#" + el.id.trim() : "") +
         (el.className && el.className.trim && el.className.trim() !== "" ? "." + el.className.trim().split(" ").join(".") : "")
}

function outputNode({el, isStackingContext, isStacked, index}) {
  return getNodeName(el) +
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

// console.log(outputTree(tree).join("\n"))

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

var tree = getStackingContextTree(document);

function getTreePositioning(nodes) {
  return nodes.map(node => {
    return Object.assign({}, node, {
      style: window.getComputedStyle(node.el),
      nodes: getTreePositioning(node.nodes)
    });
  })
}

function initCanvas() {
  const canvas = document.createElement('canvas');
  const bodyStyle = window.getComputedStyle(document.body);
  const ratio = window.devicePixelRatio;
  const width = parseInt(bodyStyle.width, 10);
  const height = parseInt(bodyStyle.height, 10);

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  document.body.appendChild(canvas);

  Object.assign(canvas.style, {
    top: 0,
    left: 0,
    position: "absolute",
    pointerEvents: "none"
  });

  const ctx = canvas.getContext("2d");

  ctx.scale(ratio, ratio);

  return ctx;
}

const ROOT_POSITION = {
  top: 0,
  left: 0
}

function draw(node, ctx) {
  // Bail early if this is fixed or not visible.
  const style = node.style;
  const computed = window.getComputedStyle(node);
  if (style.position === "fixed" || computed.display === "none") {
    return;
  }

  const bounds = node.getBoundingClientRect();
  const top = bounds.top + window.scrollY;
  const left = bounds.left + window.scrollX;
  const width = node.offsetWidth;
  const height = node.offsetHeight;

  ctx.strokeStyle = "#5f5";
  ctx.fillStyle = "#5f5";
  // ctx.fillText(getNodeName(node), absLeft, absTop);
  ctx.strokeRect(top, left, width, height);

  [...node.children].forEach(node => draw(node, ctx))
}

tree = draw(document.body, initCanvas());
