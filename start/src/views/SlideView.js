/*** SlideView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Transitionable   = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');

    Transitionable.registerMethod('spring', SpringTransition);

    var SlideData = require('data/SlideData');

    // SlideView constructor function
    // runs once for each new instance
    function SlideView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            align: [0.5,0],
            origin: [0.5,0],
            size: this.options.size
        });

        this.mainNode = this.add(this.rootModifier);

        _createBackground.call(this);
        _createFilm.call(this);
        _createPhoto.call(this);
    }

    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;

    SlideView.prototype.fadeIn = function() {
        this.photoModifier.setOpacity(1, {duration: 1500, curve: 'easeIn'});
        this.shake();
    };

    SlideView.prototype.shake = function() {
        this.rootModifier.halt();

        this.rootModifier.setTransform(
            Transform.rotateX(this.options.angle),
            {duration: 200, curve: 'easeOut'}
        );

        this.rootModifier.setTransform(
            Transform.identity,
            {method:'spring', period: 600, dampingRatio: 0.15}
        );
    };

    SlideView.DEFAULT_OPTIONS = {
    	size:[400,450],
    	filmBorder: 15,
    	photoBorder: 3,
    	photoUrl: SlideData.defaultImage,
        angle:-0.5
    };

    // _ indicates private function
    function _createBackground() {
    	    var background = new Surface({
               // undefined size will inherit size from parent modifier
            properties: {
                backgroundColor: '#FFFFF5',
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)',
                cursor: 'pointer'
            }
        });

    	this.mainNode.add(background);

        background.on('click', function(){
            // the event output handler is used to broadcast outwards
            this._eventOutput.emit('click');
        }.bind(this));
    }

    function _createFilm() {
    	this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

    	var film = new Surface({
    		size: [ this.options.filmSize, this.options.filmSize],
    		properties :{
    			backgroundColor: "#222",
    			zIndex:1,
                // makes the surface invidsible to clicks
                pointerEvents:'none'
    		}
    	});

    	var filmModifier = new StateModifier({
    		origin: [0.5, 0],
    		align: [0.5,0],
    		transform: Transform.translate(0,this.options.filmBorder, 1)
    	});

    	this.mainNode.add(filmModifier).add(film);
    }

    function _createPhoto() {
    	var photoSize = this.options.filmSize -2 * this.options.photoBorder;

    	var photo = new ImageSurface({
    		size: [photoSize, photoSize],
    		content: this.options.photoUrl,
    		properties: {
    			zIndex:2,
                pointerEvents: 'none'
    		}
    	});

    	this.photoModifier = new StateModifier({
    		origin: [0.5, 0],
    		align: [0.5, 0],
    		transform: Transform.translate(0, this.options.filmBorder +this.options.photoBorder, 2),
            opacity:0.01
    	});

    	this.mainNode.add(this.photoModifier).add(photo);
    }

    module.exports = SlideView;
});