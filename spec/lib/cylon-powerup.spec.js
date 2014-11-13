"use strict";

var module = source("cylon-powerup");

var Driver = source('driver');

describe("Cylon.Powerup", function() {
  describe("#drivers", function() {
    it("is an array of provided drivers", function() {
      expect(module.drivers).to.be.eql(["powerup"])
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { adaptor: {} };
      expect(module.driver(args)).to.be.instanceOf(Driver);
    });
  });
});
