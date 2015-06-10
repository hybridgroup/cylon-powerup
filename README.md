# Cylon.js For Powerup

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This repository contains the Cylon driver for the [Powerup 3.0](http://www.poweruptoys.com/products/powerup-v3) Bluetooth LE controlled paper airplane.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-powerup.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-powerup) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-powerup/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-powerup) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-powerup/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-powerup)

## How to Install

Install the module with:

    $ npm install cylon cylon-powerup

## How to Use

Here's an example of flying the powerup with a dualshock3 controller:

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'ble', uuid: '84dd20eb3d89' },
    joystick: { adaptor: 'joystick' }
  },

  devices: {
    controller: { driver: 'dualshock-3', connection: 'joystick' },
    powerup: { driver: 'powerup' }
  },

  work: function(my) {
    var thrust = 0;
    var rudder = 0;
    var canRudder = false;

    var cb = function(err) {
      if (!!err) {
        console.log(err);
      } else {
        if (canRudder) {
          canRudder = false;
          my.powerup.setRudder(rudder, cb);
        }
        else {
          my.powerup.setThrust(thrust, cb);
        }
      }
    }

    my.powerup.setThrust(thrust, cb);

    my.controller.on("left_y:move", function(data) {
      if (data < 0) {
        thrust = Math.abs(data/32768*254) | 0;
      } else {
        thrust = 0;
      }
    });

    my.controller.on("right_x:move", function(data) {
      var tmp = data/32768*127 | 0;
      if (tmp !== rudder) {
        rudder = tmp;
        canRudder = true;
      }
    });
  }
}).start();
```

## How to Connect

The Powerup is a Bluetooth Low-Energy device, and is connected as with any other BLE device. For more info, check out the [BLE platform page](http://cylonjs.com/documentation/platforms/ble).

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-powerup/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-powerup/blob/master/RELEASES.md
).

## License

Copyright (c) 2014-2015 The Hybrid Group. Licensed under the Apache 2.0 license.
