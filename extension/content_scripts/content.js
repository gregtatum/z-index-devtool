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
const INCLUDE_HTML_TAGS = ["DIV", "SPAN", "P", "IMG", "TITLE"];

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
  let parentStyle =
    parentEl && isElement(parentEl) ? win.getComputedStyle(parentEl) : {};
  let nodeProperties = {
    isStacked: style.zIndex !== "auto",
    zindex: style.zIndex,
    isRoot: el === el.ownerDocument.documentElement,
    position: style.position,
    isFlexItem:
      parentStyle.display === "flex" || parentStyle.display === "inline-flex",
    opacity: style.opacity,
    transform: style.transform,
    mixBlendMode: style.mixBlendMode,
    filter: style.filter,
    perspective: style.perspective,
    isIsolated: style.isolation === "isolate",
    willChange: style.willChange,
    hasTouchOverflowScrolling: style.WebkitOverflowScrolling === "touch"
  };

  nodeProperties.isStackingContext = isStackingContext(nodeProperties);

  return nodeProperties;
}

function isStackingContext(properties) {
  let willChange = properties.willChange.split(", ").some(p => {
    return (
      p === "position" ||
      p === "opacity" ||
      p === "transform" ||
      p === "filter" ||
      p === "perspective" ||
      p === "isolation"
    );
  });
  return (
    properties.isRoot ||
    (properties.isStacked &&
      (properties.position === "relative" ||
        properties.position === "absolute")) ||
    (properties.isStacked && properties.isFlexItem) ||
    properties.opacity !== "1" ||
    properties.transform !== "none" ||
    properties.mixBlendMode !== "normal" ||
    properties.filter !== "none" ||
    properties.perspective !== "none" ||
    properties.isIsolated ||
    properties.position === "fixed" ||
    willChange ||
    properties.hasTouchOverflowScrolling
  );
}

// Sort nodes based on their zindex. "auto" is equivalent to 0
function sortNodesByZIndex(tree) {
  tree.sort(function(a, b) {
    if (a.properties.isStackingContext && b.properties.isStackingContext) {
      var aZindex = a.properties.zindex === "auto" ? 0 : a.properties.zindex;
      var bZindex = b.properties.zindex === "auto" ? 0 : b.properties.zindex;
      return aZindex > bZindex;
    } else {
      return a.properties.isStackingContext ? 1 : 0;
    }
  });
  return tree;
}

function getStackingContextTree(root, treeNodes = [], parentElement) {
  let counter = 0;
  for (let child of root.children) {
    let newNode;
    // Filter for divs and spans only.
    // Easily change to include others. (Maybe make it a configurable setting in the future)
    if (INCLUDE_HTML_TAGS.indexOf(child.tagName) !== -1) {
      let stackingContextProperties = getStackingContextProperties(child);
      // Terminology: parentElement = parent element of the current element
      //              parentStackingContext = the parent stacking order element
      // Logic: If parent element is undefined, then the parent stacking element is undefined.
      //        If the parent element is part of the stacking context, then the parent stacking
      //        element is the parent element; otherwise, the parent stacking element of the
      //        parent element is the stacking element for this element
      let parentStackingContext =
        parentElement === undefined
          ? undefined
          : parentElement.properties.isStackingContext
            ? parentElement
            : parentElement.parentStackingContext;
      newNode = {
        el: child,
        key:
          parentElement === undefined
            ? counter++
            : parentElement.key + "-" + counter++,
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
      childrenNodes = getStackingContextTree(
        child,
        newNode && newNode.properties.isStackingContext
          ? newNode.nodes
          : treeNodes,
        newNode || parentElement
      );
      // Add the children nodes to newNode.stackingContextChildren.
      // This is different from newNode.nodes which is the DOM children.
      if (newNode && newNode.properties.isStackingContext) {
        newNode.stackingContextChildren = childrenNodes;
      }
    }
  }

  treeNodes = sortNodesByZIndex(treeNodes);
  return treeNodes;
}

function sendMessage(message) {
  port.postMessage(message);
}

// Connection to the background script
const port = browser.runtime.connect({ name: "cs-port" });

port.onMessage.addListener(message => {
  console.log("content script: ", message.connectMessage);
});

console.log(
  "stacking context tree",
  getStackingContextTree(document.querySelector(".dom-container"))
);
