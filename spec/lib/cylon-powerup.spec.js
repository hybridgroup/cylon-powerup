"use strict";

var powerup = lib("../");

var Driver = lib("driver");

describe("Cylon.Powerup", function() {
  describe("#drivers", function() {
    it("is an array of provided drivers", function() {
      expect(powerup.drivers).to.be.eql(["powerup"]);
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { adaptor: {} };
      expect(powerup.driver(args)).to.be.instanceOf(Driver);
    });
  });
});
