/*
 * cylon-powerup
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Your License Here
*/

"use strict";

var Driver = require("./driver");

module.exports = {
  drivers: ["powerup"],

  driver: function(opts) {
    return new Driver(opts);
  }
};
