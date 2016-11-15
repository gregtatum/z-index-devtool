const parent1 = {
  "el":{},
  "key":0,
  "index":0,
  "nodes": [],
  "parent": undefined,
  "properties":{
    "isStacked":true,
    "zindex":"0",
    "isRoot":false,
    "position":"relative",
    "isFlexItem":false,
    "opacity":"1",
    "transform":"none",
    "mixBlendMode":"normal",
    "filter":"none",
    "perspective":"none",
    "isIsolated":false,
    "willChange":"auto",
    "hasTouchOverflowScrolling":false,
    "isStackingContext":true}
};

const parent2 = {
  "el":{},
  "key":1,
  "index":1,
  "nodes":[],
  "parent": undefined,
  "properties":{
    "isStacked":true,
    "zindex":"1",
    "isRoot":false,
    "position":"relative",
    "isFlexItem":false,
    "opacity":"1",
    "transform":"none",
    "mixBlendMode":"normal",
    "filter":"none",
    "perspective":"none",
    "isIsolated":false,
    "willChange":"auto",
    "hasTouchOverflowScrolling":false,
    "isStackingContext":true}
};

const child1 = {
  "el":{},
  "key":"0-0",
  "index":1000,
  "nodes":[],
  "parent": parent1,
  "properties":{
    "isStacked":true,
    "zindex":"1000",
    "isRoot":false,
    "position":"absolute",
    "isFlexItem":false,
    "opacity":"1",
    "transform":"none",
    "mixBlendMode":"normal",
    "filter":"none",
    "perspective":"none",
    "isIsolated":false,
    "willChange":"auto",
    "hasTouchOverflowScrolling":false,
    "isStackingContext":true}
};

const child2 = {
  "el":{},
  "key":"1-0",
  "index":1000,
  "nodes":[],
  "parent":parent2,
  "properties":{
    "isStacked":true,
    "zindex":"1000",
    "isRoot":false,
    "position":"absolute",
    "isFlexItem":false,
    "opacity":"1",
    "transform":"none",
    "mixBlendMode":"normal",
    "filter":"none",
    "perspective":"none",
    "isIsolated":false,
    "willChange":"auto",
    "hasTouchOverflowScrolling":false,
    "isStackingContext":true}
};

parent1.nodes.push(child1);
parent2.nodes.push(child2);

function getFakeTree(){
  return([parent1, parent2]);
};

module.exports = {getFakeTree};
