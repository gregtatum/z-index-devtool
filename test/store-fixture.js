const {getStackingContextTree} = require("../src/stacking-context");
const getStore = require("../src/store");
const {
  fetchNewDomText,
  getStackingContext
} = require("../src/actions/stacking-context");

const textBits = require('./utils');

function mockGetTextModule(url){
  var p1 = new Promise(
    function(resolve, reject){
      resolve(textBits.TEXT_MARKUP);
    }
  );
  return p1;
};

function createStoreFixture(){
  const store = getStore();
  store.dispatch(fetchNewDomText('test/test.html', mockGetTextModule));
  var p = new Promise(function(resolve, reject){
      resolve(store);
  })
  //parse store.getState().stackingContext.text?
  //get the containerElement?????
  //store.dispatch(getStackingContext(document));
  return p;
  //return store;
};

module.exports = {createStoreFixture}
