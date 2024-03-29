define( function(require, exports, module){

	//import additional modules
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Lightbox = require('famous/views/Lightbox');
	var SlideView = require('views/SlideView');
	var Easing = require('famous/transitions/Easing');



	// Constructor function four our SlideshowView class
	function SlideshowView(){
		//Applies View's constructor funciton to Empty View class
		View.apply(this, arguments);

		

		this.rootModifier = new StateModifier({
			size: this.options.size,
			origin: [0.5, 0],
			align: [0.5, 0]
		});

		this.mainNode = this.add(this.rootModifier);

		_createLightBox.call(this);
		_createSlides.call(this);
	}

	// establishes prototype chain for empty viewclass to inherit from view
	SlideshowView.prototype = Object.create(View.prototype);
	SlideshowView.prototype.constructor = SlideshowView;

	SlideshowView.prototype.showCurrentSlide = function() {
		this.ready = false;

		var slide = this.slides[this.currentIndex];
		this.lightbox.show(slide, function(){
			this.ready = true;
			slide.fadeIn();
		}.bind(this));
	};

	SlideshowView.prototype.showNextSlide = function() {
		if (!this.ready) return;
		
		this.currentIndex++;
		if (this.currentIndex === this.slides.length) this.currentIndex = 0;
		this.showCurrentSlide();
	};

    SlideshowView.DEFAULT_OPTIONS = {
        size: [450, 500],
        data: undefined,
        lightboxOpts: {
            inOpacity: 1,
            outOpacity: 0,
            inOrigin: [0, 0],
            outOrigin: [0, 0],
            showOrigin: [0, 0],
            inTransform: Transform.thenMove(Transform.rotateX(0.9), [0, -300, -300]),
            outTransform: Transform.thenMove(Transform.rotateZ(0.7), [0, window.innerHeight, -1000]),
            inTransition: { duration: 650, curve: 'easeOut' },
            outTransition: { duration: 500, curve: Easing.inCubic }
        }
    };

	// Define your helper functions and prototype methods here

	function _createLightBox() {
		this.lightbox = new Lightbox(this.options.lightboxOpts);
		this.mainNode.add(this.lightbox);
	}

	function _createSlides(){
		this.slides = [];
		this.currentIndex = 0;

		for (var i=0; i<this.options.data.length; i++){
			var slide = new SlideView({
				size: this.options.size,
				photoUrl:this.options.data[i]
			});

			this.slides.push(slide);

			slide.on('click', this.showNextSlide.bind(this));
		}
		this.showCurrentSlide();
	}

	module.exports = SlideshowView;
});
