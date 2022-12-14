"use strict";

module.exports = function(test, Promise) {

    test.equal(1,1);
    test.notEqual(1,0);

    test.equal(this.fixtureKey, 'nopromise', 'nopromise spec fixture was correctly assigned');

    test.equal(this.globalBKey, 'globalBValue', 'nopromise spec was assigned globalB fixture');

    return Promise.resolve();
};