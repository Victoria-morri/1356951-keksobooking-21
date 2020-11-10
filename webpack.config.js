const path = require("path");

module.exports = {
  entry: [
    "./js/load.js",
    "./js/utils.js",
    "./js/position.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/popup-card.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/message.js",
    "./js/load-picture.js",
    "./js/form.js",
    "./js/form-utils.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
