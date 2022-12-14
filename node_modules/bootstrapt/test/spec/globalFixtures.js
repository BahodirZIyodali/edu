"use strict";

module.exports = function(test, Promise) {

    test.equal(this.fixtureKey, 'globalFixtures', 'globalFixtures spec fixture was correctly assigned');

    test.equal(this.globalAKey, 'globalAValue', 'Global fixture (A) was correctly assigned');

    test.equal(this.globalBKey, 'globalBValue', 'Global fixture (B) was converted from Function to Object');

    return Promise.resolve();
};