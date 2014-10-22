# Cylon.js For Powerup

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things using Node.js

This repository contains the Cylon driver for the [Powerup 3.0](http://www.poweruptoys.com/products/powerup-v3) Bluetooth LE controlled paper airplane.

For more information about Cylon, check out the repo at
https://github.com/hybridgroup/cylon

## Getting Started

Install the module with: `npm install cylon-powerup`

## Examples
Here's an example of flying the powerup with a dualshock3 controller
```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: [
    { name: 'bluetooth', adaptor: 'ble', uuid: '84dd20eb3d89' },
    { name: 'dualshock3', adaptor: 'joystick' }
  ],
  devices: [
    { name: 'controller', driver: 'dualshock-3', connection: 'dualshock3' }, 
    { name: 'powerup', driver: 'powerup' }
  ],
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

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & lint and test your code using `make test` and `make lint`.
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

None yet...

## License

Copyright (c) 2014 The Hybrid Group. Licensed under the Apache 2.0 license.
