var jsdom = require('jsdom');

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
};

function setupGlobals(){
    // setup the simplest document possible
  var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')

  // get the window object out of the document
  var win = doc.defaultView

  // set globals for mocha that make access to document and window feel
  // natural in the test environment
  global.document = doc
  global.window = win
  global.Node = win.Node;

  // take all properties of the window object and also attach it to the
  // mocha global object
  propagateToGlobal(win)
};

function getDomElt(htmlString){
  var cont = document.createElement("template");

  cont.innerHTML = htmlString;
  var divElt = cont.content.firstChild;
  divElt.id = "dom-container";
  console.log(divElt.nodeName);
  console.log(window.getComputedStyle(divElt)['zIndex']);
  document.body.appendChild(divElt);
  return document.getElementById("dom-container");
};

module.exports = {getDomElt, setupGlobals};
