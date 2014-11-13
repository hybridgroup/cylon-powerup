/*
 * cylon-powerup driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var MOTOR = '75b64e51f1844ed1921a476090d80ba7',
    RUDDER = '75b64e51f1854ed1921a476090d80ba7';

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);

  this.serviceId = '75b64e51f1814ed1921a476090d80ba7';

  this.commands = {
    setThrust: this.setThrust,
    setRudder: this.setRudder
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

Driver.prototype.setThrust = function(value, callback) {
  this._writeServiceCharacteristic(value, MOTOR, callback);
};

Driver.prototype.setRudder = function(value, callback) {
  this._writeServiceCharacteristic(value, RUDDER, callback);
};

Driver.prototype._writeServiceCharacteristic = function(value, characteristic, callback) {
  this.adaptor.writeServiceCharacteristic(this.serviceId, characteristic, new Buffer([value]),
    function(err) {
      if ('function' === typeof(callback)) { callback(err); }
    }
  );
}
