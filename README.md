# z-index-devtool

## Context

This project is a part of [UCOSP](http://ucosp.ca/) and is being steered by Greg Tatum ([@gregtatum](https://github.com/gregtatum/)).

It is intended to be a _prototype_. Additional documentation will be added to the `docs/` directory.

## Project Description

Firefox Developer Tools allow developers to inspect HTML pages to better understand and debug how the structure of a web page translates into an image on the screen. Ultimately the image that is rendered to the screen is 2d, but it is composed of a variety of elements on the screen including blocks of color, text, images, and video. Conceptually these elements can be represented as a 3d document where the z-index of each element determines its height in the space. The higher z-indexed elements end up blocking the elements with lower z-indexes. However, this can become more complicated with the different types of positioning like ‘absolute’, ‘relative’, and ‘fixed’ positioning. Users can quickly become confused and struggle with stacking elements correctly.

The goal of this project would be to create a tool that intuitively lets users understand this overlapping structure of their webpage by visualizing it in three dimensions. Firefox devtools used to have a 3d debugging tool called Tilt, but its focus was on showing the nesting structure of a webpage, rather than the z-index stacking behavior. That tool is also no longer shipped with the Firefox devtools as it does not support multiprocess Firefox.

## Starting the Project

Clone this repo, then from the terminal run

```js
yarn install
```

to install the dependencies.

##### Bundling the source files

To bundle the `./src` files for both the _demo web app_ and the _extension panel_ run

```js
yarn build
```

this will also watch for changes to the `./src` directory and re-bundle

##### Running the Firefox extension

To run the firefox extension, do

```js
yarn start-ext
```

This should start up firefox and load the extension from the `./extension` folder, it will also watch for changes to the folder and auto-reload the extension.

##### Running the Web app

To run the web app, do

```js
yarn start-app
```
