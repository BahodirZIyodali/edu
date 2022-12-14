"use strict";

module.exports = function(test, Promise) {

    var fixture = this;

    return Promise.resolve().then(function() {

        test.equal(1,1);
        test.notEqual(1,0);

        test.equal(fixture.fixtureKey, 'withpromise', 'withpromise spec fixture was correctly assigned');
    });
};