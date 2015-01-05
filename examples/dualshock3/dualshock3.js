"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: { adaptor: "ble", uuid: "84dd20eb3d89" },
    dualshock3: { adaptor: "joystick" }
  },

  devices: {
    controller: { driver: "dualshock-3", connection: "dualshock3" }, 
    powerup: { driver: "powerup" }
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
    };

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
