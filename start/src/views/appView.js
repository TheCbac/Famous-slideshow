define( function(require, exports, module){

	//import additional modules
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');

	// import the SlideshowView Class
	var SlideshowView = require('views/SlideshowView');

	// Constructor function four our AppView class
	function AppView(){
		//Applies View's constructor funciton to Empty View class
		View.apply(this, arguments);

		//passing in data
		var slideshowView = new SlideshowView({
			data: this.options.data
		});

		// add the instance to app view
		//this.add(slideshowView);
		_createCamera.call(this);
		_createSlideshow.call(this);
	}

	// establishes prototype chain for empty viewclass to inherit from view
	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.constructor = AppView;

	AppView.DEFAULT_OPTIONS = {
		data:undefined,
		cameraWidth: 0.5 * window.innerHeight
	};

	AppView.DEFAULT_OPTIONS.slideWidth = 0.8 * AppView.DEFAULT_OPTIONS.cameraWidth;
    AppView.DEFAULT_OPTIONS.slideHeight = AppView.DEFAULT_OPTIONS.slideWidth + 40;
    AppView.DEFAULT_OPTIONS.slidePosition = 0.77 * AppView.DEFAULT_OPTIONS.cameraWidth;


	// Define your helper functions and prototype methods here
	function _createSlideshow() {
		var slideshowView = new SlideshowView({
			size: [ this.options.slideWidth, this.options.slideHeight],
			data: this.options.data
		});

		var slideshowModifier = new StateModifier({
			origin: [0.5,0],
			align:[0.5,0],
			transform: Transform.translate(0, this.options.slidePosition,0)
		});

		var slideshowContainer = new ContainerSurface({
			properties: {
				overflow:'hidden'
			}
		});

		this.add(slideshowModifier).add(slideshowContainer);
		slideshowContainer.add(slideshowView);
		slideshowContainer.context.setPerspective(1000);
	}

    function _createCamera() {
        var camera = new ImageSurface({
            size: [this.options.cameraWidth, true],
            content: 'img/camera.png',
            properties: {
                width: '100%'
            }
        });

        var cameraModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.behind
        });

        this.add(cameraModifier).add(camera);
    }

	module.exports = AppView;
	
	});
