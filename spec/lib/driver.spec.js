"use strict";

var Powerup = lib("driver");

describe("Cylon.Drivers.Powerup", function() {
  var driver = new Powerup({
    device: { connection: "connect" }
  });

  it("needs tests", function() {
    expect(driver).to.be.an.instanceOf(Powerup);
  });
});
