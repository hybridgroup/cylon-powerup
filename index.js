"use strict";

var Driver = require("./lib/driver");

module.exports = {
  drivers: ["powerup"],

  driver: function(opts) {
    return new Driver(opts);
  }
};
