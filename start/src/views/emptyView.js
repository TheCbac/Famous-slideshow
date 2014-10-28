define( function(require, exports, module){

	//import additional modules
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');

	// Constructor function four our EmptyView class
	function EmptyView(){
		//Applies View's constructor funciton to Empty View class
		View.apply(this, arguments);
	}

	// establishes prototype chain for empty viewclass to inherit from view
	EmptyView.prototype = Object.create(View.prototype);
	EmptyView.prototype.constructor = EmptyView;

	EmptyView.DEFAULT_OPTIONS = {};

	// Define your helper functions and prototype methods here

	module.exports = EmptyView;
	
	});
