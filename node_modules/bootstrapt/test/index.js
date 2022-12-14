"use strict";

var path = require('path');

// Load this module, and test itself.
//
require(path.resolve(__dirname, '../lib'))({
    testDir : __dirname,
    globalFixtures: [
        'global/globalA',
        'global/globalB'
    ]
});

