"use strict";

var util = require('util');
var chalk = require('chalk');
var _ = require('lodash');
var figures = require('figures');

module.exports = {

	'assert' : function $assertTransformer(tapObj) {
	
		var glyph = tapObj.ok 
					? chalk.green(figures.tick)
					: chalk.red(figures.cross);
					
		var name = chalk.dim(tapObj.name);
	
		return glyph + ' ' + name + '\n';
	},
	
	'test' : function $testTransformer(tapObj) {
		return chalk.yellow(tapObj.raw) + '\n';	
	},
	
	'version' : function $versionTransformer(tapObj) {
		return chalk.blue(tapObj.raw) + '\n';	
	},
	
	'result' : function $resultTransformer(tapObj) {
		switch(tapObj.name) {
			
			case 'tests':
				return chalk.yellow(tapObj.count) + chalk.cyan(' test(s) planned\n');
			break;
			
			case 'pass':
				return chalk.green(tapObj.count) + chalk.cyan(' test(s) passed\n');
			break;
			
			case 'fail':
				return chalk.red(tapObj.count) + chalk.cyan(' test(s) failed\n');
			break;
		
			default:
			break;
		}
	}
};
	
   