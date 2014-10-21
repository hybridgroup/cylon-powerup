/*
 * cylon-powerup
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Your License Here
*/

'use strict';

var Cylon = require('cylon');

var Driver = require('./driver');

module.exports = {
  driver: function(opts) {
    return new Driver(opts);
  },

  register: function(robot) {
    robot.registerDriver('cylon-powerup', 'powerup');
  }
};
