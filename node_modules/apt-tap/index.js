"use strict";

var util = require('util');
var duplexer = require('duplexer');
var out = require('through2')();
var parser = require('tap-out')();
var _ = require('lodash');

var push = function(tapObj) {	
	transformers[tapObj.type].forEach(function(fn) {
		var res = fn(tapObj);
		out.push(typeof res === 'undefined' ? '.' : res);
	});
};

// All tap-out parse events. See comments below.
//
var events = [

	// type - this will always be assert
	// name - the name of the assertion
	// raw - the raw output before it was parsed
	// number - the number of the assertion
	// ok - whether the assertion passed or failed
	// test - the number of the test this assertion belongs to
	//
	'assert',

	// type - this will always be result
	// name - the name of the result
	// raw - the raw output before it was parsed
	// count - the number of tests related to this result
	//
	'result',
	
	// When a test is set up
	// 
	// type - value will always be test
	// name - name of the test
	// raw - the raw output before it was parsed
	// number - the number of the test
	//
	'test',

	// type - this will always be version
	// raw - the raw output before it was parsed
	//
	'version'
];

// Create default transformer collection for all events. 
// This default is replaced by the first call to #transform
//
var transformers = events.reduce(function(coll, ev) {

	coll[ev] = coll[ev] || [];
	coll[ev].push(function $baseTransformer(tapObj) {
	
		// Just send back the raw TAP output
		//
		return util.format('\nTAP> %s\n', tapObj.raw);
	});
	
	return coll;
	
}, {});

// Bind all parse events to #push. Each event emits an object as
// described in the comments. #push does the work of catching, 
// transforming, and pushing back into the stream. 
//
events.forEach(function(event) {
	parser.on(event, push);
});

// Prime the output pump by creating a newline.
//
out.push('\n');

module.exports = function(cfg) {

	// It's ok to send no configuration.
	//
	cfg = typeof cfg === 'undefined' ? {} : cfg;
	
	var stream = duplexer(parser, out);
	
	if(!_.isPlainObject(cfg)) {
		throw new Error('apt-tap #configure expects an Object');
	}
	
	Object.keys(cfg).forEach(function(event) {
	
		if(!~events.indexOf(event)) {
			throw new Error('Invalid event name received by apt-tap -> ' + event);
		}
		
		// Make into Array if not. This allows a single
		// Function to be passed, OR an Array of functions.
		//
		if(!_.isArray(cfg[event])) {
			cfg[event] = [cfg[event]];
		}
		
		cfg[event].forEach(function(fn) {
	
			if(!_.isFunction(fn)) {
				throw new Error('apt-tap expects a Function or Array of Functions. Received -> ' + fn + ' for event -> ' + event);
			}
			
			// Remove default transformer when any userland transformer 
			// is added. 
			//
			if(transformers[event][0].name === '$baseTransformer') {
				transformers[event].shift();
			}
						
			transformers[event].push(fn);
		});
	});
	
	return stream;
};