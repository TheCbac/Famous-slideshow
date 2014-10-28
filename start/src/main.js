define(function(require, exports, module) {
	var Engine  = require('famous/core/Engine');

    // import Utility
    var Utility = require('famous/utilities/Utility');

	//import the appView class using require
	var AppView = require('views/AppView');

	var SlideData = require('data/SlideData');

	var mainContext = Engine.createContext();
	mainContext.setPerspective(1000);

	// simple Get request to the Picasa api with callback
	Utility.loadURL(SlideData.getUrl(), initApp);

	function initApp(data) {
			// parses out response data dn retries array of urls
			data = SlideData.parse(data);

			//instantiates AppView with our url Data
			var appView  = new AppView({data: data});

			mainContext.add(appView);
	}

});