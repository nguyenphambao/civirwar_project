(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Bitmap10 = function() {
	this.initialize(img.Bitmap10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1381,954);


(lib.Bitmap12 = function() {
	this.initialize(img.Bitmap12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,981,583);


(lib.Bitmap9 = function() {
	this.initialize(img.Bitmap9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1381,954);


(lib.lincoln = function() {
	this.initialize(img.lincoln);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,194,259);


(lib.RifledMuskets = function() {
	this.initialize(img.RifledMuskets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1352,1350);


(lib.springfieldtrapdoorallinconversionriflef = function() {
	this.initialize(img.springfieldtrapdoorallinconversionriflef);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,987,551);


(lib.war = function() {
	this.initialize(img.war);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,450,338);


(lib.war_death = function() {
	this.initialize(img.war_death);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,597,456);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.weapon_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Click", "12px 'Arial'");
	this.text.textAlign = "center";
	this.text.lineHeight = 15;
	this.text.parent = this;
	this.text.setTransform(12.639,4.8,0.7522,0.6342);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EADCD1").s().p("Ah/BYIAAivID/AAIAACvg");
	this.shape.setTransform(12.8,8.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).to({state:[{t:this.shape},{t:this.text}]},1).to({state:[{t:this.shape},{t:this.text}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,25.6,17.6);


(lib.Tween8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("APUhfQC4AaApAjQALAJAAAKQAAAKgLAJQgwAnj1AeQkEAgliAFAtGAJQB2gGCMAAQEHAAC5AUQBHAIAsAJAqOhaQAtgHA4gHQEwglGtAAQB9AAByAEQgCAPAAAPQAAAIABAJAGkhCQgBgEAAgEIAAgCIAAgBQgBgEAAgDIAAgEAtGAJQgTgLAAgNQAAgOAXgNAoaCOQgVAAgVAAQkHAAi6gUQi6gVAAgcQAAgdC6gVQBXgJBogF");
	this.shape.setTransform(0,14.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AnPDUQkGAAi7gUQi5gVAAgcQAAgdC5gVQBYgJBogFQB2gGCLAAQEHAAC6AUQBGAIAsAJIh6ATQiKAXhzAaQhOAQhEASIgqAAgAIaAEIAAgBIgBgGIgBgDIAAgBIAAgHIAAgDIgBgDIAAgDQAAgKACgKQAIg0AugoQAMgLAOgKQBNgzBrgFIAgAAQBqAFBNAzQAOAKANALQA2AwABA+IAAACIAAAIQgBALgBAIgAC9h2IATgBIAUABg");
	this.shape_1.setTransform(-11.8,7.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("At2F8QgEgcC0gzIApgLQBDgSBOgQQB0gaCKgXIB6gTQgsgJhGgIQi6gUkHAAQiMAAh2AGQgSgMAAgNQAAgOAWgMIgdAHQgphEgZheQgjiCAPhmQAQhmA5gPQA5gPBABQQBBBRAjCCQAZBegBBPIgXAGQAtgHA4gHQEwglGtAAQB9AAByAEQgCAPAAAQIABAQIAAACIAAAEIABAHIAAABIAAADIABAHIAAAAIAAABIIuAAQACgKAAgKIAAgIIAAgCQC4AbApAiQALAJAAAKQAAAKgLAKQgwAnj1AeQkEAgliAFQitAujyAoQkDAsi7AKQgyADglAAQhlAAgEgVg");
	this.shape_2.setTransform(13.0621,0.0162);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.6,-40.1,245.2,80.30000000000001);


(lib.Tween7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AqPhaQAugIA4gGQEwglGsAAQB9AAByADQgBAPAAAQQAAAIAAAIAGjhCQAAgEAAgEIgBgCIAAgCQAAgDAAgDIAAgEAPUhfQC4AaApAiQALAKAAAKQAAAKgLAJQgwAnj1AeQkFAgliAFAobCOQgUAAgWAAQkHAAi6gVQi5gUAAgdQAAgdC5gUQBYgKBogFQgTgKAAgNQAAgOAWgNAtGAIQB2gGCLAAQEHAAC6AVQBHAIAsAJ");
	this.shape.setTransform(0,14.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("At2F8QgEgcC0gzIApgLQBDgSBOgQQB0gaCKgXIB6gTQgsgJhGgIQi6gUkHAAQiMAAh2AGQgSgMAAgNQAAgOAWgMIgdAHQgphEgZheQgjiCAPhmQAQhmA5gPQA5gPBABQQBBBRAjCCQAZBegBBPIgXAGQAtgHA4gHQEwglGtAAQB9AAByAEQgCAPAAAQIABAQIAAACIAAAEIABAHIAAABIAAADIABAHIAAAAIAAABIIuAAQACgKAAgKIAAgIIAAgCQC4AbApAiQALAJAAAKQAAAKgLAKQgwAnj1AeQkEAgliAFQitAujyAoQkDAsi7AKQgyADglAAQhlAAgEgVg");
	this.shape_1.setTransform(13.0621,0.0162);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AnODVQkIgBi5gUQi6gVAAgcQAAgdC6gVQBXgJBogFQB2gGCMAAQEHAAC5AUQBGAJAsAIIh5ATQiLAXhzAaQhOAQhEATIgpAAgAIaAEIAAgBIgBgGIAAgDIAAgBIgBgHIAAgDIAAgDIAAgDQAAgKABgKQAIg0AugoQAMgLAPgKQBMgzBqgFIAiAAQBqAFBMAzQAPAKAMALQA2AwABA+IAAACIAAAIQAAAKgCAJgAC8h2IAUgBIAUABg");
	this.shape_2.setTransform(-11.8,7.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.6,-40.1,245.2,80.30000000000001);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.lincoln();
	this.instance.setTransform(-48.95,-65.3,0.5045,0.5045);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(-48.9,-65.3,97.9,130.7), null);


(lib.menu = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Menu", "12px 'Arial'");
	this.text.textAlign = "center";
	this.text.lineHeight = 15;
	this.text.lineWidth = 77;
	this.text.parent = this;
	this.text.setTransform(40.45,2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AmWCjIAAlFIMtAAIAAFFg");
	this.shape.setTransform(40.675,16.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,81.4,34);


(lib.Lincoln = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.lincoln();
	this.instance.setTransform(4.75,5.1,0.2125,0.2059,0,0,1.2632);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E1B966").s().p("Aj6E+IAAp7IH1AAIAAJ7g");
	this.shape.setTransform(25.1,31.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).to({state:[{t:this.shape},{t:this.instance}]},1).to({state:[{t:this.shape},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50.2,63.5);


(lib.lincol_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.lincoln();
	this.instance.setTransform(5.5,5.9,0.2466,0.239,0,0,1.2622);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E1B966").s().p("AkiFxIAArhIJFAAIAALhg");
	this.shape.setTransform(29.125,36.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lincol_1, new cjs.Rectangle(0,0,58.3,73.7), null);


(lib.gunbutton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Click", "12px 'Arial'");
	this.text.textAlign = "center";
	this.text.lineHeight = 15;
	this.text.parent = this;
	this.text.setTransform(17.8709,4.55,1.186,1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AikBxIAAjhIFJAAIAADhg");
	this.shape.setTransform(19.25,11.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).to({state:[{t:this.shape},{t:this.text}]},1).to({state:[{t:this.shape},{t:this.text}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,35.7,24.7);


(lib.death = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AhbifIBqgPAhXiCIB8gSAiZgXIEOgnAhuhjIDUgfAiOB4IEVgoAiDCvIEegpAiaAUIEcgoAiOBFIEPgn");
	this.shape.setTransform(27.925,27.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFCC").s().p("Ajxi0IGmg9IA9GmImmA9gAh/CrIEegpgAiKBzIEVgogAiKBBIEPgngAiWAQIEcgogAiVgcIEOgngAhqhoIDUgegAhTiGIB8gSgAhXijIBqgPg");
	this.shape_1.setTransform(27.525,27.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#660000").s().p("AkVjQIHlhFIBGHmInlBFgAj0i3IA9GnIGng9Ig9mng");
	this.shape_2.setTransform(27.775,27.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,55.6,55.6);


(lib.civilwar = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap10();
	this.instance.setTransform(11.75,8.2,0.0906,0.0906);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#660000").s().p("ArbIbIAAw1IW3AAIAAQ1g");
	this.shape.setTransform(73.2,53.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).to({state:[{t:this.shape},{t:this.instance}]},1).to({state:[{t:this.shape},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,146.4,107.9);


(lib.cannon = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Cannon", "16px 'Arial'");
	this.text.textAlign = "center";
	this.text.lineHeight = 20;
	this.text.lineWidth = 58;
	this.text.parent = this;
	this.text.setTransform(46.3,16.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AmrAAIEOkMIADAEIAABAIJGAAIAAGIIpGAAIAABIIgEAFg");
	this.shape.setTransform(42.75,26.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).to({state:[{t:this.shape},{t:this.text}]},1).to({state:[{t:this.shape},{t:this.text}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,85.5,53.7);


// stage content:
(lib.phamB_final_index = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,64];
	this.streamSoundSymbolsList[0] = [{id:"_0425",startFrame:0,endFrame:63,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("_0425",0);
		this.InsertIntoSoundStreamData(soundInstance,0,63,1);
	}
	this.frame_64 = function() {
		this.stop();
		
		this.gun_btn.addEventListener("click", fl_ClickToGoToAndStopAtFrame.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame()
		{
			this.gotoAndStop(190);
		}
		
		this.menu_btn.addEventListener("click", fl_ClickToGoToAndStopAtFrame_2.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_2()
		{
			this.gotoAndStop(65);
		}
		
		
		this.button_2.addEventListener("click", fl_ClickToGoToAndStopAtFrame_3.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_3()
		{
			this.gotoAndStop(70);
		}
		
		
		this.weapon_2.addEventListener("click", fl_ClickToGoToAndStopAtFrame_5.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_5()
		{
			this.gotoAndStop(95);
		}
		
		this.button_6.addEventListener("click", fl_ClickToGoToAndStopAtFrame_11.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_11()
		{
			this.gotoAndStop(120);
		}
		
		
		this.civil_war.addEventListener("click", fl_ClickToGoToAndStopAtFrame_12.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_12()
		{
			this.gotoAndStop(170);
		}
		
		this.cannon.addEventListener("click", fl_ClickToGoToAndStopAtFrame_13.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_13()
		{
			this.gotoAndStop(145);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(64).call(this.frame_64).wait(169));

	// weapon1
	this.menu_btn = new lib.menu();
	this.menu_btn.name = "menu_btn";
	this.menu_btn.setTransform(85.55,348.5,1,1,0,0,0,40.6,16.9);
	new cjs.ButtonHelper(this.menu_btn, 0, 1, 1);

	this.text = new cjs.Text("Abraham Lincoln ", "22px 'Arial'", "#FFFFFF");
	this.text.lineHeight = 27;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(191.9,200);

	this.movieClip_1 = new lib.Symbol1();
	this.movieClip_1.name = "movieClip_1";
	this.movieClip_1.setTransform(273.95,120.3);

	this.text_1 = new cjs.Text("Abraham Lincoln (born February 12, 1809, near Hodgenville, Kentucky, U.S.—died April 15, 1865, Washington, D.C.) was the 16th president of the United States (1861–65), who preserved the Union during the American Civil War and brought about the emancipation of enslaved people in the United States.", "12px 'Arial'", "#FFFFFF");
	this.text_1.lineHeight = 15;
	this.text_1.lineWidth = 392;
	this.text_1.parent = this;
	this.text_1.setTransform(84,240.3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("EgmrAa4MAAAg1vMBNXAAAMAAAA1vg");
	this.shape.setTransform(279.375,201.225);

	this.instance = new lib.RifledMuskets();
	this.instance.setTransform(210,38,0.1095,0.1095);

	this.instance_1 = new lib.war_death();
	this.instance_1.setTransform(186,59,0.3176,0.3176);

	this.instance_2 = new lib.Bitmap12();
	this.instance_2.setTransform(155,48,0.2546,0.2546);

	this.instance_3 = new lib.Bitmap9();
	this.instance_3.setTransform(174,41,0.1614,0.1614);

	this.instance_4 = new lib.springfieldtrapdoorallinconversionriflef();
	this.instance_4.setTransform(168,227,0.2341,0.2341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("EgmrAbAMAAAg1/MBNXAAAMAAAA1/g");
	this.shape_1.setTransform(274.675,202.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape,p:{x:279.375,y:201.225}},{t:this.text_1,p:{x:84,y:240.3,text:"Abraham Lincoln (born February 12, 1809, near Hodgenville, Kentucky, U.S.—died April 15, 1865, Washington, D.C.) was the 16th president of the United States (1861–65), who preserved the Union during the American Civil War and brought about the emancipation of enslaved people in the United States.",textAlign:"",lineWidth:392,font:"12px 'Arial'",lineHeight:15.35}},{t:this.movieClip_1},{t:this.text,p:{x:191.9,y:200,text:"Abraham Lincoln ",font:"22px 'Arial'",textAlign:"",lineHeight:26.55,lineWidth:166}},{t:this.menu_btn,p:{x:85.55,y:348.5}}]},69).to({state:[{t:this.shape,p:{x:280.425,y:200.475}},{t:this.text_1,p:{x:282.95,y:239.75,text:"A rifled musket, rifle musket, or rifle-musket is a type of firearm made in the mid-19th century. Originally the term referred only to muskets that had been produced as a smoothbore weapon and later had their barrels replaced with rifled barrels. The term later included rifles that directly replaced, and were of the same design overall as, a particular model of smoothbore musket.",textAlign:"center",lineWidth:407,font:"12px 'Arial'",lineHeight:15.35}},{t:this.instance},{t:this.text,p:{x:282.65,y:194.35,text:"Rifled Muskets",font:"32px 'Arial'",textAlign:"center",lineHeight:37.75,lineWidth:218}},{t:this.menu_btn,p:{x:84.55,y:342.05}}]},25).to({state:[{t:this.shape,p:{x:274.675,y:201.775}},{t:this.text_1,p:{x:118.8,y:239.75,text:"The American Civil War is estimated to have resulted in over 620,000 deaths. One reason why the Civil War was so lethal was the introduction of improved weaponry. Cone-shaped bullets replaced musket balls, and beginning in 1862, smooth-bore muskets were replaced with rifles with grooved barrels, which imparted spin on a bullet and allowed a soldier to hit a target a quarter of a mile away",textAlign:"",lineWidth:325,font:"12px 'Arial'",lineHeight:15.35}},{t:this.instance_1},{t:this.text,p:{x:280.45,y:210.05,text:"Number of Death",font:"22px 'Arial'",textAlign:"center",lineHeight:26.55,lineWidth:186}},{t:this.menu_btn,p:{x:77.9,y:348.5}}]},25).to({state:[{t:this.shape,p:{x:274.675,y:201.775}},{t:this.instance_2},{t:this.text_1,p:{x:278.4,y:260.35,text:"Almost all Civil War cannons were muzzle-loading weapons, firing from one to two and a half pounds of black powder, and utilizing a variety of different projectiles. Each of the projectiles was designed to inflict a certain type of damage on its target",textAlign:"center",lineWidth:337,font:"12px 'Arial'",lineHeight:15.35}},{t:this.text,p:{x:279.35,y:203.4,text:"Muzzle-Loading Cannons",font:"22px 'Arial'",textAlign:"center",lineHeight:26.55,lineWidth:156}},{t:this.menu_btn,p:{x:77.9,y:348.5}}]},25).to({state:[{t:this.shape,p:{x:274.675,y:201.775}},{t:this.text_1,p:{x:104.7,y:249.15,text:"(A common explanation is that the Civil War was fought over the moral issue of slavery. In fact, it was the economics of slavery and political control of that system that was central to the conflict.)",textAlign:"",lineWidth:355,font:"16px 'Arial'",lineHeight:19.9}},{t:this.text,p:{x:99.7,y:202.85,text:"What was the main reason for the Civil War between 1861 and 1865? ",font:"16px 'Arial'",textAlign:"",lineHeight:19.9,lineWidth:372}},{t:this.instance_3},{t:this.menu_btn,p:{x:77.9,y:348.5}}]},25).to({state:[{t:this.shape_1},{t:this.menu_btn,p:{x:77.5,y:348.05}},{t:this.text_1,p:{x:57.85,y:91.15,text:"A breech-loading rifle is a firearm in which the cartridge or ammunition is loaded into the rear (breech) of the barrel, rather than the front (muzzle). This design allows for faster and safer loading, especially from a protected position, and is a major advancement from older muzzle-loading rifles.\n\nMilitary Adoption:Dreyse Needle Gun (Prussia, 1840s): One of the first successful breech-loading rifles.Sharps Rifle (USA, Civil War era): Used by Union sharpshooters.Martini-Henry (UK, 1870s): Standard rifle of the British Empire.\n",textAlign:"",lineWidth:441,font:"12px 'Arial'",lineHeight:15.35}},{t:this.text,p:{x:272.7,y:52.4,text:"Springfield Model 1865",font:"25px 'Arial'",textAlign:"center",lineHeight:29.95,lineWidth:269}},{t:this.instance_4}]},20).wait(44));

	// map
	this.instance_5 = new lib.Tween7("synched",0);
	this.instance_5.setTransform(-134.6,44.35);

	this.instance_6 = new lib.Tween8("synched",0);
	this.instance_6.setTransform(705.55,98.7);
	this.instance_6._off = true;

	this.civil_war = new lib.civilwar();
	this.civil_war.name = "civil_war";
	this.civil_war.setTransform(246.9,70.55,0.8935,0.8935,-0.4814,0,0,73.4,54.1);
	new cjs.ButtonHelper(this.civil_war, 0, 1, 2);

	this.cannon = new lib.cannon();
	this.cannon.name = "cannon";
	this.cannon.setTransform(117.75,349.35,1,1,0,0,0,42.8,26.9);
	new cjs.ButtonHelper(this.cannon, 0, 1, 2);

	this.button_6 = new lib.death();
	this.button_6.name = "button_6";
	this.button_6.setTransform(348.85,189.1,1,1,0,0,0,86.3,-45.6);
	new cjs.ButtonHelper(this.button_6, 0, 1, 2);

	this.weapon_2 = new lib.weapon_2();
	this.weapon_2.name = "weapon_2";
	this.weapon_2.setTransform(441.75,131.8,1.5803,1.6159,0,0,0,12.9,8.8);
	new cjs.ButtonHelper(this.weapon_2, 0, 1, 2);

	this.button_2 = new lib.Lincoln();
	this.button_2.name = "button_2";
	this.button_2.setTransform(400.3,36.9,1.1606,1.1606,0,0,0,25.2,31.8);
	new cjs.ButtonHelper(this.button_2, 0, 1, 2);

	this.gun_btn = new lib.gunbutton();
	this.gun_btn.name = "gun_btn";
	this.gun_btn.setTransform(188.5,191.5,1.125,1.1059,0,0.8388,0,95.4,12.8);
	new cjs.ButtonHelper(this.gun_btn, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.instance_6}]},63).to({state:[{t:this.gun_btn},{t:this.button_2},{t:this.weapon_2},{t:this.button_6},{t:this.cannon},{t:this.civil_war}]},1).to({state:[]},5).wait(164));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({_off:true,x:705.55,y:98.7},63).wait(170));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({_off:false},63).to({_off:true,regX:73.4,regY:54.1,scaleX:0.8935,scaleY:0.8935,rotation:-0.4814,x:246.9,y:70.55,mode:"independent"},1).wait(169));

	// Layer_1
	this.instance_7 = new lib.war();
	this.instance_7.setTransform(-13,-19,1.2788,1.2788);

	this.instance_8 = new lib.Bitmap10();
	this.instance_8.setTransform(191.45,29.95,0.081,0.081,-0.4751);

	this.instance_9 = new lib.lincol_1();
	this.instance_9.setTransform(400.35,36.9,1,1,0,0,0,29.1,36.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("AiOB3IEVgoAiaAUIEcgoAiOBFIEPgnAhXiCIB8gSAiZgYIEOgnAhuhkIDUgeAiDCvIEegpAhbifIBqgP");
	this.shape_2.setTransform(290.475,261.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFCC").s().p("AjjhSQgFgTgBgVIgIg6IGmg9IA1FvQAFAMgCAGIAFAlImmA9gAh/CrIEegpgAiKBzIEVgogAiKBBIEPgngAiWAQIEcgogAiVgcIEOgngAhqhoIDUgegAhTiGIB8gSgAhXijIBqgPg");
	this.shape_3.setTransform(290.075,262.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AC2TBIAAgBIgOhiIgBgHIgMhQIgJhEIgDgXIgEgaIgJg5IAqgGIAYgEIA8gIIAwgHIE4gtIAAAAIAAABIAMBOIAVCYIAGAoIAFAkIADATIAGAnIAJA/IAIA7Ig/AJIgGABIhRALIgnAGIjtAiIgvAGIgNACgACkNyIAIA6QAAAVAFATIAwFFIGng9IgFglQACgGgFgMIg1lwgAqmm1IAAgKIgBhdIAAghIAAhAIAAgEIgBhUIAAgNIgBhKIAAgiIgBhHIAAgMIAAhTIAAgLIgBhWIAAgLIgBhZIAAgIIgBhYIAAgDIAAgXIGugEIBSAAIMAgHIAGAAIAEAAIAEAAIANAAIACDfIAAAzIAAAjIABArIAAAUIABA3IAAAPIAABMIAAAIIABBPIAAAIIABBBIAAAhIABBCIAAAPIAAAFIAAA6IABAaIAAAPIAABDIgnABIgPAAIhFAAIhOABIiaABIgXAAIgPAAIgdABInSAEIhrABIgCAAIhBAAIghABIhxABIgJAAIgLAAIgSAAIgUAAIgpAAg");
	this.shape_4.setTransform(249.5,155.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#313F30").s().p("AgMAaQAMhIAGAZQAQAxgXAAQgFAAgGgCg");
	this.shape_5.setTransform(504.3667,241.2597);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#758070").s().p("AgRABIgBgDQAwAFgPAAIgggCg");
	this.shape_6.setTransform(547.7938,378.5779);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#747F71").s().p("AgQgFQgBgBAAgEQAmAVgDAAQgCAAgggQg");
	this.shape_7.setTransform(548.3939,373.7042);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#738272").s().p("AAQAKQgfgCgGgNQAQgHAVAGIAGABIAAAHIAAAIIgGAAg");
	this.shape_8.setTransform(556.775,365.9991);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#738172").s().p("AgIgGQAjAAghANIgBAAQgBAAAAgNg");
	this.shape_9.setTransform(551.8382,363.7031);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#738174").s().p("AgMADQA0gVg0AZg");
	this.shape_10.setTransform(548.475,365.8834);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#718277").s().p("AgUAAIgBgDQAzAHgKAAIgogEg");
	this.shape_11.setTransform(549.9938,353.722);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#6E7F79").s().p("AAPgDIgHAGQgTAUgQgaIAggOQAZgQgCAeQgCAbgDAAQgEAAgEgbg");
	this.shape_12.setTransform(554.3114,350.5467);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#738175").s().p("AAiAVQAAgFgGgMQAkgFAgAKIgGgBQgmgFAsAiQgWAIgPAAQgYAAgBgYgAgoAnQgGgCgGAAIgGgHQgKgKgagLQgBgBAAgEQAHg6AYANQAFADgNAGIgFABQALgBAIADQALAFAHANIgSAEQgTAGATAHIATAGIgHgIQAqACgHgNIALAFQAdAMgUAKQgSAVgTAAQgGAAgGgCg");
	this.shape_13.setTransform(546.875,356.1484);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0F0F0A").s().p("AgmgiQAUAIAKARQABADAAAEQAtAKADAOIABAIIgGAAQgSAFgOAAQg3AAANhFg");
	this.shape_14.setTransform(4.1484,399.4561);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#100D03").s().p("AAAAZQgCgBgSgNQgLgIAEgXQBEgSgOAvQgFARgPAAIgHgBg");
	this.shape_15.setTransform(8.6285,387.6136);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#57522F").s().p("AgXgBQBeADheAAg");
	this.shape_16.setTransform(5.125,380.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#141100").s().p("AgLAMIAAgIIAAgKIAAgFIACAAQAoAGgiANQgBAAAAAAQAAABgBAAQAAABAAAAQAAABAAABIgGAAg");
	this.shape_17.setTransform(11.3933,375.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#74704D").s().p("AhECoIAAlJQA9giAtAwQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAQAFBAgPA5IgCgBIAAAFIgGAUIAGAAIAGAAIAGAAQAiANgJAaQALAigwgEQglgDgFANIgEABQgPAwglAwIAAgIgAgrAjQBeAAhegEg");
	this.shape_18.setTransform(7.17,376.8115);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#101005").s().p("AgQgRQAvgGgUAbIgKAPQgKgHgHgdg");
	this.shape_19.setTransform(14.3318,369.6146);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#100F01").s().p("AgSgGQBMgChGAPIgDAAQgHAAAEgNg");
	this.shape_20.setTransform(41.298,395.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#100E08").s().p("AAGAwIgqAAIAAgIIAAgIQAhAGgPgmIAHAAQAiADgLgyQAgAGgYAiQgIAKAZANQgSAAgHAgIgGAAg");
	this.shape_21.setTransform(53.025,397.625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#170C02").s().p("AgFAVQgCgEADgKQAAgCgEgFQgFgGgDgIQA5gXgpA4QgCADgCAAIgBgBg");
	this.shape_22.setTransform(56.5783,386.2994);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#131105").s().p("AgwAHQAjAOAEgeQAEgsA3AVQgQA+g5AJIgHAAIgCABQgUAAAEghg");
	this.shape_23.setTransform(19.4625,375.9524);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#0D0D09").s().p("ABxBhIiaAAQgDgeAIgSQgPgIgMgMIgDgEQgiAagWgqQBDgOBHgbQAbgKAHAEIAHAHQAcg/ghAgQgPAPgFgQQgKgmA2AGIAFAAQAkA+AGAzQACARgGgSQgQgPgEgEQgOgUgigBQA6AqAKBOIgGAAg");
	this.shape_24.setTransform(25,392.7346);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#968A66").s().p("AgIAVIgGAAIgBgHIgGgJQAqg0AAA0IgCAJIgDAFQgKAAgIACIgGAAg");
	this.shape_25.setTransform(18.55,348.7625);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#B6A97F").s().p("AgRgIQA7gEgnASQgHAEgEAAQgLAAACgSg");
	this.shape_26.setTransform(46.7248,352.6801);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#190C02").s().p("AgDgGQgBgEAAgEIAJAdIgIgVg");
	this.shape_27.setTransform(57.2944,366.8756);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#725140").s().p("AgFAOQAWhWgUBjg");
	this.shape_28.setTransform(61.0444,369.6886);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#68504B").s().p("AgJAPQASg7ABAlQACAdgKAAQgEAAgHgHg");
	this.shape_29.setTransform(68.9332,390.4323);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#160B07").s().p("AgJACQAbgWgKAUQgFAKgEAAQgEAAgEgIg");
	this.shape_30.setTransform(75.7953,367.6006);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#170A06").s().p("AgPAAQAAAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAgBQAkAJgFAAIgfgFg");
	this.shape_31.setTransform(72.6501,366.6776);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#6D584C").s().p("AgDAPQADgOgHgSQAdACgaAhg");
	this.shape_32.setTransform(72.4395,361.6);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#86624D").s().p("AgrBfQAeh+A0hqQAAAAABAAQAAAAAAAAQABAAAAgBQABAAABAAQAJBWgdBOQgRAvgdAzQgJAPgFAAQgJAAADgsg");
	this.shape_33.setTransform(64.8886,375.2589);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#69554D").s().p("AgIgQQgCgDAAgEIAVAvIgTgog");
	this.shape_34.setTransform(75.8066,362.2284);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#170D05").s().p("AgMgSQAFgPgQgGQA0AOgFARQgEANgTAHIAKAEQAQAHgNARQgsgDASg3g");
	this.shape_35.setTransform(57.8967,351.725);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#705B50").s().p("AgGAGQgEgEAAgHQAlgVgbAng");
	this.shape_36.setTransform(69.0315,357.9665);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#735C51").s().p("AgDASQgLgRgEgYQA/AtgtACg");
	this.shape_37.setTransform(78.4582,358.975);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#160703").s().p("AgIAOQgQgEgBgQQBVgbg5AxIgCAAIgJgCg");
	this.shape_38.setTransform(80.424,349.213);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#6E5950").s().p("AgPgKQA2AOgnAHIgCAAQgMAAgBgVg");
	this.shape_39.setTransform(80.7176,356.0414);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#688B74").s().p("AgJAHQAmgmgmAqg");
	this.shape_40.setTransform(227.175,398.4601);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#6B8874").s().p("AAZAPIg3AAIAAgIQAagrAhAsQACADAAAEIgGAAg");
	this.shape_41.setTransform(233.05,400.9499);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#507068").s().p("AAPASIgkAAIAAgIIAAgIQAFgfAXASQACACAAAEQABAMAKAGQACABAAAEIgHAAg");
	this.shape_42.setTransform(243.925,400.6145);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#44625C").s().p("AATAMIgeAAQAAgEgCgBQgKgGgBgMQAYAIAXAKQACABAAAEIgGAAg");
	this.shape_43.setTransform(247.325,401.225);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#190A03").s().p("AgCgTQARgYgTBEIAAABQgBAAADgtg");
	this.shape_44.setTransform(189.8629,370.6533);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#170B06").s().p("AgCACQACgKAAgNQAPgIgUA0g");
	this.shape_45.setTransform(189.088,378.0163);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#739188").s().p("AAmC1IiOAAIAAgIIAAhQIAYkJIABgIQAJAAAHADQABAAAAABQAAAAABABQAAAAAAABQAAABAAABIgGAAIgHAAQAYA2A3AVQA1AUAvAaQgFApgFBXQgFBOgvAaIgFAAg");
	this.shape_46.setTransform(203.85,384.325);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#6C6957").s().p("AgLC1IgHAAIAAgIIAAgoQAOihAUiYIADAAIgBAIIgXEJIAABQIAAAIIgGAAg");
	this.shape_47.setTransform(193.925,384.325);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#150A02").s().p("AgFAPQALhJAABBQgBARgDAAQgCAAgFgJg");
	this.shape_48.setTransform(190.176,362.2731);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#715B50").s().p("AIxETIxuAAQgDgIADgEQANgSgHgTIADAAQgTg0AogkIgFgBQg7gFgDhLQAnAAAEgGQAQgegFgBQgfgDACgXQA9gBAtgLQACAAADAEQAsgrgyADQALgnAggSQgDgqAWguQDmgVDkgQQCUgLBmgKQBRgIBaAOQAaAEAMgZQAugJAOAlIACAAIAAAEQAgAFATAMQgJCbgNCWQAAAFgWALQAUBUgUBdIgHAAg");
	this.shape_49.setTransform(128.45,374.987);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#65514C").s().p("AgNgDQgBgBAAgEQAfARgCAAQgCAAgagMg");
	this.shape_50.setTransform(185.5065,348.605);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#110B09").s().p("AgCARQgJgFACgMQAegwgRBEg");
	this.shape_51.setTransform(214.1647,358.2033);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#130A09").s().p("AhygdQgHgDAEAUQAEAQgRgYQAIhDAZAQQAlAXAeAcQANgPAOAMQADADAGAAQBCAkA0A0IAGAHQh6g5h6gvg");
	this.shape_52.setTransform(203.25,359.4708);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#140B09").s().p("AgKAAQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAgBQAbAJgEAAIgWgFg");
	this.shape_53.setTransform(208.8376,351.4143);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#705744").s().p("ABLBDQhRgrhQgrQAUgfACACQAWASAMglQA6AZA0AgQAEADADAEQgHAgABAfIAAAJQgDgBgDgBg");
	this.shape_54.setTransform(247.325,389.15);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#61826D").s().p("AgFAGQgGgDAAgPQAdAZgHAAQgEAAgMgHg");
	this.shape_55.setTransform(233.675,392.4723);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#698B75").s().p("AA1A1IgHAAQg/gQARgwQAIgTgDADQgaAdglgMQAogJAUghQABgCAJAJQAeAkgnAWQAdAaAPgmIgEALQgHAXAXASIgGAAg");
	this.shape_56.setTransform(221.55,397.124);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#5A7561").s().p("AAKATQgVgNgKgZQAhAAAJAXIABAIIgGAAIAAAIQgDAAgDgBg");
	this.shape_57.setTransform(220.925,386.75);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#667F71").s().p("AgPABIAAgHIAHAAQAIgYAOAZQACADAAADIAAAIQgBAAgBAAQgBAAAAAAQgBABAAAAQAAAAgBABQgEAIgFAAQgGAAgLgSg");
	this.shape_58.setTransform(224.05,388.6408);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#6A8976").s().p("AgLACIAAgHQAuALguAAg");
	this.shape_59.setTransform(226.7625,389.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#A0C2AD").s().p("AEjCxIg4AAQAAgEgBgBQgYgLgYgIQAAgEgCgCQgZgSgEAgIAAAIIAAAIIgHAAIgxAAQAAgEgCgDQgigtgaAsIAAAIIgHAAIgSAAQgWgSAHgXIADgLQgOAmgdgaQAngXgegkQgJgJgBACQgVAhgoAJQAkANAcgeQADgDgIATQgSAxBAAQIgGAAIiuAAQAvgaAEhOQAGhXAFgpQgwgag0gUQg5gVgXg2IAHAAIAGAAQCXBDCMBNIAGABIBFAmQACABADAAQASAGAOAJQACABAEAAQBQAtBSAqQACACADAAQALAUgEAkIgBAIIgGAAgAAACRIAAAEIATgXIgTATgABEBUQAnAUgtgoQAAARAGADgAgqAnQACABADAAQARAeAKgUQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAIAAAEQAuAAgugMQAAgEgBgDQgOgZgKAYIgBgHQgJgYghgBQAJAaAXANg");
	this.shape_60.setTransform(226.2903,384.725);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#74543D").s().p("ABFA3IhFgnQAUgZgpgJIgCgBQgzACABgmQAbgCAEAGIAAAAQARgBAPALQATAOgOgcQAfAgAlgEQADAAADAEQgFAlAKAjIABAIQgDAAgDgCg");
	this.shape_61.setTransform(227.449,379.885);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#75523A").s().p("AgMADQAygUgyAYg");
	this.shape_62.setTransform(236.175,382.8331);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#110A07").s().p("AichGQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAgBQApgLAfAkQACADAAAEQAdAGAEgFQABAAAAAAQABgBAAAAQABAAAAAAQABAAABAAQBcBBBuAyQABABAAAEQiehJichLg");
	this.shape_63.setTransform(238.925,377.7726);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#140907").s().p("AgkgLQAAAAAAAAQAAgBAAAAQAAgBAAAAQgBgBAAgBQAlAEAiAQQAMAGgcAFQgUgRgigKg");
	this.shape_64.setTransform(220.055,368.625);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#625951").s().p("AANAwQgcgJgTgSQgCgCAAgEQAvgPAQg1IABgDQACBDAHAVQAAAZgKAAQgFAAgJgJg");
	this.shape_65.setTransform(252.275,373.5133);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#140D06").s().p("AAEAWQgTgKAAgXQAtgkgVBHg");
	this.shape_66.setTransform(289.2566,382.7388);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#959B9B").s().p("AAbAQIgGgBQgRgJgUgGIAAgDQgOAAACgMQAnAGATAZg");
	this.shape_67.setTransform(268.8879,389.55);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#63554A").s().p("AhgBZIgCgJQghgEAHgsIABgQQALg4gChHIADAAQBvgXBXAHIAEgDQAIgGANAAIAOCgQADAZgkgRQgVADAuAVIgBADQgIAPgDgSQgcACgYgJIACALIAGgEQgCAXgZgHQgKgDAGALQgnAQgvgQIAEAGQACADAHAAQAXAag7AKQgEAAAEAEQAFAHgTABQgxgZAtgXg");
	this.shape_68.setTransform(278.972,372.65);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#150D05").s().p("AgGgqIgBgFIAAgIIABAAQATAEgHBDQgCAUAAAUIgKhig");
	this.shape_69.setTransform(304.6018,369.425);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#65552D").s().p("ABLAVIiaAAIAAgIQAygsATATQABACAEAAQArgfArA+IgGAAg");
	this.shape_70.setTransform(398.8,400.3165);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#382911").s().p("AgNgUQArAFgXAfQgEAFgDAAQgHAAgGgpg");
	this.shape_71.setTransform(372.2948,379.5719);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#544621").s().p("AgWAhIgBgEQAsgcgsABQgRAAgIgcQAtgRAoAMQAAABABAAQAAAAAAABQAAAAAAABQAAABAAABQAfA/g8AAQgNAAgSgEgAAWACQAXgfgsgFQAIA2ANgSg");
	this.shape_72.setTransform(370.7552,381.003);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#5D4F20").s().p("Ag/AYIAAgIQBXAEAUgqQABAAAAAAQAAgBABAAQAAAAABAAQABAAABAAQAeAfgeAIQgyAHg3ABIgHAAg");
	this.shape_73.setTransform(361.05,383.925);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#594A20").s().p("AiBAkQAcgLAuABQAoABgogYIAIgDQANgIgPgEQAIgmA8AOIAGAAIAAAIIAAAIIgGABIgxAHQASAwAygPQArgOAxAFIAAAIIgGAAQhTAVhVAAQgqAAgrgFg");
	this.shape_74.setTransform(341.675,384.3606);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#574418").s().p("AgOAAIAAgHQA4AEgyAKIgGABIAAgIg");
	this.shape_75.setTransform(345.6666,381.5);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#5C461E").s().p("AAOAMQgYgDgGgMQArgVgNAkg");
	this.shape_76.setTransform(350.1982,381.1314);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#56451F").s().p("AgngFQAsgPAhASQACABABADQgcALgSAAQgZAAgJgSg");
	this.shape_77.setTransform(356.9,380.4855);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#6D643C").s().p("AALAcQgGgegRgYQAhgKgKBAg");
	this.shape_78.setTransform(354.8287,366.5088);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#161005").s().p("AiIgBQAiAGBCgDIAAgDQgXgQA3AFQAnADAfgJQAxgPAWAnIgHABQhrAJhtAHIgGAAIgGAAQgfAAgHgYg");
	this.shape_79.setTransform(338.575,357.531);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#130B04").s().p("AgugGQgCgCAAgEQA8ANAUAAQAeAAgYAKQgQACgOAAQglAAgRgTg");
	this.shape_80.setTransform(357.1284,356.2833);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#140904").s().p("AgtAFQAAAAAAAAQAAgBAAAAQAAgBAAgBQgBAAAAgBQBIgOATAKQABABAAADQgoAHgYAAQgRAAgKgDg");
	this.shape_81.setTransform(367.45,355.6811);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#584B1D").s().p("Ah7AvQAygkAbg6QAAgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQBagGAlAnIgKAAIgMAAQgYAqBWgDIgDAFQgDADgGAAQhTASgNhJQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgmgDgTASQAAABgBAAQAAAAgBAAQAAAAgBABQgBAAAAAAQgRAzg6AIg");
	this.shape_82.setTransform(400.65,378.4346);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#8C7C4D").s().p("AgRgKQBBAOgygDQgIAKgEAAQgGAAADgVg");
	this.shape_83.setTransform(401.8905,364.068);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#635325").s().p("AiEApQAagTAVgWQACgDAAgEIBRgnIAFgBQBMALAtApQADADAGAAQgxAUgPgqQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAgBAAQAEA3gWgQQgpANgTglQgBgDAAgEQgIgPglAWQgCAAgDAAQgUAwgaAAQgLAAgLgHgAATgDQAzADhDgPQgDAjATgXg");
	this.shape_84.setTransform(399.725,364.5803);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#191105").s().p("AiuAHQCxgdCKAIQBMAEhegCQgPgBACANIgGAAQh3ALiAAEIgGAAIgLACQgMAAgCgKg");
	this.shape_85.setTransform(396.4565,354.2584);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#140C01").s().p("AgSAAQAUgRAPASQACADAAAEIgHAAIgMAAIgFAAIgGABQgIAAABgJg");
	this.shape_86.setTransform(417.4129,352.5825);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#19150F").s().p("AAAAUIgxAAIAAgIQAugQAvgOIAGgBIAAAIIAAAIQAAADgCABQgSAJgYACIAAAIIgGAAg");
	this.shape_87.setTransform(488.825,400.425);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#716A5A").s().p("AADAQIgqAAIAAgIQAqgGAggQQACgBADAAQAAAEgBABQgOAKgQAIIAAAIIgGAAg");
	this.shape_88.setTransform(501.525,400.825);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#867B69").s().p("ABFArIiOAAIAAgIQAPgIAOgLQACgCgBgEIAAgIQAOgTAggIQAggIAGgIIADAEQAbgWAABFQABARACAQIgFAAg");
	this.shape_89.setTransform(509.9,398.1528);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#130E0A").s().p("AgHAgIAAgIQABgfgHgYQAtAVggAkQgBACAAAEIgGAAg");
	this.shape_90.setTransform(454.8064,399.225);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#120F0A").s().p("AAFARIgBgIQgEgMgMgMQAfgHgHAfIAAAIIgHAAg");
	this.shape_91.setTransform(461.5799,400.7538);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#0F0E09").s().p("AAAAwQgIgpADg2QARAcgIBDIgEAAg");
	this.shape_92.setTransform(448.4142,378.275);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#120D0C").s().p("AgrAPQAPg4A1gBQAcgBgNAfIgDgEQg/gUgDBDQgBAMgDAAQgDAAgHgcg");
	this.shape_93.setTransform(458.4429,381.6264);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#63522C").s().p("AgVAAQBWgFhWAIg");
	this.shape_94.setTransform(432.0125,393.7107);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#5C4C22").s().p("AgQAHQgDgBAAgHQgZgNglAsQgQATgPgTQA2gjAtgpIAAAFQgOA8BLgJIAAAEQALhRAUBRQAlANgDATIgDABQhNgRgxgXg");
	this.shape_95.setTransform(430.6363,397);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#53471F").s().p("AAyAFQgDgEgKgBQgzAZA0gKQAOgDgCAVQgzAghKgPQgLgCgQgFQgFgCgEgIQA6gTALAAQAzgBgigJQgLgEgNAAQARgqAzADIgHgGQgKgJALgBQAzgFANAkQAAAAABAAQAAABAAAAQABAAAAAAQABAAABAAQAgA2gBAaQgugegQgWg");
	this.shape_96.setTransform(429.8265,378.2497);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#594A23").s().p("ABQAwQgggpgngjQgDgDgGAAQgXAwg/gwQA+ABArgQIAGgBQAyAvAMAwg");
	this.shape_97.setTransform(431.7,362.175);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#5A4819").s().p("Ag0gCQA8gQAsAMQAAAAAAAAQAAAAABABQAAAAAAABQAAABAAABQgWAPgaAAQgaAAgfgPg");
	this.shape_98.setTransform(423.925,365.7429);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#887D47").s().p("AJKD6Il1AAQgqhAgsAfQgEAAgBgBQgTgUgzAuIAAAIIgGAAIp/AAIAAgIIAAmaQATgBASgDQAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAgBQBtgHBsgJIAGgBQAmgFAMANQAfAWArgWQATAvgfAaQgYgnABAnQABAUgigcQglg9gfAlIgFgQQg5gCgTA6QgDAAgCgCQglgnhSAZQAVBHgDg3QAvAVgcAEQgLACAFAEQAfARhLAJQDugED8gZIABgEQgghEhWgtQBAgUBbAAIAAgDQCAgEB3gMIAHgBQAxAAAygDIAAgFIAMAAIAHAAQB3gFB7gDIAGAAQAMD+gGD1IgGAAgAGvDBQAAAIADABQAyAXBNARIADgBQADgTglgNQgUhSgLBSIAAgEQhMAJAOg9IAAgFQgtApg2AkQAPATAQgTQAcgjAWAAQAGAAAGADgAG7ChIAAAEQA4gGgQAAIgoACgAo4BpQCDAPB8gfIAGAAIAGAAQA3gCAzgGQAegJgeggQgBAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAABQgVAqhXgDQgxgFgsAOQgyAPgSgxIAxgIIAGAAIAGgBQA0gLg6gEIgGgBQg8gOgIAnQAPAEgNAHIgIAFQAnAYgngCIgFAAQgrAAgbALgAiqBAIAAAFQBjARglhOQAAgBgBgBQAAgBAAAAQAAgBAAAAQgBAAAAgBQgpgLgsAQQAHAdASAAIADAAQAnAAgqAbgAHtAMQAQAWAuAeQABgaggg2QgBAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgNgjgzAFQgLAAAKAKIAHAFQg0gDgRArQANAAALADQAjAKg0AAQgLABg6ASQAEAJAFABQAQAFALACQBKAPA0ggQACgUgOACQg1AKA0gYQAKAAADAEgABsgoQgBAAgBABQAAAAgBAAQAAAAgBAAQAAABAAAAQgbA7gyAjIAAAEQA6gHARg1QAAAAABAAQABAAAAAAQABAAAAAAQABAAAAAAQATgTAnADQAAAAABABQAAAAABAAQAAAAAAAAQABAAAAAAQANBJBTgSQAGAAADgDIADgFQhWADAYgqIANAAIAJAAQggghhIAAIgXAAgAlxAgQAGAOAYACIABAAQAIgXgPAAQgJAAgPAHgAlGAYQARAhBAgZQAAgEgCgBQgSgKgWAAQgSAAgVAHgACLivIhRAnQAAAEgCACQgVAYgaASQApAaAbhCQADAAACgCQAlgVAIAPQAAAEABADQAUAmApgNQAWAPgEg3QABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAPArAxgUQgGAAgDgDQgtgqhMgLIgGABgAIlhoQgMgxgygvIgGABQgsAPg+gBQA+AyAZgyQAGAAADAEQAnAkAgApIAHAAIAAAAgAFLh4QA/AgArggQAAgBgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQgTgFgWAAQgdAAgjAJg");
	this.shape_99.setTransform(385.5473,377.5);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#150C02").s().p("AgTACQAkgfADAnIgJACIgJAAQgQAAgFgKg");
	this.shape_100.setTransform(441.775,350.7421);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#100E07").s().p("AiAAwIAAgIIAAgIQAtgLAkgUIAGgBQADAAADAAQBXgoBKgPIADAAQh7A7iGA0IAAgIg");
	this.shape_101.setTransform(506.675,394.375);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#130A05").s().p("AgYgLQAfgEASATIgFADQgKAGgJAAQgQAAgJgYg");
	this.shape_102.setTransform(476.4,373.8569);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#6B605B").s().p("AgdgBQB5ADh5AAg");
	this.shape_103.setTransform(476.35,376.9);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#0E0906").s().p("AgSB1IgMAAIAAgIQAEhcgKhMQABhMBCAaIAGABQgNB8gkBlIgGAAg");
	this.shape_104.setTransform(477.025,390.792);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#100C08").s().p("AgbgDQAegJAZAQIgMACIgPABQgTAAgJgKg");
	this.shape_105.setTransform(495.95,341.624);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#908774").s().p("AgCAcIAAg/QAKAcgIArIgCAAIAAgIg");
	this.shape_106.setTransform(495.327,332.825);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#91877D").s().p("AgbgEQAbAAAbAEQAAAAAAAAQABAAAAAAQAAABAAAAQAAABAAABIgHABIgRABQgUAAgLgJg");
	this.shape_107.setTransform(491,336.1426);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#0D0B08").s().p("Ag8B1QgThrADhtQAbgfBKAXIAzAQQABAAAAAAQAAABAAAAQAAABgBAAQgBABgBABQgOAMgNAIIAFADQACABAAAEQgEAAgBACQgcAWgLAoQgjgIgJAVQgTAxgEAyIgDAAg");
	this.shape_108.setTransform(480.9624,354.4602);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#90816D").s().p("AgbgEQAbAAAbAEIABADIgGABIgSABQgUAAgLgJg");
	this.shape_109.setTransform(482.3,335.3426);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#9F9571").s().p("AgYgEIArAAIAGAAIAAAHIgGABIgQABQgSAAgJgJg");
	this.shape_110.setTransform(481.975,327.2676);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#120B06").s().p("AgaABIAAgDQBHAFgYAAIgvgCg");
	this.shape_111.setTransform(476.6063,339.9167);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#9D8C6D").s().p("AgYgEQAYAAAYAEIABADIgGABIgPABQgTAAgJgJg");
	this.shape_112.setTransform(475.775,334.5158);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#877554").s().p("AgIAoQgDgYgHgnIAGgIIABgIQAOAAAPAEIAAAEIgGAAIgRAAIAAA/IAAAIg");
	this.shape_113.setTransform(473.9,329.975);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#0E0C0F").s().p("AgOAAQAog1gPA4QgBAFADAIIgGAFQgHAFgEAAQgLAAABgag");
	this.shape_114.setTransform(480.3855,314.7283);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#0F0B0D").s().p("AgfgJQAhgIAPgJQAUgNgHAWQgNAxgRAAQgOAAgRgpg");
	this.shape_115.setTransform(475.8547,314.9254);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#89724C").s().p("AgRAFQgLgFgMgLQBAABAKgBIAGAAQgHALgIAFQgKAHgLAAQgJAAgMgHg");
	this.shape_116.setTransform(467.4,320.7624);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#A89B8D").s().p("AAAAgQgDggAAgfQAKAVgEAiIgBAIg");
	this.shape_117.setTransform(494.1802,314.7);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#161002").s().p("AgDAUIAAgvQAOAzgOAEg");
	this.shape_118.setTransform(486.075,316.725);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FCFBF5").s().p("AgFB4QgRg/gCg4IAAgQQAAgEgCgDQgFgJANgRIgDAAQgFgWgEgqQAKAAAHgDQABgBAAgEQAjgJABAZIABAIQAAAgADAgIADAAIAAAhIAAAfIAAAIQgEAhAEAXIgEABQgFAbgQAAQgGAAgFgEg");
	this.shape_119.setTransform(491.3,321.1881);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#F1E6BD").s().p("ABlCJIgGAAQAAgBAAgBQAAgBAAAAQAAAAAAgBQAAAAgBAAQgbgEgcAAIgGAAIgZAAIAAgFQgbgDgcAAIgGAAIgGAAIgBgEQgYgFgZAAIAAgIIAAhAIATAAIAGAAIAfAAIAGAAQAMAOAggFIAFAAQAlAIgFghIgBgIIAAgIIABgWQAAg8gHg2QABAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAQACgDAAgEIATAAIAGAAQAAAEgCABQgHAEgKgBQAEAqAFAWIAEAAQgOASAGAIQABADAAAEIAAARQACA4ARA+QAaAOAIglIADAAQgEgYAEghQALAIgEAZIgBAIIAABAIAAAIIgGAAg");
	this.shape_120.setTransform(484.2533,322.75);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#847D60").s().p("AADBNIgBgfQgCg/gFg6IAFAAIAGAAQAAADgCAEQgBAAAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAQAHA1gBA8IAAAWIAAAJg");
	this.shape_121.setTransform(486.9887,316.7);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#74737F").s().p("AgbgDIAxAAIAGAAQAAABAAABQAAAAAAABQAAAAgBAAQAAAAAAAAQgPAEgMAAQgQAAgLgHg");
	this.shape_122.setTransform(489.75,299.017);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#110C08").s().p("AgUgBQBSADhSAAg");
	this.shape_123.setTransform(447.425,341.45);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#150A01").s().p("AgNAAQA3gIg3AMg");
	this.shape_124.setTransform(444.2375,326.0189);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#190A00").s().p("AgYgGQBVAGg9AGIgGABQgQAAgCgNg");
	this.shape_125.setTransform(432.945,326.6237);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#140D0A").s().p("AgUgBQBSADhSAAg");
	this.shape_126.setTransform(436.275,342.25);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#130E08").s().p("AgbgBQBvADhvAAg");
	this.shape_127.setTransform(430.15,345.5);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#8A6F4C").s().p("AgQAHIAAgHQA9gWg0AfIgCABQgDAAgEgDg");
	this.shape_128.setTransform(427.1641,322.8231);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#886C4C").s().p("AgSgIQAYgGAJAMQAAABAAAAQABAAAAAAQABABAAAAQABAAABAAIAAAHIgBAEIgCAAQgYAAgKgTg");
	this.shape_129.setTransform(423.625,322.8658);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#927652").s().p("AgjABQgBgBAAgDQALgFALgCQAOgDALADQAPADALALIgEADQgCABAAAEIgQAAQgeAAgUgLg");
	this.shape_130.setTransform(436.675,322.3916);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#120D0A").s().p("AjkBJQgJgDAEgQQAfAXgKAAQgFAAgLgEgADhAGIgGgBIgrABIgGAAIggAAIAAgFQgPgDgQAAIAAgIQAvACgEgSIAEgGQAGgJACgHQACgJgEgHQgMgRAcAHQATArARgnIAFATIAAADIACAWQgPAKgnAHQgOACAfgDQAuAJAHAHg");
	this.shape_131.setTransform(461.9027,326.2335);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#190800").s().p("AgugEQAuAAAuAEIABADIgHAAIgfAAIgGAAIgRACQgVAAgLgJg");
	this.shape_132.setTransform(436.975,316.0026);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#806835").s().p("AgnABIAAgIIBJAAIAGAAQAAAFgCACQgGAIgVAAQgTAAgfgHg");
	this.shape_133.setTransform(433.875,318.6946);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#10164F").s().p("ABEAWQhPgGhPgSIgngGQAqgUATAJQAlARAbgFQA4gJBIAQQAVAXg0AAIgZgBg");
	this.shape_134.setTransform(435.4274,305.9149);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#997E54").s().p("AABAEQgIABgFgDQgFgCAAgHQAtgBgNAKIgJAFIgFABg");
	this.shape_135.setTransform(455.8456,321.1471);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#7F6441").s().p("AgKAAQgEgDgEgGIANAAIAFAAQAAAHAFACQAEACAKAAIAAAEIAAAEQgTgBgKgJg");
	this.shape_136.setTransform(454.05,321.35);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#86724D").s().p("Ag2ALIAAgEQgjACgQgNQBhACBTgJIAGgBIAMAAIANAAQgwAZhLAAIglgCg");
	this.shape_137.setTransform(460.85,315.9721);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#917950").s().p("AgeAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQgBgBAAgBIAAgBQA1gPAKAQQADAFgCAIIgDABIgSABQgaAAgPgMg");
	this.shape_138.setTransform(446.7768,321.6506);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#94805A").s().p("Ag9AhIAAgIQABAAAAAAQABAAABgBQAAAAABAAQAAAAAAgBQACgCAAgEIADAAQgGgRADgeQBEgSgEA5IADAAQAQAOAigCIAAAEQgMAAgMgCQgWgDADACQAMAGgGAFQgDACgWAAQgVAAgogCg");
	this.shape_139.setTransform(449.075,314.6208);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#120A08").s().p("AhcAUIAAgIIAAgfQAoA2AygtQAMgMALAIQAbAVAtAFIgGAAQhFAIhNAAIghAAg");
	this.shape_140.setTransform(459.625,313.5174);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#10184D").s().p("AgOACIAAgDQAyADgiAAIgQAAg");
	this.shape_141.setTransform(451.225,302.8583);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#0E174A").s().p("AgUACIAAgDQBKADg7AAIgPAAg");
	this.shape_142.setTransform(461.075,304.4525);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#0E164B").s().p("AgMgBQgBAAAAAAQAAgBAAAAQAAgBAAgBQgBAAAAgBQAfALgDAAIgagHg");
	this.shape_143.setTransform(458.6001,307.2873);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#0E0C0D").s().p("AgOACQAggWgEAMQgHAVgIAAQgGAAgHgLg");
	this.shape_144.setTransform(450.5716,276.7284);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#0E0C0C").s().p("Ag1BkQgDgNgDgYQAAgRgFgYIAAgBIgBgJIAAgIIAAgfIAAgJIAAhAQAzAcBDANQgCACABAFQAoAYhFgRQgLgDgKgMQgWgMgIAjIgCAHQAKAQAiAGQAiAFAKAPQgBASgpgKQglgKggAaQAPAgAtgGQAvgGgPAcQgHAWgTgPQABAEAAAFIgjABIgggBg");
	this.shape_145.setTransform(455.7456,288.5875);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#0D0D0D").s().p("AAHAKQgegCgMgMQAwgPAXAcQABABgKAAIgUAAg");
	this.shape_146.setTransform(457.6516,278.2293);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#100B09").s().p("AgRgEIAbgeQAPBFgMAAQgIAAgWgng");
	this.shape_147.setTransform(432.9231,254.0521);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#160806").s().p("AgegDQA9gGAAAMIgNACIgQABQgVAAgLgJg");
	this.shape_148.setTransform(425.5,269.2745);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#120B09").s().p("AgHg3QAJBEAIAjIABAIQgegjAMhMg");
	this.shape_149.setTransform(425.0056,251.925);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#0E0A08").s().p("AgCAOQACgUgLgIQArAYgjAFg");
	this.shape_150.setTransform(428.3176,255.25);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#5B5957").s().p("AgCAMQABgIgEgHQAVg6gSBXIAAABIAAgPg");
	this.shape_151.setTransform(429.7831,248.2591);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#150803").s().p("AgbgBQBvADhvAAg");
	this.shape_152.setTransform(457.4625,266.6);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#120701").s().p("AgFAsIAAgYIAAgIIAAg/QAKAMgEAcIAAAIIABAHIAAACIAAAAIACAGQAGAhgPAHIAAgIg");
	this.shape_153.setTransform(449.0189,270.825);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#AA9874").s().p("AgOgGQAbgZAAARIACAAIAAAIIAAAHIgCAAQAAAVgGAAQgHAAgOgcg");
	this.shape_154.setTransform(446.3,270.3636);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#1E1911").s().p("AgPAfIgBgFIAAgBIgBgCIAAgHIAAgIQAEgbgLgNIAABAIAAAIIgDgBQgDgLAAgMIAAgIIAAgIIAAgIIAAgdIAAgDIAOAAIAFAAIAFAAIAYAAIAHAAQAAAEgCADQgPAcAXANQgQAngHgMIgIgQQgGAWgEAAQgCAAgDgKg");
	this.shape_155.setTransform(450.95,268.868);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#79675B").s().p("AgPABIAAgDQAoAFgMAAIgcgCg");
	this.shape_156.setTransform(462.45,248.9779);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#9D8E66").s().p("AguDYQgbjUgKjcQBFgEBiAIIAAAEIgMgBQhFgKgeAbQAAAbAIgSQAOggABAoQAAAbgdgLQgBAaAUAAIAAAeIAAAIIgDAAQAAgQgcAYQAcA2AAguIADAAQAAAMADAMIADAAIAAAYIAAAIQAAAwADAwIADAAIAAAgIAAAIIABAIIAAACIAAABQAFAXgBASQgBAsgjAJQgMAAgBgCgAADiHIgDAAIAJgEIAAAEIgGAAg");
	this.shape_157.setTransform(449.375,278.4083);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#665B58").s().p("AgVgNQArgOAAAmIgKAEQgHADgFAAQgRAAgEgfg");
	this.shape_158.setTransform(500.95,293.5834);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#AFA49E").s().p("AAAAgQgDggAAgfQAKAVgEAiIgBAIIgCAAg");
	this.shape_159.setTransform(492.3033,287.325);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#B0AC96").s().p("AAAAoQgDgcAAgbIAAgIIAAgQQAKAcgEArIAAAIIgDAAg");
	this.shape_160.setTransform(486.0903,294.575);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#868270").s().p("AAAAkQgDgkAAgjQAKAMgEAbIgBAIIAAAQIAAAIg");
	this.shape_161.setTransform(485.4903,289.35);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#8A887C").s().p("AAAAsQgDgsAAgrQAKAggEAvIAAAIIgDAAg");
	this.shape_162.setTransform(484.8403,279.675);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#0E0F0B").s().p("AgLgCQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAgBQAdAPgCAAIgZgKg");
	this.shape_163.setTransform(465.994,281.6736);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#8F886A").s().p("AgbgEIAGAAIAHAAQAUAAAVAEIABADIgGAAIgSACQgUAAgLgJg");
	this.shape_164.setTransform(472.975,266.9026);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#8B7A60").s().p("AgYgEIAGAAQAVAAAVAEIABADIgGAAIgQACQgSAAgJgJg");
	this.shape_165.setTransform(463.975,266.1026);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#BDAA79").s().p("AgeAiIgGAAIgZAAIAAgEIgLAEIgOAAIAAADQgUAAACgbQAcAMAAgbQAAgngOAgQgIAQAAgZQAegbBEAKIAMABQAvAAAuAEIABAEIgHAAIhdAAQAhAMgKAXIgKAXQAcAAAJANIgGAAIgGAAIgFAAQgnAAgegIg");
	this.shape_166.setTransform(456.5448,261.3913);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#786659").s().p("AgRgJQBHANhBAFIgBABQgKAAAFgTg");
	this.shape_167.setTransform(467.6284,249.6506);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#E4CF97").s().p("AgPAoIAAgEQgVgEgWAAQgJgNgcAAIAKgWQAKgYghgMIBdAAIAHAAIBuAAIAHAAIAAAIIgHAAIhXAAQAOAoAEAXIABAIIgGAAIgGAAIgHAAIgPAAIgPAAg");
	this.shape_168.setTransform(468.025,262.3875);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#9BA998").s().p("AADA3QgigMAKg6IAAgIIAAggQBGATglBbQAAAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAIgGgBg");
	this.shape_169.setTransform(498.4848,269.625);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#8F897B").s().p("AgbgEQAbAAAcAEIAAADIgGAAIgSACQgUAAgLgJg");
	this.shape_170.setTransform(481.05,267.7026);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FBF7D0").s().p("ABEAsIAAgEQgbgDgcgBIgHAAIgSAAIAAgEQgVgEgWAAIgBgIQgEgWgOgpIBXAAIAGAAIAMAAIAHAAQADAfAgAyQABACABAEIgHAAg");
	this.shape_171.setTransform(477,263.575);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#74665E").s().p("AAFDMIAAhIIABgIQAEgkgKgVIAAgIIgTjwQAKgDgMgHIgQgOQAhgKACAGIAMACQALADADAPQAYDFgPDEIgJAAQgLhAgIBIIAAgIg");
	this.shape_172.setTransform(492.0481,277.3742);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#605449").s().p("AAJAQQAAgEgCgCIgWgZQAlgFgGAdIgBAHIgGAAg");
	this.shape_173.setTransform(486.0969,257.5138);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FAFAF5").s().p("AA1DFIgyAAIgFAAIAAgIQADgsgJgcIAAgIQAFgcgLgMIAAgJIAAgIIAAgIQAEgvgLggIAAgIIAAhBQAAgEgCgCQgfgzgEgfIAlAAIAHAAIAMAAIAFAAIAGAAIATAAIAGAAIATDwIAAAIQAAAhADAgIADAAIAABIIAAAIIgGAAg");
	this.shape_174.setTransform(486.65,278.875);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#796F63").s().p("AAZAEIgkAAIgHAAIgMAAIAAgHQAeAAAeADIABAEIgGAAg");
	this.shape_175.setTransform(482,258.75);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#957957").s().p("AgUgFQBGgGgyARIgFABQgKAAgFgMg");
	this.shape_176.setTransform(402.1245,324.1662);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#1A0B01").s().p("AAAAOIgMgIQgGgEgDgHQAwgTgGAYQgDAOgPAAIgDAAg");
	this.shape_177.setTransform(412.1574,328.2058);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#160C03").s().p("AgPgBQBBABhBACg");
	this.shape_178.setTransform(406.65,328.6);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#0F0E0C").s().p("AloETQBCgHhCAMgAD+jSIgBgEQBXAGghgdQgVgSBDAMIAGAAIAAAFQAJAYgcAIQgrAAgrgEgAE8kSIgBgFQAnAIgHAAIgfgDg");
	this.shape_179.setTransform(439.2703,306.45);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#917656").s().p("AgrgCQAzgLAdADIAHAAQgUAWgYAAQgTAAgYgOg");
	this.shape_180.setTransform(414.95,323.8865);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#170901").s().p("AgLAAIgBgEQAcAJgEAAIgXgFg");
	this.shape_181.setTransform(417.4688,327.2694);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#927A50").s().p("AgKgDQAnADgiAEIAAAAQgCAAgDgHg");
	this.shape_182.setTransform(384.9542,324.7514);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#957E52").s().p("AgVgDQATgQASAPQACABAEAAIAAAHQgEAAgCACQgJAGgHAAQgMAAgJgPg");
	this.shape_183.setTransform(391.675,324.7132);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#927A54").s().p("AgRABIAAgHQA9gJgsAVQgGADgEAAQgGAAgBgIg");
	this.shape_184.setTransform(395.6257,325.0114);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#140B05").s().p("AgOgBQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAiALgDAAIgegHg");
	this.shape_185.setTransform(401.0315,328.2298);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#AD925D").s().p("AgYgDIArAAIAGAAIgBADQgYAEgYAAIAAgHg");
	this.shape_186.setTransform(395.075,319.1375);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#8F7441").s().p("AgwAAIgHgCIAAgIIBjAAIAGAAIAGAAQgBAGgCAEQgIALgUAAQgTgBg2gKg");
	this.shape_187.setTransform(393.825,321.4);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#120B04").s().p("AgOAAQA8gEg8AHg");
	this.shape_188.setTransform(385.425,314.8333);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#A48C61").s().p("AgeAMIgsAAIgGAAIgGAAQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgMgEgMAAIAAgHIBEAAIAHAAQAtAAAugEIABgEIAfAAIAGAAIAMAAIAHAAQAAAEgCACQAAABgBAAQAAAAgBAAQAAABgBAAQgBAAgBAAIAAAHIgGAAIgrAAIgGAAIhKAAIAAAIIgGAAg");
	this.shape_189.setTransform(432.325,317.525);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#CEB78D").s().p("Ag0gEIBJAAIAHAAQAMAAAMAEQAAAAAAAAQAAAAABAAQAAABAAABQAAAAAAABIgHAAIgfACQgmAAgdgJg");
	this.shape_190.setTransform(418.35,318.4026);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#917549").s().p("AhDAEIAGgBQAZgGgmAAIAAgIIAaAAIAFAAQApANA6gFIAGAAIAHAAIAGAAQgiANg0ACQgMgFgsgDg");
	this.shape_191.setTransform(417.4,319.125);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#AB9061").s().p("AAVAEIgqAAIgGAAIAAgHIAwAAIAHAAIAAAHIgHAAg");
	this.shape_192.setTransform(401.6,319.95);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#846A38").s().p("AgYgDIArAAIAGAAIgBADQgYAEgYAAIAAgHg");
	this.shape_193.setTransform(406.875,319.9375);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#0D0709").s().p("AhvAeIAAgIQA3gDgLgkIALgDQB3ggAxBKIgHAAIhEAAIAAAIIgGAAIhKAAIgGAAIgZAAIgGAAIgfAAg");
	this.shape_194.setTransform(417.425,314.907);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#0C1347").s().p("AgDgIQgCgDAAgEIALAfIgJgYg");
	this.shape_195.setTransform(417.3694,305.0749);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#140C09").s().p("AgqgIQA/gFAVAJQABAAAAAAQAAABAAAAQAAABAAABQAAAAAAABQgPAKgSAAQgXAAgdgSg");
	this.shape_196.setTransform(362.15,337.3085);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#997F60").s().p("AgOABIAAgDQAnAFgNAAIgagCg");
	this.shape_197.setTransform(368.0188,325.4167);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#8E7854").s().p("AgYAAQAegSAPAOQALAKgaAEIgIABQgRAAgFgLg");
	this.shape_198.setTransform(360.9031,326.7529);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#8B744E").s().p("AgJADQgEgDAAgIQAZgKACASQABAMgHAAQgGAAgLgJg");
	this.shape_199.setTransform(372.282,326.0243);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#1A0B00").s().p("AgTgBQBPgChPAFg");
	this.shape_200.setTransform(378.4625,330.1653);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#8E754E").s().p("AgYgBQBiADhiAAg");
	this.shape_201.setTransform(380.775,325.35);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#94815A").s().p("AgMgBQAzABgzACg");
	this.shape_202.setTransform(344.8375,327);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#88714F").s().p("AgPgFQA5ACguAIIgCABQgIAAgBgLg");
	this.shape_203.setTransform(356.3096,326.5133);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#B99C68").s().p("Ag6AIIAAgIQANgDAPgCQAigGArAEIAGAAIAAACIACAFQAAAAABAAQAAAAAAAAQABAAABAAQAAAAABAAIAAAIIgGAAQgXACgcAAIg8gCg");
	this.shape_204.setTransform(353.15,321.9325);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#170B01").s().p("AgLAAQAAAAAAAAQgBgBAAAAQAAgBAAgBQAAAAAAgBQAcAJgDAAIgYgFg");
	this.shape_205.setTransform(359.119,316.0388);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#8C743D").s().p("AgbAAQAMAAAMgDQAAAAAAAAQAAAAABgBQAAAAAAgBQAAgBAAgBIAYAAIAGAAIAAAHIgBAEQgbAEgbAAIAAgIg");
	this.shape_206.setTransform(344.475,322.75);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#140B0A").s().p("AgmABQgBgBAAgDQA1ADAGgTIALATQAFAIADgJQAEgPgJAjQAAABgGAAQgngCgbgRg");
	this.shape_207.setTransform(346.964,298.175);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#130B0C").s().p("AgTAIQAigsAEAlQACAPgNAAQgJAAgSgIg");
	this.shape_208.setTransform(356.6633,298.5692);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#876B39").s().p("AgkABIAAgFIAAgCIBDAAIAGAAIAAACQAAAAAAABQAAABAAAAQgBABAAAAQAAAAgBABQgLAHgUAAQgQAAgYgGg");
	this.shape_209.setTransform(381.425,321.8217);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#A88F55").s().p("AgkACIAAgGIAAgBIBDAAIAGAAIAAABIAAAGIgGAAQgdAEgQAAQgSAAgEgEg");
	this.shape_210.setTransform(373.975,321.7814);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#876934").s().p("AgogDIBKAAIAGAAIAAADQgoAEgoAAIAAgHg");
	this.shape_211.setTransform(363.1,322.35);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#A78D50").s().p("AgbgDIAxAAIAGAAIgBADQgbAEgbAAIAAgHg");
	this.shape_212.setTransform(363.725,320.75);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#DBC38C").s().p("AicAQIgZAAIgGAAIhLAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAIgCgFIAAgCIATAAIAGAAQAcAAAbgEIABgEQCCAAB7gHIAHAAQAYAAAZgEIAAgEIB2AAIAGAAQAmAAgZAHIgGABIgHAAIgGAAIgGAAIgrAAIgHAAIgxAAIAAAHIgGAAIhkAAIAAAIIgGAAIgYAAIgGAAIhEAAIgHAAIhEAAIAAACIAAAGIgGAAg");
	this.shape_213.setTransform(385.325,320.3375);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#130B05").s().p("AgOgCQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAgBQAhAPgCAAIgegKg");
	this.shape_214.setTransform(375.5565,277.686);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#150A0A").s().p("AgTAAQA0gVgRAbIgQADIgHABQgMAAAAgKg");
	this.shape_215.setTransform(377.23,281.7452);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#19090A").s().p("AAKAYQgigXgIggQAgAXAdABIACAHQAHAggLAAQgGAAgLgIg");
	this.shape_216.setTransform(350.5924,289.7918);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#D1C8C4").s().p("AgDgHIgBgIIAIAfIgHgXg");
	this.shape_217.setTransform(351.4504,276.0447);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#615350").s().p("AgbgDIAxAAIAGAAIgBADQgbAEgbAAIAAgHg");
	this.shape_218.setTransform(351.925,279.7);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#B8ADAA").s().p("AhiAbQBmgCAmgKQAAAAABAAQAAAAAAgBQAAAAAAgBQAAgBAAgBQAAgpADAAQAKgCAPAGQANAFADgPQANAlgBAaIAAAIIgGAAIgGAAIgyAAIgGAAQgXACgTAAQgxAAgmgKgAA5gEQAQAygRg6IABAIg");
	this.shape_219.setTransform(345.4259,275.765);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#968983").s().p("AgHAQIAAgnIAGAAQAAAEABADQASAbgZANIAAgIg");
	this.shape_220.setTransform(357.9561,276.875);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#8D847B").s().p("AAGAkIgDAAQgJgigFglIAGAAIARBAIAAAHIgGAAg");
	this.shape_221.setTransform(356.575,270.825);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#DDD5CF").s().p("AANBIIgMAAIAAgIQAAgagMgmQAAgDgBgDQgKgSAFggIAAgIIAAgIQADAEAEADQACACADgBQAEAEABAFQABAEAAAEQAFAlAKAiIADAAIAAAoIAAAIIgGAAg");
	this.shape_222.setTransform(355.2638,272.05);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#786F68").s().p("AAAAcQAAgEAAgDQgCgFgDgEIAAgIIAAgfIAFAAQAGAVAAAaIAAAIIgGAAg");
	this.shape_223.setTransform(355.325,264.4);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#B8AB9D").s().p("AgnhDQA/gegYBGIADAAQAaAfALAYQgKAmgnAKIgGABQgRgygHheg");
	this.shape_224.setTransform(345.725,265.1522);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#675C53").s().p("AgrAoIAAgIIAAggIAAgIIAAgQQAxgEgLgLQA1AcgFADQgQAKgzAGQgUACAIAeIgHAAg");
	this.shape_225.setTransform(359.0712,257.625);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#7C745C").s().p("AAAAgQgDggAAgfQAKAIgEAXIgBAIIAAAQIAAAIg");
	this.shape_226.setTransform(354.5033,254.325);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#605C51").s().p("AgYgCIgBgIQAOAOAGgCIABgCQAjhGgHBjIgBAAQgnAAgIgfg");
	this.shape_227.setTransform(357.257,248.9643);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#150804").s().p("AgrADQgCAAgBgLQArgEAsALIAGABQgKAKgbAAQgVAAgggHg");
	this.shape_228.setTransform(361.25,264.9211);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#120A0A").s().p("AgHgEQgCgCAAgEQATAVgBAAIgQgPg");
	this.shape_229.setTransform(371.8007,250.5811);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#0D0708").s().p("AEbhgIgDAEQhQgagTBLQgOgNhQAKQgVADgWAAQg1g0hMAMQhzgehiANQgOACgDgSQDwgCDzgKQBAgDA8gJQAjCegQB7QgNiGgPhng");
	this.shape_230.setTransform(405.5535,285.325);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#110A0C").s().p("AiUBcIADgEQBNgNhNgHIAAAEQgnAxgOgiQgLgZgEAKQgYA2gagmQAqgaAigtQABgBAAAAQABAAAAAAQABgBABAAQAAAAABAAQgFg9ARgKQA3ANBHgSQAHgCAoAHQABgVAYgBQAbAAgCgaQA1BAAogYQApApAYgYQAFgFgCgMQApgIAIAYIABAIIAACQQiBgGhxgCQgDAAgEgIIgGgIQgKgRggApIgnABQg1AAgXgNg");
	this.shape_231.setTransform(399.1,289.825);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#140A04").s().p("AhcgEICzAAIAGAAQguAJgvAAQguAAgugJg");
	this.shape_232.setTransform(406.875,264.5);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#6D6460").s().p("AkHgEIAagVIABgBIAEAMQASAnBZgKQCbgRCZgPQA/gHASAMIgBAEQghAEgjAAIAAAHQiwAGipARIgcABQg9AAgYgfg");
	this.shape_233.setTransform(397.875,262.1253);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#7E7571").s().p("AhIAQQAiAAAigEIABgEQA7AMgEgrIASAfIADAIQhIAIhJAAIAAgIg");
	this.shape_234.setTransform(424.7,259.975);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#0B090B").s().p("AjgBfIgBgBQgCgDgGAAQgEAOgDABIgEgMIgBABQgBgKgBgRQgDhXAjA2QA2AUgHg7IgDAAQhKgBAGhQQAggIBPAIIAHAAQA3gOA/ABQAsABAwgDIArgBQALgLA2APQAEAAAFAHQAFAFgEgQQBEgSgsAZQgDABgDAAQALBRgLBfQhBAChOAEQg/ADAtAHQBfAGhsAEIg9ABQhyAAhkgPg");
	this.shape_235.setTransform(398.6236,250.0348);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#1C150B").s().p("AgHAFQgCAAAAgLQAbANgMAAIgNgCg");
	this.shape_236.setTransform(387.3757,200.3175);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#645C51").s().p("AgPAIIAAgIIAAgHQASgBAHAIQACAAAEAAQAAABgBABQAAABAAAAQAAABAAAAQAAAAAAABQgNADgNAAIgEAAg");
	this.shape_237.setTransform(417.75,209.2409);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#B7AA97").s().p("AgQgBQBFABhFACg");
	this.shape_238.setTransform(421.65,199.8);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#40372F").s().p("AgYgEQBWgMg+AVQgJAEgGAAQgMAAADgNg");
	this.shape_239.setTransform(363.4796,231.5025);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#645850").s().p("AgNgKQAMgKAIgNQAAAAABAAQAAAAAAgBQABAAABAAQAAAAABAAQAIAqgOAVQgEAGgCAAQgJAAgDgtg");
	this.shape_240.setTransform(367.9071,246.5535);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#130A06").s().p("AgCgjIAAgIQAKAggEAvIgBAIQgKggAFgvg");
	this.shape_241.setTransform(373.038,230.575);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#59524B").s().p("AgbgDIAxAAIAGAAQAAABAAABQAAABgBAAQAAAAAAAAQAAAAAAAAQgPAEgMAAQgQAAgLgHg");
	this.shape_242.setTransform(356.275,236.2337);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#BBAE85").s().p("AgGgFIgBgEQgFgJAAgNQAZACAAAWQAAAngFAAQgFAAgJglg");
	this.shape_243.setTransform(351.0505,234.9689);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#0D0601").s().p("AAWAIIgxAAIAAgIIAAgHQAiAIAUADIABAEIgGAAg");
	this.shape_244.setTransform(356.275,235.025);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#645C53").s().p("AhAAeQAVgjgIglIgBgIQAXAPAbgGIAFgBQAjAIAVgIQAKADgFAPQgFAPgHADQgvAZAdALQAmAUg/ABIgCAAQgsAAgbgVgAg0AWQgDAVAdgLQAngOgWAAQgNAAgeAEg");
	this.shape_245.setTransform(366.2333,228.8256);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#62594E").s().p("AgYgDIAqAAIAHAAQAAABAAABQAAABAAAAQgBAAAAAAQAAAAAAAAQgOAEgKAAQgPAAgJgHg");
	this.shape_246.setTransform(355.975,216.905);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#B1AA99").s().p("AgLAAIgBgDQAdAHgFAAIgXgEg");
	this.shape_247.setTransform(344.8063,208.0583);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#5C5249").s().p("Ag9gPIASAAIAGAAQAEAEADAAQA4gCAkANQAAABAAABQAAABAAAAQAAABgBAAQAAAAAAAAQgnAMgaAAQgtAAgMgfg");
	this.shape_248.setTransform(358.45,219.7309);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#64594F").s().p("AgegKIAxgIIAGAAQAAAIADAHQAAAAAAABQAAAAABAAQAAAAABAAQAAAAABAAQgTAQgbgIIgDgBQgFAOgDAAQgFAAABgdg");
	this.shape_249.setTransform(368.3677,220.8251);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#61584C").s().p("AhTAHQgDgHAAgHICnAAIAGAAIinAPQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAg");
	this.shape_250.setTransform(359.05,211.7);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#1D140B").s().p("AgLABQAwgLgwAPg");
	this.shape_251.setTransform(381.3875,202.7929);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#675B4E").s().p("AgxgEIBcAAIAHAAQgZAJgZAAQgYAAgZgJg");
	this.shape_252.setTransform(357.825,194.45);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#B6AB9A").s().p("AgeASQAogDAOgpQAAgBAAAAQABgBAAAAQAAAAAAABQABAAAAABQAPA3ghAAQgOAAgYgLg");
	this.shape_253.setTransform(368.9658,199.4346);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#695C4E").s().p("AgegIQAlgFATAMQACABADAAIAAAIIgGAAQgLACgJAAQgaAAgJgSg");
	this.shape_254.setTransform(366.5,194.8129);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#B7AD9D").s().p("AgJAYQgNgVgCgdQBGgHgdANQgbAOAEAjg");
	this.shape_255.setTransform(358.4934,199.0661);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#B3A9A2").s().p("AgugBQA6AGAdgUQACgCADAAIABAXIgBAIIgGABQgRADgOAAQgkAAgTgTg");
	this.shape_256.setTransform(353.175,150.662);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#85796F").s().p("AiHAAIAAgIICzAAIAFAAIBRAAIAGAAQAAABAAABQAAABAAAAQAAABAAAAQAAAAgBAAQgLAEgNAAIAAAHIgFAAQgoACglAAQhXAAhNgJg");
	this.shape_257.setTransform(367.15,171.5275);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#8E877B").s().p("AgTAFIAAgHQABAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAQACgDAAgEQADAAACACQApATgTAAQgJAAgYgGg");
	this.shape_258.setTransform(372.2683,167.6528);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#8C8678").s().p("AhMAeIgHgHQAVhFAdAWIgFAGQgSAYARABQBdgFg+gJIgNgBQA3gxAwA6QACACAAAEIgGABQg1AFhfACIAAAIIAAAIIgGgBg");
	this.shape_259.setTransform(362.475,165.0709);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#6F685D").s().p("AghAzQgJgUgYgDIAAAIIAAAIQgDAAgCgBQgFgDgDgEIAAgEQhNAHgpgbQAugDAlgrQAAAAABAAQAAgBABAAQAAAAABAAQABAAAAAAQBPACA6gMQBcgTArAlQAZABAJAfQAKAjgyAEIgGAAIizAAIAAAIQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAgBgBAAgAgXAMIAHAHIAGABICNAAIAHAAQBKAPg/geQgCgBgDAAIAAgHQAAgEgCgDQgwg7g4AyIANABQA/AKheAFQgRgBASgaIAFgFQgHgGgHAAQgTAAgQA1g");
	this.shape_260.setTransform(356.459,166.2139);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#B4AD9D").s().p("ABBAMIiOAAIAAgIIAAgHQBfgCA2gFIAGgBIAAAIQgBADgCACQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAIAAAIIgHAAg");
	this.shape_261.setTransform(363.1,167);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#60574B").s().p("Ag6ACIAAgDQA4gIA2AHIAHABQgdAHgiAAQgZAAgdgEg");
	this.shape_262.setTransform(409.05,186.9644);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#4A4337").s().p("AhpAlIAAgEQhagEhaAAIAAgIQCQATBLgxQACgBADAAQASgCATgmQg8ABhfgBIAAgIQBZgNCFAAQB4AABuAVQhNAAhOgDQg+gBAMAMQAaAYAkgYQAngMAFA0IgDADQAzAqAUg1QAWggAWA/QgXAQAKALQAFAGgJACQgYAIgPgLQgvgvgiAvQgYgehYAGQgWATgaANIgTAKIgOABQg/AAACgjgAhKAVIAAAEQAdgJgFAAIgYAFgAgJABQAjAHglgSQAAALACAAg");
	this.shape_263.setTransform(387.625,200.7181);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#5B5D4F").s().p("AgSgJQAJAIAWgHIAFgBQAAAEgBACQgQANgHAAQgKAAgCgTg");
	this.shape_264.setTransform(395.7,174.0938);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#5C5C55").s().p("AgqgOQA1gLAeAkQACACAAAEIgGAAIgMABQgmAAgdggg");
	this.shape_265.setTransform(383.275,168.1482);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#5D5852").s().p("AguAHIAAgHQANAAALgEQABAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAgBQAiAAAiAEIAAAEIgGAAQgaAJghAAIgcgCg");
	this.shape_266.setTransform(382.95,171.5133);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#AFB1AE").s().p("AgSAQQgEgEAAgIQAhhHAKBBQAGAkgPAAQgKAAgUgSg");
	this.shape_267.setTransform(384.3333,162.1683);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#ABA8A9").s().p("AgHgYQAbgPgUA9QgCAGgBAAQgFAAABg0g");
	this.shape_268.setTransform(389.0322,153.7748);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#5F5A51").s().p("AAQEdIAAgIQBAgPAuALQAAAAABAAQAAAAAAABQAAAAAAABQAAABAAABIgGABQghAIgqAAIgegBgAh+kdQBmAEhmAAg");
	this.shape_269.setTransform(402.825,182.3766);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#645D4F").s().p("AgVgBQBWgChWAFg");
	this.shape_270.setTransform(414.6125,170.8153);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#5B5E4D").s().p("AgugDIBWAAIAHAAQAAABgBABQAAAAAAABQAAAAAAAAQAAAAAAAAQgYAEgTAAQgbAAgWgHg");
	this.shape_271.setTransform(402.85,173.4583);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#201911").s().p("AgmAAQgDgHgPgIQBMgLAlAaIgDAAQgWATgXAAQgWAAgZgTg");
	this.shape_272.setTransform(414.475,158.5783);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#665D54").s().p("AgTABIgBgDQAyAFgLAAIgmgCg");
	this.shape_273.setTransform(414.5313,154.0861);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#887B6F").s().p("AgMAAQAkgkgPAzQgGgIgPgHg");
	this.shape_274.setTransform(468.9934,222.1016);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#7B8D7B").s().p("AAAAoQgCgoAAgnIAFAAIAABHIAAAIIgDAAg");
	this.shape_275.setTransform(492.85,248.725);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#5B6956").s().p("AgLBgQAWhWgChyIADAAIAABAIAAAIIAAAoIAAAIIgFAAQAAAoACAoIADAAIAAAIIgFABIgHAAQgLAAAAgJg");
	this.shape_276.setTransform(491.9,243.1485);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#374435").s().p("AgGAeIAAgIIAAgnIAAgIIAAgIQAbAtgbAWg");
	this.shape_277.setTransform(500.05,241.675);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#829480").s().p("AgDAwIAAg/IAAgIIAAggIAGAAIAAAIQAEA7gKAsIAAgIg");
	this.shape_278.setTransform(493.5403,234.225);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#687568").s().p("AgMBfQABg8gJhUQAgAbAEhMIAAgIIADABQAJBBgkAXIAJAvIADAAIAAApIAAAIIgEABIgIAHQABANARgFIAGAAQgPAMgHAAQgHAAABgMg");
	this.shape_279.setTransform(498.988,236.825);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#837669").s().p("AgVATIAAgIIAAgXQA5gugTBHQgBAGAGAIIAAAEQgYAAgTgMg");
	this.shape_280.setTransform(468.6344,232.2915);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#150B08").s().p("AgFAJQAQg1gGA0QgBAKgDAAQgCAAgEgJg");
	this.shape_281.setTransform(463.9922,224.4626);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#160908").s().p("AgNgEQgCgBAAgEQAhATgCAAQgCAAgbgOg");
	this.shape_282.setTransform(464.3315,217.4796);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#776B60").s().p("AgNAbQgOgHACgdQABgMAAgMQBUgLg5BQgAgMgBQAPAGAGAIQAJgdgJAAQgGAAgPAPg");
	this.shape_283.setTransform(468.9596,222.3394);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#7C7163").s().p("AgRBSQgQhDAPgUIgCgJQgDgPAAgQQAphUAIBsQACAYgVAHQAoAggrAmQgDADgIAAIgKgBg");
	this.shape_284.setTransform(469.52,209.0756);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#5C6753").s().p("AgFCTIAAgIQADgwgPhRIADgBIAJg/QAAgEgCgCQgOgQAEg6QARgcAQArQAAAAAAAAQAAAAABAAQAAAAABAAQAAABABAAIgBAIQgQA9gBBLIAABxIAAAIIgGAAg");
	this.shape_285.setTransform(493.7318,213.9479);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#0D0C08").s().p("AgOgGQA8gNg5AdIgCABQgEAAADgRg");
	this.shape_286.setTransform(433.7564,223.6022);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#8B7D71").s().p("AgRgBQBHABhHACg");
	this.shape_287.setTransform(450.2625,235.2);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#786B5D").s().p("AAuAwQgDgCgDAAQgaAPg0gSQgqgPgjgFQgYgEgEgLQgFgNgDgUQAHglAggCQAYATApAFIAPACQAmAOAqAJQBAANAoAgQgYAjghAAQgWAAgbgRgAhGACQBHgChHgBg");
	this.shape_288.setTransform(455.6,235.2076);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#120904").s().p("AgRAsQARgnAJg0QAbA+g1Ahg");
	this.shape_289.setTransform(434.0889,243.475);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#5F5D57").s().p("AgGAJQAZhDgYBQg");
	this.shape_290.setTransform(430.5003,231.6983);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#6B625D").s().p("AgJAXQgIgGAAgQIAAgfQA8ADgrA6g");
	this.shape_291.setTransform(442.7768,215.625);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#605E56").s().p("AgkAWIAAgIIAAgsQADA+BGgVIgGAEQgSAQgTAAQgOAAgQgJg");
	this.shape_292.setTransform(435.425,215.8511);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#685E55").s().p("AgYACQALgBgEgPIgBgIQAPAKAWgJIAGgBIgBAIQgNAlgNAAQgLAAgLgVg");
	this.shape_293.setTransform(429.225,220.3612);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#625B4E").s().p("AgIAEQgOAAACgLQBIALg1AEIgHAAg");
	this.shape_294.setTransform(428.8151,210.875);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#5F5B4F").s().p("AABAYQgHgZgDgeQAeAKgPA0QgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAIgBgIg");
	this.shape_295.setTransform(431.4946,207.675);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#B4A799").s().p("AgrAJQgCgBAAgIQAoAXAMgmIADAAQA4gCgfAhQgoAAgmgHg");
	this.shape_296.setTransform(421.3888,205.2416);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#6B655C").s().p("AgKAWQgGgaAAgcQA7gCgtBBIgCACQgDAAgDgLg");
	this.shape_297.setTransform(442.6981,207.7672);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#6A645A").s().p("ACPA6QAThHg6AtIAAAYIAAAIQhEgUhIgJIgPgCQgpgEgYgTQgjgagEg3QAoAFAdARQACACADAAQArA7BjADQAoABAQgXQA6AMgbBDQgGgIABgGg");
	this.shape_298.setTransform(456.0288,227.775);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#120B0B").s().p("ACZKyQBTAEhTAAgAiQozIgGgBQAPggg6gMQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAgBQAJhBApAZIABgBQAcgcACAdQAWhQAJBQQgYgVAKAvIAIAnQgOAbgbAAQgHAAgIgCg");
	this.shape_299.setTransform(469.775,271.4375);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#140807").s().p("AhGAtIgKAAQAdgOgbgVQgCgCAAgEQAdgwgNhHIADAAQBEgDBFAbIAFAQQgpALg0gRQgJgCgJAAQgkBmAYBiQgugJASg/g");
	this.shape_300.setTransform(453.425,206.4352);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#746B63").s().p("AgGAbQAAgEgBgDQgJgSAEgeIASAAIAGAAIABAIQAGAxgRAAQgDAAgFgCg");
	this.shape_301.setTransform(443.549,200.1457);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#82786D").s().p("AgkgaQALgLAZADIAGAAQAMAYARARQACACAAAEIgEAQQgSAHgNAAQgqAAAEg+g");
	this.shape_302.setTransform(445.9622,183.7569);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#686047").s().p("Ag1gJQgCgBAAgEQArAUBEgBIAAAEQgTAGgSAAQgmAAgigYg");
	this.shape_303.setTransform(455.3,181.751);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#615A52").s().p("AgHAUQAAgOgGgZQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBQACgCAAgEQAmAVgiAhQAAAAgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAIgBgIg");
	this.shape_304.setTransform(431.8221,199.2);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#B4A795").s().p("AgEgCQAAgDgDgEQAegUgbAtIgBAAQAAAAABgSg");
	this.shape_305.setTransform(423.7951,196.6127);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#B6A999").s().p("AgzgkQABgOgCgRQA8gSArAVQACABAAAEQgrAGgxgGQAVBEgDAzIAFADQAOAJgZAEQgcgMAEhkg");
	this.shape_306.setTransform(420.825,192.772);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#635B52").s().p("AgMAaQAOgEgPgXQAZARgKgpIgDAAIAAgEQAjAngvAUQAAgBAAgBQAAAAABgBQAAAAAAgBQAAAAAAAAg");
	this.shape_307.setTransform(432.4714,190.95);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#61584D").s().p("Ag6gEIBvAAIAGAAIAAAHIgGAAQgUACgSAAQgpAAgggJg");
	this.shape_308.setTransform(424.55,179.19);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#625B52").s().p("AAAAVQgHgTADgdQANAUgEAjIgEAAQAAgEgBgDg");
	this.shape_309.setTransform(433.4369,183.125);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#837A70").s().p("AgWggIArAAIAGAAIAAA3IAAAIIgGABQgJABgHAAQgqAAAPhBg");
	this.shape_310.setTransform(445.1475,175.5743);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#7D756B").s().p("AgOAkQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQgJgKABgVQALgLgBgcIADAAQBDABgoBAQgDAGgMAAIgMAAg");
	this.shape_311.setTransform(445.6224,167.025);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#5E564B").s().p("AgOgHIAYAAIAGAAQAAAEgCABQgEACgGAAIAAAIIgFAAIgFABQgNAAAFgQg");
	this.shape_312.setTransform(446.2356,154.5825);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#575239").s().p("AgegEQAJgLAVADIAGAAQAAAEgCABQgEADgFAAQAFAMAZgEIAGgBQAAABAAABQAAABAAAAQgBABAAAAQAAAAAAABQgPAGgMAAQgUAAgNgSg");
	this.shape_313.setTransform(488.8,185.645);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#4A4628").s().p("AghAFQAGAAAFgDQACgBAAgDQAtgaAIAdQAFAQgjgEIgFABIgLABQgPAAgFgKg");
	this.shape_314.setTransform(491.576,184.6027);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#7F7366").s().p("ABlArQgIgdgVgHQhNgZhVABQggAAgYAUIgDgBQgDgbAAgcQBqAOCyASIAHAAQAGAAAAACQAVBJggAAQgNAAgUgLg");
	this.shape_315.setTransform(457.5771,194.5144);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#877C6D").s().p("AgaAWIAFgJIABgHIAAgHIAAgRQAzg8gFB0IgDAAIgGAAIgQACQgWAAgFgSg");
	this.shape_316.setTransform(470.3719,186.9993);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#110D09").s().p("AgHgrQAQgJgBAqQAAAagEAdQgMgrABgtg");
	this.shape_317.setTransform(466.0268,181.4124);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#94847A").s().p("AgRAPQAJgrAOAMQAHAHACAGQADAGAAAFIgDAIQgDADgHAAQgIAAgOgEg");
	this.shape_318.setTransform(471.325,178.8125);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#7E7166").s().p("AgCAjQgfgNAMg5QA+gQgVBBQAAgFgDgIQgCgFgHgGQgOgNgJArQAZAJAHgIIgHASIgBAAQgCAAgJgEg");
	this.shape_319.setTransform(471.1115,178.269);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#817467").s().p("AgGAkQgZgUAIg2QBSAEg2BFQgDAEgCAAQgDAAgDgDg");
	this.shape_320.setTransform(472.6292,151.1565);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#120F09").s().p("AgMgTQAigpgMBJQgEAWgFAAQgFAAgIg2g");
	this.shape_321.setTransform(466.4895,171.0361);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#85796B").s().p("AgVAkIAAgIIAAgQQALgIgEgXIgBgIQgCgNAPADQALACACAEQAdBGgqAAQgJAAgKgDg");
	this.shape_322.setTransform(471.7947,168.6322);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#726A60").s().p("AgDAgQgDgQAAgQQAKgHgCgYIADAAIABAIQAEAXgKAIIAAAQIAAAIIgDAAg");
	this.shape_323.setTransform(469.6533,169.025);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#746A62").s().p("AgBAgQgDggAAgfIAFAAQAHAegGAZIgBAIIgCAAg");
	this.shape_324.setTransform(470.0635,160.175);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#140E09").s().p("Ao2OsQAmgPgmAbgAIsufQgBgQgLgIQAoAGgbAag");
	this.shape_325.setTransform(411.4481,243.275);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#877A6B").s().p("AgVAfIABgIQAGgZgHgeIAAgIQBGACgrBIQgDAFgLACIgFAAQgKAAACgKg");
	this.shape_326.setTransform(472.3931,160.2716);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#514742").s().p("AgDAYIAAg3IAFAAIABAIQAEAjgKAUIAAgIg");
	this.shape_327.setTransform(486.7278,160.175);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#101314").s().p("AgEAIQAFgHgJgMQAjAXgjAAg");
	this.shape_328.setTransform(495.8875,153.325);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#14090E").s().p("AgLgIQAlALgWAFIgEABQgLAAAAgRg");
	this.shape_329.setTransform(295.1134,297.8755);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#150D08").s().p("AAAALQg2gBgOABIAAgIQA0gbBVAbIgNAAQgzgJgCARg");
	this.shape_330.setTransform(346.675,337.75);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#130C09").s().p("AgfgCQALgKArAFQASACgVAIQgRAHgLAAQgQAAgHgMg");
	this.shape_331.setTransform(336.1582,339.1901);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#A58C58").s().p("AhTAHQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgCgDAAgDQBWgFBXgDIAGAAQAAABAAABQAAABAAAAQAAABgBAAQAAABAAAAQgLADgMAAIAAAHIgHAAIhUACQgjAAgXgCg");
	this.shape_332.setTransform(335.15,322.825);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#7C6B46").s().p("AgSgGQAogJgDAOQgDALgIAAQgJAAgRgQg");
	this.shape_333.setTransform(324.9353,329.0793);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#88724B").s().p("AgMgBQAyACgyABg");
	this.shape_334.setTransform(333.025,327.8);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#968153").s().p("AgTgGQAXgBAKADQAQAEgaAGIgIABQgOAAgBgNg");
	this.shape_335.setTransform(338.093,328.3256);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#120D0B").s().p("AgTgFQAygSgOAWQgKAPgHAAQgKAAgJgTg");
	this.shape_336.setTransform(315.7424,340.2229);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#130A0A").s().p("AikDWIAAgEQAkAHgHAAIgdgDgAB/jYQBCAagwAGIgFAAQgWAAAJggg");
	this.shape_337.setTransform(324.6811,318.685);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#140F06").s().p("AgJgJQAAgEgJgMIgBgBIABAAQBCALgxAXQgFACgCALIgBAGQgBAAABgkg");
	this.shape_338.setTransform(305.7511,342.3398);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#776845").s().p("AgNACIAAgDQAmADgQAAIgWAAg");
	this.shape_339.setTransform(308.9375,329.445);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#766845").s().p("AgDAAIgMgGQgCgBAAgEIAOAJIAUAOIgUgMg");
	this.shape_340.setTransform(304.3003,329.6288);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#776442").s().p("AASAIQgPgIgKAGQgQANgBgTQAtgeAEArg");
	this.shape_341.setTransform(314.45,329.2093);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#736140").s().p("AgNgBQA2gBg2AEg");
	this.shape_342.setTransform(321.325,328.5839);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#130A0C").s().p("AgdArQghgGAEgkQAvAMgWg7IACADQAcAnATAVQAFgJAUgKQACgCABAVIAIADQAEABADAEQgOAWglAAQgQAAgVgEg");
	this.shape_343.setTransform(304.1031,296.0987);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#746544").s().p("AgMgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAgBQAgANgDAAIgbgIg");
	this.shape_344.setTransform(300.944,330.6744);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#0F0809").s().p("Ah4hUQB+gEBmgLIAHgBQAKBVgEBjQhtALhyAFIgMABQgKhMAEhtg");
	this.shape_345.setTransform(279.3204,349.725);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#140C08").s().p("AhmAHQA6AEAUgiQAAAAAAAAQAAgBABAAQAAAAABAAQABAAABAAQBQgQApAbQACABAAAEQgSA1g/gWQgbgEgiAMQgcAAgjgYg");
	this.shape_346.setTransform(281.15,332.5273);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#75653E").s().p("ArJAzQAlgtAsAIIAAgEQBhgKAbAJIAGABQBNgMBPgJIAHAAQBPgJBRgFQAGAAAGgEQApAVApgcIAFgBQB4AJCTgMQAGgBAGAEQAvgJAZgSQACgBAAgEQB8AYCVgPQALgBgEgQQAZANArgFIAMAAQAPAQAXAHIAGABIAfAAIAGAAIAAAIIgGAAIh2AAIgGAAIgsAAIAAAIIgGAAQh9AHiCABIgGAAIgxAAIAAAIIgHAAIgSAAIgGAAQgsgEgiAGQgPACgNAEIgGAAIgZAAIgGAAQhXADhWAEQAAAEACADQAAAAAAAAQABABAAAAQABAAABAAQAAAAABAAQhxALh0ABIg/AAQgsAAgSAMQAKANgKACQhYANg7AMQgUAEgRAAQgpAAgRgbg");
	this.shape_347.setTransform(338.575,322.5353);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#100C0C").s().p("AgRgFQBFgBg/AMIgDAAQgDgEAAgHg");
	this.shape_348.setTransform(274.6477,331.3922);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#606D61").s().p("AAAGzIgYAAIABgIQAHgogIghQAhkfgDl0IAAgIQAVgGgJhKQgEgcALgNIAAAIQAAGIgTFsQAIAtgHA0IgBAIIgGAAg");
	this.shape_349.setTransform(259.725,358.975);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#888980").s().p("AgOAAQAigSgHAYIgDABIgGABIgGABQgLAAgBgJg");
	this.shape_350.setTransform(291.6015,314.8246);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#66676B").s().p("AgzAIQAAAAAAAAQAAAAAAgBQgBAAAAgBQAAgBAAgBQAUglBPAkIAGABQggALgcAAQgWAAgWgHg");
	this.shape_351.setTransform(277.425,315.9007);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#0F154E").s().p("AneA3QgdgTgbARQgDACgDAAQgkgQgmAAQgngPgLgpQBZgmCNABQCvACCIAYQAuAIAcgdQBLATBVgEQCKgHCUgCQCvgDBVANQAWAKguACIAAAEQg7gSg2AZIgFABQgzgUgxAjQBOALApgYQACgCADAAQAYAMAIALQBRgSAFAaQhLAPhQgJQhbgKg0AEQAGArgegiQgEgGgPgDQhcAehrgHQgtgDgXgLQhjAViaAAQgnAAg9gDQhCgFg0ALQghgbgXAbg");
	this.shape_352.setTransform(341.1033,306.8237);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#68645F").s().p("AghgDQAaAJAHgRIAJAIQABAMASgEIAGgBQAAABAAAAQAAABAAABQAAAAAAABQAAAAgBAAQgRAEgNAAQgZAAgLgPg");
	this.shape_353.setTransform(289.225,315.1445);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#160B0A").s().p("AgNgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAgBAAgBQAhANgDAAIgcgIg");
	this.shape_354.setTransform(284.269,289.6368);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#130B0D").s().p("AgfAZQgdgEALgnQAwAwgBg4QAAgHAWAUQASAOALgTQASAvg9AAQgQAAgVgEg");
	this.shape_355.setTransform(287.7265,298.1126);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#63615F").s().p("AgxgDQAxgRAsAQIAGABQgeAQgYAAQgZAAgUgQg");
	this.shape_356.setTransform(264.075,297.3746);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#110809").s().p("Ag5AFQAdgcBVATIABAHQgTAKgfAAQgbAAgmgIg");
	this.shape_357.setTransform(260.5125,267.5412);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#605B58").s().p("AAOAcQgGgEgDgMQgEgZgRAQQAAgDgCgDIgEgJIAAgIIAAgIQAWgIAOAEIAJBCQgEgCgFgEg");
	this.shape_358.setTransform(262.7,255.64);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#1A0B08").s().p("Ai5AmQAlgFglASgAChgxIAZAMQgHAVgGAAQgHAAgFghg");
	this.shape_359.setTransform(356.55,289.95);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#1C0A04").s().p("AAIAGQBEgBhEAFgAggACQgFgCgEgJQAzAIghAKg");
	this.shape_360.setTransform(331.5875,291.55);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#160C0B").s().p("AgCAIIgCgBQgMgDABgLQAzAPghAAIgFAAg");
	this.shape_361.setTransform(325.8498,287.3559);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#150909").s().p("AgbgBQBvADhvAAg");
	this.shape_362.setTransform(333.95,281.1);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#190A08").s().p("AgZgJQgDACgDgPQBSgKgZAmIgDAJQgCAJgVABQAFg0geASg");
	this.shape_363.setTransform(321.2657,291.281);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#150A0B").s().p("AC5AHQBIAIgnghQAVgYAuAbQAHAEAFgFQAGgEgBgNQAPgQAIAZIgEAAQgQAtgPgIQgQgKgCAcQgKACgMgaIAAAIQAAAUgWAEIgOABQgeAAABghgAkWgHQAAAAABAAQAAgBABAAQAAAAABAAQABAAABAAQgQgHgjALIAAgEQAigqAvAiQAGAEgQAFQgCAAANAZQADAFgEAIQgXAGgOAAQgkAAAmgsg");
	this.shape_364.setTransform(342.45,296.3207);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#150A08").s().p("AATgCIABACIgNABIgaACg");
	this.shape_365.setTransform(301.2125,285.775);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#9F9999").s().p("AgbAAIAAgIQAlgGAQAPQACACAAAEIAAAEIgCAAQgeAAgXgLg");
	this.shape_366.setTransform(321.5,280.2191);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#170A09").s().p("AgZgBQBmADhmAAg");
	this.shape_367.setTransform(319.4125,284.3);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#160A0A").s().p("AgYAvQgPgEAFgUQAtABghAYgAAJgsIgBgCIAGgBQAbAIgFAAIgbgFg");
	this.shape_368.setTransform(310.4253,289.025);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#5B5B5E").s().p("AgBADIABAFIAHAWIADAOQABANgEAJgAgJg2IAEgHQAHgLgEAUQgDAIgBAJg");
	this.shape_369.setTransform(316.5227,270.9163);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#565859").s().p("AgFgOIAFgKIABAHQALApgMABg");
	this.shape_370.setTransform(315.0552,259.25);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#A4AAA7").s().p("AgFARQgGgQADgYQAiAZgcAWg");
	this.shape_371.setTransform(320.8778,250.325);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#8B8080").s().p("Ag3gCQA2gGA5ACIAAAEQgkAKgbAAQgcAAgUgKg");
	this.shape_372.setTransform(328.65,263.5339);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#B5AEA4").s().p("AgWgCQApg7AFA+IgBAAQgWAKgRgGQAAAbgBAAQgCAAgDgig");
	this.shape_373.setTransform(342.15,255.4798);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#575054").s().p("AgpA/QgvAIgWAQIABgIQACgagJgOQAwgbgeg/QgKgWALgIQBRAOBCgRQAEgBADgEQAhADAVAQQACABAAAEQAIA3gIAlIgFgKQgBgCgHAAQgSATgNg7QhKABg5AZQgEACAAAMQAiANBOgRQACAAADAEQAZAfgZABQgVAEgXABQgqAAAqATQgOATgMAAQgNAAgJgbgAhCgxQAnAWBIgWIAAgEIgZAAQgrAAgrAEg");
	this.shape_374.setTransform(329.7815,268.1711);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#0F0A0B").s().p("AgxBZIACgDQABgBgDgEQhAAagKg7IAEgCQACgBAAgFQgnAWgXgWIgGgIQAGgiAJglIADAAQgZg1AhgaQABgCAEAAQgcAqAeAtQAAABAAAAQABAAAAABQABAAAAAAQABAAABAAQgHAtAaAJIAGACQgOhKAjhFQAAgBAAAAQAAAAABAAQAAAAABAAQAAgBABAAQAvAQgfBQQgJAYASARQAVgKAHgmIADAAQgGgnAXgjQACgCAAgFQAtgMA1AEIATAAIA9ghQAEgCADgFQAdA5gEBYQgCBFgmAXQgGAEgKAAQACA5gsASQAAABgBAAQAAAAAAABQAAAAAAABQAAABAAABQhogSggg2g");
	this.shape_375.setTransform(239.2992,358.95);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#0F0C0D").s().p("AFRIBIjGAAQABgdgHgXQgRgxgVgcIAGAAIAHAAQAVAGARAJIAFABIADAAQAvgGgcgWQgRgOAUgOQAzghAYAQIAGABQAUAlAkglIADAFQAGAGgJANQAlABgFBAQgDAhACA/IgHAAgAlYiSIgBgIQAViogJiiQgCgnAWAPQAFAlgIAzQgBAEgDAFQAaANgMAnQgCAFgCAeQgFBQAOBKQgOAqgHAuQgBAFgDAEQgNgpgFggg");
	this.shape_376.setTransform(256.4244,351.1167);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#88998E").s().p("AgICFIAAi5IADAAQACgsgLgkIAAgIQApAvgRBpIgBAIQgJAMACAdQAKBJgUAHIAAgIg");
	this.shape_377.setTransform(261.2577,313.5);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#607065").s().p("AAFAoIgBgHQgHgagEgeQAEgEABgFQACgDAAgEQAKAjgCAsg");
	this.shape_378.setTransform(259.8904,304.225);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#160A08").s().p("AgIAAQAigIgiAMg");
	this.shape_379.setTransform(215.275,338.078);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#120C08").s().p("AgKgpQAWgmAABGQAAAogQAYQgLgVAFhLg");
	this.shape_380.setTransform(201.2575,340.6065);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#170B0B").s().p("AqPA+QAqAEgqAAgAF+gdIgBgEQAvAJgHAAIgngFgAFngsQgDgBAAgMQAdAQgKAAQgEAAgMgDgAGPg3IgSgKQAwAMgNAAIgRgCgAJ2g9QAAAAAAgBQAAAAgBAAQAAgBAAgBQAAAAAAgBQAfAIgFAAIgZgEg");
	this.shape_381.setTransform(275.0251,293.175);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#160C0A").s().p("AgKgGQgCgBAAgEQAaAXgBAAIgXgSg");
	this.shape_382.setTransform(214.488,299.0107);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#150B09").s().p("AgNgGQAtAAggAMIgCABQgHAAgEgNg");
	this.shape_383.setTransform(217.6564,307.3381);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#120D09").s().p("AMyDdIgBgIIAAgQQAsAZgfAAIgMgBgAipClQA/gGg/AKgAtIg8QAIhLgHhFQAagrgCBDIgFCRQgCBAgFA/QgUhJAHhPg");
	this.shape_384.setTransform(285.4308,315.1251);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#100C0B").s().p("AOhEKQgcAIgogoQBJgPAzABQAYABgMAlQgwgXgUAngAvokJIAAgIIAIAmIgIgeg");
	this.shape_385.setTransform(302.7639,311.475);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#10090A").s().p("AgqDxQAFg8AQhEQAAAAABgBQAAAAAAAAQABAAAAAAQABAAABAAQAHgOgNg7IgBgIQAPhggCg3IAAgIQgDgNgKgGQgKgFAKgBQApgygSghQgBgBACgEQAdgfAHAXIABAIQAFBNgEBoIAGgEQgLBfgCBRIAAAIQAKBAgsBCQgFAHgPACIgGABQgRAAAEgTg");
	this.shape_386.setTransform(185.2138,314.7674);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#15090B").s().p("AgIAAQAjgGgjAJg");
	this.shape_387.setTransform(185.5125,272.9257);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#140A0C").s().p("AgCANQgIgNgDgTQAsAdgdAKIgEgHg");
	this.shape_388.setTransform(186.6182,282.925);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#5F6760").s().p("AgIFOQAIhsAEh9QAHiugOh7QADgaAIgWQgQgNAHgjQARhagmgPQABAAAAgBQABAAABAAQAAAAAAAAQABgBAAAAQACgDAAgEQARACALAJQACABAAAFQAZGcgqF/QgLgIAGhAg");
	this.shape_389.setTransform(197.4946,307.05);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#6D635A").s().p("AgCAYIAAgvIAAgIQAKAYgIAmQAAABAAAAQAAAAAAAAQAAAAgBAAQgBAAAAAAIAAgIg");
	this.shape_390.setTransform(194.877,273.675);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#B2A194").s().p("AgIATIAAgIIAAgnIALAAIAGAAIAAAvIAAAJIgGAAIgEABQgJAAACgKg");
	this.shape_391.setTransform(193.6129,274.1383);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#958274").s().p("AgIAcQgDgcAAgbIARAAIAHAAIAAAIIgHAAIgLAAIAAAnIAAAIg");
	this.shape_392.setTransform(193.3,273.25);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#FCF5E9").s().p("AgYgEQAYAAAYAEIABADIgGAAIgQACQgSAAgJgJg");
	this.shape_393.setTransform(193.325,266.1026);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#726258").s().p("AgVAXQgHgXgVgHIAAAHQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQgDgLAAgMQA0AVA7AOIgMgBQgwgFgNASQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_394.setTransform(192.7,262.375);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#6B5F54").s().p("AgPAKQAZACgLgMQgCgBAAgEQABAAABAAQAAAAABAAQAAgBAAAAQAAAAABAAQACgDAAgEQAAAAABAAQABAAAAAAQABABAAAAQAAAAABABQAUAZgVAAQgHAAgOgEg");
	this.shape_395.setTransform(198.0348,258.9441);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#645A50").s().p("Ag3gDIBoAAIAHAAQAAABAAABQAAAAAAABQAAAAgBAAQAAAAAAAAQgbAEgYAAQggAAgbgHg");
	this.shape_396.setTransform(192.7,254.7583);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#75675E").s().p("AATAEIgrAAIAAgHQAYAAAYADIABAEIgGAAg");
	this.shape_397.setTransform(195.175,257.15);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#B9ABA2").s().p("AAPAEIgqAAIAAgHIAqAAIAGAAIAHAAQAAADgCADQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgGAAg");
	this.shape_398.setTransform(195.5,257.95);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#7F6E63").s().p("AgegEIA3AAIAGAAIAAAHIgGAAIgUACQgWAAgNgJg");
	this.shape_399.setTransform(187.1,258.0526);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#8C7C71").s().p("AgMgBIAAgIQAGgHAMgBIAGAAIAAAIIAAAIQAAAAgBAAQAAAAgBABQAAAAgBAAQAAAAAAAAQgGASgFAAQgFAAgFgTg");
	this.shape_400.setTransform(191.45,258.5252);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#A19087").s().p("AAAAKQABgXgNgIQAsgBggAsg");
	this.shape_401.setTransform(212.6186,265.4247);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#685E59").s().p("AALAMQgXgJgMgSQA0gFgDAjQgBABgMAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQgBAAAAAAg");
	this.shape_402.setTransform(200.158,266.364);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#8F8379").s().p("AArAgQAAgEgCgCQgLgJgSgBIAAgEQgYgEgYAAIgHAAIAAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQgOgOgGgXIAAgIQAUAIAHAXQAAAAAAAAQABAAAAAAQABAAAAAAQABAAABAAIA9AAIAGAAQAMATAYAIQAAAAAAABQABAAAAABQAAAAAAABQAAABAAABIgGAAIgTAAg");
	this.shape_403.setTransform(194.575,264.825);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#6B594B").s().p("AAAAVQgQgOACgeQAvAlgdAKg");
	this.shape_404.setTransform(202.8756,259.175);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#877E71").s().p("AgCCFIAAkRQAJCGgHCTIgCAAIAAgIg");
	this.shape_405.setTransform(202.9563,240.25);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#716259").s().p("AgBAJQABgDgUgXQBLAeg/AFg");
	this.shape_406.setTransform(240.7129,265.025);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#16090B").s().p("AgcAAQBCgIgKAFQgUAJgOAAQgNAAgJgGg");
	this.shape_407.setTransform(247.7404,274.4935);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#120909").s().p("AhzgCQAAAAgBAAQAAAAAAgBQAAAAAAgBQgBgBAAgBQByAMBvgTQAEgBAFAHIAAACQg/ATg8AAQg3AAg2gQg");
	this.shape_408.setTransform(255.95,278.3629);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#100705").s().p("Agag3QA6A6gGA0QAAABgJAAIgCAAQgtAAAEhvg");
	this.shape_409.setTransform(244.4003,285.7288);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#100A0C").s().p("AjpEaQALg+gLgrQATgNgDhEIAAgQQAAgIgJgIQABhRAagtQAAgBAAAAQAAAAABAAQAAAAABAAQABAAABAAQgGAqA9AKIAAAEQAKAnAVAQIAGgIIAHgQQAUAgAjgSQAEgCADgEQgFhKALhOIgGAAQgwAJgLgVIgDAEQAIg8giAiQgCACgDAAQgpgZgegjQgBAAAEgEQA2ATAHgRQABgCAGAAQBMgLBogRIACgBQADgEAAgIQgGgfAuADIgDAEQASAegFAbIACgIQAFgRALgMIAugHQAJAGgBANQgBAEgDAEQgjA0A2gLIADACQAKAHAMgBQAjAPg2AFIgFgKQgBgCgHAAQgtAxgZgsQgBgBADgEQgsgxhTAfQgFACgDAIQgGAggBAYQAgAXgFA5QgEA1ABAjIgYAgQAWBUgcBdQhKAghoANIgBAAQgGAAgUgEg");
	this.shape_410.setTransform(258.2791,316.3348);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#151F63").s().p("AACAsQgDgCgDgEQgLglgngKIgGAAQgPgKgDgWQhigygzhfQAqgQArAyQACACAAAEQgrATBFgHQATgCgOAOQgPAqAhgiQApANACATIABAIQA4AHAhAeQADAEAGAAQADAWAQAKQA8AUAlAtQACACAAAEQAqADALAlIADAAQAHAtgHAkQhnhRh4hCg");
	this.shape_411.setTransform(229.175,298.0061);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#0D090D").s().p("AgsgKQgCgBgDAAQgJgUgKgdQAyAHAMAaIABgIQABgOAjgLQABAggMAFQgFACAUgEQAPgCAGAQQAXA2gTAGQgJADAIAEIgDAFIhkhHg");
	this.shape_412.setTransform(219.4048,280.5);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#9F8F88").s().p("AgVAAIAAgHQAfgFAKANQACADAAAEIgGABIgLAAQgRAAgJgJg");
	this.shape_413.setTransform(223.425,271.2304);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#AAA191").s().p("AA0AgIgGgBQhfgDgQg8QAlAXAsAXIAFABQAVgRASAQQABAAAAAAQABABAAAAQABAAABAAQAAAAABAAIAAAIQACAKgIAAIgHgBg");
	this.shape_414.setTransform(220.957,265.6735);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#DCD1BB").s().p("AgOARQgDAAgCgCQgMgGAFgXIAGAAQAVgGAGAMQAAABAAAAQABAAAAAAQAAABABAAQABAAAAAAQADAAACABQAhAWgyAAIgMAAg");
	this.shape_415.setTransform(223.3118,263.9249);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#887F6C").s().p("AARAjQgRgRgVASIAAgEQgOAAACgMQBBADgjgYQgCgCgDAAIAAgIQAGAAADgDQACgBAAgEQAXAOAFgdQAAgBABAAQAAAAAAAAQAAAAABAAQABAAAAAAIAAAIQgFAZgHAWIAAAIIAAAIQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBAAg");
	this.shape_416.setTransform(225.2629,263.575);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#E2D5C1").s().p("AgCAWIgGAAQgXAGAEgXQABAAABAAQAAAAABAAQABAAAAAAQAAgBABAAQACgDAAgDQABAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAQACgDAAgDQAWADAFgTIADgBQADAIAFAHQAAAAABABQAAAAABAAQAAAAABAAQABABAAAAIAAAHIAAAHQAAAAgBABQgBAAAAAAQAAAAAAAAQgBAAAAAAQgDAVgMAAQgFAAgHgFg");
	this.shape_417.setTransform(225.8638,259.4003);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#B19D8A").s().p("AAGATQgGgMgVAFIAAgIQALgDABgMIABgIIAGAAIAFAAQAAAEgCACQAAABgBAAQAAAAAAAAQAAABgBAAQAAAAgBAAQgFAVAXgFIAGgBQAAAEgCABQgEADgHAAIAAAIQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAAAg");
	this.shape_418.setTransform(223.425,261.175);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#413123").s().p("AAQANIgHAAIgFAAQgYgDgHgUQAkgFARAPQACABAAAEQAAAEgCACQAAAAgBABQAAAAgBAAQAAAAgBAAQAAABgBAAIgGAAg");
	this.shape_419.setTransform(221.55,257.8981);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#6A5B4F").s().p("ABUBaQgKgPgfAFIAAAJQgBAAAAgBQgBAAgBAAQAAAAAAAAQgBgBAAAAQgMgRghAbIgGgBQhOgcgVhTQA4AFARhGIABgIQBFABA9gIIASgBIABAIQABAMgOgEIAFARIABAIIgDAAQgFATgXgDQAAgEgCgCQgRgPglAFQAHAUAYADIAGAAIAAAIQgBAOgLADIAAAHIgGAAQgFAYAMAGQACACADAAQgCAMAOAAIAAAEIgFgBQgtgYgkgXQAQA9BfADIAGAAIABAIQAEAUgLAFQAAgFgCgCgAg4AIQAOAIgBAYIAAANQAhgtgtAAIgBAAg");
	this.shape_420.setTransform(216.957,262.4);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#A4A192").s().p("AgCAfQgEgHgEgIIgBgIIgFgPQAPAEgCgMIAAgIIAGgHQACgBADAAIAGAAIABAIQAIAmgVAJIAAAIQgBAAgBAAQAAAAAAAAQgBAAAAgBQAAAAgBAAg");
	this.shape_421.setTransform(228.5353,255.125);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#959285").s().p("AAGAIIgGAAIgFAAQgLAAAFgPIAGAAIAFAAQAUAPgKAAIgEAAg");
	this.shape_422.setTransform(229.9188,249.545);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#696156").s().p("ABwAUIgBgEIhdgMIgFAAQgcgEgDAUQgPgIgNADQgoAJgfgbQB4gEBggMIADAHQAAAAAAAAQABABAAAAQABAAAAAAQABAAAAAAQgEAPALAAIAGAAIAAAIIAAAIIgGAAg");
	this.shape_423.setTransform(218.15,249.9);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#695B56").s().p("AgbgDQBtADhnAEIgGAAIAAgHg");
	this.shape_424.setTransform(252.6337,262);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#180907").s().p("AgNAAQgFgCgGgKQAcALAUANIABABQgDAAgjgNg");
	this.shape_425.setTransform(249.2059,267.6872);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#9E9083").s().p("AAGAPIgSAAIAAgIIAAgPQANgPAIAWQAAAAAAAAQABABAAAAQABAAAAAAQABAAAAAAIAAAHIAAAIIgGAAg");
	this.shape_426.setTransform(239.25,256.8459);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#87786E").s().p("AAqAeQgkgbg0gLIAAgIIAAgIQA7gXAVAzIAHgMQgFATAIAHQACACABAEIAAAIQgEAAgBgCg");
	this.shape_427.setTransform(245.15,259.22);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#7B746C").s().p("AgVAKIAAgIQANAAAEgIQACgDAAgEQANgEABAMIADAAIAFAIQACADAAAEIgBAEIgMABQgOAAgQgFg");
	this.shape_428.setTransform(258.825,254.9234);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#6E6258").s().p("AhGAHQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQgHgVgOAPIAAAPIAAAIIgDAAQAAgigKgVQB4gGBgAKIABAEQAAAEgCADQgEAIgNABIAAAIIgGAAQgZAMgrgFIAAAIIAAAIIgHAMQgUgyg7AWg");
	this.shape_429.setTransform(247.625,256.0625);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#60574F").s().p("AgQgGQAygKgZATQgJAHgFAAQgJAAgCgQg");
	this.shape_430.setTransform(219.2389,242.9003);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#645E55").s().p("AgJAeQgxgKAFg1QAhAZARACQAeACAYAEIAEAbQgNAHgUAAQgOAAgRgEg");
	this.shape_431.setTransform(258.2972,247.3216);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#0D0A04").s().p("AgPgBQA+gDg+AGg");
	this.shape_432.setTransform(253.2,242.405);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#635C53").s().p("AghAEQAkgVAZgCIAGAAQAAAEgCADQAAAAgBABQAAAAAAAAQgBAAgBAAQAAAAgBAAIAAAPIAAAJIgFABQgIAGgKAAQgPAAgXgQg");
	this.shape_433.setTransform(242.05,242.6098);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#ADA89A").s().p("AgUAQIAAgIIAAgPQABAAABAAQAAAAABgBQAAAAABAAQAAAAAAgBQACgCAAgEIAHAAIAGAAQACAAACABQAsAehBAAIgCAAg");
	this.shape_434.setTransform(246.929,242.2754);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#625A50").s().p("AhRBNQAagDAQgIQACgBAAgEQAwAGAWgeIgHAEQgYALADgXQBFABgtgfQgCgBgDAAQAAgEgCgBQgagPgPgMQAvgQAAgBQACgcgMANQgKAKADgrIAHAAQgDAMAPgCQAMgCACAFQALAXAJAZQAPAmgYAlQgKANACAGQAGASAJgGQAggTgVAkQgdAJgyAFIgPABQgoAAgUgXg");
	this.shape_435.setTransform(244.3121,240.9891);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#5C5A52").s().p("AgOAAQAXAGgCgVIADAAQAJAMgHAMQgCADAAAEIgGAAIgBAAQgQAAgBgQg");
	this.shape_436.setTransform(243.8331,227.7757);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#625E55").s().p("AAAARQAAgEAAgBQgPgJAEgZQAWgFgBAkIADAAIAAAIQgBAHgDAAQgDAAgGgHg");
	this.shape_437.setTransform(248.5079,228.4831);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#8A887B").s().p("AgEAUIgDAAQgDgUAAgTQANAEABATIAEAAIADAAQACAQgQAAIgBAAg");
	this.shape_438.setTransform(231.6652,242.6757);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#686659").s().p("AgMAUIAAgIIAAgfIAAgIQAbgEgDAcIAAAHIgDAAQgBgTgOgEQAAATADAUIADAAQAAAEgBABQgFADgGAAIAAgIg");
	this.shape_439.setTransform(231.2145,242.6552);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#6E6C5D").s().p("AAAAUIgFAAIAAgIIAAgXIAAgIIAFAAIAGAAIAAAIIgGAAQAGAJAAAOIAAAIIgGAAg");
	this.shape_440.setTransform(229.325,246.7);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#605B52").s().p("AgegBQB5ADh5AAg");
	this.shape_441.setTransform(223.05,238.45);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#6B6659").s().p("AgbgRQARgMAgADIAGABQAAAEgCADQgBAFgDAEQgEAPAIADQACABAAAEIAAAIIgGABQgIAFgHAAQgXAAgLgtg");
	this.shape_442.setTransform(225.9,243.2785);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#DEDED1").s().p("AAEAUIgGAAQABgEgCgBQgJgDAEgPQAEgEABgFQACgDgBgEIAGAAIAGAAIAAAfIAAAIIgGAAg");
	this.shape_443.setTransform(228.95,242.675);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#6F665B").s().p("AgegNQBqANhLANIgLABQgZAAAFgbg");
	this.shape_444.setTransform(223.7332,233.1855);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#7A7768").s().p("AAAAkIgFAAIAAgIQgDgUgJgjQAOAEABgMIACAAIAHAAQAXAIgWAwQgBADAAAEIAAAIIgHAAg");
	this.shape_445.setTransform(229.2944,237.025);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#766E5F").s().p("AgXABQAog+AHBOQgLAJgKAAQgQAAgKgZg");
	this.shape_446.setTransform(229.3,199.4525);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#766F5F").s().p("AgTgGQBBgCgtAOIgEABQgKAAgGgNg");
	this.shape_447.setTransform(251.1501,210.7426);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#605952").s().p("AADAYQgcABgCgVQAcgLAWgTQACgBADAAQgDAQgIAMIgCADQAeAVgqADg");
	this.shape_448.setTransform(253.225,218.525);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#5E5B4F").s().p("AgIABIAAgHQANAEABgMIAEAAIAAAIQgBAVgGAAQgDAAgIgOg");
	this.shape_449.setTransform(248.25,223.6858);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#626356").s().p("AgVAEQgJgBgGgLQAhAJAdgEQAfgGg7ATg");
	this.shape_450.setTransform(245.4168,220.7);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#746857").s().p("AgggYIAfABIAGgBIAAAJIgEAAQA3AkgnADIgGAAIgKABQgfAAgCgxg");
	this.shape_451.setTransform(242.5384,204.4992);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#7F7465").s().p("AgIAMQAKgEgDgTIgBgIQABAAABAAQAAAAAAAAQAAAAABABQAAAAAAAAQATAfgcAHIAAgIg");
	this.shape_452.setTransform(243.8641,200.825);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#9C9180").s().p("AgPATIgGAAQgLAAAFgQQAKgdAsAKQAAAAAAAAQAAAAABABQAAAAAAABQAAABAAABIAAAIQAEATgKAEIgHAAIgeAAg");
	this.shape_453.setTransform(240.8148,200.1093);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#F8F2E0").s().p("AABALQgJgGgBgMQAGgFAGgCIAGgBIAAAIQAEATgLAEQAAgEgBgBg");
	this.shape_454.setTransform(252.6783,206.05);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#908D78").s().p("AgbgLQASgZAfAQQACABAEAAIAAAIIgGABQgGADgHAEQACAMAJAGQABABAAAEQgCAAgDACQgMAFgIAAQgXAAAAgmg");
	this.shape_455.setTransform(250.75,205.6236);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#7B7062").s().p("AgGAQQAKgEgEgTIAAgIIAAgIIACABQAKAugJAAQgDAAgGgIg");
	this.shape_456.setTransform(253.613,206.0093);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#665D55").s().p("AgKgFQgCgBAAgEQAaAVgBAAIgXgQg");
	this.shape_457.setTransform(213.2255,242.5984);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#6C625F").s().p("AgcgBQBzgDhzAGg");
	this.shape_458.setTransform(209.8375,239.205);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#B9AF9A").s().p("AgDBJQgDhJAAhHQAKABgCAPIAEAAIAAAIQAEBDgKA1g");
	this.shape_459.setTransform(205.1903,250.3);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#9A937F").s().p("AgCANQgKgNgJgVQAsgTgCAyQAAARgHAAQgFAAgLgOg");
	this.shape_460.setTransform(191.7524,243.6515);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#948C79").s().p("AgVATQAdgVAMgaIgEAPQgDANAJALIgGABIgNAHIAAAIIgFABIgIABQgKAAgBgKg");
	this.shape_461.setTransform(196.125,239.5221);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#8F8775").s().p("AgSgEIAAgIIANgHIAFgBQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAXAngKAAQgHAAgbgZg");
	this.shape_462.setTransform(198.3174,242.7389);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#BFB7A7").s().p("ABLCNIglAAIgHAAIhoAAIgBgIQgKgpAFg4IAAgIIAAioICaAAIAGAAIAAERIAAAIIgGAAgAgwAMQAJAWAKANQAXAdABgfQABgmgXAAQgJAAgMAFgAApAGQAAgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgJgLADgNIAEgPQgMAagdAVQABANARgEIAGgBQA/A6gphIg");
	this.shape_463.setTransform(194.5027,240.25);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#887B72").s().p("AADAzQgMgrAEg7IAGAAQgEA3AJAoIABAIQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAg");
	this.shape_464.setTransform(186.4188,249.125);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#6B594C").s().p("AgFgSQAAAAABAAQABAAAAAAQABAAAAAAQAAgBABAAQABgDAAgEIAGAAIAAAIQAAAtgDAAQgDAAgFgtg");
	this.shape_465.setTransform(184.0259,232.8625);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#796F61").s().p("AgCBZIAAgJIAAioIAFAAIAACoIAAAJIgFAAg");
	this.shape_466.setTransform(186.175,235.025);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#B9AC9E").s().p("AAAgGQgBAHgYAbQgIAJACgMQALgZgLgeQBigKg1BBQgGAHgDAAQgIAAADgmg");
	this.shape_467.setTransform(195.2663,209.157);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#C0AF9D").s().p("ABMAIIgGAAIiUAAIAAgIQAGAAAFgCQABgBAAgEIAHAAQBDgDBHASg");
	this.shape_468.setTransform(196.875,222.9295);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#665647").s().p("AADAOIgFAAIgHAAIAAgIQASgnAAAnIABAIIgHAAg");
	this.shape_469.setTransform(189.9,220.75);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#C8BAA9").s().p("AANAIIgeAAIgGAAQgLgBAFgOIAqAAIAGAAIAHAAIAGAAQAAAEgCABQgEACgHAAIAAAIIgGAAg");
	this.shape_470.setTransform(187.0325,222.95);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#BFAFA2").s().p("AhMgbQBIgUBDAbQADABADAHQAAABAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAQAngpAAQgXAIgUAAQg2AAgag/g");
	this.shape_471.setTransform(176.1746,216.072);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#71685D").s().p("AgFAbIgQgEQgWgGADgeQAXgiApAmQAYgNgJAoQAEAMgUAAQgLAAgRgDg");
	this.shape_472.setTransform(221.6731,218.7113);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#766E65").s().p("AiCBtQACgQgLgBIAAgIIAAiwIAGAAIAHAAQAkApAug3QAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAQBiAVBFgUIAGgBQAZA4hEgXIgGgBQATAfAVAWIgBAAQgIAFAAAPIgHAAQgGgfglgBIgWgDQgfgugUApQAPAKgvAFQhDAIgTgPIAACIIAAAIg");
	this.shape_473.setTransform(218.4842,233.825);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#7C7564").s().p("AgSgJIAGAAIAGAAIAGAAQAAAAABAAQABAAAAAAQABAAAAABQABAAAAAAQAUASgGAAQgFAAgfgTg");
	this.shape_474.setTransform(213.2479,212.7066);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#726A5D").s().p("AgIgCQgCgBAAgEQAXAPgCAAIgTgKg");
	this.shape_475.setTransform(213.6756,214.9182);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#B4A79E").s().p("AgYACIAAgPQBkANhkAOg");
	this.shape_476.setTransform(202.675,207.475);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#A79D8E").s().p("AgLAAQAaADgMgTIADAAQABAAABAAQAAAAABABQAAAAABAAQAAAAAAABQACACAAAEIgBAIQgGARgFAAQgFAAgGgRg");
	this.shape_477.setTransform(218.775,209.325);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#63584B").s().p("AAmAMQgogRg1gFQA9gFAsAMIAGABQAAADgCABQgEADgGAAIAAAIIgGgBg");
	this.shape_478.setTransform(205.725,205.5765);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#B4B19B").s().p("AgOgEQAJAAAHgDQABgBAAgEIAGAAIAGAAQAAAEgCADQgNASgHAAQgHAAAAgRg");
	this.shape_479.setTransform(214.75,203.3191);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#7C766C").s().p("AgiA1QAwAIADggIAAABQAVAegeAAQgPAAgbgHgAAPALQgFgUgCgyQAxAVgnAwIgDAEIAAgDg");
	this.shape_480.setTransform(217.9191,193.5279);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#80826C").s().p("AABAfQgDgDgDgEIAAgIIAAgfIAFgJIAAgHIAGAAIAAA3IAAAIQgDAAgCgBg");
	this.shape_481.setTransform(214.425,192.375);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#7B7E68").s().p("AgGAcIAAgIIAAgvQAUANgLApQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIgGAAg");
	this.shape_482.setTransform(215.1004,186.325);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#4D3F2F").s().p("AgjAAIAfAAIAFAAQApgQgIASQgCAFgMAAIgMAAIgGAAIgNACQgRAAgHgJg");
	this.shape_483.setTransform(203.7086,195.732);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#BCB0A4").s().p("AhJgjQAfANAxgFIAGAAQAcAeAiAZQgTAIgxgBQgnAAgjABQgKgJAEg+g");
	this.shape_484.setTransform(198.8429,200.025);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#473218").s().p("AgegMIAYAAIAGAAIAZAAIAGAAQAAAEgCACQgSAUgNAAQgQAAgMgag");
	this.shape_485.setTransform(207.6,188.0922);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#685D49").s().p("ABRCPQgEAAgBABQgXASgvgkIAAAJIAAAIIgGAAIgFAAQAAgEgCgCQgGgEgDgGIgCgJIACgBQAWgOgOgXQAAgBAAAAQgBAAAAAAQgBAAAAgBQgBAAgBAAQgOgXAFgDQAVgLgPgTQgVgXgsgIIANAAQAMAAACgFQAHgTgoAQIgBgIQgPgsgVglQAkgRATgkQAFgJADAlQABALAKAOIgGAAIgZAAQAXAzAlgtQACgCAAgEIAFAJIABAHIABAIQAEAQgLAAQgMAtAkgEIAGAAQADAEAEACQADACADAAQAAAEgCACQgBABAAAAQAAAAgBAAQAAABgBAAQgBAAgBAAIAAAPIAAAIIgGAAQgBAUAJAKQABABAAAAQABAAAAAAQABABAAAAQABAAABAAQAAAEgCABQgIADgJAAQABAlAcgmQACgDAAgEQAqAKgKAnIgBAHIgDAAQAMAUgbgEQAMAjALgjIABgIQAVAcAYgJIAFgDQgKAkgNAAQgJAAgLgTg");
	this.shape_486.setTransform(212.575,197.4127);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#775F3C").s().p("AgQACQBDgQhDAUg");
	this.shape_487.setTransform(209.3,184.1321);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#DDCFC1").s().p("AgMAQIgGgOQgEgFgBgNQBRgLg5AqQgEAEgDAAQgEAAgCgDg");
	this.shape_488.setTransform(194.4895,156.2659);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#86766A").s().p("AgZgBQBmADhmAAg");
	this.shape_489.setTransform(195.2625,159.55);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#8B7C6E").s().p("AgSgIIAHAAQAAAMASgDIAMgBQgDAJgHAAQgJAAgSgRg");
	this.shape_490.setTransform(195.175,150.6143);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#725E48").s().p("AgYgIQAYAAAYAEIABAEQAAADgCADQgCADgGAAQgNAAgagRg");
	this.shape_491.setTransform(209.45,168.3453);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#81736A").s().p("AASAIQgXAAgTgPIAkAAIAGAAQAEAEACADQABAEAAAEIgHAAg");
	this.shape_492.setTransform(202,160.15);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#685A4F").s().p("AgDAQQgCgEgDgEIAAgIIAAgXQAdAZgTAVQgBAAAAAAQgBAAAAABQAAAAAAAAQgBAAgBAAQAAgEgBgEg");
	this.shape_493.setTransform(204.7803,158.55);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#CABDB3").s().p("Ag1gfQA9gZAqAjQACACAAAEQAXA3hIADIgEAAQhFAAARhKg");
	this.shape_494.setTransform(211.7453,156.1831);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#757164").s().p("AgPAkQAOgQABgcQABAbANASQAFAIgGAAQgIAAgUgJgAAAgsIACAAIgBARIgBgRg");
	this.shape_495.setTransform(253.9333,196.8254);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#686152").s().p("AgGAUIAAgvQAXAzgRAEIgGAAIAAgIg");
	this.shape_496.setTransform(243.6857,192.775);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#70695E").s().p("AAAA4QgDg4AAg4QAKAtgEA8IAAAIIgDgBg");
	this.shape_497.setTransform(242.7403,173.05);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#715F56").s().p("AgHAHQgDgMACgUQAiAkgcAPIgBAAQgBAAgDgTg");
	this.shape_498.setTransform(260.6913,182.1024);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#7B5C45").s().p("AgDANQAJgHgPgXQAnAHglAbIgDABIAHgFg");
	this.shape_499.setTransform(258.2797,183.7426);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#6C6A5E").s().p("AgDAYIAAg3IAFAAIABAIQAEAjgKAUIAAgIg");
	this.shape_500.setTransform(251.4403,177.075);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#6D5B55").s().p("AgHAZQAEgTgEglQAfABgdA5IgCAFQgBAAABgHg");
	this.shape_501.setTransform(260.5642,174.6099);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#625C49").s().p("AAAAgQgCggAAgfIAFAAIAAAIIAAAvIAAAIIgDAAg");
	this.shape_502.setTransform(239.55,192.375);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#9A9283").s().p("AgDA9IAAgIIAAh5IAGAAIAAAIQAEBIgKA5IAAgIg");
	this.shape_503.setTransform(240.2403,183.1);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#7C7567").s().p("AgMAlQAMgXgOg5IANAAIAFAAIABAHQAaA9gtATQAAgEACgDg");
	this.shape_504.setTransform(220.2079,182.325);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#7C7866").s().p("AAIBaQgVhMgLhQQASADgFgUIgBgIIAHAAQgKBnAdBGQACADAJAAQgDAEgFABIgGACQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAgBgBg");
	this.shape_505.setTransform(229.95,185.45);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#696252").s().p("AAAAwQgDgwAAgwQAKAlgEAzIAAAIIgDAAg");
	this.shape_506.setTransform(232.1903,181.9);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#766B5F").s().p("AgCA0IAAgIIAAhfIAFAAIAABfIAAAIIgFAAg");
	this.shape_507.setTransform(240.175,171.025);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#A59E8E").s().p("AAGCuQgdhGAJhoIAAgHIAAihIAAgIQAYAMAABMIAABgQAAAwADAwIAEABIgBBAIABAIIgCAAQgIAAgBgDg");
	this.shape_508.setTransform(230.7698,176.2531);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#6F6758").s().p("AAABUIAAgIQgBhYgEhAQADgEADgCQACgBADAAIAACfIAAAIIgGAAg");
	this.shape_509.setTransform(228.7,167.8);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#AEA496").s().p("AAJCtIgYAAIAAgIIAAgwQALg5gEhHIAAgIIAAgIIAAhhIAAgIIAAgoQAdAHgLAyIgBAHQAAA5ADA3IAEAAIAABpIAAAIIAAAwIAAAIIgHAAg");
	this.shape_510.setTransform(241.425,178.275);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#A7A597").s().p("AgCC3QgYhAAJhgQALgIgEgXIgBgIQALgUgEgkIgBgIIAAgIIAAg5QAahagBB7IgBDYIgDAAIACAQIgBATQgCAdgOAQQgBAAAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_511.setTransform(252.2191,181.9941);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#BAAF80").s().p("AAkAFQgbAYgPg3QAlgJApAcQACABAAAEQADASgFAGQgHAHgHAAQgLAAgLgYgAhGgBQgBgFgDgEQAdgXgXAqg");
	this.shape_512.setTransform(340.5063,230.4795);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#B7BFB8").s().p("AgFAHIAAgHQAAgEgDgEQAYARgJAAQgEAAgIgCg");
	this.shape_513.setTransform(317.7767,248.0389);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#BDB9A6").s().p("ACPhTQg4AEgsgDQhPgGAGA1IADAEIgGAEQAFAygVgDQgPAbgEgbIgMhXQglgQghAGQguAJgIgXQAdgXAuAGQBgAOCXgIQAigCgigEQgvgEBMgTIACgBQALABgFAXQAbgrAEBEIAMA4IABAIQAAAfADAgIADAAIAAAhIAAAIIAAAgIAAAIQgDAAgCgCQgEgCgDgEIAAAIIAAAIQgSh0gghkg");
	this.shape_514.setTransform(334.225,253.125);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#BAB3A9").s().p("AgugPQAmAVA2gCIgDABQgdALgSAAQgiAAgIgfg");
	this.shape_515.setTransform(305.35,230.2155);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#B6B0A0").s().p("AgYgKQAlgFAMAUIgLAEQgGADgGAAQgQAAgKgWg");
	this.shape_516.setTransform(310.025,224.0598);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#5D574C").s().p("AgtAEQgEAAgDgEQAsgUA7AXQACABAAAEQgUACgTAAQggAAgbgGg");
	this.shape_517.setTransform(311.575,210.9034);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#60584F").s().p("AgOgLQAggCgEAPQgBADgGAEQgEADgDAAQgJAAgFgXg");
	this.shape_518.setTransform(301.552,211.2017);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#F4E9D3").s().p("AgLACQAigngOAsQgCAHgMACIgCABQgIAAAEgPg");
	this.shape_519.setTransform(309.3223,200.1575);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#FAECD2").s().p("AgXgDQAKgHAdAJQAVAGgeACIgGAAQgTAAgFgKg");
	this.shape_520.setTransform(303.1452,200.0394);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#EFE4D0").s().p("AgKAKQAAAAgBAAQAAgBgBAAQAAAAgBAAQgBAAAAAAIAAgIQAYgpAFA1IgGgEQgDAAgCABQgGADgGAEQAAgEgCgDg");
	this.shape_521.setTransform(314.675,201.1186);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#695C48").s().p("AgSACQAoAKgagTQgCgCAAgEIAAgIIAMAAIAGAAQABAAABAAQAAAAABAAQAAAAABABQAAAAAAAAQACADAAAEIABAIQACAbgLAAQgKAAgSgUg");
	this.shape_522.setTransform(311.926,204.2085);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#2D231D").s().p("AiIAqIgTgDQgsgIgIgnQAqAXASgZQACgCAAgEQBSgCBBgSQAAAAAAgBQAAAAAAAAQAAgBABgBQAAAAAAgBIBKAAIAHAAIAGAAIAGAAQAAAIADAHQAAAAAAAAQAAAAABAAQAAAAABAAQAAABABAAQABAbATALIAFABQAPANAigJQAAAAAAAAQAAgBAAAAQAAgBABgBQAAAAAAgBIASAAQANAAAAACQAFAYhKgKIgGAAIgSAAQhwAAhuAKIgWABIgHAAg");
	this.shape_523.setTransform(340.788,215.0438);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#BAAE85").s().p("AAPAAQgCgCgIACQgFABgCAEQgHgTgWAJQgRAGgMgKQgGgFACgNQASAAAQABIATACQAxAIAZAeQACADABAEQgLAHgJAAQgSAAgNgcg");
	this.shape_524.setTransform(328.3,221.6695);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#564940").s().p("AgeACIAAgHIAAgIQAkACANAFIAGABIAGAAQAAAEgCACQgJANgQAAQgNAAgVgMg");
	this.shape_525.setTransform(323.05,213.8943);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#52473F").s().p("AgCAFQgDAAgCgBQgEgDgDgDQANAAAGgGQABgBAAAAQABgBAAAAQABAAAAAAQABAAABAAQAAAEABADQAHAOgHAAQgEAAgJgGg");
	this.shape_526.setTransform(325.1681,203.1253);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#575046").s().p("AiEA9QADgEAEgBIALgEQgWgHhBgIQAlABAYgNQABgBAAgEQAWAZAKgZQADgJACgOIAMgEQASgHAIgVQBOgaBZACIASAAQAVAUA2gEIAGAAIAAAIIglAAIi6AAQgLADABANQACApgKgSQAAgEgCgCQgNgVg1ArQBfAOBzgCIAAAFIgHAAIhKAAQAAABAAAAQAAABgBABQAAAAAAAAQAAABAAAAQhBAShSACIgGAAg");
	this.shape_527.setTransform(338.875,207.2459);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#222021").s().p("AgZACQAJAAAIgCQACgBAAgEQAGgEAGgCQALgCAEAFQANAUgSAAQgNAAgcgKg");
	this.shape_528.setTransform(284.0844,234.0025);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#221F20").s().p("AghgMIAGAAIAGAAIAxAAIAGAAQAAAEgCACQgTATgPAAQgSAAgNgZg");
	this.shape_529.setTransform(292.95,233.9298);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#2B2725").s().p("Ag3gLIANAAIAGAAQAuAAAuAEIAAAEQAAABAAABQAAABgBAAQAAAAAAAAQAAABAAAAQgiALgYAAQgkAAgQgXg");
	this.shape_530.setTransform(304.425,233.7731);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#B6AEA4").s().p("AgZAOQAEgrAhAYIADgJQAGgVACAiQAAAJACADIgDAGQgFAFgLgDQgPgGgQAKIAAgJg");
	this.shape_531.setTransform(302.65,225.5123);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#B2BBAB").s().p("AgdgDIAZAAIAFAAIAdAAIg6AHIgBgHg");
	this.shape_532.setTransform(272.0625,240.275);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#615551").s().p("AgMgCQAzgQgvAaIgDABQgEAAADgLg");
	this.shape_533.setTransform(262.2643,233.7301);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#91867C").s().p("AgWgJQBWARhKACIgBAAQgNAAACgTg");
	this.shape_534.setTransform(275.1236,233.6006);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#565554").s().p("ADxASQAHALADAQQAGAsgFAIgAj9AtQBMgDAbgiQAQgVgHguQASgNAlABIAAgEQAdAzgIAJQgXAYAhAEQBFAZgWgkQgDgEgMACQgHABgGAEQAAgEgBgDIgFgIQBBAJgcghIAFAAQANAAARg0IgEAUQgHAsATAUIgHAAIgGAAQAZAxApgsQACgCAAgDQAAgEACgDQAVgdgxgJQA0gBAKgwIABANIABAYIAAAJQgFAcAJANQACADAAAEIgGAAIgNAAQAbAmBUgbQAAAAAAAAQAAAAAAgBQAAgBAAAAQABgBAAgBQAGAFAFAIIk4AtQglAAgogCIAAAIIgGAAIgZAAIABAJIgZADQgCgVgwgPgAiBARQBLgChXgRQgCATAOAAg");
	this.shape_535.setTransform(287.0481,232.9125);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#393029").s().p("AgFASQgIgFACgNQAngqgZA2QgDAHgDAAIgCgBg");
	this.shape_536.setTransform(273.993,218.0666);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#332B23").s().p("AgLAMQgBgBAAgIIAAgPQAqAZgcAAIgNgBg");
	this.shape_537.setTransform(269.1251,216.9813);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#605A53").s().p("AgYgbQAWAHAVgGIAGgBIAAAYIAAALQgUgWgKAgQgEAKgDAAQgHAAgFg3g");
	this.shape_538.setTransform(264.0875,225.7466);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#5D554C").s().p("AhNAEIgMgBIAAgHQA3gCB1ACIAHAAQg1AKg/AAQgYAAgbgCg");
	this.shape_539.setTransform(274.35,213.7526);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#5C544A").s().p("AgkAEIgGgBIAAgHIBPAAIAGAAQgVAJgfAAIgbgBg");
	this.shape_540.setTransform(280.225,204.9401);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#B1A99F").s().p("AgPABIAAgDQAqAFgOAAIgcgCg");
	this.shape_541.setTransform(300.4813,220.8167);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#B3AAA0").s().p("AgOAVQAJhPAPAyQAMAkgRAAQgGAAgNgHg");
	this.shape_542.setTransform(295.9824,173.3459);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#AFA69C").s().p("AgFARQACgNgKgbQA0AVguAag");
	this.shape_543.setTransform(295.9045,181.1);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#6B593F").s().p("AgCgPIgBgIIAHAvIgGgng");
	this.shape_544.setTransform(270.6939,177.0171);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#706051").s().p("AgEAFQgDgBAAgLQAWAPgJAAIgKgDg");
	this.shape_545.setTransform(266.7769,180.2504);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#B1A599").s().p("AAEAQQgCgQgCgBQgJgGgDgQQAnABgWAug");
	this.shape_546.setTransform(280.3008,183.525);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#74624F").s().p("AgkAVIAAgJIAGAAQAuABAOggIABgIQADAEACAFQABADAAAEQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAAAAAQgNAmgdAAQgNAAgPgHg");
	this.shape_547.setTransform(274.025,183.8559);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#6E5C4A").s().p("AABASQgNgMABgZQAFATARAHQAAAAAAABQABAAAAABQAAAAAAABQAAABAAABIgGAAIAAAIQgDAAgCgCg");
	this.shape_548.setTransform(269.6741,183.925);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#B5ABA1").s().p("AgggeQBdgKglA1QgEAEgGAEQgQALgLAAQgaAAAHg+g");
	this.shape_549.setTransform(269.8408,165.7048);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#6A5A45").s().p("AAFA3QgUghABglQAagWgSgNQgCgCAAgDIALAAIAGAAQAAAHADAIQAAAAAAAAQAAAAABABQAAAAABAAQABAAABAAQAAAEgCACQgBABAAAAQgBAAAAABQgBAAgBAAQAAAAgBAAQACA2gBAaIgBAHQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_550.setTransform(274.3494,173.85);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#66595F").s().p("AgPAEQATgNALgRIABAPQACAmgLAAQgHAAgPgXg");
	this.shape_551.setTransform(258.8657,166.2381);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#BAB0A8").s().p("AgBAhIgGADQgmgKANg9QBqgEg7BFQgGAGgEAAQgEAAgCgDg");
	this.shape_552.setTransform(269.8537,157.3447);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#4B3E36").s().p("AgVALQAGgjAYgcIgBAHQgDAZAKAIQABAMACAKIAEABIgBAIQgJAigLAAQgKAAgMgqg");
	this.shape_553.setTransform(275.575,159.8927);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#B4AB9F").s().p("AgDAaQgGgOgEglQAugMggA+QAAABgBAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQAAAAgBgBQAAAAAAAAQAAgBgBAAg");
	this.shape_554.setTransform(295.9102,164.3856);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#B0A69C").s().p("AgDgLQAAgEgDgEQAbACgZAlg");
	this.shape_555.setTransform(298.9759,164.575);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#B2ABA0").s().p("AAOAjQgYgGglAHQgBAAAAAAQgBAAgBAAQAAgBAAAAQAAAAAAAAQgDgHAAgIQAhgPAUgjQACgFAMAAQAvABgKAfQAMAnggAAQgIAAgJgBg");
	this.shape_556.setTransform(280.6929,166.2492);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#B9AEA5").s().p("AgnAhIgEAAQgCgLgBgNIAAgIIAAgfQA+gXAdAwQACADAAADQgHAlgqAAQgQAAgVgFg");
	this.shape_557.setTransform(281.775,157.6244);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#665C4F").s().p("AgWgBQBcADhcAAg");
	this.shape_558.setTransform(341.525,194.175);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#382F27").s().p("AiGBGIgDAAQgDgUAAgUIAFgIIABgIQAZAQgLgZQgCgDAAgDIAAgIQAngRAigpQACgCAAgEIAAgJQAiACAcAWQALAJATgBQAngDAxAXQAKAEgCAEQgFAMgKABIgTAAQhZgChOAZQgHAVgTAHIgLAEQgCAPgDAJQgFANgIAAQgIAAgLgNg");
	this.shape_559.setTransform(338.4348,202.225);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#585347").s().p("AhWgHICnAAIAGAAIAAAIIgGAAQgXAHgfAAQgvAAhCgPg");
	this.shape_560.setTransform(324.925,194.7003);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#382E25").s().p("AmoBEQAygaAUgVQAAAAABAAQAAgBABAAQAAAAABAAQABAAAAAAQBLgOAihCIgDAAIAAgIIAAgIQAYADAJAUQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAQBvAOCCgGIAGAAQA0AFAkgMIAFgBQAAAEACADQABAAAAAAQABABAAAAQABAAAAAAQABAAABAAQAfgCATAJIAGABQACAmAhggQACgCAAgEIAGAAQAlAOA3gKQABAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAgBQA5gGAjASQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAABIgFABQggAOgZgPQgjARgrAOQgzAQgBgYQgbAkhbABQhNABhHgBQg+AAAlgEQAcgYhUABQhNACAiAVQAzACgtADQhFAFgxgSQgdAHgvAaQgdAQgVAAQgRAAgMgJg");
	this.shape_561.setTransform(374.275,176.7245);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#B2A89D").s().p("AgfAaQgEAAgDgEQAIhLBCAlQAGADgGAIQgKANAJAOQgFAIgXAAQgPAAgXgEg");
	this.shape_562.setTransform(312.0625,190.1992);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#B3AB9D").s().p("AgdAYQgEgBgDgEQgEg+A/AXQAXAIgPAfQgEAIgVAAQgNAAgWgDg");
	this.shape_563.setTransform(303.7656,190.4242);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#F8E9D4").s().p("AgIgCQgCgBAAgEQAWAPgBAAIgTgKg");
	this.shape_564.setTransform(303.0256,197.1686);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#DFD2BF").s().p("AgTAeQAAgMgBAAQhJgFAGhHICgAAIAGAAQAYBcghAKQgDABAAgPIAAgZIAGAEQgFg0gaApIAAAHIgGAAIgNAAIAAAJIgGgBQgXgCALArQgGAFgFAAQgMAAgBgdgAgHgKQgEAPAKgCQAMgCACgGQAHgYgGAAQgGAAgPATgAhRgSQAGAOAZgCQAegDgVgGQgRgGgLAAQgIAAgEADgAhDgtQAoAXgqgcQAAAEACABg");
	this.shape_565.setTransform(308.9488,201.4741);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#B5ADA0").s().p("AgagfQBIgKgUBHQAAADgKAAIgHAAQgyAAAPhAg");
	this.shape_566.setTransform(303.4277,181.8973);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#B5ADA1").s().p("AgBAgQgogDAPg7QBYgMgwBGQgDAFgJAAIgDgBg");
	this.shape_567.setTransform(303.375,172.9141);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#595244").s().p("AA7ArQAMgrgegBQiSgJhHAsQArgCAmATIgGAAQhtAHiMgHQgdgKgngXQANgfAlgHIAGgBQgSgJg5gHIAAAQIAAAIQgDAAgCgBQgegQg6gPQBQgLBEAPQAAAAABAAQAAAAAAABQAAABAAAAQAAABAAABQBbgeAsAhQACABAAAEQgBAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAQgUAUgyAZQAdAWAzgdQAugZAdgHQAxATBFgFQAugDg0gDQghgVBNgBQBSgCgbAYQgmAEA+ABQBJABBMgBQBcgCAagjQABAYAzgRQArgOAkgRQAYAPAggOIAGgBQgUArgSAFIgGABQg8APgngQIgBAEQglAJgSgFIgyAnIgDAAQAiAWA4ADQAgAJg/ADIiuAHIgMAAQhJAAgUgbg");
	this.shape_568.setTransform(363.725,181.6598);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#595042").s().p("AgTAPQAhgBgDgmIAAgIQAOAfgHAYIgBAIIgGABQgIABgEAAQgTAAABgSg");
	this.shape_569.setTransform(318.8777,183.6379);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#3E3022").s().p("AgkAdIABgIQAHgZgPgfIAAgIIAAgQQA4AHASAJIgGABQgkAHgNAgQAmAWAeAKQAAAEgDACQgYAZgSAAQgVAAgOgfg");
	this.shape_570.setTransform(324.3,183.8541);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#60564E").s().p("AAQALIglgOQAJgLAVADIAGAAIAGAPIABAIIgGgBg");
	this.shape_571.setTransform(309.725,169.401);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#B7AEA4").s().p("AgegfQBrgChCA/QgBABAAAAQgBAAAAAAQgBABAAAAQgBAAgBAAIgGAAQgwAAASg/g");
	this.shape_572.setTransform(303.8338,165.0152);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#B6ADA2").s().p("AhHgFIgBgIQAogbBNAGQAmADgTAaQgIgRAKAmQABACAGAEIgDAEQgrAKgeAAQg+AAgGgpg");
	this.shape_573.setTransform(299.3,155.9176);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#635F53").s().p("Ag0gEQA0AAA0AEIABADIgHAAQgRACgQAAQglAAgcgJg");
	this.shape_574.setTransform(333.325,170.3296);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#676157").s().p("AggAIQgBgCAAgEQA9gfAFARQAFASgKAEQgQAJgNAAQgRAAgOgLg");
	this.shape_575.setTransform(331.4945,167.1651);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#554742").s().p("Ag0AAQgbACgQgJIAAgIQAggBgIgPIAMACQA4AMArgOQAVATAjAFQgDAEgEABQhFANg7AVQABgggOAAg");
	this.shape_576.setTransform(320.275,163.375);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#B5AAA2").s().p("AgKgQQAZASgDADQgKAMgFAAQgKAAADghg");
	this.shape_577.setTransform(335.3897,155.4903);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#3C352F").s().p("Al6BDIgBgIIgFgQIgBgIQgGgVABgaQAQAKAbgCQAOgCgBAhQA8gVBFgOQAEAAADgEQAjgqAWAOIARgOQAQgMAJgTQAQgJAEgKIARACQAQABgPAIQCRAUCqgNQAIgBARAKIAAAIIAAAIIABAIQAEAogLAYQgGATASgDIAHAAQAiAmAugGIAGAAQAUgBgLASQgCADAAAEQgBAAAAAAQgBAAgBAAQAAAAgBgBQAAAAgBAAQgCgDAAgEIAAgEQgigEgiAAIgGAAIhRAAQAygEgKgjQgJgfgZgBQgrglhcATQg7AMhOgCQAAAAgBAAQgBAAAAAAQgBAAAAABQgBAAAAAAQglArguADQApAbBNgHIAAAEIgGAAQgsAGgxACIAAgEQg1gEg0AAQgEAEgDABQgcADgcAAQAAAEgCACQgjAggYAAQgZAAgNgmgAjYAjQAAAEABABQAbAVAigSQAKgFgFgTQgCgFgIAAQgQAAgpAVg");
	this.shape_578.setTransform(349.7578,163.9339);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#B5ABA4").s().p("AhGAMIAAgEQBVgiAyADIAGAAQAEArgjAEQg8gLgygBg");
	this.shape_579.setTransform(326.4955,157.7133);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#5E5046").s().p("AgYgHQBTAOg7ABQgPAAgJgPg");
	this.shape_580.setTransform(334.8171,129.575);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#C3B7AE").s().p("AhvAlIgDAAQgigGAAgyQAHgWAkAGIAHAAQgNBOBJglQA1gZgVgBQgVgCgEgNQBrgGBJAWIgEADQgCABAAAEQgEAAgBACQgOALgZACIAAAIIhjAGQgkACgiALQgOAFgMABIgPAAg");
	this.shape_581.setTransform(320.6,139.6118);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#5C5148").s().p("AgVAsQAlgLgNg9IAAgIQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAQACgDAAgEQALAJABAXQABAMgBAIQgCAlgcAAIgMgBg");
	this.shape_582.setTransform(304.15,130.0438);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#CEC1B6").s().p("AiTAVQgBAAAAgIIAAgMQABgIgBgMIAAgQQBzgFBeARIABAFQgHAcBFAFQARABAIANQg+AIg+AAQhVAAhXgQg");
	this.shape_583.setTransform(321.2,130.7059);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#D4C7BE").s().p("AgvgaIA9AAIAGAAQADANAVACQAWABg1AZQgXAMgPAAQgfAAAJg1g");
	this.shape_584.setTransform(315.4984,138.7017);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#B7ADA7").s().p("AgRgLQBDANg4AKIgDAAQgMAAAEgXg");
	this.shape_585.setTransform(341.0075,112.2608);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#BCAEA2").s().p("ArkMEIAAgIIAHAAQAMAOAfgFIAGgBQAAAEgCADQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAgBAAIgGABIgQABQgTAAgJgKgAKErLIgGgBQAAgEgCgDIgXg5QBMgKgOA6IAFgCQAHgCANAEQAJgaAJgHQAfgbgMAkQgUArgwAAQgMAAgNgCg");
	this.shape_586.setTransform(264.2526,189.1607);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#E7DAD0").s().p("AgkAXQBDgSgQARQgIAJgSACIgGABQgQAAgDgLgAhEghIABAAIAHAAIASAAIAGAAQADAEADAAQA7gCAoAOIgTAAQg0gFgiAOQAAAEgCACQgQAXgNADg");
	this.shape_587.setTransform(319.2625,104.7702);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#EADFD1").s().p("AhgALIAnAAIgBhCIAOgJQACgCADAAQA3AAA4AEIAAAEIAYA5QABADAAAEIgGAAIgGAAIAAAIIAAAIQASAwgsgGQgjgFgeAFQgPADgMAAQg+AAgBg4g");
	this.shape_588.setTransform(318.3375,116.9075);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#D6C9BF").s().p("AhJAsIgBgaQAOgDAQgWQACgDAAgEQAigOA0AFIATABQgogOg7ACQgDAAgDgEIATAAIBDAAIANAAQAdAAgRAgQgEARgMAKQgUAPhKAIIgRABIgGAAIgJgBgAgqARQAEANAVgCQASgDAIgJQAIgIgNAAQgLAAgjAJgAhJgmIgBAAIAAgGIAHACQAAAAAAAAQAAAAAAABQAAAAAAABQABABAAABIgHAAg");
	this.shape_589.setTransform(319.8983,105.3428);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#DDCCBE").s().p("AgNAAQA1gHg1ALg");
	this.shape_590.setTransform(329.4,102.24);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#5F5144").s().p("AgKAiQgUgUAoAHQAEABACgNQADgLgMgDQgpgcgNAgIgGgHQgFgGAEgPQA8gPAyASQAAAAAAABQAAAAABABQAAAAAAABQAAABAAABQACA6gvAAQgKAAgMgDg");
	this.shape_591.setTransform(332.8977,106.8671);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#B9AFA1").s().p("AgugjQA/gJAbAbQACACAAAEQAEAsgdgFQgQAKgLABQgiAAgGhKg");
	this.shape_592.setTransform(297.3242,138.8279);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#B7ADA1").s().p("Ag1AGQgIgGgGgJQAogyA2AnQAIAFAbgKQAQApgcAWQhEgBgjgfg");
	this.shape_593.setTransform(298.8011,147.4753);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#ACA59E").s().p("AgKAYIAAg3QAqAjglAbQgCABgDAAIAAgIg");
	this.shape_594.setTransform(288.1914,131.175);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#C0B4AA").s().p("AglAOQgIgIAAgPIAAgYQBPgSAMAyIAAAHQgQAhgXAAQgTAAgZgZg");
	this.shape_595.setTransform(297.3,129.7954);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#C8BDB6").s().p("AgGAjQgpgGAPg/QBtgIg+BIQgGAGgJAAIgGgBg");
	this.shape_596.setTransform(269.8446,139.5153);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#C0B6AD").s().p("AgqAQQgHgEAAgPIAAggQAqACAzAXIACAOQABAEADAEQgLAYgZAAQgVAAgjgUg");
	this.shape_597.setTransform(282.075,148.4649);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#C0B5AC").s().p("AgoALIAAgIQALg+A7AkQADADADAGQARApgmAIQgLACgIAAQgfAAgFgag");
	this.shape_598.setTransform(270.0854,148.6105);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#251C17").s().p("AgCAYIAAg3QAJAYgHAmIgCABIAAgIg");
	this.shape_599.setTransform(274.9563,140.05);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#C8BDB3").s().p("AghAdQAAgEACgDQARgogggQIAHAAQBGgQAOAoQABAEAAAEQgFApgiAAQgQAAgYgKg");
	this.shape_600.setTransform(282.4,140.3558);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#625858").s().p("AgLACIAAgDQAkADgVAAIgPAAg");
	this.shape_601.setTransform(263.375,126.5661);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#C6BDB8").s().p("AACAjQgWgUAJgyQAGAAAFADQAAABAAAEIgFAAQAfAQgSAoQgBADAAAEQgEAAgBgBg");
	this.shape_602.setTransform(278.3325,139.625);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#D5C9C1").s().p("AgmgkIBJAAIAGAAIAAA/IAAAIIgGABQgMABgKAAQg/AAAMhJg");
	this.shape_603.setTransform(269.8852,130.897);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#CEC3BB").s().p("AgxgHIABgdIAAgBQAdgBA/ABIAGAAIAAA4IAAAIQAAABAAABQAAAAAAABQAAABgBAAQAAAAAAAAQgaAHgTAAQgwAAgFgtg");
	this.shape_604.setTransform(282.05,131.7136);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#DED2CB").s().p("AAGAdIgSAAIAAgIIAAgfQAjgtgPBFQgCAHAGAIIgGAAg");
	this.shape_605.setTransform(271.55,122.6853);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#7C726B").s().p("AAABPQgCgKAAgNIAAgIIAAg/IAAgIIAAgIIAAgJIAAgnIAFAAIAACXIAAAJQAAAAgBgBQgBAAAAAAQgBAAAAAAQAAAAAAgBg");
	this.shape_606.setTransform(274.325,128.8);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#C1B7B1").s().p("AAJAkIgGAAQgFgIABgGQAOhFgiAsIAAgIIAAgYIAdAAQAFACAEAEQABABAAAAQABAAAAAAQABAAAAABQABAAABAAIAAAIIAAAIIgHAAIAAAnIAAAIIgGAAg");
	this.shape_607.setTransform(272.475,121.9375);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#4C413E").s().p("AgWgFQBSAEhBAHIgBAAQgIAAgIgLg");
	this.shape_608.setTransform(266.3994,119.6787);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#BCB0A8").s().p("AgSALQAdgBAFgdIADgBIAAAfIAAAIIgGABIgMABQgOAAgFgKg");
	this.shape_609.setTransform(268.425,123.6426);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#4A403C").s().p("AgPBPIAHAAIADgBQAGgogJgXIAAgJIAAiXIAAgIIAAgJIAAgIIAXAAIAAAAIABAIIAABBIAAAIIAAAIIAAAIIAAABIgBAcQgDBpgOBqIAAAEQgHgrgGgxg");
	this.shape_610.setTransform(275.55,135.4);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#D3C6BE").s().p("AgOgYQAogBgPAjQgHAPgEAAQgKAAgEgxg");
	this.shape_611.setTransform(297.2277,120.8252);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#C3B5AC").s().p("AgqATQgNgGADgbIABgQIAEgBIBNgBQANAHAJAMQACADAAAEQgGAngkAAQgVAAghgOgAgNgeQAGBNASgrQAPgigmAAIgBAAg");
	this.shape_612.setTransform(297.189,121.4113);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#CCC2BA").s().p("Ag5AlIgGAAIAAgIIAAg/QBLgHAvATQAAAAABAAQAAAAAAABQAAABAAAAQAAABAAABQAPAvguAIIhWAAg");
	this.shape_613.setTransform(283.5094,122.6405);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#6C5D58").s().p("AADACQgDgDgGgCIANAAIAAAHQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAAAgBg");
	this.shape_614.setTransform(273.95,118.7125);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#B3A8A0").s().p("AgegDQA9gGAAANIgMABIgPABQgWAAgMgJg");
	this.shape_615.setTransform(333.6,75.2911);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#FFFBF6").s().p("AgZgBQBmADhmAAg");
	this.shape_616.setTransform(326.2625,75.85);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#5C504A").s().p("AgQANQAYgHAJgcIgDAjQAAAEgCADQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIgGABIgHABQgLAAAAgKg");
	this.shape_617.setTransform(303.675,124.2471);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#C2B8AA").s().p("AAWAEIgxAAIAAgHIATAAIAGAAIAYAAIAGAAIAAAHIgGAAg");
	this.shape_618.setTransform(320.25,58.35);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#B1A49D").s().p("AgbAEIAAgHIAxAAIAGAAIgBADQgYAEgYAAIgGAAg");
	this.shape_619.setTransform(338.275,59.95);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#BAADA2").s().p("Ar4I8IAAg5QA3AagyAlQgBACgEAAIAAgIgAJ2o6IAAgIQBFACAxAUIAHACIAFAAIAAADIgDABQhHAAg4gUg");
	this.shape_620.setTransform(260.05,115.9);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#625752").s().p("ABWgDIAAgIQgTAdgMgdQgCgjgoAIQg/AOg9gkIAAgHIAAgIQAoAXALghQAMgkAWgVQAHgFANgBQAOAogpgRQgIgDAGAUQABAFAEADQBMAchMgDIgHAAQA6AsA+ggIADADQAfB8gGBVQgRg8gIhcg");
	this.shape_621.setTransform(253.567,139.65);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#665545").s().p("AgJAAQAAAAAAAAQgBAAAAgBQAAgBAAAAQAAgBAAgBQAYAJgDAAIgUgFg");
	this.shape_622.setTransform(251.5501,119.6143);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#CFC2B8").s().p("AgjAmQgJgCgJAAQgFgZgBgvQBDgSAwArQAIAGgGAJQgJAmgxAAQgPAAgUgEg");
	this.shape_623.setTransform(211.7833,146.9197);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#C0B1A3").s().p("AgCAcIAAg/QAKAcgIArIgCAAIAAgIg");
	this.shape_624.setTransform(203.5684,128.375);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#DDCFC6").s().p("AgRAvQgSgBgNgFQgwgSALhEQBQgJBZAcQAEABAAAMIAAAIQgLAwhBAEIgNABIgQgBg");
	this.shape_625.setTransform(214.3139,129.351);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#E6D8D0").s().p("AgTgGQBHgIg4AWIgGABQgIAAgBgPg");
	this.shape_626.setTransform(213.297,135.1229);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#D5C7BE").s().p("AhOgrQATgBASAAQANAFASABQAPABAOgBQAhAHAaANQAGAEgOgFQANA7gggDQggAIgYAAQhRAAAIhYgAgWgjQABAVAOgGQApgRgeAAIgaACg");
	this.shape_627.setTransform(213.6447,137.9757);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#DFD0C3").s().p("AgbAkIgGAAIgGAAQgLAAALgJIAHgGQgRgLgDgtQA/gBgCARIAEgCQAngaABA7QgLAvgZgzIgOAAQgNAAANAEQAkAZgyAAIgQgBg");
	this.shape_628.setTransform(197.35,146.0972);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#E3D5C7").s().p("AgyAWQgEgCAAgMIgBgvQA3AIAzAUQAKAEgLAAQAAAvgnAAQgXAAgmgSg");
	this.shape_629.setTransform(197.6256,136.8004);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#C4B8AF").s().p("AgNAgQAMAGAEgYQAFgUgCgKIgDgNQgKA/gMhJQBCAPgvA8QgDAEgKAAg");
	this.shape_630.setTransform(185.3517,143.275);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#908273").s().p("AgZgBQBmADhmAAg");
	this.shape_631.setTransform(195.2625,132.2);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#EBDDD1").s().p("AgWARQgfgFgEgeIBvgBIAEAKQgKAdgqAAQgMAAgQgDg");
	this.shape_632.setTransform(197.4375,120.9287);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#BBB1A6").s().p("AgegDIA3AAIAGAAQAAABAAABQAAAAAAABQAAAAgBAAQAAAAAAAAQgQAEgNAAQgSAAgNgHg");
	this.shape_633.setTransform(180.9,119.517);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#5D4F45").s().p("Ag0gGIBpgCIgBACQgRAOgjAAIgBAAQgiABgRgPg");
	this.shape_634.setTransform(218.275,119.6002);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#DDCFC5").s().p("AgdAOQgFgOgBgUIA/AAQAEAHACAIQAFASgHACQgdAGgfAAIgBgHg");
	this.shape_635.setTransform(209.8167,121);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#E8DACD").s().p("Ag2goQA4ADAYgCIAGgBQAMAAAMAEQAAAAAAAAQAAAAAAABQABABAAAAQAAABAAABIAABAIAAAIIgGAAIgZAAIgGAAIgPABQhGAAALhRg");
	this.shape_636.setTransform(197.5773,128.0409);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#BCB0A2").s().p("ABcGPIAAgIIAAgQQABAAABAAQABgBAAAAQABAAAAAAQABgBAAAAQACgCAAgEIAAgIIAAg5QABAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQAMgqgWgNIAAAwIAAAIIgBAIIgFAIIAAAgIAAAJIgGAAQglAEAMgtQALAAgEgQIgBgIQABAAABAAQABAAAAAAQABAAAAgBQAAAAAAAAQAMgVgQgKQAchegShKQAAgBAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAIgBgEQgYgEgZAAQgGAIgMAAIhpAAQgJAAgDAEQgLATA2gHQAGAAACADQAuBGhbgBQggAWBRAAQArAAABATIgGAQQgTA0hXgUQgEAQAKAAQBVgDgEA7IADAJQgsAFg0ALQAAjmABjkQACiygKiBIAJAAQAEAfAfAFQBDAMAOgnIgEgKIAhAAQABATAFAQIABAHIgGAAQgWgFghAFIAAAIIgGABQgYACg5gDQgMBaBXgJIAGAAQA9APgYBJQgGAIgMgCQgTgDAGAGQAJAHAGAIQA2BDhSAGQAvgBgDAxIAAAIIAAAYIAAAHIgGAAIgmAAQAUAQAYAAIAGAAQAxACBXgBIAGgBQAJBHgJBjQANA6gLAXQgCADAAAEIAAAIQACAyAEAVIABADQgEAIAFAHQgCAZgfAAQgIAAgLgBgAh8AIQBnAAhngEgAiCgrQABANAEAHIAGANQAFAHAJgHQAugjgsAAQgLAAgQACgAiCikQADAvAQAKIgHAHQgKAIAKABQAfAgAHgYIgMACQgTADAAgNIAGAAQBIAEgpgcQgPgEAPAAIAOAAQAYAyAMguQgCg8gmAZIgEACQACgQg5AAIgHAAgAiCjUQAAAMAFACQBkAvABhNQAKAAgJgEQgzgUg4gIIAAAwgAh8kIQBnAAhngEg");
	this.shape_637.setTransform(205.1625,158.9392);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#B8B4B1").s().p("AgygHQAzACAyADIAAAKIgKAAQguAAgtgPg");
	this.shape_638.setTransform(176.0125,44.2213);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#B9B2B1").s().p("AhdgJQBeAFBcAGIAAAIIgUAAQhTAAhTgTg");
	this.shape_639.setTransform(171.65,34.0021);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#FEFAF0").s().p("Ag/ACQA4AEAagZQAAAAABgBQAAAAABAAQAAAAABAAQABgBAAAAIAZAAIAGAAQAAAEACABQAWANgqAFIAAAIIgGABQgYALgTAAQgcAAgWgUg");
	this.shape_640.setTransform(328.164,48.055);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#F2E9C6").s().p("AgEAbIgGgBQgzgGgXgBQAAgEACgCQASgRgUgQQAJAAAIgEQABAAAAgFQBEAABEAFIAAAEQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAgBAAQgaAZg3gDQAkAhA5gYIAFgBIADAAQgSATgmAAQgPAAgSgDg");
	this.shape_641.setTransform(323.525,48.024);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#D8B07A").s().p("AgHA0QgJANgHgFIgBgzQAWgLAFhBIADgBQgIA8AWAbQABAAAAAAQABAAAAABQABAAAAAAQABAAABAAQAAAEgCABQgHADgKAAQAVAQgTATQgCABAAAEQgHgZgGAJg");
	this.shape_642.setTransform(314.3625,43.05);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#FFFDCB").s().p("AgEgQQAWgVgWA6IgBABQgCAAADgmg");
	this.shape_643.setTransform(312.9875,17.8063);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#AB9C94").s().p("AAHAdQgBgkghgbQBTgIgrBKQgCAEgCAAQgBAAgBgHg");
	this.shape_644.setTransform(305.328,15.596);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#D2B766").s().p("AgBAIIAAgPIADAPg");
	this.shape_645.setTransform(310.2,20.8875);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#C7AE93").s().p("AAKBAIgCgHIAAgJIAAhXIAAgEQgbADADgXIAYAAIAGAAIABAIQAEA+gDA5g");
	this.shape_646.setTransform(307.9877,15.2625);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#C2B5AE").s().p("AAFgHQgBAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQgXgggygFQBHADBEgEIAGgBIAABYIAAAIIgGABQgsAAgSg4gAALgoQAhAbACAlQAAAMAGgJQAnhDhCAAIgOAAg");
	this.shape_647.setTransform(301.475,16.1124);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#C5A269").s().p("AgLAwIAAgQQARgggIg3IACAAQAeBJgpAmg");
	this.shape_648.setTransform(311.2457,10.475);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#CEBFB5").s().p("AhmgGQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAgBAAgBIDPAWIhSABIh8gSg");
	this.shape_649.setTransform(221.7125,21.25);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#A98C81").s().p("AgDAPQgDgPAAgPIAGAAIAFAAIABAIQAEATgKAEIgDgBg");
	this.shape_650.setTransform(293.9688,1.6);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#CFB7AA").s().p("AgbgJQAGAAAFgDQABgBAAgEIAfAAIAFAAQAAAQAEAOIADABIAAAEQgXgZgggCg");
	this.shape_651.setTransform(291.1,1.8);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#AA9B99").s().p("AgxgEIBcAAIAHAAQAAAEgCAAQgFADgGAAIgGAAIgbACQgfAAgWgJg");
	this.shape_652.setTransform(284.575,0.5026);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#B09F96").s().p("AgCgRIAAgIIAAgIIAFAAIAAAIQgBA7gCAAQAAAAgCgzg");
	this.shape_653.setTransform(315.925,3.4036);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#FAF9EA").s().p("AgVgWIAlAAIAGAAIAAAIIAAAIQgKAogCgZIAAgLQgJAZgGAAQgJAAgHgtg");
	this.shape_654.setTransform(313.425,2.3184);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#3E3018").s().p("AgLgMQAwgcgsA8IgDACQgEAAADgig");
	this.shape_655.setTransform(462.6996,48.823);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#121216").s().p("AgHAUIAAgvQAeAfgeAYg");
	this.shape_656.setTransform(495.1625,144.475);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#121316").s().p("AgGAIQAZg+gXBLg");
	this.shape_657.setTransform(493.8193,127.9921);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#8F8375").s().p("AgJACQAlgagiAig");
	this.shape_658.setTransform(472.439,141.4498);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#7F7365").s().p("AgagWQASgGAKgMQACgCAAgEIAGAAIAHAAQATAigQAcQgSAfgKAAQgQAAgChFgAgNABIADAIQASgTgDAAQgDAAgPALg");
	this.shape_659.setTransform(472.8907,141.527);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#B0A492").s().p("AgGAQIAAgnQAaAigaANg");
	this.shape_660.setTransform(482.6625,128.775);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#6E665A").s().p("AgJAoQApgZgkgRIgBgNQgBgEgDgEQghAWACgeQAqgWAkAZQACABAAAEQAIBBgpAAQgHAAgJgCg");
	this.shape_661.setTransform(466.8412,104.6416);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#0F1316").s().p("AgCgPIgBgIIAHAvIgGgng");
	this.shape_662.setTransform(501.0004,110.2171);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f("#B1A597").s().p("AgUgBQBSADhSAAg");
	this.shape_663.setTransform(459.825,130.6);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#B0A496").s().p("AgUgBQBSADhSAAg");
	this.shape_664.setTransform(459.225,132.2);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f("#5F554A").s().p("AgPACQAfgsgBAsQAAATgIAAQgHAAgPgTg");
	this.shape_665.setTransform(424.5515,137.4875);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#57534B").s().p("AAvCRQgTgRAFghQACgHAFgDQAQgHgFgHQgZgdgEAPIABgZIAAgPQgxgbhFgFIATABQA1AEAhgNQAGgCACgCQALAYAAgtQgDgqgtgFQANgCAQgGQA4g2hKgTQBWghhPgnQA/gWghg7Qg0gGA9gZQADgBADgIQADgIAGgJQABAsAmAWQAHADgPgEQgfAjAGA2QAGA7AggLQAnAIgVAQQgUA8AhAFIAAAIIgDAAQABAcgLALQgBAWAJAJQABABAAAAQAAAAABABQABAAAAAAQABAAABAAQAJAOAcgCIAAADIgGAAIgsAAQgSBOA+gNIAGAAQAAAEgCAAQgEADgGAAIAAAIIgGAAQgbgDgLALQgEBSBKgaIAFgPQBgAtBUgVIAGAAIgBAHIgFAJQAGAXAlgGIAGgBQAAAEgBACQgFACgGAAIAAAIIgGAAQizgShrgOQAAAcADAcIADAAQgEAXAXgCIAAADIgGAAIgTAAQgEAgAJASQABADAAAEQgbgvgDAnQgEAqgJAuQghh4AIh5gAmbigQCKAGCagLIAlAEIASABQgHA4AgAJIgHAAQg4ADgqABQhJAChRANQgTACgQAAQhXAAAJhWgAjhiYQAQAIADAIQAxAoAsgoIADAAQgbgTguAAQgTAAgXADg");
	this.shape_666.setTransform(431.334,172.25);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#625A52").s().p("AgWAvQAmgeAEgOIABAMQAFAugUAAQgKAAgSgOgAgEgoQAbgeAAAOQgBAegKAAQgGAAgKgOg");
	this.shape_667.setTransform(435.2504,125.6742);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#5C5247").s().p("AgLAVQAegKgMg1IgBgIQABAAABAAQAAAAABAAQAAAAABABQAAAAAAAAQACADAAAEQAAArgHArQgCAHgCAAQgEAAgIgeg");
	this.shape_668.setTransform(424.875,127.4639);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f("#817A6A").s().p("AgWAAQBcgIhcAMg");
	this.shape_669.setTransform(460.0875,112.728);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#837A6E").s().p("AgmAAQAogNAlANIgEAAQgWAIgRAAQgTAAgPgIg");
	this.shape_670.setTransform(458.55,99.9);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f("#6C6556").s().p("AgpgCQArARAfggQANgOgGAiQgBAGgMAFQgSAIgNAAQgZAAgMgYg");
	this.shape_671.setTransform(458.8583,108.9237);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#7A7064").s().p("AgIAPQAjhEgjBIg");
	this.shape_672.setTransform(458.05,95.9236);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f("#7D7366").s().p("AgSAFQAwgzgPAsQgLAZgIAAQgIAAgGgSg");
	this.shape_673.setTransform(457.1669,90.4632);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#B2A498").s().p("AgJANQAFgUgGgMQAsADgsAkg");
	this.shape_674.setTransform(431.6,92.95);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f("#5A4E43").s().p("AAKChQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgEgjAKgWQgUgbAUglQAGglgPgNIgDgbQgGglgZgeQAIgsAdgQIgGAEQgIAFAIAzQApA9gLBEQgMBLgGBFQAAgEgCgDg");
	this.shape_675.setTransform(424.9486,106.3971);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#B2A49B").s().p("AAKAYQgYABgGgNQAhAGgNgmQgCgDAAgEQAkAOgVAoQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAg");
	this.shape_676.setTransform(435.0552,68.025);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f("#B8A79D").s().p("AgmgdQBDgFALAWQACADAAAEQgVADALAcIgJACQgNADgKAAQgzAAANg8g");
	this.shape_677.setTransform(433.1284,51.3275);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#BBAA9C").s().p("AgKAhQgZAHAGguQBGhDgLBhIgHAGQgIAEgNAAIgMgBg");
	this.shape_678.setTransform(450.1971,65.875);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f("#B9AA9B").s().p("AgOAfQgXgFAJgqQBYgpgqBLQgIANgPAAIgJAAg");
	this.shape_679.setTransform(450.7352,57.2456);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#877D6F").s().p("AgNgBQA2gCg2AFg");
	this.shape_680.setTransform(467.8125,86.275);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f("#7D7367").s().p("AgDAKQADgGgGgTQAcADgcAcg");
	this.shape_681.setTransform(465.325,94.975);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#ACA394").s().p("Ah5AlIAAgIQALhDgChUIADAAQBZgmBxgVQALgCAKAMQATA/gYANQgBABAAAEQALBhgMBbIgBABQgPANARAOQgbArg8ABQgeAAglAGQgfAGgmAAQgIhNAChEgAgvCGIAAAEQA3gHgKAAIgtADgAgJBvQALgFABgGQAHgjgMAOQgfAhgtgSQATAmAygVgAAlAmIABANQAlARgqAaQA8APgKhQQAAgEgCgBQgkgYgrAVQgCAfAhgXQADAEABAFgAhOAFQAfASAsgSIADAAQgSgGgUAAQgTAAgVAGgAg1gSIAAAEIASglIgSAhgAAYggIgDAGQAdgdgdgDQAHAUgEAGgAhHhSQANAoAVgwQAGgUgGAAQgIAAgaAcgAAniDIAAAEQApgEgUAAIgVAAg");
	this.shape_682.setTransform(462.518,99.2792);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f("#BBAB99").s().p("AiPAbQgCgBAAgIIAAgnIBRgIIAGAAQAOAdBCgUQBAgUA8ALQg3AhhhAWQgnAIgjAAQghAAgegHg");
	this.shape_683.setTransform(461.8,73.8303);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#B4A395").s().p("AgQABQBEgMhEAQg");
	this.shape_684.setTransform(474.3875,66.7183);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f("#604832").s().p("AhAAMQA1gRA6gNIAGgBQAGAAAEAEQACAAAAAEQAAAFgCAAQgrAagpAAQgWAAgVgIg");
	this.shape_685.setTransform(463.675,67.9502);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#A59284").s().p("AgjANIABgIQAThJAuAxQAIAJgGANQgIATgRAPQgKADgIAAQgaAAABgbg");
	this.shape_686.setTransform(474.9717,60.6972);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f("#B4A692").s().p("AgQE7QgCgCAAgEQADgSgTgXQgCgDAAgEQATkDAAkPQAAgwAqAAQAQARgFAeQgCAQgQABQAlB/gxCmQgCAIAOAEQAJAugHAbQgCAHAAAIQgfgSAHBjQAFBCABAGQgDAZgHAAQgDAAgDgDg");
	this.shape_687.setTransform(485.7244,96.2315);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f("#1E1A11").s().p("AgRAAQBIgHhIAKg");
	this.shape_688.setTransform(403.7375,141.7139);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f("#1D1A10").s().p("AgYgNQBNALgrAOQgHACgFAAQgTABgDgcg");
	this.shape_689.setTransform(398.8255,141.4997);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f("#736C64").s().p("AgPAAQA/gHg/ALg");
	this.shape_690.setTransform(391.1,138.49);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f("#6D6258").s().p("AgYACIAAgDQBaADhIAAIgSAAg");
	this.shape_691.setTransform(385.85,135.4025);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f("#8E857C").s().p("Ag9gDIB1AAIAGAAIgBADQgdAEgbAAQgkAAgegHg");
	this.shape_692.setTransform(381.4,109.0583);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f("#9C948B").s().p("AgegBQAnAEAWgIIAAAEIAAADQgfAEgeAAIAAgHg");
	this.shape_693.setTransform(394.45,108.05);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f("#AFA399").s().p("AgKAIQAdgqgKAfQgIAUgFAAQgEAAgCgJg");
	this.shape_694.setTransform(419.7845,108.6927);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f("#AEA79B").s().p("AgIAEQgGgHALgHQALgJgKgDQgSgGAAANIgGABQgbALgqgEIAAgIQAeAEAMgOQACgCAAgEQBXgFAwAZIgCACQgEACAAAHQA2AehuADQgSgNgMgQg");
	this.shape_695.setTransform(408.389,108.6333);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f("#E6DBCC").s().p("AgKgDQgCgBAAgEQAbARgCAAIgXgMg");
	this.shape_696.setTransform(372.794,125.6302);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f("#B6BAB9").s().p("AgrAtIAAgIIAAgIIAAgIIAAhnIAAgJIAAgYIArAAIAGAAQADAAACACQAhAggBBWQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAgBAAQgUAngZAgIgBAIQgIAfgIAAQgLAAgJhHg");
	this.shape_697.setTransform(382.0504,153.2281);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f("#A8A5AA").s().p("AgbAUIAAgIIAAgfIAxAAIAGAAIAAAIIgGAAIgqAAIAAAXIAAAIIgHAAg");
	this.shape_698.setTransform(379.85,142.875);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f("#1F160F").s().p("AgTAAIAAgEQAtAJgGAAIgngFg");
	this.shape_699.setTransform(372.2813,141.3071);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f("#B4A9A0").s().p("Ah1ALIgGAAIgGAAIgHAAIAAgIQBJAJAogXIAFgBQBCAMBSgEIAHAAQhYARhoAAIg+gCg");
	this.shape_700.setTransform(380.175,130.8728);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f("#CABDB0").s().p("AgcAeQgbgDgJgOIAAgIIAAgXIAAgIQBngNAYAXQACACAAAEQgJAqg6AAQgMAAgOgCg");
	this.shape_701.setTransform(364.325,150.8157);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f("#75695E").s().p("AgVAAQA2gRgOARQgJAKgKAAQgJAAgMgKg");
	this.shape_702.setTransform(358.8002,136.9875);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f("#23150F").s().p("AgMgBQA0AAg0ADg");
	this.shape_703.setTransform(355.425,141.0475);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f("#4A4038").s().p("ApGBcQAbgQgFhAIAGAAIADAAIAOABQCCAEAqgNQAlARgLgZQgBgDAAgEIAAgIQAYgCAOgNQACgBADAAQBEguAMAiQABADAMABIA+AAQAygLg0gRIAPABQAMACANAAQAXgGg9gDQhWgDgfg0QAZARA3gIIAGgBQAPAOAjgFIAGAAQA2ASBMgCIAGAAIAGAAIAGAAQCVAVCKgQQA2gHAagXQAuAHhBAjIgZAOQgggcg1AfQAfA1BigEQBFgCAagPQAEgCAEgFQACgDAGAAQBegJgZBIIAAAhIiuAEQgeABg0gDQgdgDglgHQgHgCAAgPQAEg5hJASIgGAAIgyAAIAAAfIAAAIQgCArgYgQQgGgFgQgDQiSgYilAOQAAADgCADQgMALgKAOIAAgEQg7AlgKgwIAAgFQg4AOgrAeIAMABQBUACBUAOQiRgOiBAjQgJADgIAAQggAAgMgpgAFgAHQArgPhOgLQAEAkAfgKgAF1gDIAAADQAtgGgKAAIgjADgAA5gHQBQALhRgPIABAEgAhogLIAAAEQAwgEgnAAIgJAAgAD5gjIAAAEQAmgHgHAAIgfADgAhPgzQAXAWASgWQAHgIgKAAQgLAAgbAIgAC7g/QBmAAhmgFg");
	this.shape_704.setTransform(364.6137,142.05);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f("#EEDFD3").s().p("AgJgBIAAgIIAAgIIAHAAQAIAAAAACQAHAhgGAAQgFAAgLgTg");
	this.shape_705.setTransform(360.0405,126.5604);

	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f("#BEB3A8").s().p("AmDA8IAAgIQBFAFAwgRQAAgBAAAAQABAAAAgBQAAAAAAgBQAAgBAAgBIAAgIQAdAvgNg9QgBgCgIAAIAAgIIAFAAIFPAIQAogTBBAIQAuAEAwgYQgTgkAfgMQAMAEAIABQAzAHAcAcQAAAIgCABQg4AQg8AGQACAsgtgEQgBgZgLgDIgEACQgcAJgMAJQhTAOhmgLQhJgJgOAfIgGAAQh3gDhpALIgGAAIgRABQgWAAgLgJgAiPAQQAyAcgzghQgBAEACABg");
	this.shape_706.setTransform(386.05,123.6426);

	this.shape_707 = new cjs.Shape();
	this.shape_707.graphics.f("#C8BCB0").s().p("AgNBPQiSgGhngKIgCAAQAFgigBggIAQAAQABBBBZgNQAfgFAjAFQArAGgSgxQAtAIAXgHIAGgBQAkAZAsAQQBEgLBeASIANABIAAAIIgHAAIAAAIIAAAIIAAAIQiLgDiFgFgAjOhWIAPAAIADABIABAEQgDAAgCABIgOAKg");
	this.shape_707.setTransform(333.15,118.4625);

	this.shape_708 = new cjs.Shape();
	this.shape_708.graphics.f("#C2B7AE").s().p("AAhAYQgmgBgjgHIAAgEQguAHAIgqQBRASBNAVIgLAEQgOAEgQAAIgGAAg");
	this.shape_708.setTransform(353.2587,114.3);

	this.shape_709 = new cjs.Shape();
	this.shape_709.graphics.f("#635A54").s().p("AgRACIAAgDQA3ADggAAIgXAAg");
	this.shape_709.setTransform(349.0375,110.4661);

	this.shape_710 = new cjs.Shape();
	this.shape_710.graphics.f("#C1B3AB").s().p("AgbgHQAbAAAbAEQAAAAAAAAQABAAAAABQAAAAAAABQAAABAAAAIgGAAIgTAAIAAAIIgFAAIgGAAQgSAAgBgPg");
	this.shape_710.setTransform(343.25,103.045);

	this.shape_711 = new cjs.Shape();
	this.shape_711.graphics.f("#312920").s().p("AgCAQQgvgDgcgNQBYAAA9gPIAGgBQgBAdgwADIgNAAIgGABIgMgBg");
	this.shape_711.setTransform(381.1,119.975);

	this.shape_712 = new cjs.Shape();
	this.shape_712.graphics.f("#332922").s().p("Ag6ALQgRgDAAgMQA0gKACAFQAKAWgbAAQgIAAgMgCgAAdgMQA5ACgLAMQgJAJgSACIgEAAQgWAAAHgZg");
	this.shape_712.setTransform(359.8965,119.6378);

	this.shape_713 = new cjs.Shape();
	this.shape_713.graphics.f("#504840").s().p("AjWAfQhggEg7giQAPg3AUAvIADgIQAGgOAZAGQAQAJAcgBIAMAAQAjAGAnACIAHAAQAbAOAvgGIAGAAIC6AAIAFAAQA9ADAsgPQAvgPAjAbQAhgrApADQgVA5ADAOQAbARgiAAQiVgEhbgEQAwgEAAgdIgGABQg9AQhXgBQAaAOAvADIAOAAIggAPQh7gNiQgEgAjVAIQABANAQADQAzAKgOgfQAAgBgHAAQgNAAgiAGgAhZAaQASgCAJgJQAMgNg6gCQgHAdAagDg");
	this.shape_713.setTransform(373.65,118.3181);

	this.shape_714 = new cjs.Shape();
	this.shape_714.graphics.f("#BAB1AA").s().p("ABSAQIi6AAIAAgEQgcgBAEgaQCRAQBwACQgdAAgMANIgGAAg");
	this.shape_714.setTransform(375.7056,115.9);

	this.shape_715 = new cjs.Shape();
	this.shape_715.graphics.f("#A09790").s().p("AgegEQAeAAAeAEIABADIgGAAIgUACQgWAAgNgJg");
	this.shape_715.setTransform(367.75,108.3526);

	this.shape_716 = new cjs.Shape();
	this.shape_716.graphics.f("#3B332B").s().p("AgdgGQBkABhGALIgIABQgRAAgFgNg");
	this.shape_716.setTransform(365.762,110.946);

	this.shape_717 = new cjs.Shape();
	this.shape_717.graphics.f("#564E46").s().p("ABIAtQhlgFh5gDQg1gCgCgXQhJgQgngoIAGAAIAGAAQBcAXBrAJIAGAAQASANAmgFIAGAAIAlAAIAGAAQA0ANBHgJIABgEIAfAAIAGAAQAfAAAfgEIAAgEIAGAAIAGAAQAqADAbgKIAGgBIADAAQhJAhhhAOIAFAAQA/gFBKANQgzAJg9ABIhKAAIggAAgAhYAYQBGgNhlAAQAHARAYgEg");
	this.shape_717.setTransform(374.75,109.195);

	this.shape_718 = new cjs.Shape();
	this.shape_718.graphics.f("#CABFB6").s().p("ACuAcIgfAAIgHAAIh1AAIgHAAIgkAAIgBgEQgegEgfAAIgGAAQhrgIhcgXQAAgEgCgCQAAgBgBAAQAAAAgBAAQAAgBgBAAQAAAAgBAAIAAgIIATAAIAGAAQEMAGEnASIAHAAQAAADgCACQgMAOgegEIAAAIIgGAAIgGAAIAAgEQgWAJgogFIAAAIIgGAAg");
	this.shape_718.setTransform(373.35,105.825);

	this.shape_719 = new cjs.Shape();
	this.shape_719.graphics.f("#AB9D94").s().p("AhigGQBiAABjAEIAAADQgmAGgnAAQg7AAg9gNg");
	this.shape_719.setTransform(371.475,100.4841);

	this.shape_720 = new cjs.Shape();
	this.shape_720.graphics.f("#F7EDE3").s().p("AhfAkQgEgBgGgJQgFhsBWAfIASAEIBpARQAKAsgEAkIAAAIIgoABQhXAAhJgXg");
	this.shape_720.setTransform(370.9164,93.2256);

	this.shape_721 = new cjs.Shape();
	this.shape_721.graphics.f("#AA9C92").s().p("AB2AQQiagKiVgNIAAgIQCzAPDAAEIAAAEIgGAAIg4AAIAAAIIgGAAg");
	this.shape_721.setTransform(344.175,84.5);

	this.shape_722 = new cjs.Shape();
	this.shape_722.graphics.f("#B1A29A").s().p("ABmAMQiDgKiAgNICCAAIAGAAQBQAMBjgBIAAAEIgGAAIgrAAIAAAIIgHAAg");
	this.shape_722.setTransform(356.275,76.85);

	this.shape_723 = new cjs.Shape();
	this.shape_723.graphics.f("#A89C94").s().p("AATAEIgrAAIAAgHQAYAAAYADIABAEIgGAAg");
	this.shape_723.setTransform(344.175,59.15);

	this.shape_724 = new cjs.Shape();
	this.shape_724.graphics.f("#BAAEA6").s().p("AhAgJQBQAOArgFIAGgBQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAABQgaAHgZAAQgoAAglgTg");
	this.shape_724.setTransform(353.775,60.5442);

	this.shape_725 = new cjs.Shape();
	this.shape_725.graphics.f("#7E6956").s().p("ABvAeIgGAAIAAgEQgZgEgYAAIAAAIIgHAAIgGAAIgwAAIAAAIIgGgBQgygVhFgCIgGAAIgZAAIAAgEQg1AJgagQIgBgqQA+AGBQAAIAHgBQClAJCpAMIAAAEQAAABAAAAQAAABgBABQAAAAAAABQAAAAgBAAQgNAFgEAOQgCAMAPgDIAGgBIAAAIIAAAIIgGAAQgNACgQAAQgmAAg6gKg");
	this.shape_725.setTransform(336.125,56.5878);

	this.shape_726 = new cjs.Shape();
	this.shape_726.graphics.f("#BCB4AF").s().p("ABHAMQhEgKhQACIAAgHIAAgIQBRAMBDgMIAHAAIAAAIIAAAHIAAAIIgHAAg");
	this.shape_726.setTransform(368.075,59.95);

	this.shape_727 = new cjs.Shape();
	this.shape_727.graphics.f("#BEB5AF").s().p("AAyAIQg3gBgygHIAAgHIASAAIAHAAQA1ADAbgCIAGgBIAAAHIAAAIIgGAAg");
	this.shape_727.setTransform(370.25,51.5);

	this.shape_728 = new cjs.Shape();
	this.shape_728.graphics.f("#C3B4A9").s().p("AASAkQhhgChxgPQBtALBEggQAYgMgVgWQA/AEBCAAQBTgBgJAsQAHAZgTAAIhaABIhHgBg");
	this.shape_728.setTransform(417.5175,76.1625);

	this.shape_729 = new cjs.Shape();
	this.shape_729.graphics.f("#B3A59E").s().p("AgJAbIAAgEQgPAAADgMQAgAEgNgkIgBgHQAMAAAEAJQAWAwgeAAQgFAAgJgCg");
	this.shape_729.setTransform(418.4156,92.2585);

	this.shape_730 = new cjs.Shape();
	this.shape_730.graphics.f("#B0A89C").s().p("Ag3AYQATgXgGgYIAAgIIAGAAQAhAKAvgCQgOAXAaAQQgDAAgDABQggAPgdAAQgXAAgVgIg");
	this.shape_730.setTransform(415.55,100.6424);

	this.shape_731 = new cjs.Shape();
	this.shape_731.graphics.f("#B6A99F").s().p("Ah4ATIANAAQBXAGBDgOIgHAAQhygBhsgWQBYgHC4gFIAAgEQBTAThlAFIgPgEQA+AWBAANIgGAAQgvACgsAAQhsAAhigKg");
	this.shape_731.setTransform(407.8,84.2128);

	this.shape_732 = new cjs.Shape();
	this.shape_732.graphics.f("#DCCFC5").s().p("AG4BnQn1gCnUgiIgBhDQBfgJB3ALQCRAOBzgCQh6gQiEAAQh8AAhggeIgBhBQAUgJApAJQAjAIAmAAQCVAOCbAKIAGAAQExAPEuARIAHAAIABAIQANAjghgEQgCANAOgBIAAAEIgGABQixACikgLQAuAiBaAAICVgBIABAIQAGAZgTAXIgGAAgACgBPIAAgEQhjgEhiAAQBkAWBhgOgAgyAfQAGAJAFABQBXAcBwgGIABgIQAEgkgLgsIhpgRIgTgEQgTgHgOAAQgzAAAEBUg");
	this.shape_732.setTransform(365.3835,92.7251);

	this.shape_733 = new cjs.Shape();
	this.shape_733.graphics.f("#C1B2A6").s().p("AgngEQAnAAAoAEIABADIgHAAIgZACQgdAAgTgJg");
	this.shape_733.setTransform(385.45,77.7526);

	this.shape_734 = new cjs.Shape();
	this.shape_734.graphics.f("#E3D5CB").s().p("AFFA8IgNgBIgGAAQijgCifgGIAAgEQjBgFizgPIgHAAIh+gHIgBhOICYACIAAgEIELAMIAAAEIgGAAIiCAAQCAAOCDAKIAHAAQD6ALDwAUIAGAAIAAAEQi5AGhYAGQBsAXB0ABIAGAAQgxAKg6AAQgYAAgYgBgAmXgoQBnAAhngEgAlTg0QAPANAjgEIAMgBQAAgKgfAAIgfACg");
	this.shape_734.setTransform(364.475,80.1776);

	this.shape_735 = new cjs.Shape();
	this.shape_735.graphics.f("#C0AFA5").s().p("AgYgEQAYAAAYAEIABADIgGABIgQABQgSAAgJgJg");
	this.shape_735.setTransform(399.425,71.3426);

	this.shape_736 = new cjs.Shape();
	this.shape_736.graphics.f("#CDBEB2").s().p("AAfAIQgkgEgfgLQArgCAdAMQABABAAAEIgGAAg");
	this.shape_736.setTransform(392.575,64.3805);

	this.shape_737 = new cjs.Shape();
	this.shape_737.graphics.f("#D6CBC2").s().p("AgegEQAeAAAfAEIAAADIgGAAIgUACQgWAAgNgJg");
	this.shape_737.setTransform(383.275,68.9026);

	this.shape_738 = new cjs.Shape();
	this.shape_738.graphics.f("#B7A99E").s().p("AmmCDIAAgIQBIAEBLABIAGAAIAAAEIiZgBgAFfBgQl7gemLgUIAAgOQByAJB/AIQDYAODfAJQATAOAlgGIAHAAIBjAAIAGAAIAAAIIgGAAIg+AAIAAAIIgGAAgAmngWIAAgVQAaARA1gKIAAAEIgGAAIgTAAIAAAIQgVADgQAAIgRgBgAmohVIAAgkQAHAGAJgOQAGgJAJAaQAXABAzAGIAGABIAAAEQgYAEgZAAQAhAOA2gCIAAAEIgHAAIgSABQhFAAg3gGg");
	this.shape_738.setTransform(354.4375,61.2093);

	this.shape_739 = new cjs.Shape();
	this.shape_739.graphics.f("#F7F0EA").s().p("AFPA8IgGAAIhRAAIAAgEQgogEgpAAIgGAAIhXAAIAAgEQhiABhRgNIAAgEIkLgMIgGAAQhKgChIgEIgBhMQGLAUF6AeIAGABIA+AAIAHAAQAMAMAfgEIAGAAIAyAAIAGAAQAMAMAggFIAGAAIAfAAIAGAAQAWAWgZAMQgyAZhJAAQgZAAgdgDg");
	this.shape_739.setTransform(364.6524,72.0861);

	this.shape_740 = new cjs.Shape();
	this.shape_740.graphics.f("#C1B1A4").s().p("AgYgEQAYAAAYAEIABADIgGABIgQABQgSAAgJgJg");
	this.shape_740.setTransform(409.975,72.1426);

	this.shape_741 = new cjs.Shape();
	this.shape_741.graphics.f("#CFBEB4").s().p("AgwACIAAgHQAwAAAyAEIAAADIAAAEQgpgIg5AEg");
	this.shape_741.setTransform(401.9,69.825);

	this.shape_742 = new cjs.Shape();
	this.shape_742.graphics.f("#D0C0B5").s().p("AgXALQgVgMgXgKQA6ANBHgFIAGAAIAAADIhVAMIgGgBg");
	this.shape_742.setTransform(403.125,66.4);

	this.shape_743 = new cjs.Shape();
	this.shape_743.graphics.f("#F8F3EE").s().p("AHBA4IAAgEQgxgEgyAAIgGAAIhjAAIgBgEQgegEggAAQjegIjZgOQh/gIhygKIAAg2QATAEAjgFIAyAAIAGAAQA5AUBKAAIAAgEQAZAAAYgEIAAgEIAHAAIArAAIAGAAIAGAAQA9AgBFgUQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAgBQBPgCBFAKIAGAAQAOA3BGgeQAPgGAfAFQAfALAmAEIAGAAQAXALAVAMIAGABIBWgMIAAgEQAHAAACADQAEAFgBAAIgUADQA+AThOACIAAAIIgHAAg");
	this.shape_743.setTransform(361.9431,64.375);

	this.shape_744 = new cjs.Shape();
	this.shape_744.graphics.f("#C7B8AC").s().p("AiOATIAAgIQBOgCg9gSIATgDQABAAgEgFQgCgDgGAAIAAgIQBvAVBVgJIALgBQAGgRAiAGQAAAEACADQAOAmgigGQAGANAZgBIAAAEQgvAEgcAAIgKAAQh+AAhKgMg");
	this.shape_744.setTransform(421.775,68.1477);

	this.shape_745 = new cjs.Shape();
	this.shape_745.graphics.f("#624D3A").s().p("Aj8AAQgHgBgGgEIAAgIQAFgPAsgEQB8gJBpAcQAJgNAdABIAAgEQBzgBBHAgIgCADQgKARASgDQAtAKgtAFIgGABQjtgJj8gag");
	this.shape_745.setTransform(402.425,60.9155);

	this.shape_746 = new cjs.Shape();
	this.shape_746.graphics.f("#835931").s().p("AgSgBQBNAAhNADg");
	this.shape_746.setTransform(419.35,54.9475);

	this.shape_747 = new cjs.Shape();
	this.shape_747.graphics.f("#8B5D24").s().p("AAAA9QgDgxAAgvIAAgIIAAgRQAKANgEAcIgBAIIAABAIAAAIg");
	this.shape_747.setTransform(420.9033,43.05);

	this.shape_748 = new cjs.Shape();
	this.shape_748.graphics.f("#A69C98").s().p("AADA4QgDg6gLg2IAGAAQAQApABA3IAAAIIgGAAIAAAJIgDgBg");
	this.shape_748.setTransform(409.975,41.05);

	this.shape_749 = new cjs.Shape();
	this.shape_749.graphics.f("#D1C7C1").s().p("AAfBYQgrg1gUh0QAsgXAFA3IAAAIIgGAAQANA1ADA7IACAAIAEAQIAAAAIgBACIgBgBg");
	this.shape_749.setTransform(407.65,39.5774);

	this.shape_750 = new cjs.Shape();
	this.shape_750.graphics.f("#BDA9A0").s().p("AgZALQAAgEgCgBQgIgJAEgYQAUApgBgyIAAgIQAIAOAGASQAAAAAAAAQAAAAABAAQAAAAABAAQABABAAAAQAIANAMAIQACABADAAIADAAQgBAhgPAAQgPAAgbghg");
	this.shape_750.setTransform(400.1221,18.15);

	this.shape_751 = new cjs.Shape();
	this.shape_751.graphics.f("#DBA890").s().p("AgOAAIgBgDQAjAHgFAAIgdgEg");
	this.shape_751.setTransform(404.7188,15.7327);

	this.shape_752 = new cjs.Shape();
	this.shape_752.graphics.f("#826250").s().p("AAEAPQgLgJgHgNIAAgIQAIAPAVAEIAAAEIgGAAIAAAIQgCAAgDgBg");
	this.shape_752.setTransform(402.2,17.7);

	this.shape_753 = new cjs.Shape();
	this.shape_753.graphics.f("#845948").s().p("AghgKIAAgIQAhgGgTgjQgCgDAAgEQALgOAIAGQAEAEADAAQAOgCAPBGQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgWAiABAcQgDAEgBAFIgCAHIgkhXg");
	this.shape_753.setTransform(410.275,19.647);

	this.shape_754 = new cjs.Shape();
	this.shape_754.graphics.f("#E8AE94").s().p("AAHAfQgLgRANgJQgrAKABgxIBCAUQABAAAAAAQAAAAAAABQAAABAAAAQAAABAAABQgMAtgJAAQgDAAgDgEg");
	this.shape_754.setTransform(404.0747,9.143);

	this.shape_755 = new cjs.Shape();
	this.shape_755.graphics.f("#A18C63").s().p("AgDAcIAAg/IAFAAIABAIQAEAngKAYIAAgIg");
	this.shape_755.setTransform(420.9033,5.225);

	this.shape_756 = new cjs.Shape();
	this.shape_756.graphics.f("#B58347").s().p("AgGgQQATgkgJA6QgDAZgCAAQgEAAgBgvg");
	this.shape_756.setTransform(379.6623,45.1645);

	this.shape_757 = new cjs.Shape();
	this.shape_757.graphics.f("#9F7449").s().p("AgDAkIAAhPIAGAAIAAAIQAEAvgKAgIAAgIg");
	this.shape_757.setTransform(381.7903,43.875);

	this.shape_758 = new cjs.Shape();
	this.shape_758.graphics.f("#FCFBF6").s().p("AgQAkIAAgEQhBgCAPhBQAygEBPAEIAHAAIAAA/IAAAIIgHABIgdABIgygCg");
	this.shape_758.setTransform(368.8669,47.0693);

	this.shape_759 = new cjs.Shape();
	this.shape_759.graphics.f("#C18542").s().p("AgFANIAGgzQAGAYgBAjQgBASgCAAQgDAAgFgag");
	this.shape_759.setTransform(380.1321,36.5715);

	this.shape_760 = new cjs.Shape();
	this.shape_760.graphics.f("#FCFBF7").s().p("AhKgkQBCgJBMARIAGAAIABAIQAEAjgLAVQgIgKgSAFQghAJgXAAQhFAAAJhMg");
	this.shape_760.setTransform(369.025,38.2597);

	this.shape_761 = new cjs.Shape();
	this.shape_761.graphics.f("#CDA261").s().p("AgFANQgCgTAAgUQAcAqgVALIgBAAQgEAAAAgOg");
	this.shape_761.setTransform(359.8949,43.7364);

	this.shape_762 = new cjs.Shape();
	this.shape_762.graphics.f("#FDFBE8").s().p("AhZAJQBKgJgygZQgFgCASACQAcADAbAAIANAAIAGAAQANAfA3AAQAAABAAABQAAABAAAAQAAABgBAAQAAAAAAAAQguAOgqAAQgvAAgrgSg");
	this.shape_762.setTransform(343.85,49.0034);

	this.shape_763 = new cjs.Shape();
	this.shape_763.graphics.f("#877875").s().p("ABtBnIgHAAIgMAAIAAgEQg1gEg0AAIgGAAIgZAAIAAgEQhEgFhEAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBgBAAAAQgXgcAJg6IAAgIIAAg4QAJg0AEATQANBHAaA+QAEAIgGALQAZgOgDgiQAAgEgEgDIAOgyQACACADAAQAQABAEAoQAAACAFAJQANAZACghIAEAEQAkAQABAHIAEgDQAUgPAMAKQAygJgzgMQgHgCgKAAQAngJAUgcQACgDAHAAQAHAlA2AVQAPAGAEgoQANgRAZAhIAEgFQANgSAHgZQAPBTgIBNIgHAAIgjABIgzgBg");
	this.shape_763.setTransform(335.1907,36.4091);

	this.shape_764 = new cjs.Shape();
	this.shape_764.graphics.f("#9F9292").s().p("AiSCNQgag+gOhHQgEgSgIAyIAAgIIAAhgQAGgzAJgtIADAIQAGA5AUAfIAFAIQArARAjAPQADABAAAIQA2AGg8ARIAEgDQALgIgPgEQgTAdAUAIQAFADAGgBQBCAAAtgXQALgFgFgTQAfANAcA2IADgDQgDgmAkgPQAbgMAPgoQAKAZgEBQQgHAZgOASIgEAEQgZgggMARQgFApgPgHQg2gVgHglQgGAAgCACQgVAdgmAIQAJABAIACQAzANgyAJQgMgKgVAPIgEADQAAgHglgSIgDgDQgDAigNgZQgFgKAAgCQgEgpgPAAQgEgBgCgBIgNAxQADAFAAAEQAEAhgaAPQAGgLgDgJg");
	this.shape_764.setTransform(334.9175,25.75);

	this.shape_765 = new cjs.Shape();
	this.shape_765.graphics.f("#C7A669").s().p("AgFgnQAUAkgNAkIgBAHQgKggAEgvg");
	this.shape_765.setTransform(360.8619,10.475);

	this.shape_766 = new cjs.Shape();
	this.shape_766.graphics.f("#F9E9E9").s().p("AgMAFQgBgEgDgDQBAgZg6Aog");
	this.shape_766.setTransform(346.4912,13.2383);

	this.shape_767 = new cjs.Shape();
	this.shape_767.graphics.f("#AE7B39").s().p("AgCggIAAgIIAAgIIAAgnQAKBMgFBcIAAAHQgKg0AFhEg");
	this.shape_767.setTransform(378.625,29.8);

	this.shape_768 = new cjs.Shape();
	this.shape_768.graphics.f("#FCD9A4").s().p("AgBAnQgCgDAAgEIAAgIIAAg/QAKAEgEAUIgBAIIAAAnIAAAIQgBAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAAAg");
	this.shape_768.setTransform(378.0938,21.725);

	this.shape_769 = new cjs.Shape();
	this.shape_769.graphics.f("#9E8056").s().p("AABArQgDgDgDgEIAAgIIAAgfQAKgEgEgUIgBgIIAAgIQADAEACAEQABAEAAAEIAAA/IAAAIQgDAAgCgBg");
	this.shape_769.setTransform(377.075,20.525);

	this.shape_770 = new cjs.Shape();
	this.shape_770.graphics.f("#F9F6F4").s().p("AhMgCQAZggAXgrQADgFABAJQADATAfgUQAZAbATgKIgCAPQgFAyAZgSQAJAegIAqIgBAIQgOABgWAEQgXAEgRAAQhOAAAGhRg");
	this.shape_770.setTransform(369.2035,26.0042);

	this.shape_771 = new cjs.Shape();
	this.shape_771.graphics.f("#D5A870").s().p("AgGEdQgmgPgFgxIAAgIIAAhAIAAgIIAAgIQAKgVgEgkIAAgIIAAgIIAAgQIAAgIQAJgogJgfIAAgIQADAEAEACQACACADAAQAAAEACACQABABAAAAQAAAAABAAQAAABABAAQABAAAAAAIAAAIQgEBDALA1IAAgIQAEhdgLhLIABgIQAEgUgLgFQAAgEgBgDQgCgFgDgEIAAgIIAAhQQAMAtABgVQACg3AKgqIAGAAIAABhIAAAIQAIguADgzIAAgIIAHAAQAAA1ADA0IADAAIAAAIQAGA7gMBGIAACQIAAAIIgHAAIAABQIAAAIIAAAIIAAAIQADAEAEAAQAvACgvAaQgIANAlAEQAeAEhHAUIgGgBgAgSCVQACBSAJg7QAGglgGAAQgDAAgIAOgAgMBdQAKAwABgoQABgkgGgYg");
	this.shape_771.setTransform(380.8558,28.575);

	this.shape_772 = new cjs.Shape();
	this.shape_772.graphics.f("#FCEBAA").s().p("AgFAsIAAhfIAFAAIAGAAIAAAIQgDAxgIAuIAAgIg");
	this.shape_772.setTransform(380.775,5.225);

	this.shape_773 = new cjs.Shape();
	this.shape_773.graphics.f("#EFDEB2").s().p("AgMAVIAAgIQAMgUgFgkIAAgIIAMAAIAFAAQgJAqgCA2QAAAHgBAAQgDAAgJgfg");
	this.shape_773.setTransform(378.3,5.1591);

	this.shape_774 = new cjs.Shape();
	this.shape_774.graphics.f("#FDFDFA").s().p("Ag+BKIgDAAIgQigICaAAIAHAAIAAAIQAEAkgLAVIAAAIIAABPIAAAIIAAAIQgSgBgIABQgYAFgWAAQgkAAgbgNg");
	this.shape_774.setTransform(369.7033,8.675);

	this.shape_775 = new cjs.Shape();
	this.shape_775.graphics.f("#FCFBEB").s().p("AgGAvQgSgZADhFIAlAAIAGAAIAAAIQgCA2gWAhQgBAAAAAAQgBAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_775.setTransform(358.103,4.825);

	this.shape_776 = new cjs.Shape();
	this.shape_776.graphics.f("#DFCCB1").s().p("ACtESQipgMilgJIAAgEQg2ACghgOQAZAAAYgEIAAgEQBBALAZgbIgDAAIAAgIQAqgGgVgNQgCgBAAgEQA1AAAzAEIAAAEQgaAAgcgDQgTgCAFADQAyAahKAIQBRAiBhgdQAAAAABgBQAAAAAAgBQAAAAAAgBQAAgBAAgBQg3AAgNggQA8ACAbgCIAGAAQAIhMgOhVQAEhPgKgZQgPAogbAMQgkAQADAkIgDAEQgcg2gegNQAFATgLAGQgtAVhDABQgGAAgFgCQgUgIATgdQAPAEgLAJIgEADQA8gSg2gGQAAgIgDgCQgjgPgrgQIgFgIQgUgfgGg5IgDgIQgJAsgGA0IAABgIAAAIIAAA4IAAAIIgDABQgHBBgWAMIgBjeIgNAAIgEgQIAAAQIgEAAQACg5gEg/IAAgIIAAgIQADgegJgrQAAAAABAAQABAAAAAAQABAAAAgBQAAAAABAAQACgDAAgEIAMAAIAGAAQAMBRAUg8IAAALQACAZAKgpQAEBsACh0IAAgIIBjAAIAHAAQAAAEgCADQgFAFgGAEIApA/QAXAjAdgZQAjArAiAFIAGAAQAaglA1gOQAEgBADgEQAWgfgKgyIAfAAIAGAAQgDBHASAYQAAABAAAAQABAAAAAAQABABAAAAQABAAABAAQAXgiACg3IAAgIIAGAAIAGAAIAQChIADAAQAsAUBCgMQAIgBASABIABAIQAEAUgLAEIAAAhIAAAIIAAAIQgZASAFgzIACgOQgTAJgZgbQggAUgDgTQgBgIgDAFQgXAqgZAhQgIBkB5gYQAWgEAOgBIAAAQIAAAIIgGAAQhNgRhCAJQgMBnCBgjQASgFAIAKIAAAIIAAAIIgGAAQhRgEgyAEQgOBCBAACIAAAEIgGAAIgTAAIAAAIQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAAAAAQgMAdgcALgACiCtQABAPAFgCQAWgKgegrQAAAUACAUgAkwh0QgEAvAEgJQARgrgIAAQgDAAgGAFgAlJiMIAAAQIAAAIQAqgmgehKIgDAAQAJA3gSAhgACziEIABgHQANglgUgkQgFAwALAggAASiUQADAEABAFIACAHQAkgZgLAAQgHAAgYAJg");
	this.shape_776.setTransform(343.0283,27.775);

	this.shape_777 = new cjs.Shape();
	this.shape_777.graphics.f("#FCF8F4").s().p("AAaBEQghgEgigsQgeAZgXgjIgog9QAGgFAEgFQACgDAAgEID3AAIAHAAQAKAygXAeQgDAEgEABQg1AOgbAlIgGAAg");
	this.shape_777.setTransform(339.0538,6.85);

	this.shape_778 = new cjs.Shape();
	this.shape_778.graphics.f("#F5E1A9").s().p("AgGCNIAAhIIAAgIIAAh5QAKgYgEgoIAAgIIAAgIIAAgIIAFAAIABAIQAEBdgKBLIAAAIIAAAIIAAAIQAEA5gKAoIAAgIg");
	this.shape_778.setTransform(421.2153,14.9);

	this.shape_779 = new cjs.Shape();
	this.shape_779.graphics.f("#3E2B24").s().p("ACPEGQg2ADABgvIAAgBQAAgLADgNIAAgIQgBg4gSgpIAAgIQgFg3gsAYQgWAvAdA5QAdA6gLAmIAAAFQh5gLh4gRIAAgIIAAhJQAKhKANgnQABgDAAgFQAhgPAWgXQAFgFAPAEQASgcAYgVIAHgIQA3BCAEhCIgEAAIAAgHIAGAAIAaAAIAGAAIAlBXIACgHQABgEADgEQgBgcAWgjQAAAAABgBQAAAAAAAAQABAAABAAQAAgBABAAQgPhFgOACQgEAAgFgEQgHgGgLANIAAgIIAAgQQAMgsAMg0IABgJIBjAAIAGAAIAAAJIAAAIIgGAAIAABAIAAAIIAAB5IAAAIIgGAAIAACoIAAAIIAEAnQAKBVgzAMg");
	this.shape_779.setTransform(401.9,26.55);

	this.shape_780 = new cjs.Shape();
	this.shape_780.graphics.f("#E9B599").s().p("AgdgVIAwAAIAHAAQAXAlg1AGIgFAAQgeAAAKgrg");
	this.shape_780.setTransform(404.9289,2.2154);

	this.shape_781 = new cjs.Shape();
	this.shape_781.graphics.f("#BB866D").s().p("AAWBdIgYAAIgBgFQgWgEgIgPIAAAIQgBAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQgGgSgJgOIAAgIQgCgTgKgNQAtgngTgxIgBgIIAMAAIAGAAQgLAxAkgEQA2gGgYgnIAZAAIAGAAIgBAJQgMA0gMArIAAAQIAAAIQAAAFACACQATAjghAHIAAAIIgGAAgAgIBAQA9ALg9gOIAAADgAAHAeQAMASAPg7QAAgBAAgBQAAgBAAAAQAAgBAAAAQAAAAgBgBIhCgTQgBAxArgKQgNAIALASg");
	this.shape_781.setTransform(404.075,9.25);

	this.shape_782 = new cjs.Shape();
	this.shape_782.graphics.f("#543224").s().p("AgOAGQASABgFgYIgBgIIALAAIAGAAIgBAIQgLArgIAAQgFAAgEgUg");
	this.shape_782.setTransform(397.25,2.6321);

	this.shape_783 = new cjs.Shape();
	this.shape_783.graphics.f("#775342").s().p("AhgDyIAAgIQALghgEgwIAAgIIAAgIIAAiQQAMhGgGg7IAAgIIAAgIIAAgIQALghgFgvIAAgJICBAAIAHAAIABAJQAGAZgUgBQAKAyAUhKIABgJIAGAAIAHAAIABAIQATAxgtAoQAKANACATIAAAIIAAAIQABAzgTgqQgFAYAJAKQACABAAAEIgHAIQgZAVgSAbQgOgDgFAEQgWAYggAPQAAAFgCADQgMAngLBKIAABJIAAAIQgDAAgCABQgFACgDAEIAAgHg");
	this.shape_783.setTransform(391.057,24.95);

	this.shape_784 = new cjs.Shape();
	this.shape_784.graphics.f("#C3A279").s().p("AgDAkIAAhPIAGAAIAAAIQAEAvgKAgIAAgIg");
	this.shape_784.setTransform(383.0403,4.425);

	this.shape_785 = new cjs.Shape();
	this.shape_785.graphics.f("#FEEAB3").s().p("AAAA0QgCg0AAgzIAFAAIAABPIAAAIIAAAIIAAAIg");
	this.shape_785.setTransform(382.35,5.225);

	this.shape_786 = new cjs.Shape();
	this.shape_786.graphics.f("#B4A38F").s().p("AguA7QAEhHAYg3QAAAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQAYAegbANQgBABgCgEQgFA1AQgWIAEAHQAAABAAAAQAAAAABAAQAAAAABAAQAAAAABAAQASANATAJQAGACAFAAQgfAXgqAKIgIABQgKAAgBgKg");
	this.shape_786.setTransform(488.5,54.4079);

	this.shape_787 = new cjs.Shape();
	this.shape_787.graphics.f("#A29082").s().p("AgZAXQgIgJAAgPIAAgYQBDgiAAAyIAAAIQgNApgUAAQgLAAgPgRg");
	this.shape_787.setTransform(475.475,50.9185);

	this.shape_788 = new cjs.Shape();
	this.shape_788.graphics.f("#93877C").s().p("AhTAQQBLgcBcgHIAAAEQhRAWhWANg");
	this.shape_788.setTransform(489.725,41.85);

	this.shape_789 = new cjs.Shape();
	this.shape_789.graphics.f("#A08F80").s().p("AgjATQgCgDAAgEQAQhQAyAwQACACAFANQAIASgaAHQgSATgNAAQgOAAgIgUg");
	this.shape_789.setTransform(475.8205,42.2848);

	this.shape_790 = new cjs.Shape();
	this.shape_790.graphics.f("#B3A091").s().p("AgLAIQgKAAAEgPQA9APgrAAIgMAAg");
	this.shape_790.setTransform(465.7609,28.1895);

	this.shape_791 = new cjs.Shape();
	this.shape_791.graphics.f("#B6A89B").s().p("ABdgeIAGgBQheA4hnAHQBfggBggeg");
	this.shape_791.setTransform(454.675,17.725);

	this.shape_792 = new cjs.Shape();
	this.shape_792.graphics.f("#B8A89B").s().p("AhfBLQgZgLgEgkQBJgWgCA+QAAAPgPAAQgKAAgRgIgAA9gcQAPhTAtArQAIAIgGANQgPAagjAFIgDAAQgIAAgBgMg");
	this.shape_792.setTransform(441.7457,54.3517);

	this.shape_793 = new cjs.Shape();
	this.shape_793.graphics.f("#715E51").s().p("AgxAHQAogGAcgQIAGgBQAMAAALAEQABAAAAAAQAAAAAAABQABAAAAABQAAABAAABIgGABQghAMgjAKIgGABIgHABQgLAAgBgKg");
	this.shape_793.setTransform(460.875,33.0971);

	this.shape_794 = new cjs.Shape();
	this.shape_794.graphics.f("#B6A497").s().p("AhfAAQAygMAvgQQABAAAAgBQAAAAABgBQAAAAAAgBQAAgBAAgBQAkgKAggNIAGgBQAGAAABACIACAGQAMAEgFACQhHAUgrAmQgGAAgBACQgCAGgDADQgbAggPAAQgVAAAAg6g");
	this.shape_794.setTransform(458.0006,37.964);

	this.shape_795 = new cjs.Shape();
	this.shape_795.graphics.f("#B1A295").s().p("AhIgCQAhgbAEAeIAJgLIAWgZQBMgMgqAQQgKAEgNAAQgTATAsAAQAPAAAPgKIAJAFQAIAGgKAMIgFABQgeAQgmAHIgGABQgYALgQAAQgdAAAHgrg");
	this.shape_795.setTransform(456.4422,30.9391);

	this.shape_796 = new cjs.Shape();
	this.shape_796.graphics.f("#5F5A57").s().p("AgFAPQAMhJgBBBQAAARgEAAQgCAAgFgJg");
	this.shape_796.setTransform(440.3287,45.161);

	this.shape_797 = new cjs.Shape();
	this.shape_797.graphics.f("#B3813D").s().p("AgLAuIAAgIIAAhYQAGAYANAPQAAAAABAAQAAABABAAQAAAAABAAQABAAAAAAIAAAIQgCA1gMAAQgEAAgFgFg");
	this.shape_797.setTransform(423.625,45.3186);

	this.shape_798 = new cjs.Shape();
	this.shape_798.graphics.f("#DFB46B").s().p("AglBnIAAgIIAAhBQALgMgEgbIgBgIQALgxgBhAIADAAQgCANAOgEIAGgBIAABxIAAAIQAKgvACg6IAAgIQAgAJgHBRQgHBOgegIIAAAIQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgOgPgGgYIAABZIAAAIQAAAEgCADQgFANgDAAQgFAAACgcg");
	this.shape_798.setTransform(424.9113,38.82);

	this.shape_799 = new cjs.Shape();
	this.shape_799.graphics.f("#FBE69F").s().p("AgGA5IAAhwIAAgIQAOgEgCAMIAAAIIAAAIQgCA5gKAvIAAgIg");
	this.shape_799.setTransform(425.507,32.1404);

	this.shape_800 = new cjs.Shape();
	this.shape_800.graphics.f("#634F3B").s().p("AgTgnQA+gCgkBKQgCADAAAEQgSgrgGgkg");
	this.shape_800.setTransform(429.3445,26.5735);

	this.shape_801 = new cjs.Shape();
	this.shape_801.graphics.f("#B7A79D").s().p("AAKAeIgLgBQgvADAQg6QA9gTAIBDQABAJgOAAIgOgBg");
	this.shape_801.setTransform(433.1506,34.1236);

	this.shape_802 = new cjs.Shape();
	this.shape_802.graphics.f("#FCE19A").s().p("AgFBIIAAiXIAFAAQAAAEACACQABABAAAAQAAAAABAAQAAABABAAQABAAAAAAIAAAgIAAAIIgDAAQACA/gKAwIAAgIg");
	this.shape_802.setTransform(422.375,28.975);

	this.shape_803 = new cjs.Shape();
	this.shape_803.graphics.f("#B48C50").s().p("AAABpQAEgcgKgNIAAARIAAAIIgFAAIAAgIIAAioIAFAAIABBIIgBAIQAKgogEg5IAAgIIAGAAIAGAAIAAAIIAAAJIgGAAIAACXIAAAIIABAIQAEAcgLANIAAgIg");
	this.shape_803.setTransform(421.15,30.575);

	this.shape_804 = new cjs.Shape();
	this.shape_804.graphics.f("#DBBB90").s().p("AADAkQABgXgKgJIAAgHIAAggQAPAXgDAoIAAAIg");
	this.shape_804.setTransform(428.6174,4.425);

	this.shape_805 = new cjs.Shape();
	this.shape_805.graphics.f("#DCCCBF").s().p("AgcAWIACgDQAMgOgagGQAcgsAUAAIABAAQATABgUAjQAKAYAXALQgVAUgRAAQgSAAgNgYg");
	this.shape_805.setTransform(445.775,13.0648);

	this.shape_806 = new cjs.Shape();
	this.shape_806.graphics.f("#D3BB92").s().p("AgEglIAFAAQAAAYADAXIADAAIAAAQIAAAMIAAAAQgRAAAGhLg");
	this.shape_806.setTransform(427.275,3.8252);

	this.shape_807 = new cjs.Shape();
	this.shape_807.graphics.f("#B99D7D").s().p("AgCA0IAAgIIAAgIQABAAAAAAQABAAAAAAQAAgBAAAAQABAAAAgBQACgCAAgEIAAgIQADgpgPgXIAAAgIAAAJIgCgBQgEgYAAgYIAYAAIAHAAQgBAEgBAEQgCAEgDAEIAGBAIABAIIgEAAQACARgMAAIgEgBg");
	this.shape_807.setTransform(428.9,5.2516);

	this.shape_808 = new cjs.Shape();
	this.shape_808.graphics.f("#DDCDC0").s().p("AgYBWQgUhOAFhgIAGAAIAGAAQAEAEAAAFQAHAqAIAeQAFAKARgHQAHgDABAVIgCAGQgLAcAHAZQAIgQAOALQANAKhBALQgJAAgBgDg");
	this.shape_808.setTransform(435.0563,8.85);

	this.shape_809 = new cjs.Shape();
	this.shape_809.graphics.f("#FBF3C9").s().p("AgRAOQALgYgEgoIgBgIIAHAAQgGBMARAAIAAgMIAAgPQALAIgCAXIADAAQAAAEgCACQAAAAgBABQAAAAAAAAQgBAAgBAAQAAABgBAAIAAAIIAAAIIAAAIQgDAAgCABQgIAEgEAAQgSAAAFgtg");
	this.shape_809.setTransform(427.2951,5.8914);

	this.shape_810 = new cjs.Shape();
	this.shape_810.graphics.f("#EEE5B5").s().p("AgcBrQgCgCAAgEIAAgJIAAgIIAAgIIAAiYQAKgEgDgUIgBgIIAYAAIAGAAIAAAIQAFAogLAZQgGA5AfgRQADgBADAAQAAABAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgqAMgMAoIAAApIAAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBg");
	this.shape_810.setTransform(425.5,10.875);

	this.shape_811 = new cjs.Shape();
	this.shape_811.graphics.f("#C1B075").s().p("AgDBgIgGAAIAAgHIAAgIQAKhNgEhbIAAgJIAFAAIAGAAIABAJQAEATgLAFIAACYIAAAHIgFAAg");
	this.shape_811.setTransform(422.1688,9.65);

	this.shape_812 = new cjs.Shape();
	this.shape_812.graphics.f("#7B554B").s().p("AghgDQBAgGADAMIgMACIgSABQgYAAgNgJg");
	this.shape_812.setTransform(163.2,336.0745);

	this.shape_813 = new cjs.Shape();
	this.shape_813.graphics.f("#110808").s().p("AnWAVQCKgfDYgKQCPgGChgPQCUgOB1gNQAXgDgJAUQAMAlgZAEQgzAOgqgNIgGgBQhDAKg/ANQgsAAgTgHIgGgBQgSAEgRAHQgBABAAAAQAAAAAAABQgBAAAAABQAAABAAABQg3gMg/AUQgjgYgUAgQgegUhIAXQguAOgmgRQgSAIgTAHIgGABQg5gHhKAJQgUACAUAMQgzgBgFgvg");
	this.shape_813.setTransform(132.9723,346.4111);

	this.shape_814 = new cjs.Shape();
	this.shape_814.graphics.f("#6D5D47").s().p("AgBASQgOgHgBgVQAzgZgcA0QAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAIgEgBg");
	this.shape_814.setTransform(145.94,309.3836);

	this.shape_815 = new cjs.Shape();
	this.shape_815.graphics.f("#756448").s().p("Ag1AlQgCgBAAgIQA3ADAFhEQACgXAeAQQAdAqgQA2Qg4AAgvgPg");
	this.shape_815.setTransform(163.5126,310.3347);

	this.shape_816 = new cjs.Shape();
	this.shape_816.graphics.f("#7C5850").s().p("AhhAHQgEgDgHAAIAAgHIDSgIIAHAAQhlAMhnALQAAgEgCgBg");
	this.shape_816.setTransform(148.925,337.65);

	this.shape_817 = new cjs.Shape();
	this.shape_817.graphics.f("#87655B").s().p("AhKAAQA7gKBHADIAGAAQAGAAAFADQACABAAADIgHAAIiOAIIAAgIg");
	this.shape_817.setTransform(131.85,338.8179);

	this.shape_818 = new cjs.Shape();
	this.shape_818.graphics.f("#7D5B52").s().p("AiEAFQCEgFCAgKIAFAAIAAAIIgFABQhRAMhOAAQgzAAgygGg");
	this.shape_818.setTransform(111.05,339.9261);

	this.shape_819 = new cjs.Shape();
	this.shape_819.graphics.f("#140C0A").s().p("Ar2OyQAAAAAAAAQgBgBAAAAQAAgBAAgBQAAAAAAgBQAiAQgDAAIgegMgA8GHLQgBgIgDgIQAdgMgTAeQgCAEgCAAQgCAAAAgGgAb+ujIgFgaQAXAhgGAAQgDAAgJgHg");
	this.shape_819.setTransform(287.3302,257.5982);

	this.shape_820 = new cjs.Shape();
	this.shape_820.graphics.f("#120D0E").s().p("AgOgBQA6ABg6ACg");
	this.shape_820.setTransform(110.9625,311.7);

	this.shape_821 = new cjs.Shape();
	this.shape_821.graphics.f("#140B0E").s().p("AgGgEQgCgCAAgEIARAVIgPgPg");
	this.shape_821.setTransform(137.1257,311.7935);

	this.shape_822 = new cjs.Shape();
	this.shape_822.graphics.f("#130D0D").s().p("AgJgBQAnABgnACg");
	this.shape_822.setTransform(134.0875,310.1);

	this.shape_823 = new cjs.Shape();
	this.shape_823.graphics.f("#150A09").s().p("AgPAAIAAgEQAkAJgFAAIgfgFg");
	this.shape_823.setTransform(126.6688,316.802);

	this.shape_824 = new cjs.Shape();
	this.shape_824.graphics.f("#7B6B60").s().p("AgRAAIgBgDQAqAHgGAAIgjgEg");
	this.shape_824.setTransform(128.7563,319.1949);

	this.shape_825 = new cjs.Shape();
	this.shape_825.graphics.f("#120C0D").s().p("AHKB+QARgKgOgbQgsgMAsAAQADAAADgEQgOg/gQg5IgBgIQAHg0ABAAQANAFgCAXQgCARAOAHQADgfgGg6IADAAQAZBEgDBkQgDBzgZBFQAAACgHAAQgbhBAfgTgAnojQIAbgBQARAcgHAAQgHAAgegbg");
	this.shape_825.setTransform(183.8908,322.725);

	this.shape_826 = new cjs.Shape();
	this.shape_826.graphics.f("#110C0F").s().p("AgTgGQBCgRguAiIgCACQgHAAgLgTg");
	this.shape_826.setTransform(120.1654,292.851);

	this.shape_827 = new cjs.Shape();
	this.shape_827.graphics.f("#130C0D").s().p("AgtgIQApgNAdAlQAOASABAVIgMgCQgGgCgGgEQgEAXgOgfIgEAEQgNAMgIAYQgKglgIgygAgLgbQgNgGgFgRQgEgKgBgMQAkgTgNArIADgFQAzg8ADBRQgMAmgRguIAEAYQABABAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQgGAAgagOg");
	this.shape_827.setTransform(132.8,301.1066);

	this.shape_828 = new cjs.Shape();
	this.shape_828.graphics.f("#110C10").s().p("AghAeQAHgSgKgPQAnANgnAagAgLAgIAAgEQAZAGgJAAIgQgCgAAMgjQAzgBgzAFg");
	this.shape_828.setTransform(125.0375,295.7725);

	this.shape_829 = new cjs.Shape();
	this.shape_829.graphics.f("#4B3127").s().p("AgGAFQgJgFACgLQAsAWgcABg");
	this.shape_829.setTransform(137.5561,274.85);

	this.shape_830 = new cjs.Shape();
	this.shape_830.graphics.f("#120C0C").s().p("AgGAfQAfgfgsggQAkACACAWQAEApgUAAQgEAAgFgCg");
	this.shape_830.setTransform(107.7842,296.28);

	this.shape_831 = new cjs.Shape();
	this.shape_831.graphics.f("#120B0D").s().p("AACAJQgJgHgDgPQAYAbgEAAQgCAAgGgFg");
	this.shape_831.setTransform(115.5533,291.1225);

	this.shape_832 = new cjs.Shape();
	this.shape_832.graphics.f("#110B0F").s().p("AgEgLQgBgDAAgEIALAlIgKgeg");
	this.shape_832.setTransform(111.9694,298.1114);

	this.shape_833 = new cjs.Shape();
	this.shape_833.graphics.f("#140D09").s().p("AgNABQALgmAOArQAEALgFAAQgGAAgSgQg");
	this.shape_833.setTransform(99.734,293.6647);

	this.shape_834 = new cjs.Shape();
	this.shape_834.graphics.f("#4D2F28").s().p("AgXAAQBegHheAKg");
	this.shape_834.setTransform(106.2625,277.7639);

	this.shape_835 = new cjs.Shape();
	this.shape_835.graphics.f("#816A5B").s().p("AgoAOIAAgQQAVgZA1AJIAGAAQAAABAAABQAAABAAAAQAAABAAAAQAAAAgBAAQgXAEgYAAIAAAIIgGgBQgOgIgMAhIAAgIg");
	this.shape_835.setTransform(103,275.5422);

	this.shape_836 = new cjs.Shape();
	this.shape_836.graphics.f("#7A695F").s().p("Ag0gDIBjAAIAGAAIgBADQgaAEgWAAQgfAAgZgHg");
	this.shape_836.setTransform(104.225,281.3083);

	this.shape_837 = new cjs.Shape();
	this.shape_837.graphics.f("#BCA89C").s().p("AgLAeIhjAAIAAgIIAAgXQALgiAOAIIAGABQADA3BbgcQA8gRAfAcQALAJgLABIgGAAQgkABhFAHIgGAAg");
	this.shape_837.setTransform(110.0875,277.94);

	this.shape_838 = new cjs.Shape();
	this.shape_838.graphics.f("#927164").s().p("AgRAAIAAgHQAZgEAJAMQACADAAAEIgHAAIgGAAIgJABQgMAAgCgJg");
	this.shape_838.setTransform(119.45,272.0957);

	this.shape_839 = new cjs.Shape();
	this.shape_839.graphics.f("#826453").s().p("AgYgDIArAAIAGAAIgBADQgYAEgYAAIAAgHg");
	this.shape_839.setTransform(126.875,272.45);

	this.shape_840 = new cjs.Shape();
	this.shape_840.graphics.f("#A18274").s().p("AhNgHIAHAAQASgNAJALQAAABAAAAQABAAAAAAQAAABABAAQABAAAAAAQAZAAAYgEIAAgEIA/AAIAFAAQgFALgMAGQgbAOgdAAQgmAAgrgXg");
	this.shape_840.setTransform(128.45,273.6787);

	this.shape_841 = new cjs.Shape();
	this.shape_841.graphics.f("#140A09").s().p("AD4DjQAigNAAA1IgDABQgGAEgEAAQgQAAgFgtgAkLj6QgSgCAGgTIB1AMIABAEQgwAGggAAQgPAAgLgBg");
	this.shape_841.setTransform(185.3342,314.593);

	this.shape_842 = new cjs.Shape();
	this.shape_842.graphics.f("#160C08").s().p("ADfDMIgCgZQAeAggXAMIAAAAQgCAAgDgTgAjjjKIgKgUQAfAYgIAAQgDAAgKgEg");
	this.shape_842.setTransform(178.6288,310.4773);

	this.shape_843 = new cjs.Shape();
	this.shape_843.graphics.f("#140A07").s().p("AgFAIQgCgRgPgGQA9ABgVADQgMACgKAZg");
	this.shape_843.setTransform(151.5657,289.75);

	this.shape_844 = new cjs.Shape();
	this.shape_844.graphics.f("#140B06").s().p("AAAAIQgNgEACgLQAnAFgbAKg");
	this.shape_844.setTransform(146.0714,289.75);

	this.shape_845 = new cjs.Shape();
	this.shape_845.graphics.f("#6C5E50").s().p("AgUgIQBNAIhAAJIgEAAQgNAAAEgRg");
	this.shape_845.setTransform(145.7055,293.8389);

	this.shape_846 = new cjs.Shape();
	this.shape_846.graphics.f("#140B08").s().p("AgegKQAlAbgCgoIAHAGQAlAfgjAIIgMACQgZAAgHgig");
	this.shape_846.setTransform(140.5573,290.8052);

	this.shape_847 = new cjs.Shape();
	this.shape_847.graphics.f("#AF9A8A").s().p("AgLgNQAQgTAEAaIADABIAAAHQAAAEgBADQgHANgEAAQgJAAgCgjg");
	this.shape_847.setTransform(141.175,275.8834);

	this.shape_848 = new cjs.Shape();
	this.shape_848.graphics.f("#71554B").s().p("AgRApQAKAAgKgKQgggdg7ATQhcAcgEg3IAAgIQAZAAAYgEQABAAAAgBQAAAAAAAAQAAgBAAgBQAAAAAAgBQA4gCAsgNIAGgBQADANAVgFIAHAAQBLAqA9ggQAMgHAGgLQA8gTACArIAAAIIgDgBQgEgagSATQAEA5ATgjQACgDAAgEQAVApg6ACIg8ABQg5AAg+gEgAi5ARIAAAEQA6gHgNAAIgtADgACPgFIALAGQAbgBgsgWQgCAMAIAFg");
	this.shape_848.setTransform(122.5059,275.9951);

	this.shape_849 = new cjs.Shape();
	this.shape_849.graphics.f("#786149").s().p("Ah/AEQAZALAjgQQAggOAUgBIAYAEQAMACAGAHQAkgWA5ACQADAAADAEQAQAshUgDQhHgChmAEIgBAAQgNAAACgUg");
	this.shape_849.setTransform(159.5902,274.8131);

	this.shape_850 = new cjs.Shape();
	this.shape_850.graphics.f("#785D56").s().p("AhAAEIAAgHIB7AAIAGAAQg1AHg2AAIgWAAg");
	this.shape_850.setTransform(91.2,341.6667);

	this.shape_851 = new cjs.Shape();
	this.shape_851.graphics.f("#7D5C55").s().p("AAMAbQgNgegUgYQAZAMAQAUQACADAAAEIgHAAIAAAIIAAAIQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAAAg");
	this.shape_851.setTransform(78.175,330.4);

	this.shape_852 = new cjs.Shape();
	this.shape_852.graphics.f("#99726C").s().p("AgJAAIAAgIIAAgIIAGAAQABAAABAAQAAAAABAAQAAAAAAAAQAAABAAAAQAOAggFAAQgEAAgOgRg");
	this.shape_852.setTransform(80.7208,333.3153);

	this.shape_853 = new cjs.Shape();
	this.shape_853.graphics.f("#130C0C").s().p("AgGANQAEgMgNgUQA6AmgzABg");
	this.shape_853.setTransform(88.711,310.275);

	this.shape_854 = new cjs.Shape();
	this.shape_854.graphics.f("#170C0A").s().p("AgKAAQArgIgrAMg");
	this.shape_854.setTransform(93.25,304.2659);

	this.shape_855 = new cjs.Shape();
	this.shape_855.graphics.f("#6A5B52").s().p("AgQAAIAAgDQAmAHgGAAIgggEg");
	this.shape_855.setTransform(93.8563,321.5705);

	this.shape_856 = new cjs.Shape();
	this.shape_856.graphics.f("#836D5F").s().p("AgLAGIgBgGIgFgJQBEAJg+AKg");
	this.shape_856.setTransform(54.2034,337.45);

	this.shape_857 = new cjs.Shape();
	this.shape_857.graphics.f("#795D51").s().p("AgRgIIAYAAIAFAAIAGAIIABAHIgHABIgJABQgSAAgCgRg");
	this.shape_857.setTransform(51.15,337.3022);

	this.shape_858 = new cjs.Shape();
	this.shape_858.graphics.f("#726246").s().p("AgIgIQgCgCAAgEIAVAdIgTgXg");
	this.shape_858.setTransform(39.2131,337.1168);

	this.shape_859 = new cjs.Shape();
	this.shape_859.graphics.f("#786A4D").s().p("AALAsQgZgeABg6QAcAggBA4g");
	this.shape_859.setTransform(37.0463,322.35);

	this.shape_860 = new cjs.Shape();
	this.shape_860.graphics.f("#190F00").s().p("AgHgIQgCgCAAgEIATAdIgRgXg");
	this.shape_860.setTransform(32.8882,337.9736);

	this.shape_861 = new cjs.Shape();
	this.shape_861.graphics.f("#6E6450").s().p("AgPgEQAAAAgBAAQAAAAAAgBQAAgBAAAAQAAgBAAgBQAkARgDAAIgggNg");
	this.shape_861.setTransform(26.844,329.3102);

	this.shape_862 = new cjs.Shape();
	this.shape_862.graphics.f("#1A1304").s().p("AgDAQQACgPgLgBIgBgHIgFgIQA8AGglAYQgCABgDAAg");
	this.shape_862.setTransform(20.1602,330.8);

	this.shape_863 = new cjs.Shape();
	this.shape_863.graphics.f("#120E0C").s().p("EAhlAGGIAAgQQARhjgBA7QgBA4gPAJgEghzgGGQgBgEAAgEIANAhIgMgZg");
	this.shape_863.setTransform(237.2757,344.9);

	this.shape_864 = new cjs.Shape();
	this.shape_864.graphics.f("#110E0A").s().p("AgFgLIgBgHIANAlIgMgeg");
	this.shape_864.setTransform(22.6627,312.6238);

	this.shape_865 = new cjs.Shape();
	this.shape_865.graphics.f("#786B60").s().p("Ag0gIQANgMANgLQACgBADAAQAAAEgBADQgHARgQAIQApAZAjgjQAFgFALgBQAKAQgHARQgDAGgDABQgdAJgTAAQgrAAgFgpg");
	this.shape_865.setTransform(50.8313,279.398);

	this.shape_866 = new cjs.Shape();
	this.shape_866.graphics.f("#92847A").s().p("AguALQARgIAHgQQABgDAAgEQArgGAWARQADABAAAEQgLABgFAEQgVAVgWAAQgQAAgSgLg");
	this.shape_866.setTransform(50.85,278.1514);

	this.shape_867 = new cjs.Shape();
	this.shape_867.graphics.f("#A3907E").s().p("AgpghQArgkAkBLQAMAZgYAPQg0gCgPhNg");
	this.shape_867.setTransform(23.7223,248.9464);

	this.shape_868 = new cjs.Shape();
	this.shape_868.graphics.f("#917A6D").s().p("AAFALQAAgEgCgBQgMgHgKgLQA3gKgXAbQgCACAAAEIAAAEQgDAAgDgEg");
	this.shape_868.setTransform(53.7745,262.8667);

	this.shape_869 = new cjs.Shape();
	this.shape_869.graphics.f("#816E63").s().p("AgkgDIA9AAIAGAAIAGAAQAAABAAABQAAAAAAABQAAAAAAAAQgBAAAAAAQgTAEgQAAQgWAAgPgHg");
	this.shape_869.setTransform(79.725,281.3083);

	this.shape_870 = new cjs.Shape();
	this.shape_870.graphics.f("#9B847C").s().p("AgpgEIAfAAIAGAAQBJgBgrAGQgWAEgOAAQgZAAgGgJg");
	this.shape_870.setTransform(81.4402,275.7578);

	this.shape_871 = new cjs.Shape();
	this.shape_871.graphics.f("#94837C").s().p("AAuAJIhcAAIgGAAIAAgIQAiAAAhgDIAAgEIATAAIAGAAQAOgFgBAMIgBAIIgGAAg");
	this.shape_871.setTransform(88.1073,280.0404);

	this.shape_872 = new cjs.Shape();
	this.shape_872.graphics.f("#332019").s().p("Ag0gIQAgAAAdgEIABgFQAfASAMgBIAAAPIgGAAIgTAAIgGAAQgRADgMAAQgwAAADgag");
	this.shape_872.setTransform(86.8425,277.8037);

	this.shape_873 = new cjs.Shape();
	this.shape_873.graphics.f("#6F5E56").s().p("AgNADQAOhMAJA2QAEAXgBAQQgBAWgFAAQgHAAgNgng");
	this.shape_873.setTransform(61.21,278.1596);

	this.shape_874 = new cjs.Shape();
	this.shape_874.graphics.f("#AD9B90").s().p("AAfAFIg9AAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQgCgCAAgDQATgDAwADIAGAAIAAAHIgGAAg");
	this.shape_874.setTransform(79.075,280.425);

	this.shape_875 = new cjs.Shape();
	this.shape_875.graphics.f("#A39084").s().p("AgagcQAYgFAZgCIAGgBIAAAIQgCAmgXASIAAAIIgFAAIgHABQgaAAAIhBg");
	this.shape_875.setTransform(69.9974,276.5441);

	this.shape_876 = new cjs.Shape();
	this.shape_876.graphics.f("#7B685E").s().p("AgcgjQAWgNAmAJQAAAAABAAQAAAAAAABQAAAAAAABQAAABAAABIgGAAQgaADgXAFQgJBIAhgIIAGgBQAAABAAABQAAABAAAAQAAABgBAAQAAABAAAAQgIADgHAAQgiAAAOhPg");
	this.shape_876.setTransform(69.5868,276.4729);

	this.shape_877 = new cjs.Shape();
	this.shape_877.graphics.f("#644F45").s().p("ABVAaQACgNgOAFIAAgPQgNABgfgSIAAAFQgeAEgfAAQgEAhBOgKIAGAAIgBAEQghAEgiAAIgGAAQgxgDgTADIAAgIIAAgIQAMgKADgVIAEgBQAJARA7gKQAqgIhJABIAAgIQBZgLArAkIABAOQABAUgLAFIAAgIg");
	this.shape_877.setTransform(84.8542,277.5463);

	this.shape_878 = new cjs.Shape();
	this.shape_878.graphics.f("#9B7E6C").s().p("AgUAbQgBgBgJgEQgbgLAFgkQA0gxAwAfQACACADAAQAIAhgsApIgOAFQAAASgEAAQgGAAgNgdg");
	this.shape_878.setTransform(59.5413,256.9628);

	this.shape_879 = new cjs.Shape();
	this.shape_879.graphics.f("#7F6554").s().p("AiRBCQAsgHAxgBIAGAAQAxgwgRg4Qg9gEAwgUQBcAFBLgJQADAAADAEQgLBahbAoQgNAGgPAAQAAgEACgDQAWgbg2AKQAJAKANAJQABABAAAEIgGABQgcAIgkAAQgmAAgugJgAAJgeQgFAlAbALQAJADABACQAYAzAAgoIAOgFQAsgqgIghQgDAAgCgBQgTgNgTAAQgeAAghAeg");
	this.shape_879.setTransform(53.325,257.4226);

	this.shape_880 = new cjs.Shape();
	this.shape_880.graphics.f("#665B52").s().p("AgVgIQAagBAPALQACABAAAEIgGABIgNABQgUAAgEgRg");
	this.shape_880.setTransform(57.675,231.8798);

	this.shape_881 = new cjs.Shape();
	this.shape_881.graphics.f("#695E53").s().p("AgzAEIAAAAQgcAfgDguQA0gIBmAAIAGAAQAAAEACADQAPAbg8AFQgigOg0gCg");
	this.shape_881.setTransform(65.6581,236.225);

	this.shape_882 = new cjs.Shape();
	this.shape_882.graphics.f("#5F5749").s().p("AghgDIA9AAIAGAAQAAABAAABQAAAAAAABQAAAAgBAAQAAAAAAAAQgRAEgPAAQgUAAgOgHg");
	this.shape_882.setTransform(65.75,233.017);

	this.shape_883 = new cjs.Shape();
	this.shape_883.graphics.f("#6D5C4C").s().p("AhpgEIDMAAIAHAAQg1AJg1AAQg0AAg1gJg");
	this.shape_883.setTransform(76,201.7125);

	this.shape_884 = new cjs.Shape();
	this.shape_884.graphics.f("#775D50").s().p("AgeAFQAbgbAdALIAFABQAAAEgCABQgHAEgKgBIAAAHIAAAIIgFABIgOABQgRAAgGgKg");
	this.shape_884.setTransform(51.15,241.7474);

	this.shape_885 = new cjs.Shape();
	this.shape_885.graphics.f("#C7B5A4").s().p("AgPAAQA2gagmAfQgIAHgEAAQgGAAACgMg");
	this.shape_885.setTransform(44.6855,223.8664);

	this.shape_886 = new cjs.Shape();
	this.shape_886.graphics.f("#644F42").s().p("AgMAFQAugigmAlQgEAEgCAAQgDAAABgHg");
	this.shape_886.setTransform(53.6595,226.4786);

	this.shape_887 = new cjs.Shape();
	this.shape_887.graphics.f("#503929").s().p("AgSgLQA6gMggAfQgIAHgFAAQgKAAgDgag");
	this.shape_887.setTransform(26.9907,245.0692);

	this.shape_888 = new cjs.Shape();
	this.shape_888.graphics.f("#413323").s().p("AgkgZQAlgQASAgIACgHQAAAAABgBQAAAAAAAAQABAAAAAAQABAAABAAQAGAIAFAJQABACAAAEQAAAEgCACQgUATgPAAQgZAAgLg4g");
	this.shape_888.setTransform(33.775,238.4698);

	this.shape_889 = new cjs.Shape();
	this.shape_889.graphics.f("#675545").s().p("AgJATQgKgGAEgTQAVgtALA9QACAQgKAAQgHAAgLgHg");
	this.shape_889.setTransform(19.8333,234.8687);

	this.shape_890 = new cjs.Shape();
	this.shape_890.graphics.f("#675949").s().p("AhngHQgEgCgEgEQBYAAAkAEIAAgEQA8ASAnAFQggAEggAAQhLAAhMgVg");
	this.shape_890.setTransform(30.025,225.9374);

	this.shape_891 = new cjs.Shape();
	this.shape_891.graphics.f("#675748").s().p("AgpgFQgBgBAAgEQA7gJAYAaQACACAAAEQgxgBgjgRg");
	this.shape_891.setTransform(36.875,218.4125);

	this.shape_892 = new cjs.Shape();
	this.shape_892.graphics.f("#B9A999").s().p("AgBAQQACgYgIgPQAcABgVAqIgBAEQgBAAABgIg");
	this.shape_892.setTransform(43.2995,197.9634);

	this.shape_893 = new cjs.Shape();
	this.shape_893.graphics.f("#BFAF9F").s().p("Ah/BEIAAgYQg9ABgygZQAyAFAWgdIgEAAQhAgMAtg0IAJgCQBZgSBZASIAIACIgGAEIADAEQBmgChBAaQAmAQAqgLQAAgBAAAAQABAAAAgBQAAAAAAgBQAAgBAAgBQA2ANBAAHIAAAEQhRAJhjAAIgMgBQgDAdA0gLQAmgIAkAWQgEAeg1gJQg4gKhCAdQhAgaglAWIgEgEQgBAEgMAQg");
	this.shape_893.setTransform(70.1,210.5375);

	this.shape_894 = new cjs.Shape();
	this.shape_894.graphics.f("#BAA999").s().p("AgEALQANgKgZgMQA8AOgxAJg");
	this.shape_894.setTransform(39.7761,194.35);

	this.shape_895 = new cjs.Shape();
	this.shape_895.graphics.f("#CDBCAB").s().p("AgMASQgFgHgBgMQA/gugrA+QgEAHgEAAQgDAAgDgEg");
	this.shape_895.setTransform(43.776,188.5722);

	this.shape_896 = new cjs.Shape();
	this.shape_896.graphics.f("#DACABB").s().p("AgLAZQgPgDACgVQAQg1AfA2QACADAAAFIgEABQgIANgSACIgGgBg");
	this.shape_896.setTransform(53.0129,176.9374);

	this.shape_897 = new cjs.Shape();
	this.shape_897.graphics.f("#66584B").s().p("AgbgGQBdAMg/ABIgBAAQgSAAgLgNg");
	this.shape_897.setTransform(32.276,197.1258);

	this.shape_898 = new cjs.Shape();
	this.shape_898.graphics.f("#B7A89B").s().p("AgOgFQA8AIg8ADg");
	this.shape_898.setTransform(32.2,189.75);

	this.shape_899 = new cjs.Shape();
	this.shape_899.graphics.f("#DCCBBB").s().p("AgJAKQgFgGAFgOQApgUgjAvg");
	this.shape_899.setTransform(23.0183,187.8559);

	this.shape_900 = new cjs.Shape();
	this.shape_900.graphics.f("#E1CCBE").s().p("AgIgDQAiAFgdACQgCAAgDgHg");
	this.shape_900.setTransform(24.7996,166.2);

	this.shape_901 = new cjs.Shape();
	this.shape_901.graphics.f("#ECDBCB").s().p("AgRAAQBHgJhHANg");
	this.shape_901.setTransform(20.65,155.3295);

	this.shape_902 = new cjs.Shape();
	this.shape_902.graphics.f("#CAB9AA").s().p("AibAzQBZgkhfgqQBhgiBFAWIASAHQABAAAAABQAAAAABABQAAAAAAABQAAABAAABQAEAXAOgvIBkAAIAGAAQAHAuAEAZIABAIIgLABQhVAMgiglQgDgEgBAAIgWALQhQAjhSAGIACgBgAhpgTQAegCgjgGQACAIADAAg");
	this.shape_902.setTransform(35,168.625);

	this.shape_903 = new cjs.Shape();
	this.shape_903.graphics.f("#C3B3A4").s().p("AgmAJIAAgIQAeg9AqAuQAIAIgEAOQgEAVgXAEQgLACgIAAQgiAAAEgag");
	this.shape_903.setTransform(87.3111,197.088);

	this.shape_904 = new cjs.Shape();
	this.shape_904.graphics.f("#65574C").s().p("AtnFUQBCgGAuANIAGABQgWAGgXAAQgkAAglgOgAKcieIgBgIQgDgXgCg6QALgIgEgYIgBgIIAAgIIADgBQAGgZgJgOQAdgpAVA3IAPgGQAJgEAHgMQASgWAQA7QAGAXAWgMQgCApA6gZQARADgvAgQgCABAAAEIgFAAQg3gQgUhIQgUBggLBJQAKADgDAOQgBAIgHAEQgIAGgIAAQgVAAgSgjg");
	this.shape_904.setTransform(156.3124,157.5751);

	this.shape_905 = new cjs.Shape();
	this.shape_905.graphics.f("#D6C2B2").s().p("Ag7AQQgFgFAAgLQBHAOALg0QABgCAJAAIAlAAIAABHQgdAKgZAAQgnAAgfgZg");
	this.shape_905.setTransform(85.625,187.6058);

	this.shape_906 = new cjs.Shape();
	this.shape_906.graphics.f("#C8B8A9").s().p("AhWASQgFgDgDgIQAfgRAXgRQANgJAUgFQA6ADAkAbQAEADAAAIQAOAUghASIgGABQgaADgWAAQg+AAgqgYg");
	this.shape_906.setTransform(60.0585,196.527);

	this.shape_907 = new cjs.Shape();
	this.shape_907.graphics.f("#DDCDBD").s().p("AAMASIgeAAQAAgEACgCQAIgFgKgMQAngdgCAsIAAAIIgHAAg");
	this.shape_907.setTransform(60.4798,188.9937);

	this.shape_908 = new cjs.Shape();
	this.shape_908.graphics.f("#C6B5A7").s().p("Ah4AlQAvAcgOhjQgCgQAAgQQBsgGBYAUQALADADAPQAFBGgvgnQgBgBAJgIQAVgUgfAOQAAgEgBgDQggg3gQA2QgCAUAOADIAGABQgQAVgWARQgnAgghAAQggAAgYgfg");
	this.shape_908.setTransform(47.7785,179.7572);

	this.shape_909 = new cjs.Shape();
	this.shape_909.graphics.f("#6D5D4D").s().p("AgWgBQBbADhbAAg");
	this.shape_909.setTransform(61.5625,182.1);

	this.shape_910 = new cjs.Shape();
	this.shape_910.graphics.f("#C6B6A7").s().p("AANAlIAAgIQACgsgnAcQAKANgIAFQgCACAAAEIgDAAQAEgrhLgcQBWgDBpADIAGAAQACAigoAbQgOAKgWAAIgMAAg");
	this.shape_910.setTransform(61.0798,187.05);

	this.shape_911 = new cjs.Shape();
	this.shape_911.graphics.f("#685646").s().p("AgIgBQgCgBAAgEQAXANgCAAIgTgIg");
	this.shape_911.setTransform(72.1381,182.6068);

	this.shape_912 = new cjs.Shape();
	this.shape_912.graphics.f("#6A5546").s().p("AgbgEIgagUIA9AAIAGAAIAfAAIAHAAQADAIgBAIQgBAOgJAGQgMAHgJACQgSAEgMAAQgjAAAPgdg");
	this.shape_912.setTransform(79.5286,184.3815);

	this.shape_913 = new cjs.Shape();
	this.shape_913.graphics.f("#DECEBE").s().p("AgsAhQgEgagHgtQBEgGArARIgGAFIgDAHIgEABIACAHQgMAbgZALQgXAKgcAAIgBgIg");
	this.shape_913.setTransform(55.5,167.3484);

	this.shape_914 = new cjs.Shape();
	this.shape_914.graphics.f("#BBAAA1").s().p("AgMgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQAeALgDAAIgagHg");
	this.shape_914.setTransform(94.2001,171.2674);

	this.shape_915 = new cjs.Shape();
	this.shape_915.graphics.f("#3A2D27").s().p("AgPgDQAIgLAWANQAFABgLAFQgJAEgHAAQgKAAACgMg");
	this.shape_915.setTransform(79.4737,170.2901);

	this.shape_916 = new cjs.Shape();
	this.shape_916.graphics.f("#646056").s().p("AB5ANQjDgCiqgIQDkgMDNABQAkAAAUgEQgpAZhNAAIgGAAg");
	this.shape_916.setTransform(142.725,232.3268);

	this.shape_917 = new cjs.Shape();
	this.shape_917.graphics.f("#695F52").s().p("AgkAaIAAgFQA8AHAagbQAAgXgdANQgnAQglgdQAwAJA5gQIAGgBIAAAIQAAA1g2AAQgQAAgWgFg");
	this.shape_917.setTransform(174.0751,233.2957);

	this.shape_918 = new cjs.Shape();
	this.shape_918.graphics.f("#6F5D4C").s().p("AA7AEIh7AAIAAgHQBAAABBADIAAAEIgGAAg");
	this.shape_918.setTransform(163.225,235.425);

	this.shape_919 = new cjs.Shape();
	this.shape_919.graphics.f("#978574").s().p("AgpAGIAAgHQApAAAngEIAAgEIADAAIgDAEQgQAPgfAAQgPAAgSgEg");
	this.shape_919.setTransform(159.65,245.6563);

	this.shape_920 = new cjs.Shape();
	this.shape_920.graphics.f("#B7AA9B").s().p("AAZAEIgrAAIgGAAIgGAAIAAgHIA3AAIAGAAIAAAHIgGAAg");
	this.shape_920.setTransform(152.35,245.9);

	this.shape_921 = new cjs.Shape();
	this.shape_921.graphics.f("#77573B").s().p("AgZgBQBmADhmAAg");
	this.shape_921.setTransform(153.6625,240.05);

	this.shape_922 = new cjs.Shape();
	this.shape_922.graphics.f("#6E563D").s().p("AgbgCQBfgFhDALIgGABQgMAAgKgHg");
	this.shape_922.setTransform(143.9857,237.7611);

	this.shape_923 = new cjs.Shape();
	this.shape_923.graphics.f("#786655").s().p("AgkgDIA2AAIAHAAIAGAAIAGAAIAAADQglAEgkAAIAAgHg");
	this.shape_923.setTransform(146.775,246.7);

	this.shape_924 = new cjs.Shape();
	this.shape_924.graphics.f("#94816E").s().p("AgqgEIBPAAIAGAAIAAAHIgGAAIgbACQgfAAgVgJg");
	this.shape_924.setTransform(138.7,246.8026);

	this.shape_925 = new cjs.Shape();
	this.shape_925.graphics.f("#6E6454").s().p("AgZgBQBmADhmAAg");
	this.shape_925.setTransform(156.7625,228);

	this.shape_926 = new cjs.Shape();
	this.shape_926.graphics.f("#705F50").s().p("AgdgBQB5ADh5AAg");
	this.shape_926.setTransform(147.3,219.95);

	this.shape_927 = new cjs.Shape();
	this.shape_927.graphics.f("#675746").s().p("AgbgBQBvADhvAAg");
	this.shape_927.setTransform(181.85,219.95);

	this.shape_928 = new cjs.Shape();
	this.shape_928.graphics.f("#B7A69A").s().p("AgFgFQgCgDAAgEIAPAZIgNgSg");
	this.shape_928.setTransform(166.1692,214.5623);

	this.shape_929 = new cjs.Shape();
	this.shape_929.graphics.f("#B7A99C").s().p("A2WNGQA3AJAZgfQABgBgNgBQA7gbgPAzIAMAAIANAAQAbALhHACIgKAAQgyAAghgNgAVHsrIgBgIQAWg1A7AlIAAACIgEARQgRACAPATQgYAKgQAAQgbAAgHgag");
	this.shape_929.setTransform(293.575,124.6217);

	this.shape_930 = new cjs.Shape();
	this.shape_930.graphics.f("#645749").s().p("AgTAFQg3gBg3gIIBuAAICPAAIAHAAQhCAJhBAAIgTAAg");
	this.shape_930.setTransform(157.3,202.5121);

	this.shape_931 = new cjs.Shape();
	this.shape_931.graphics.f("#CCBBAD").s().p("A3RQjQgygCgLggQAIgWASgUQASgUArAEQAvAEATAcQAKAOgIAMQgEAjhIAAIgSgBgAQ8tTQgLgdgEhCQAKAAgDgQIgBgIIgBgIIgFhBQADgEABgEQACgEAAgEIAGAAQgFBgAUBPQABACAJAAQBCgLgNgJQgOgLgIAPQgHgYALgcIACgGQgBgWgHADQgSAIgFgLQgIgfgHgpQAAgFgEgEIG5AAIAGAAQABAPAFAKQAKATgLAKQg/A1hwAvQiDA3iYABQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBgASjuiQAaAHgMAOIgCADQAaAuAsgqQgXgLgKgZQAUgjgTgBIgBAAQgVAAgcAsg");
	this.shape_931.setTransform(322.9506,105.9733);

	this.shape_932 = new cjs.Shape();
	this.shape_932.graphics.f("#B3A18F").s().p("AhAgDIB7AAIAGAAIAAADQhBAEhAAAIAAgHg");
	this.shape_932.setTransform(141.475,242.65);

	this.shape_933 = new cjs.Shape();
	this.shape_933.graphics.f("#F7EBDC").s().p("AgCAUIg4AAIgGAAIhRAAIAAgIIAAgXIAGAAQBCAABAgEIABgEICOAAIAGAAIAFAQIABAHIAAAEQgoAEgpAAIgGAAIg4AAIAAAIIgFAAg");
	this.shape_933.setTransform(148.925,244.275);

	this.shape_934 = new cjs.Shape();
	this.shape_934.graphics.f("#6C5C4D").s().p("AgYgDIArAAIAGAAIgBADQgYAEgYAAIAAgHg");
	this.shape_934.setTransform(139.925,236.225);

	this.shape_935 = new cjs.Shape();
	this.shape_935.graphics.f("#75593F").s().p("AiwAGQAyANggggIACgDQANgUAKAbIACgIQAGgZgUABQgYgHBJAFQAcACgbAIQgjgKAvAaIB7gIIANAAQAHAZBKgKQAfgFAMAOIgGAAIiPAAIgGAAIh8AAIAAAHIgFAAIAAAYIAAAIIgGABQgNAHgLAAQgaAAgNgog");
	this.shape_935.setTransform(145.2,242.4638);

	this.shape_936 = new cjs.Shape();
	this.shape_936.graphics.f("#C7BBAC").s().p("AhKADIgGAAIAAgHICbAAIAFAAQgvAJg4AAQgYAAgbgCg");
	this.shape_936.setTransform(133.1,229.89);

	this.shape_937 = new cjs.Shape();
	this.shape_937.graphics.f("#805F41").s().p("AgkAcQg5gCgrgdQARgXAtgBIAHAAIAAAIQgBANgxgFQAoAaBNgGQBEgFBFAAQAAABgBABQAAABAAAAQAAABAAAAQAAAAgBAAQgzARg1gNIAAAEQgtAFgQAHIgGAAg");
	this.shape_937.setTransform(102.05,243.475);

	this.shape_938 = new cjs.Shape();
	this.shape_938.graphics.f("#D9AF90").s().p("Ah+AAQAxAFAAgMIABgIQAfgFANAMQACABADAAQASANAkgIQAAAAABAAQAAgBAAAAQAAgBAAgBQAAgBAAgBQAogeAkAdQACABADAAQAGALALAHQABABAAAFQhEgBhDAGIgZABQg8AAghgXg");
	this.shape_938.setTransform(102.975,242.2023);

	this.shape_939 = new cjs.Shape();
	this.shape_939.graphics.f("#A27B5D").s().p("AAUAHQgOgLgeAFIAAgHQAigGANAOQACADAAAEQgDAAgCgCg");
	this.shape_939.setTransform(97.725,240.5663);

	this.shape_940 = new cjs.Shape();
	this.shape_940.graphics.f("#B07C65").s().p("AgbgDIAZAAIAFAAIASAAIAHAAQAAABAAABQAAAAAAABQAAAAgBAAQAAAAAAAAQgPAEgMAAQgQAAgLgHg");
	this.shape_940.setTransform(103,241.867);

	this.shape_941 = new cjs.Shape();
	this.shape_941.graphics.f("#A43D3E").s().p("AhoARIAAgEQgYgBgCgSQCIgOB2AGIAHAAQg7AnhDgLQgCgBgDAEQgCAAgCgBQgkgcgnAdIgHAAIgJAAIgJAAg");
	this.shape_941.setTransform(113.85,239.7497);

	this.shape_942 = new cjs.Shape();
	this.shape_942.graphics.f("#685A52").s().p("AiaAAIAAgHQCMgBCjABIAGAAIAAAEQikgCiRANIAAgIg");
	this.shape_942.setTransform(90.875,237.425);

	this.shape_943 = new cjs.Shape();
	this.shape_943.graphics.f("#6B6150").s().p("Ag3gEIBoAAIAHAAQgcAJgcAAQgbAAgcgJg");
	this.shape_943.setTransform(94,229.1);

	this.shape_944 = new cjs.Shape();
	this.shape_944.graphics.f("#615B4F").s().p("AjVAFQAaABgMgKQgCgCAAgEQAOgEAqAAQCyADC1ABQgDAEgDAAQjKAHijAEQAAAEgCABQgJAFgLAAQgPAAgTgKg");
	this.shape_944.setTransform(96.175,233.7084);

	this.shape_945 = new cjs.Shape();
	this.shape_945.graphics.f("#C5B9AB").s().p("AgYgEIAqAAIAHAAIAAAHIgHABIgPABQgSAAgJgJg");
	this.shape_945.setTransform(115.1,229.8801);

	this.shape_946 = new cjs.Shape();
	this.shape_946.graphics.f("#E4D8C9").s().p("AgkABIAAgHIBDAAIAGAAIAAAHIgGABQgQAFgQAAQgSAAgRgGg");
	this.shape_946.setTransform(121.325,230.138);

	this.shape_947 = new cjs.Shape();
	this.shape_947.graphics.f("#64564B").s().p("AhygIQByAABzAEIAAAEQg2AJgyAAQhBAAg8gRg");
	this.shape_947.setTransform(101.75,202.1265);

	this.shape_948 = new cjs.Shape();
	this.shape_948.graphics.f("#6A5849").s().p("Aj6AIQgTAAAAgMQFEgHDRAHIAGAAQjqAMj6AAIgkAAg");
	this.shape_948.setTransform(85.6,221.0094);

	this.shape_949 = new cjs.Shape();
	this.shape_949.graphics.f("#C4B5A6").s().p("Ah+A5Qg9AAAwg4QgPgMhBAIQgcADADgWQBgANAOgmIABgHQAKgLAOgHQAlgTBAACQBTAEBHANIAuAKIgEAHIgFAJQASAdAsADQg4AJgsAYQgFADATgDQAMgCAMAAQACA2g3ADIADAHQgSgVgXAPQgIAFgTgXQgEApgngZQglARghAAQgtAAghghg");
	this.shape_949.setTransform(124.7107,210.7524);

	this.shape_950 = new cjs.Shape();
	this.shape_950.graphics.f("#DBCABC").s().p("AASAKQguALALgKQALgJARAAQgegQgSgHQBLgJAAAZQAAAKgKATQAAgIgKgGg");
	this.shape_950.setTransform(123.25,196.1576);

	this.shape_951 = new cjs.Shape();
	this.shape_951.graphics.f("#E5D3C5").s().p("AgKAGQgEgBgDgEQA0gYgcAYQgGAFAPAFIACABIgcgGg");
	this.shape_951.setTransform(121.8887,180.9624);

	this.shape_952 = new cjs.Shape();
	this.shape_952.graphics.f("#7D6857").s().p("AgUAEIAAgHQBQADhKAEIgGAAg");
	this.shape_952.setTransform(140.1596,174.25);

	this.shape_953 = new cjs.Shape();
	this.shape_953.graphics.f("#605448").s().p("AhiAfQBBgKATgOIgKAAQgngGAlgJQglgFgigHQAAAAgBgBQAAAAAAAAQAAgBAAgBQAAAAAAgBQA1gYA5ABQA1AAAiAfQhJABAqAmQBEAShoAHIgQAAQgtAAhFgRg");
	this.shape_953.setTransform(102.675,189.275);

	this.shape_954 = new cjs.Shape();
	this.shape_954.graphics.f("#625343").s().p("Ag3ACQABAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAQACgCAAgEQAHgJASABIAHAAIAAAEQAygRAXAkIgBAEIgeABQgzAAgdgNg");
	this.shape_954.setTransform(98.95,182.4806);

	this.shape_955 = new cjs.Shape();
	this.shape_955.graphics.f("#6D5B50").s().p("AAZAEIg3AAIAAgHQAeAAAfADIAAAEIgGAAg");
	this.shape_955.setTransform(97.1,173.45);

	this.shape_956 = new cjs.Shape();
	this.shape_956.graphics.f("#E3D3C5").s().p("AhOAhIgNAAQgBgSABgVQAAgCgWgGQgCAAAAgIQAPgJA0AHQAEAAgQASQAngCANgVQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQBagGAeAOIgJAAQAEAVgFAGQgYAhAAglQggAZgggqQgEgGgMAAQgKABAEAPQA4AJgaAFQgRAEgsgLQg1ASATAOg");
	this.shape_956.setTransform(124.875,178.5954);

	this.shape_957 = new cjs.Shape();
	this.shape_957.graphics.f("#E5D4C3").s().p("AghgCQBNgKgLAIQgOAJgVADIgIAAQgSAAgFgKg");
	this.shape_957.setTransform(114.7926,171.7166);

	this.shape_958 = new cjs.Shape();
	this.shape_958.graphics.f("#AA9989").s().p("AhAgHIAgAAIAGAAIBWAAIAGAAIAAAEQg4ADg3AAIAAAIIgGAAIgEABQgNAAAEgQg");
	this.shape_958.setTransform(95.4694,153.7825);

	this.shape_959 = new cjs.Shape();
	this.shape_959.graphics.f("#E5D7C9").s().p("AhAAGQAmgfAUAMQAfASAoAJQg7AAg6AEIgBAAQgNAAACgMg");
	this.shape_959.setTransform(133.4129,171.6392);

	this.shape_960 = new cjs.Shape();
	this.shape_960.graphics.f("#8C7C6D").s().p("AhrAAQAPAAAOgDQABgBAAAAQAAAAAAgBQAAAAAAgBQAAgBAAgBQBUAJBfgBIAHAAIAAAHIgHAAQgiACghAAQhMAAhCgJg");
	this.shape_960.setTransform(127.2,173.94);

	this.shape_961 = new cjs.Shape();
	this.shape_961.graphics.f("#7E6C5B").s().p("AAuAEIiBAAIAAgHIAMAAIAHAAICNAAIAHAAQAAABAAABQAAABgBAAQAAAAAAAAQAAAAAAABQgPADgPAAIgHAAg");
	this.shape_961.setTransform(111.075,173.45);

	this.shape_962 = new cjs.Shape();
	this.shape_962.graphics.f("#C2B0A2").s().p("AgegEQAeAAAfAEIAAADIgGABIgTABQgWAAgOgJg");
	this.shape_962.setTransform(118.8,154.2426);

	this.shape_963 = new cjs.Shape();
	this.shape_963.graphics.f("#DCCEBE").s().p("AAYAGQAGgLgVgBQgYAdgTglQBkgDguAgIAAAAQgBAAAFgJg");
	this.shape_963.setTransform(177.5197,196.2965);

	this.shape_964 = new cjs.Shape();
	this.shape_964.graphics.f("#CDBFB0").s().p("AhGATQgFgDgBgMIgFgfQBpgYA1AjQACABAAAEQANAxgsgCIgcACQg0AAgmgTgAAmgGQgFAKACgCQAugghkADQASAlAYgdQAWABgHAMg");
	this.shape_964.setTransform(176.0732,197.5566);

	this.shape_965 = new cjs.Shape();
	this.shape_965.graphics.f("#F36A6D").s().p("AgQAMQAPgiALAFQANAGgMARQgJANgHAAQgFAAgGgHg");
	this.shape_965.setTransform(160.213,179.8891);

	this.shape_966 = new cjs.Shape();
	this.shape_966.graphics.f("#FED8BA").s().p("AgkgFQAtAFAcgJIAAAEQAAAEgBABQgUAKgQAAQgUAAgQgPg");
	this.shape_966.setTransform(159.775,184.1306);

	this.shape_967 = new cjs.Shape();
	this.shape_967.graphics.f("#D6C6B7").s().p("AhWARQgIgDgCgQQgCgPAAgRQBqgLBWAUQAKADgKANQAMAhglAOIggABQhGAAg1gWg");
	this.shape_967.setTransform(176.475,179.7237);

	this.shape_968 = new cjs.Shape();
	this.shape_968.graphics.f("#D2C2B4").s().p("AhWAdIgBgHQgFgSAAgmIBQAAIAHAAQAAAEgCACQgBABAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAQAPAaADgaIAAgIIAMgBQAlgEATANQADAAACACQARAPgDAeQgGgHgEAGIgHAKQgqAHgmAAQgqAAgogIg");
	this.shape_968.setTransform(176.5731,188.6159);

	this.shape_969 = new cjs.Shape();
	this.shape_969.graphics.f("#E2D2C3").s().p("AgIgBQABAAAAgBQABAAAAAAQABAAAAgBQABAAAAAAQACgDAAgEIAFAAIAGAAIAAAIQgBANgFAAQgDAAgIgMg");
	this.shape_969.setTransform(176.225,186.1938);

	this.shape_970 = new cjs.Shape();
	this.shape_970.graphics.f("#74543C").s().p("AhpgQIB0AAIBSAAIAGAAIAGAAQAEAagvADIgzAEIgLAAIgPAAQhDAAgXghg");
	this.shape_970.setTransform(154.2121,188.4983);

	this.shape_971 = new cjs.Shape();
	this.shape_971.graphics.f("#63584C").s().p("Ah7gLICAAAQBGABAxADIAAAEQgiANhUACIgBAAIgKAAQhLAAgrgXg");
	this.shape_971.setTransform(154.825,193.5717);

	this.shape_972 = new cjs.Shape();
	this.shape_972.graphics.f("#CFBFB1").s().p("AiWAlIgDgIQgDgPgBgQQAfgzBkALQBeAKBRAZQADABAAALQAUAegtAKQiKAAiLgIgAgXATQAKgTAAgKQAAgahMAJQASAHAgASQgTAAgKAIQgLAJAugKQALAFgBAJg");
	this.shape_972.setTransform(128.4327,196.7096);

	this.shape_973 = new cjs.Shape();
	this.shape_973.graphics.f("#FEE3C8").s().p("AgJAGQgKgDgKgJQBEgEgKAIQgIAFgHADQgGACgHAAQgEAAgGgCg");
	this.shape_973.setTransform(148.5189,184.1662);

	this.shape_974 = new cjs.Shape();
	this.shape_974.graphics.f("#DAC3B1").s().p("AkEBDIAAgIQgCgWgEgiQCcgFCHAMQATACgHgYIAAgIIAAgIQAKgFALATQAAABABAAQAAAAAAAAQABAAAAABQABAAABAAQBFABAdAGIABAAIAGABQAeAdArgZQACAAAAgEQAVgKgNgfQgCgDAAgEQAAgEACgEQAFgJgDgIQAcA5gYAoQgCADAAAEIgGAAQgngKgxgGIgpgDIgNgBQAHgDAIgEQAKgJhFAFQAKAIAKAEQg3AGAKAtQAAAIgBABQhBAKhKAAQhKAAhTgLg");
	this.shape_974.setTransform(139.3164,184.0313);

	this.shape_975 = new cjs.Shape();
	this.shape_975.graphics.f("#F67173").s().p("AAHAZQgfgPgKgkQAbgFAOAFQAZAGgIAeIABAAQAVAOgZAGIgOgFg");
	this.shape_975.setTransform(154.5596,177.3496);

	this.shape_976 = new cjs.Shape();
	this.shape_976.graphics.f("#3F2D24").s().p("AgIgCQgCgBAAgFQAWARgBAAIgTgLg");
	this.shape_976.setTransform(156.5256,161.8252);

	this.shape_977 = new cjs.Shape();
	this.shape_977.graphics.f("#D9C6B7").s().p("AAAATQhhgChMgVQgNgDgFgLIgBgBIABAAQDIgBC3AUIAAAEQgtAQhpAAIgqgBg");
	this.shape_977.setTransform(124.4,157.3229);

	this.shape_978 = new cjs.Shape();
	this.shape_978.graphics.f("#DFCFBF").s().p("Ag9AhIAAgIQgDgxAngKQAAAAABAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAygGAfANIAFABIAAA3IAAAIIAAAEQgeAEgbAAQgkAAgegIg");
	this.shape_978.setTransform(177.7893,170.5386);

	this.shape_979 = new cjs.Shape();
	this.shape_979.graphics.f("#DFD0C1").s().p("AgTAlQgVgEgVAAQAAgEgCgDQgNgQgEgxQBigJA5AiQAGADAAAMQgKApg0AAQgRAAgVgFg");
	this.shape_979.setTransform(178.425,161.7303);

	this.shape_980 = new cjs.Shape();
	this.shape_980.graphics.f("#DA7065").s().p("AANA/IgGAAIgCAAQgbgGhGgCIAAgIQgKgvAEhAQA2gBAxADQAkACAiADIAGABIABABIAAABQAJAcAAApIADAAQAAAEABADQAOAggWAJIAAgEQgSAGgZAAQgOAAgRgCgAAmAnQAMAQAPgWQAMgSgNgGIgDAAQgLAAgMAegAgkgYQAKAkAfAOIAOAFQAZgGgVgOIgBAAQAIgdgZgHQgGgCgKAAQgLAAgOADg");
	this.shape_980.setTransform(154.7905,177.1705);

	this.shape_981 = new cjs.Shape();
	this.shape_981.graphics.f("#D1BEAD").s().p("AhsBJQgIgYg2AYQgGgEgCgFIgEgLQAgAMgHgYQAAgEgCgBQgrgTgwAwIgHAAQgSgBgGAJIgHAAIhWAAIgHAAIgfAAIAAgEQhFACgxgOQBOgZBGghQABgBAAgEQAiAOApgNIAGgBIAMAAIAHAAIA4AAIAGAAQAMAEANAAIAAgEICCAAIAGAAQBfANBzgGIAGAAIAHAAQBKgEhRgDIgGAAQhfABhUgJIgGAAIiPAAIAAgEQgpACgVgOQAtgyCHgCQBhgBBqAHQBmAHBJgEIALAAQBFgECDgCQAAABAAABQAAABAAAAQgBABAAAAQAAABAAAAQgnAJADAzIAAAIIgGABQhCAPgOgmIgBgBIAAgBIgGgBQgigDgkgCQgzgDg1ABQgFA/AKAwIABAIQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQgLgTgKAEIAAAIIAAAIIglABIhKABQhrAAhigKgAgVBBQADAEAEABIAbAFQgPgFAGgFQAOgNgHAAQgGAAgaANgAgqBJQgTgOA1gSQArALASgEQAZgFg4gKQgFgPALgBQAMAAAFAGQAfArAhgZQgBAlAYghQAFgHgDgVIAJAAQgfgOhaAGQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgNAVgmACQAQgSgEAAQg0gHgQAJQAAAIACAAQAWAGAAACQAAAWABASIAMAAIAKAAIAAAAgAAvgWQgCAMAOgBQA7gDA7AAQgogKgggTQgFgDgHAAQgSAAgcAYgAhsgeQAHANAZgDQAVgCAPgLQAEgDgLAAQgQAAgtAGg");
	this.shape_981.setTransform(122.225,174.575);

	this.shape_982 = new cjs.Shape();
	this.shape_982.graphics.f("#67584D").s().p("AhpgHQBBgCA5ADQAqACAoAEIAHAAQguAJgrAAIgDAAQg8AAg7gQg");
	this.shape_982.setTransform(153.6,156.123);

	this.shape_983 = new cjs.Shape();
	this.shape_983.graphics.f("#C5B6A7").s().p("AgtAUQgCg/BFAHIAGAAQAEAxANAQQACADAAAEIgGAAIgaACQgnAAgVgSg");
	this.shape_983.setTransform(167.5484,161.4251);

	this.shape_984 = new cjs.Shape();
	this.shape_984.graphics.f("#918660").s().p("AB2E5IAFgDQABgBAAgEQg/gdA/gLQgpgXgOgyQg8Alg4gnQgBgCAAgEQAuhmACBOQAMAiAsgSQAbgRAKgfIAHAAQAdgDAUgFQAZgJgagCQhFgHAIgeQgDAAgCABQgaAYgMAnQgRg2AEgbQgdg4ARgHIAAAEQAjgMACgwQgDAAgCgCQgzgiAGglQgagXgQghQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAgBAAQgqApgPgqQgJAAgEAFIgFAGQgiAqhCADQgUgHgJgSIghhHQAugWAwgpQACgCADAAQATAlgIg2QgDgSAYANQADACAPgEQABANALADIAGAAQALABgBAPIADAAQAyALA0AVQAJADAAAmQAvAjAsgPQABgBAMAHQAEACADAEQgDBEA1gMQA1ATAiAmQACAvAQAjIgLAMQgFAGgOgFQguAfAuAiQglBDAMBeQgNBJglgZQgbAdgPAAQgJAAgFgNgACVhgQgDAbAYgMQAhgQgmAAIgQABg");
	this.shape_984.setTransform(30.025,361.483);

	this.shape_985 = new cjs.Shape();
	this.shape_985.graphics.f("#7A704A").s().p("ABXDdQAJh+hHgDQgLAAAJgDQArgMAngRQAKgNgKgBQg8gHgOhDQgxgNAdAkQAHAHgBAAQgWgJgZABIADgFIADgJQgBg1gqA1IAFAJIABAHIgGABQgsAEgxADQgEAAgCgCQgigPgdgXIAAgIIAAihQAngaAYgmQAIgOAdAOQAoANAaAdQACACAAAEQgPAEgDgCQgYgNADASQAIA2gTglQgDAAgCACQgwApguAWIAhBHQAJASAUAHQBCgDAigqIAFgGQAEgFAJAAQAPAqApgpQABAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQAQAhAbAXQgHAkA0AiQACACADAAQgCAwgjAMIAAgEQgRAHAdA5QgEAbARA2QAMgnAagYQACgBADAAQgIAeBFAHQAaACgZAJQgUAFgdADIgHAAQgKAfgbARQgLgjgagVg");
	this.shape_985.setTransform(23.2127,351.3936);

	this.shape_986 = new cjs.Shape();
	this.shape_986.graphics.f("#61544B").s().p("AvjH8QAXgXgUArIgCACQgCAAABgWgAOmoRIA4AAIAGAAIAAAIIgGABIgUABQgXAAgNgKg");
	this.shape_986.setTransform(106.7219,266.2804);

	this.shape_987 = new cjs.Shape();
	this.shape_987.graphics.f("#61524B").s().p("AgKABIAAgDQAcAFgJAAIgTgCg");
	this.shape_987.setTransform(7.5563,313.3667);

	this.shape_988 = new cjs.Shape();
	this.shape_988.graphics.f("#675C4E").s().p("AgMgIQAogXgWArIgCABQgFAEgDAAQgJAAABgZg");
	this.shape_988.setTransform(5.2899,301.8869);

	this.shape_989 = new cjs.Shape();
	this.shape_989.graphics.f("#5F584B").s().p("AgXArQgCABAAAEQABA5gNhRQAagiAWgaIAAAFQALAygEhLQAAgMAGgLQAfBOgkBKQgBADAAAEQgOg3gbASg");
	this.shape_989.setTransform(12.7726,312.3);

	this.shape_990 = new cjs.Shape();
	this.shape_990.graphics.f("#686056").s().p("AgRAQIAAgnQBEgBg/AvQgCABgDAAIAAgIg");
	this.shape_990.setTransform(2.0523,280.8977);

	this.shape_991 = new cjs.Shape();
	this.shape_991.graphics.f("#605A51").s().p("AguBzQABgCgDgEQANgLASgtQAKgagWASQgnAgAIhPQA1gugVg+QgEgNADgQQAYgUAxADIANABQAOBDgnAuQgJAVAnAOQAAAAAAAAQAAABAAAAQAAABABABQAAABAAABQgZBcgkAxQgIAMgLAHQg5gGAcglg");
	this.shape_991.setTransform(15.0889,290.0989);

	this.shape_992 = new cjs.Shape();
	this.shape_992.graphics.f("#9A8D85").s().p("AgBAlQgRgZgEglQAOgWAOAQQACACAAAEQAAAEACADQAcAigkAXQAAAAgBAAQgBAAAAgBQAAAAAAAAQAAAAgBgBg");
	this.shape_992.setTransform(14.9125,256.9175);

	this.shape_993 = new cjs.Shape();
	this.shape_993.graphics.f("#BDB1A6").s().p("AAKAbQgXgGgHgYIAAgIIAAgQIATAAIAFAAQAXAWgJAZIgCAIIgGgBg");
	this.shape_993.setTransform(11.0016,250.725);

	this.shape_994 = new cjs.Shape();
	this.shape_994.graphics.f("#372C25").s().p("AAbBUQgPgQgNAXIAAgIIABgIQAIgagWgXQADgMgGgFQgFgFADgMQAJgegWgPQAjADgRgoIAHAFQADAIAEAGQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAQARANADANQAQBJgLA9QAAgEgCgDg");
	this.shape_994.setTransform(12.8741,245.275);

	this.shape_995 = new cjs.Shape();
	this.shape_995.graphics.f("#443B34").s().p("AACALQgHgCgGgLIAAgIQAiAVgQAAIgFAAg");
	this.shape_995.setTransform(1.4741,240.9465);

	this.shape_996 = new cjs.Shape();
	this.shape_996.graphics.f("#B8A89C").s().p("AgGAPQgGgHgCgIIAAgHQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAQACgDABgEIASAAIAFAAIAAAIQgBAUgQADQgBAAAAAAQgBAAgBAAQAAAAgBgBQAAAAAAAAg");
	this.shape_996.setTransform(13.6,236.625);

	this.shape_997 = new cjs.Shape();
	this.shape_997.graphics.f("#4F4134").s().p("AgKAJQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQgCgHAAgHQAigJgBAYIgDAAIgGAAIgSAAg");
	this.shape_997.setTransform(13.753,234.1059);

	this.shape_998 = new cjs.Shape();
	this.shape_998.graphics.f("#3B2F24").s().p("AgXADQgYAAAFg2QBWgPAABvIAAAIQgjgzggABg");
	this.shape_998.setTransform(12.6145,215.2114);

	this.shape_999 = new cjs.Shape();
	this.shape_999.graphics.f("#362A21").s().p("AgeBSIgDAAIAAgIIAAhwQAlA4gShfQgLg2AcANQA0AEgrA9QgCADAAAEQAqA1ggApQAAABAAAAQgBAAAAAAQgBABgBAAQAAAAgBAAQgPg/gJAmQA2AygiAhQgCACAAAEQgLAIgJAAQgUAAAAgog");
	this.shape_999.setTransform(3.625,224.4258);

	this.shape_1000 = new cjs.Shape();
	this.shape_1000.graphics.f("#3C2E25").s().p("AgBANQgMgCgCgSIgBgGIAGADQAoAYgUAAIgLgBg");
	this.shape_1000.setTransform(4.4037,204.2653);

	this.shape_1001 = new cjs.Shape();
	this.shape_1001.graphics.f("#66574A").s().p("AikEuQBCAIAZgiQACgCAAgEQAkgXgcgjQgCgDAAgEQAMg8gRhKQgDgNgQgOQARgDABgVIAAgIIAEAAQABgYgjAJQgBAHADAHQAAAAAAAAQABAAAAAAQABAAAAABQABAAABAAQgBAEgCADQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAIAAAIIgHgEQASAoglgEQAXAPgJAfQgDAMAFAFQAGAFgDANIgGAAIgTAAIAAAQIAAAIQgGgMgJgGQgMgGgDgGQgLgYgtgCIAAgIIAAghQAGAMAHACQAbADgogZIAAgIIAAg/IACAAQAAA4ApgZQAAgEACgCQAjggg3gyQAJgnAPBAQABAAABAAQAAgBABAAQAAAAABAAQAAgBABAAQAfgpgqg2QAAgEACgDQAsg9g0gEQgdgNAKA2QATBgglg5IAAgIIAAiRQAHgIASgKQACATAMACQApAHgygeIAXgKQASgHAMANQAlApAQAHQAbA4gWhOQgFgSgMgQQAMAAALgEQABAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAugFgOBmQgGA0gBA0QgTAuAEArIgEAAQABAGARATQABADAAAEQgKAoAEA3QApgQAmgIQgbgdAgghQACgCALAJQAFADACAEQAvgMgvgKIgGgBQAZgYgxgEIAAgEQBDgGArAMQAIACAGAIQAxglgVA7QAAAAAAAAQgBAAAAAAQgBAAAAABQgBAAgBAAQgkgRAFAhIABAIQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAIgDAHQgRgfgmAPQASBbA2g1QACgCAAgEQAbACAkgYQACgCAEAAQgmAegZArIgGADQASAXgYAWQg1gHggA5QgYAtgtAXQghARgFAqIgGAAIgPABQg1AAgsgZgAgbB1QAPBOA0ACQAZgPgNgZQgYg0gcAAQgNAAgOAMgAAcBlQAEApAWgWQAYgXgYAAQgKAAgQAEgAg0iEIAAgIQAAhwhXAPQgEA3AYAAIABAAQAgAAAiAyg");
	this.shape_1001.setTransform(22.3,233.8401);

	this.shape_1002 = new cjs.Shape();
	this.shape_1002.graphics.f("#5F4D3B").s().p("AgMAHQgDgHABgHQAOABAOADQABAAAAAAQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAABAAAAQAAABAAAAQAAAAgBABQgLADgLAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAg");
	this.shape_1002.setTransform(13.6,201.2);

	this.shape_1003 = new cjs.Shape();
	this.shape_1003.graphics.f("#DECEBB").s().p("AgLAEQAtgogpAyIgBAAQgCAAgBgKg");
	this.shape_1003.setTransform(10.7716,196.7812);

	this.shape_1004 = new cjs.Shape();
	this.shape_1004.graphics.f("#BFAC97").s().p("AgkAYIAAg3QA2ADgPAVIAFgFQAZgXAEAUQgfAdgqASIAAgIg");
	this.shape_1004.setTransform(3.975,186.725);

	this.shape_1005 = new cjs.Shape();
	this.shape_1005.graphics.f("#C6B6A5").s().p("Ah7B/IgGgBQAQg3AsgcQAPgKAGgTQgnAggeAAQAPgcAdgsQBMgYA1gwQhyAphUAXIAAgIQB+gqB6gtIAGgBQAJBJAWA4Qg1AKADA9QgsAbgrAdQgeAFghAAQggAAgigEgAhiBuQABANADgDQAXgcgDAAQgDAAgVASgAAZAGQgEAPAEAGIAGAHQAagigOAAQgFAAgNAGg");
	this.shape_1005.setTransform(19.475,186.1564);

	this.shape_1006 = new cjs.Shape();
	this.shape_1006.graphics.f("#9A8776").s().p("AhMAIIAAgPQBDgKBQACIAHAAIiaAfIAAgIg");
	this.shape_1006.setTransform(8,156.126);

	this.shape_1007 = new cjs.Shape();
	this.shape_1007.graphics.f("#BFAC9A").s().p("AgZgBIgBgEQA6ALgGAAIgzgHg");
	this.shape_1007.setTransform(9.7938,124.5426);

	this.shape_1008 = new cjs.Shape();
	this.shape_1008.graphics.f("#D2BEAE").s().p("AhQAiIAAgIIAAg3QAsgSAkA9IAAgEQAmgfApApQACACAAAEQg6gChUAJIgNABIgGAAg");
	this.shape_1008.setTransform(8.325,139.8558);

	this.shape_1009 = new cjs.Shape();
	this.shape_1009.graphics.f("#6F5D4A").s().p("AgMgCQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAgBQAeANgDAAIgagJg");
	this.shape_1009.setTransform(7.2815,131.124);

	this.shape_1010 = new cjs.Shape();
	this.shape_1010.graphics.f("#6B5647").s().p("AAIAdQgKgHgKgLQgHgJgKAUIAAgIIAAgfQAYgyAdBNQALAcgKAAQgGAAgLgJg");
	this.shape_1010.setTransform(3.225,132.1799);

	this.shape_1011 = new cjs.Shape();
	this.shape_1011.graphics.f("#6E5A45").s().p("AgJABQgBgHgDgIQA0AGgtAXIAAAAQgBAAgCgOg");
	this.shape_1011.setTransform(5.3759,127.8758);

	this.shape_1012 = new cjs.Shape();
	this.shape_1012.graphics.f("#BCAC9D").s().p("AgLgEQgCgBAAgEQAcATgBAAIgZgOg");
	this.shape_1012.setTransform(10.938,116.9418);

	this.shape_1013 = new cjs.Shape();
	this.shape_1013.graphics.f("#CDBAA8").s().p("AhABEIgTgBIAAgIIAAiAQADA+BHAFQATABgMAbQAVAgA0ABIANAAQg8ALgxAAQgUAAgTgCg");
	this.shape_1013.setTransform(8.625,115.6607);

	this.shape_1014 = new cjs.Shape();
	this.shape_1014.graphics.f("#FDF6E0").s().p("AgwANQgCgCAAgEQBFAVAAg0QABgqAQAiQAXAAgLBQQg+gDgiggg");
	this.shape_1014.setTransform(10.3396,91.0145);

	this.shape_1015 = new cjs.Shape();
	this.shape_1015.graphics.f("#AC9C85").s().p("AguAHIgGAAIAAgHIAAgIQAuAIA1AAIAGAAQgcAJgmAAQgPAAgSgCg");
	this.shape_1015.setTransform(5.525,96.6796);

	this.shape_1016 = new cjs.Shape();
	this.shape_1016.graphics.f("#7C6C5D").s().p("AgfAMIAAgfQARASAfgRQAJgFAGARQAEANhDANIAAgIg");
	this.shape_1016.setTransform(3.4362,84.9194);

	this.shape_1017 = new cjs.Shape();
	this.shape_1017.graphics.f("#A39281").s().p("Ag3A4IAAgYQBDgNgEgOQgGgQgIAEQggARgRgRIAAgJIAAgfQAlggAaAhQASAUAVggQACgCADAMQABAEADAFQADA9giAaIhKAQIgGAAIAAgIg");
	this.shape_1017.setTransform(5.8411,83.7498);

	this.shape_1018 = new cjs.Shape();
	this.shape_1018.graphics.f("#A8967E").s().p("AgVAMIAAgfQBTARhNAVIgGABIAAgIg");
	this.shape_1018.setTransform(2.4278,71.225);

	this.shape_1019 = new cjs.Shape();
	this.shape_1019.graphics.f("#FCF6E5").s().p("AAAA4QgFgLABgGQABgGgOgEQgtAcgegkIAAgIIAAhQQBFAhAdAHQg4g5A/ARQAvgzAhA7QgHAxgYgZIAAAIQgfAYAXA7QAFARgJAMQgHAHgHAAQgRAAgTgkg");
	this.shape_1019.setTransform(9.55,63.1474);

	this.shape_1020 = new cjs.Shape();
	this.shape_1020.graphics.f("#B99C8B").s().p("AgNAAIAAgHQAyAJgsAGIgGAAIAAgIg");
	this.shape_1020.setTransform(1.6047,39.45);

	this.shape_1021 = new cjs.Shape();
	this.shape_1021.graphics.f("#AE9986").s().p("AhJAGIAAgHIAAgIQBHADBHALIAFABQgaAEglAAQgkAAgwgEg");
	this.shape_1021.setTransform(7.7,50.125);

	this.shape_1022 = new cjs.Shape();
	this.shape_1022.graphics.f("#FEF1DD").s().p("AgNgKQgCgDAAgEQAgAjgBAAIgdgcg");
	this.shape_1022.setTransform(4.9129,4.9729);

	this.shape_1023 = new cjs.Shape();
	this.shape_1023.graphics.f("#C3B4A7").s().p("AgYgEQAYAAAYAEQAAAAAAAAQABAAAAAAQAAABAAAAQAAABAAABIgGABIgQABQgSAAgJgJg");
	this.shape_1023.setTransform(173.45,146.9926);

	this.shape_1024 = new cjs.Shape();
	this.shape_1024.graphics.f("#EADCCF").s().p("AgIApQgVgEgWAAQAAgBAAAAQAAgBAAgBQgBAAAAgBQAAAAAAAAQghgJACgpIABgRIADAAIABgCQACgCAAgEQBkgJA3ApQAGAEAAALQgJAogzAAQgPAAgSgEg");
	this.shape_1024.setTransform(178.0467,152.4069);

	this.shape_1025 = new cjs.Shape();
	this.shape_1025.graphics.f("#C6B6A8").s().p("AgqAQQAqAAALgeQgCAoAhAJQAAABABAAQAAAAAAABQAAAAAAABQABABAAABIgHAAIgOAAQgsAAgVgYgAAPgnIAEAAQAAAEgCACIgCABIAAgHg");
	this.shape_1025.setTransform(168.5,152.15);

	this.shape_1026 = new cjs.Shape();
	this.shape_1026.graphics.f("#EDDFD2").s().p("AA+AoIhJAAQAAgBAAgBQAAAAAAgBQgBAAAAgBQAAAAAAAAQgYgEgZAAQgDAAgCgBQgcgRAIgtIAAgIIBEAAIAHAAIBDAAIAGAAQAMBJALg/IADANQACAKgFAUQgFAYgMgGIAAAIIgGAAg");
	this.shape_1026.setTransform(177.1656,143.275);

	this.shape_1027 = new cjs.Shape();
	this.shape_1027.graphics.f("#C2B3A6").s().p("AgmAGQgCgCAAgEIAAgHIAHAAQAkAAAlAEIAAADIgGAAIhDAAIAAAIQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_1027.setTransform(171.9,139.25);

	this.shape_1028 = new cjs.Shape();
	this.shape_1028.graphics.f("#EDDFD3").s().p("ABHAvQg3gOg6AAQAAgEgCgDQgggpg8gPIgBgIIgFgIIA+AAIAHAAQB7gIBaAfQADABAAAIIAAAPQgSAwglAAQgIAAgJgCg");
	this.shape_1028.setTransform(172.825,134.328);

	this.shape_1029 = new cjs.Shape();
	this.shape_1029.graphics.f("#C8BEB4").s().p("AgegEQAeAAAeAEIABAAIAAADIgBAAIgFABIgTABQgXAAgNgJg");
	this.shape_1029.setTransform(152.35,146.9926);

	this.shape_1030 = new cjs.Shape();
	this.shape_1030.graphics.f("#C7BDB3").s().p("AAAAFIgMgCQgHgDgFgEIArAAIAGAAIAAAHIgGAAIgRACIgCAAg");
	this.shape_1030.setTransform(155.45,142.1544);

	this.shape_1031 = new cjs.Shape();
	this.shape_1031.graphics.f("#F5EBE1").s().p("AAJAcIgBgEIgBgBQgdgDgeAAQgBAAgBgBQAAAAgBAAQAAAAgBAAQAAgBgBAAQgKgNACgZIAAgIIAsAAIADAAIADAAQAFAGAHACIAKACQAJABALgCIAHgBQAMAAAFAGQAnArg6AAIgXgBg");
	this.shape_1031.setTransform(154.5592,144.5419);

	this.shape_1032 = new cjs.Shape();
	this.shape_1032.graphics.f("#A49491").s().p("AAAAFQgRAAgBgMQA7gEgkASQgCACgDAAg");
	this.shape_1032.setTransform(144.925,128.7402);

	this.shape_1033 = new cjs.Shape();
	this.shape_1033.graphics.f("#3A2D2B").s().p("AgkApQgLgFgPABIgGAAIAAgIQALgNgEgbIgBgIIAAgIQBEgVAYAEIAEABIACAAQASAIAHAMQAWAhgigVQgHAQgIALQgVAegaAAQgLAAgMgFg");
	this.shape_1033.setTransform(149.3414,133.978);

	this.shape_1034 = new cjs.Shape();
	this.shape_1034.graphics.f("#4A3C36").s().p("AAGAeQgcAMgMgOIgIgKQAPgRgigrIAGAAIAGAAIAHAAQADAEAEADQACABADAAQA6APAgAqQACADAAAEIAAAIIgGAAIgGABQgLAEgJAAQgPAAgJgNg");
	this.shape_1034.setTransform(162.275,134.6816);

	this.shape_1035 = new cjs.Shape();
	this.shape_1035.graphics.f("#BEAEA1").s().p("AgaALQgEgDgDgEQAAgEgCgCIgEgJQAnAAAoAEIABAEIgHAAIg9AAIAFAIIABAHQgDAAgCgBg");
	this.shape_1035.setTransform(161.35,129.9975);

	this.shape_1036 = new cjs.Shape();
	this.shape_1036.graphics.f("#95887F").s().p("AgKAAQgBgBAAAAQAAAAAAgBQgBAAAAgBQAAgBAAgBQAbALgDAAIgWgGg");
	this.shape_1036.setTransform(140.569,106.838);

	this.shape_1037 = new cjs.Shape();
	this.shape_1037.graphics.f("#A49A90").s().p("AgqgEQAqAAArAEIAAADIgGAAIgbACQgfAAgVgJg");
	this.shape_1037.setTransform(144.9,109.1526);

	this.shape_1038 = new cjs.Shape();
	this.shape_1038.graphics.f("#9F9085").s().p("AgVAAQAhgIADAAIAHAAQAAAEgCADQgBAAAAAAQAAABgBAAQAAAAgBAAQgBAAgBAAIAAAHIgGABIgLABQgOAAgFgJg");
	this.shape_1038.setTransform(157.625,107.9176);

	this.shape_1039 = new cjs.Shape();
	this.shape_1039.graphics.f("#A9998F").s().p("AArAEIg/AAIgdAAIAAgHIAdAAIA/AAIAHAAIAAAHIgHAAg");
	this.shape_1039.setTransform(154.825,103.425);

	this.shape_1040 = new cjs.Shape();
	this.shape_1040.graphics.f("#B8A9A0").s().p("AgGAcIgGAAIAAgIQABAAAAAAQABAAABAAQAAAAABgBQAAAAAAAAQACgDAAgEQAAgEACgCQAJgKgLgPIAAgIQAiARgbAgQgBACAAAEIgGAAg");
	this.shape_1040.setTransform(160.4629,105.825);

	this.shape_1041 = new cjs.Shape();
	this.shape_1041.graphics.f("#BFAFA0").s().p("AgbgEQAbAAAcAEIAAADIgGABIgRABQgVAAgLgJg");
	this.shape_1041.setTransform(132.15,145.3926);

	this.shape_1042 = new cjs.Shape();
	this.shape_1042.graphics.f("#FEEDDE").s().p("AgLAIIgNAAIAAgIIAAgHQBUAGg8AJIgFAAIgGAAg");
	this.shape_1042.setTransform(129.9793,134.4);

	this.shape_1043 = new cjs.Shape();
	this.shape_1043.graphics.f("#9F8C7D").s().p("AACAbQgFgQgDgWQADgEACgFQABgDAAgEQAKAQgEAfIgBAIQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBAAAAg");
	this.shape_1043.setTransform(104.6153,150.925);

	this.shape_1044 = new cjs.Shape();
	this.shape_1044.graphics.f("#BBAEA2").s().p("AgZgBQBmADhmAAg");
	this.shape_1044.setTransform(106.4625,141.05);

	this.shape_1045 = new cjs.Shape();
	this.shape_1045.graphics.f("#5A493D").s().p("An3CZQADg4gLhCIgCgHIAEgBQAogKAigNIgDAAQgXgPA8ADQApACBHABQA4gBAYAaQAEAUAPgyIAEgEQACgBAAgFQA+gVAZgjIgGAAQgogNg7AFIAAgIQA3AAA4gDIAAgFQANgVAJgaQAAAAAAAAQAAgBABAAQAAAAABAAQABAAAAAAQAAAEgBAEQgCAEgDAEQADAXAGAQQAAABAAAAQAAAAABAAQAAAAABAAQAAAAABAAIABAQIgBAAIABABQgBAQgIADIgKAFQA8AeBLgOQAQASAogSIAGAAQAsgBAZAQQAKgFAOgDQB0gRA6AiQAAgEACgCQATgSAigDQAWgCAdAFQAYAZgYAeIAMAAIAKAAQgkAEglADQhlAFhtgMQAAAAgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgJgLBFAEQATgLgqgIQhDgMgQAfQAuAGg0AAQiGABiKAJQgOAOgRAKQgmgCgeACQgIAegOgIQgcgRgfAbQApALAtAJQABAAAAABQAAAAAAAAQAAABAAABQAAABAAABIgGABQgpAOgigPQACgNgOAEQhCASghAWIgVgEQgoAGg5APgAlNBAQgDAWAdgNQAKgEgEgDQgNgGgIAAQgHAAgEAEgAG8gSQAoAagqggQAAAFACABg");
	this.shape_1045.setTransform(111.225,163.4);

	this.shape_1046 = new cjs.Shape();
	this.shape_1046.graphics.f("#A19080").s().p("AjSAQQB3gzC/AKQBCAEAtAOQibAAiaAHIgeAAQgaAbgYAAQgQAAgQgLg");
	this.shape_1046.setTransform(115.7,128.7876);

	this.shape_1047 = new cjs.Shape();
	this.shape_1047.graphics.f("#EEDDCE").s().p("ACqAvQg6gGg8AAIAAgEQgegEgeAAIgGAAIhkAAIABgIQAEgfgLgRQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAAAAAQgKAZgMAWIgGAAIhXAAIABgIQASg2gsgKIBXAAIAHAAQDpgFDGApQACAAAAALIAAAQQgFAgg7AAQgOAAgQgBg");
	this.shape_1047.setTransform(116.65,150.476);

	this.shape_1048 = new cjs.Shape();
	this.shape_1048.graphics.f("#BFB1A2").s().p("AgYgEQAYAAAYAEIABADIgGABIgQABQgSAAgJgJg");
	this.shape_1048.setTransform(109.525,114.7926);

	this.shape_1049 = new cjs.Shape();
	this.shape_1049.graphics.f("#AD9774").s().p("Ag3gEIAAgJQAuARBBADIAAAEIgGAAQgaADgTAAQgxAAgLgSg");
	this.shape_1049.setTransform(103.925,120.4639);

	this.shape_1050 = new cjs.Shape();
	this.shape_1050.graphics.f("#BFA88F").s().p("AgkgCIgKgGQA1AAAYAGQAJACAFACQACABAAAEIgHABIgRABQgjAAgYgLg");
	this.shape_1050.setTransform(105.475,99.8538);

	this.shape_1051 = new cjs.Shape();
	this.shape_1051.graphics.f("#B09A86").s().p("AghAAIAAgIIAxAAIAGAAQgCALAOAAIAAAEIgGABIgTABQgaAAgQgJg");
	this.shape_1051.setTransform(114.775,100.6829);

	this.shape_1052 = new cjs.Shape();
	this.shape_1052.graphics.f("#AE9C90").s().p("Ag6ADIAAgHQBAgGAvAMIAGABIAAAEQghgHhUADg");
	this.shape_1052.setTransform(144.6,122.8553);

	this.shape_1053 = new cjs.Shape();
	this.shape_1053.graphics.f("#998678").s().p("AgogEIBKAAIAGAAIAAAHIgGAAIgZACQgdAAgUgJg");
	this.shape_1053.setTransform(134.65,122.8526);

	this.shape_1054 = new cjs.Shape();
	this.shape_1054.graphics.f("#A48E7A").s().p("AgkAMQgjgFA0gIQAFgBg1gOQBFgPBBATQAAAAABAAQAAABAAAAQAAABAAABQAAAAAAABQg/gNgFAsQgIgHgcgEg");
	this.shape_1054.setTransform(117.575,123.2018);

	this.shape_1055 = new cjs.Shape();
	this.shape_1055.graphics.f("#4C3732").s().p("AgegBQB5ADh5AAg");
	this.shape_1055.setTransform(127.45,104.05);

	this.shape_1056 = new cjs.Shape();
	this.shape_1056.graphics.f("#C2B1A4").s().p("AAWAIIgkAAIAAgEQgPAAACgLQAYAIAfADIAAAEIgGAAg");
	this.shape_1056.setTransform(119.7379,100.6);

	this.shape_1057 = new cjs.Shape();
	this.shape_1057.graphics.f("#9B8B83").s().p("AgXABIAAgDQA+AFgTAAIgrgCg");
	this.shape_1057.setTransform(134.9375,106.5279);

	this.shape_1058 = new cjs.Shape();
	this.shape_1058.graphics.f("#B29F97").s().p("AghgEQAhAAAiAEIAAADIgGAAIgWACQgYAAgPgJg");
	this.shape_1058.setTransform(125.95,101.9026);

	this.shape_1059 = new cjs.Shape();
	this.shape_1059.graphics.f("#BFB3AD").s().p("AgLgIQALAAALAEQABAAAAAAQAAABAAAAQABABAAAAQAAABAAABIAAAHIgGABIgHABQgPAAAEgRg");
	this.shape_1059.setTransform(133.0638,88.6272);

	this.shape_1060 = new cjs.Shape();
	this.shape_1060.graphics.f("#A99791").s().p("AgeAEIAAgHQB3ADhxAEIgGAAg");
	this.shape_1060.setTransform(137.4269,88.95);

	this.shape_1061 = new cjs.Shape();
	this.shape_1061.graphics.f("#B6A69E").s().p("AhZgKICzALIAAAEQghAGgfAAQg8AAg3gVg");
	this.shape_1061.setTransform(92.45,75.9502);

	this.shape_1062 = new cjs.Shape();
	this.shape_1062.graphics.f("#BFB9B0").s().p("AgYgHQAYAAAYAEQAAAAAAAAQABAAAAABQAAAAAAABQAAABAAAAIgHAAIgMAAIAAAIIgGAAIgFAAQgSAAgBgPg");
	this.shape_1062.setTransform(176.55,91.795);

	this.shape_1063 = new cjs.Shape();
	this.shape_1063.graphics.f("#A88A77").s().p("AgUAGQgIgFACgLQBgAKhJALIgDAAQgHAAgHgFg");
	this.shape_1063.setTransform(161.8902,84.015);

	this.shape_1064 = new cjs.Shape();
	this.shape_1064.graphics.f("#BBB1AB").s().p("ACMA6QAQgTATAHQAWAJARACIAAAOQghgMgpgBgAgagoQhrgEhQgaQDSASDXACIABAiQh1gTh6gFg");
	this.shape_1064.setTransform(160.05,76.3125);

	this.shape_1065 = new cjs.Shape();
	this.shape_1065.graphics.f("#AD9A8E").s().p("AgbgJQAhAIAKgGQADgCADAAQAKABgHANQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAIgGAAQgKADgHAAQgXAAgDgTg");
	this.shape_1065.setTransform(169.415,87.0657);

	this.shape_1066 = new cjs.Shape();
	this.shape_1066.graphics.f("#B0917C").s().p("AgbAEQAzgLAEgIIgCAMQgCATgRAAQgMAAgWgMg");
	this.shape_1066.setTransform(155.75,82.5371);

	this.shape_1067 = new cjs.Shape();
	this.shape_1067.graphics.f("#CCB2A1").s().p("AgPBAQAAAAgBAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQgTgvg0AHQAAgEgCgCQgUgZgWgYQAsACATADQBJANgrgiQA+gpAhBAQAAAAABABQAAAAAAAAQABAAABAAQAAAAABAAQAIhBAOAtIAOAGQAEACADAEQgHAmAmAZQgDAAgCACQgKAGgjgIQAFAaAngJIAGAAQACAMgOABQgxAEgrAAIgsgBgAAPARQAJAGAIgCQBKgLhhgKQgCALAIAGgAg0AAQAyAcADgkIACgMQgDAJg0ALg");
	this.shape_1067.setTransform(158.2625,82.9608);

	this.shape_1068 = new cjs.Shape();
	this.shape_1068.graphics.f("#C4BCB6").s().p("AgngHQAsgDAeAKIAGAAIAAAJIgHAAIgLAAQgnAAgXgQg");
	this.shape_1068.setTransform(168.8,53.0958);

	this.shape_1069 = new cjs.Shape();
	this.shape_1069.graphics.f("#B7AFA9").s().p("AgoABIAAgIIBSAFIAAAKQgrgCgngFg");
	this.shape_1069.setTransform(177,53.8875);

	this.shape_1070 = new cjs.Shape();
	this.shape_1070.graphics.f("#C1AEA0").s().p("AgYgEQAYAAAYAEQAAAAAAAAQABAAAAAAQAAAAAAABQAAABAAABIgHAAIgQACQgRAAgJgJg");
	this.shape_1070.setTransform(92.75,143.7526);

	this.shape_1071 = new cjs.Shape();
	this.shape_1071.graphics.f("#9C8C7C").s().p("AhRARQgvgBgmAFQhVALgpgYIgGAAIgMAAIAAgIQA9AEgUgWQAAgBAAAAQAAAAAAAAQABgBAAAAQABAAABAAQAOgEAjgHIAAAIQAAAEgCACQgBABAAAAQAAAAgBAAQAAABgBAAQgBAAAAAAQCaAYDZgBIAGAAIANAAIAGAAQBLAaAzgmQAEgDACgIQABgEAEgEIAAAIQAEAbgLAMIAAAIQi8gMjEgDg");
	this.shape_1071.setTransform(112.0783,134.425);

	this.shape_1072 = new cjs.Shape();
	this.shape_1072.graphics.f("#E8D8CA").s().p("AB5AfIAGAAQA8gKhVgGIAAAIIAAAIIgGAAQjZACiagaQAAAAABAAQABAAAAAAQABgBAAAAQABAAAAAAQACgDAAgDQANgOAYgCIAGAAQAoAcAqgsIAegBQCagHCbAAIA4AAIAHAAQAAANASgBIAAAEIgDAAQgBAMgOgEIAAAIIAAAIQgEADgBAFQgCAHgEADQgfAXgnAAQgaAAgegKg");
	this.shape_1072.setTransform(117.275,132.095);

	this.shape_1073 = new cjs.Shape();
	this.shape_1073.graphics.f("#A79687").s().p("AgVADIAAgHQARgJAZAFIABAEIgGAAQgYACgNANIAAgIg");
	this.shape_1073.setTransform(92.425,130.8888);

	this.shape_1074 = new cjs.Shape();
	this.shape_1074.graphics.f("#FBF6E5").s().p("Ah1ggQAegGA5AFIAGABQBHAABHAEIAAAEIAAAYQAAALgCABIh4AVQgUADgQAAQhNAAAAhEg");
	this.shape_1074.setTransform(76,150.6076);

	this.shape_1075 = new cjs.Shape();
	this.shape_1075.graphics.f("#CEBCB0").s().p("Ag+AfQgIgDgGgFQA9gbA8gfQACgBAAgEIAGAAIAGAAIAMAAIAGAAQAAAEgBABQhAAcg6AeQAKAFANADQAWAFAdgBIAAAEIgGABQgPABgMAAQgiAAgXgKg");
	this.shape_1075.setTransform(75.05,139.3303);

	this.shape_1076 = new cjs.Shape();
	this.shape_1076.graphics.f("#F1E1D3").s().p("AEaAzIAAgEQgcgEgcAAIgGAAQilgGipgCQAAgBAAgBQAAgBAAAAQAAgBAAAAQAAAAgBAAQgYgEgZAAIgGAAIh2AAIAAgEQgeABgWgFQgMgDgKgFQA6gfBAgcQACgBAAgEQApAZBVgMQAmgFAvABQDEADC8ANIABAHQAHAXgDARQgFAjgvAAQgMAAgQgDgAgbAHQBlAAhlgEg");
	this.shape_1076.setTransform(106.7061,140.5719);

	this.shape_1077 = new cjs.Shape();
	this.shape_1077.graphics.f("#6A584E").s().p("AgegCQAsgMARATIgNACIgOABQgWAAgMgKg");
	this.shape_1077.setTransform(61.1,123.434);

	this.shape_1078 = new cjs.Shape();
	this.shape_1078.graphics.f("#A08A67").s().p("AgTAHIAAgHQANgLASgEIAGgBIAAAIQAGAZgQAAQgJAAgSgKg");
	this.shape_1078.setTransform(96.5657,121.6434);

	this.shape_1079 = new cjs.Shape();
	this.shape_1079.graphics.f("#998577").s().p("AARAGQgMgYgkgDIA3AAIAGAAQAEArgGAAQgEAAgHgQg");
	this.shape_1079.setTransform(87.2391,126.161);

	this.shape_1080 = new cjs.Shape();
	this.shape_1080.graphics.f("#645144").s().p("AG5BpIgGAAIgsAAIgCAAIgEAAIgsAAIgFAAQgtACABgqQAPgBALAFQAqAQAdgpQAIgMAGgQQAjAWgWgiQgHgLgSgIIgCAAIgEgBQgYgEhFAUIAAgHQAOAEACgMIACAAQADAAADgBQAkgTg8AEIgHAAIg3AAQgugOhBgEQi/gKh4A0IAAgEQgagFgRAJIAAAHQgjAHgNAEQgBAAgBABQgBAAAAAAQgBAAAAABQAAAAAAAAQAUAYg9gFIAAAIIgGAAIgGAAQgNAAgJAGQhEAohaATIgEAAQAAhFgPgzQAogSA1gCIAAgEQBDANAagtIAyAAIAGAAQAlADAMAZQAUArgHhHIAAgIQAPgJAWABIAGAAQAvAagJgrIAAgHQAOAaBcgKIAGAAIAGAAIAGAAQA0ANgFABQgzAJAjAGQAbAEAKAHQAFgtA+ANIA4AAIAGAAQAcAOAvgGIAGAAQBVgDAhAHIAAgEIAXABQAxAFAaANQAAAAABABQAAAAAAABQAAAAAAABQAAABAAABQgvARAKAfIgGAAQAiArgPARIAIAKQAMAOAdgMQAOAUAfgLIAFgBIAAAIQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBABQgOAegmAAQgSAAgZgHg");
	this.shape_1080.setTransform(113.85,131.1833);

	this.shape_1081 = new cjs.Shape();
	this.shape_1081.graphics.f("#CEBFB2").s().p("AhAAUQA8geA/gZIAGgBQAAAEgCACQguAeg4AUQgCAMAOAAIAAAEIgGAAIgJABQgUAAgCgRg");
	this.shape_1081.setTransform(72.575,119.5897);

	this.shape_1082 = new cjs.Shape();
	this.shape_1082.graphics.f("#F1E2D2").s().p("AH5BIQhZgOhRgPIADgEQgTg8hGAVIgWAHIgGgBQgvgMhBAGIgHAAIhKAAIgGAAIg3AAQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAgBAAAAQhBgThHAQIgGAAIgGAAIAAgEQhCgDgugSIAAAJIgGAAQgTAEgMAMIAAAIIgGAAQgXgBgPAIIAAAIIgGAAIg4AAIgGAAIgyAAIgFgBQgggNgxAGIAAgEQgPAAACgLQA6gUAugfQACgCAAgEQAMAAALgDQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAgBIAHAAIAGAAQBHAQB5AFIG4ARIBCADQCtAJCqAXQABAAAAAHIAAAQQgCAzg7AAQgNAAgOgCg");
	this.shape_1082.setTransform(127.8129,122.4806);

	this.shape_1083 = new cjs.Shape();
	this.shape_1083.graphics.f("#413532").s().p("Ah0A+IgBgMIAAg3QAwgGAggGIABgFQACgQAvAQIAGAAQAdgnBAgBIAGAAQAAA3g9AUQg+AWglgRQAGAthEAAIgMgBg");
	this.shape_1083.setTransform(69.7752,113.3152);

	this.shape_1084 = new cjs.Shape();
	this.shape_1084.graphics.f("#F8EFE2").s().p("AHVA3IgGAAIg4AAIgGAAQh7gFh6gHQjNgMjJgQIAAgEQgZgEgYAAIgHAAQhQAKhegKIgBgHIgFgIQAggUA4AHIAJgHQAGgFADgIQCUgWC7AOIATAAIA3AAIAGAAQAeAOAygFIAHgBIAfAAIADAAIADAAQCWAGCJAVIAABFIApgBIgJABIgJAAg");
	this.shape_1084.setTransform(137.075,113.6258);

	this.shape_1085 = new cjs.Shape();
	this.shape_1085.graphics.f("#C4B4A7").s().p("AjfAkQgLgDgBgNQAhgkAiAJQABAAAAAAQAAAAAAABQAAAAAAABQAAABAAABQAaAAAfggQCwAACpAMIABAEIgTgBQi7gNiTAWQgDAIgGAEIgJAGQg4gHggAUIAGAJIABAHIgHAAg");
	this.shape_1085.setTransform(110.75,110.675);

	this.shape_1086 = new cjs.Shape();
	this.shape_1086.graphics.f("#ABA195").s().p("AgVgHIAAgIIAlgIIAGAAQghANAHAig");
	this.shape_1086.setTransform(89.325,103.8);

	this.shape_1087 = new cjs.Shape();
	this.shape_1087.graphics.f("#F3E3D2").s().p("Ag5glIAyAAIAGAAIASAAIAGAAQAAAZAYADQAjAFg1AmIgGABQgRADgNAAQhCAAAQhLg");
	this.shape_1087.setTransform(55.6943,147.8698);

	this.shape_1088 = new cjs.Shape();
	this.shape_1088.graphics.f("#CFBEAE").s().p("AkoBUIgGABQgSADAFg8QgEgPALgBIDsgIQhEgNhXAJQhmAKAOhmICuAEIAAAEIgGAAIgyAAQgTBcBkgTIAGAAQA1gogjgFQgYgDAAgZQBNgIAnAYQANAJASADQAEABADAEIgGgBQg4gFgeAGQAABSBwgRIB5gUQACgBAAgMIAAgYQAGAMAGAAQA2gDglgLQg1gShYgMQBzAABzAEIAAAEIgGAAIhXAAQAsAJgSA3IgBAHIgGAAIggAAQgFAUASgDIAGgBQA8gGAoANIAGABQgaAig9AWIgNABQhoAFhrgOIgDAEQAMAIhAgMQgDgEgBABIgWAGQg+AOg+AAQgxAAgxgJg");
	this.shape_1088.setTransform(69.6902,152.5396);

	this.shape_1089 = new cjs.Shape();
	this.shape_1089.graphics.f("#DFCDBE").s().p("AgBAcIgBgIIgGgvQAZAOgMAiQgBADAAAEIgFAAg");
	this.shape_1089.setTransform(40.2395,138.825);

	this.shape_1090 = new cjs.Shape();
	this.shape_1090.graphics.f("#D7C5B6").s().p("AAMAoIgqAAQAAgEACgDQAMgigbgOIAHAvIAAAIQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgTgfgCgvIB1AAIAGAAIAAAEQgWAEgWAAQAJAogHAYQgBADgBAEIgGAAg");
	this.shape_1090.setTransform(43.7,137.625);

	this.shape_1091 = new cjs.Shape();
	this.shape_1091.graphics.f("#E6D5C4").s().p("AhHAlQABgEABgEQAHgXgJgpQAWAAAWgEIAAgEIAHAAIA2AAQAjANACArQAAAMgDABQgzASgoAAQgaAAgWgHg");
	this.shape_1091.setTransform(52.7,137.9853);

	this.shape_1092 = new cjs.Shape();
	this.shape_1092.graphics.f("#ECDACB").s().p("AgiACQgCgCAAgDQAhg8AcA0IAEgCQAKgGgCAnQgBAQgLAAIgGAAQgdAAgYgig");
	this.shape_1092.setTransform(21.949,148.5246);

	this.shape_1093 = new cjs.Shape();
	this.shape_1093.graphics.f("#C9B8A8").s().p("AinCnQgOgGAOgEQAygCg9gRQgEgBgDgEIAAgJIAAggICbggIgGAAQhRgChEAKIAAgIIAAg/QBogFArALQACABACAHQAAAAABAAQAAAAAAAAQABABAAAAQABAAABAAQADgdgLgUQAGAFAOgDQAhhRhRgQQgBAAAAgIQgJg3AiAXQAEAxAmgBQAygfBQAEQATABARAGIAIAEQARAegRAqIgIAAQg3gBhKARQA3gGBKANIAIABIAEgFQACgDAGAAQABBCgMgCQgBAAAAgIQgBgKgHAHQgGAHgLAUIhwAQQBRAJAdgJQAKgDAJAHQAIAGAGAOQgKgCgEAOQgFAOAAAeQhnAThqARQgEABgDAEQgpgZgbARQAPAXgRAAQgMAAgegNgAAABEIAAAEQApgIgGAAIgjAEgAgFgDQAAADACACQAaAmAhgEQALAAAAgQQADgngLAGIgDACQgOgYgOAAQgRAAgQAgg");
	this.shape_1093.setTransform(18.8788,148.5264);

	this.shape_1094 = new cjs.Shape();
	this.shape_1094.graphics.f("#E1CEBF").s().p("AgigIQgCgDAAgEQAkgUARAvIAGgNQAGgMAIAeQgJAFgKAAQgYAAgcgeg");
	this.shape_1094.setTransform(25.725,128.7318);

	this.shape_1095 = new cjs.Shape();
	this.shape_1095.graphics.f("#C5B5A8").s().p("AAoAwQg2ABgrgNQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAgBQgLggAFgvQA1AQA+AQIALADQADABAAALQAHAsgVAEIgFAAIgGAAg");
	this.shape_1095.setTransform(30.3856,116.7496);

	this.shape_1096 = new cjs.Shape();
	this.shape_1096.graphics.f("#B8A89A").s().p("AgXgPQAnAAgMgQIAGAEQAeATghAoIgBAAQgNAAgQgvg");
	this.shape_1096.setTransform(17.5837,114.3003);

	this.shape_1097 = new cjs.Shape();
	this.shape_1097.graphics.f("#E2D1BE").s().p("AgPAiQgFgCgBgCIgShFIAmAAIAFAAQAMAAAEAFQAyBKhOAAQgDgEgEgCg");
	this.shape_1097.setTransform(50.7571,118.325);

	this.shape_1098 = new cjs.Shape();
	this.shape_1098.graphics.f("#E4D3C1").s().p("AAGATIgRAAQAAgEABgDQAIgOgPgKQArgTgJAjIgEAPIgHAAg");
	this.shape_1098.setTransform(40.5938,119.6081);

	this.shape_1099 = new cjs.Shape();
	this.shape_1099.graphics.f("#C7B6A9").s().p("AhTAbQAAgEgCgCQgUgVgVgUQAuAUAvgjIASgDQAjgHArACQAfABAhAGIgGABQgWAHgJAYQgMglgHBMIAAgEIgIAEQgXAKgfAAQgnAAg1gSgAhGgEQAAAEACABQAoAsAfgSQgHgdgGAKIgGAPQgMghgWAAQgJAAgLAGg");
	this.shape_1099.setTransform(29.125,127.6746);

	this.shape_1100 = new cjs.Shape();
	this.shape_1100.graphics.f("#98887A").s().p("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");
	this.shape_1100.setTransform(107.95,172.175);

	this.shape_1101 = new cjs.Shape();
	this.shape_1101.graphics.f("#E0CDBE").s().p("Ai5gLQAJgYAWgHIAGgBIAGgBQBegPAlAoQAGAAAFgCQBWgeBkAYQgXAIggAAQhbgBgiA4IhUALQgPACgNAAQhLAAgEg8g");
	this.shape_1101.setTransform(56.725,128.376);

	this.shape_1102 = new cjs.Shape();
	this.shape_1102.graphics.f("#E5D2C2").s().p("AgRAGQgHgFACgMQBVADhJAUg");
	this.shape_1102.setTransform(40.4099,115.45);

	this.shape_1103 = new cjs.Shape();
	this.shape_1103.graphics.f("#D7C5B3").s().p("AgYAkIAFgQQAIgigsARQAQAKgIAPQgCAEAAAEQAAAAgBAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQgRgUADg6IA6ABQAMADAQAAQAQABAOgCIATABIAAAEIgGAAIglAAIASBGQAAACAGACQAEACADAEIgGAAIgWABQgeAAgWgJgAg4gSIAHAFQBJgUhVgDQgCAMAHAGg");
	this.shape_1103.setTransform(44.3025,117.975);

	this.shape_1104 = new cjs.Shape();
	this.shape_1104.graphics.f("#AE9F8E").s().p("Ag6AMQA6AMAhgKIAMgFQACgBAAgEIAAgJQABgzAHAzIAEAZIgGAAIgGAAIAAAIIgGABIgIABIgaABQgpAAgYgTg");
	this.shape_1104.setTransform(32.2,100.1581);

	this.shape_1105 = new cjs.Shape();
	this.shape_1105.graphics.f("#816F5F").s().p("AgkgDIAGAAIAGAAIA3AAIAGAAIAAAEQglADgkAAIAAgHg");
	this.shape_1105.setTransform(40.625,102.6);

	this.shape_1106 = new cjs.Shape();
	this.shape_1106.graphics.f("#F6E5D7").s().p("AhcgBQACgLgMgUQAJAAAIgDQAAAAABgBQAAAAAAgBQAAAAAAgBQABgBAAgBQBIAHBSgCQA1gBgjAUIgGAAQgnACgjAGIgGAAQg9AEAGAsIgNABQgjAAAIgqg");
	this.shape_1106.setTransform(57.7421,107.9362);

	this.shape_1107 = new cjs.Shape();
	this.shape_1107.graphics.f("#E4D1C0").s().p("AgSAyQgQAAgNgDQg4gNgBg7IAAgIIAAgQIBuAAIAHAAQAAABgBAAQAAABAAABQAAAAAAABQgBAAAAAAQgIAEgIAAQAKATgBALQgIAyAvgJQgFgrA9gEIAGAAIAAAIQgZgEgCANQgGArg8AGIgWABIgIAAg");
	this.shape_1107.setTransform(48.05,108.8813);

	this.shape_1108 = new cjs.Shape();
	this.shape_1108.graphics.f("#AD9C8F").s().p("AAoABQhSAChIgGIgGAAIhwAAIAAAPIAAAIIgGAAIAAgIIAAgXQAlAAAlgEIABgEIAxAAIAGAAQCkAOCxACIAGAAIAAADQhlAChPASQAigUg1ABg");
	this.shape_1108.setTransform(60.8,104.225);

	this.shape_1109 = new cjs.Shape();
	this.shape_1109.graphics.f("#AC9B8E").s().p("AgVgEQASgBAMgDIAAAEIgGAAQgCALAPgDIAGgBQAAABAAABQAAABAAAAQgBABAAAAQAAAAAAAAIgOACQgTAAgJgNg");
	this.shape_1109.setTransform(36.575,82.5658);

	this.shape_1110 = new cjs.Shape();
	this.shape_1110.graphics.f("#947E71").s().p("AgIAAIgGAAQgPAEACgLIAGAAIArAAIAGAAIAAAHIAAAIIgGAAIgIAAQgPAAgHgIg");
	this.shape_1110.setTransform(39.6571,82.9481);

	this.shape_1111 = new cjs.Shape();
	this.shape_1111.graphics.f("#A99B8B").s().p("AAvAMIAAgEQhGgEhIAAIAAgHIAAgIQA6ALBIgDIAGAAQBmAEhaALIgGAAg");
	this.shape_1111.setTransform(52.0039,83.3);

	this.shape_1112 = new cjs.Shape();
	this.shape_1112.graphics.f("#9F8C7B").s().p("AhDAbIAAgIIAAgIIAAgHIAAgoQAQBNBrgVIAGgBIAGAAQAAABAAABQAAABAAABQAAAAAAABQAAAAgBAAQgOAEgQgBQghAGgbACIgVABQgZAAACgJg");
	this.shape_1112.setTransform(43.716,90.6);

	this.shape_1113 = new cjs.Shape();
	this.shape_1113.graphics.f("#AF9F91").s().p("AArAIQgxgEgrgLIBcAAIAHAAIAAAHIAAAIIgHAAg");
	this.shape_1113.setTransform(31.925,92.55);

	this.shape_1114 = new cjs.Shape();
	this.shape_1114.graphics.f("#B3A69D").s().p("AHuAwQpTg3pfgoIgGAAQgMgDgBgNIANAAIAGAAQJEAnJXAwQCFALB8AQIAAANQh6gFhwgLg");
	this.shape_1114.setTransform(108.4375,57.8625);

	this.shape_1115 = new cjs.Shape();
	this.shape_1115.graphics.f("#968172").s().p("AAPAIQgVAAgPgIQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgCgCAAgEIAMAAIAHAAIAeAAIAGAAQAAAEgCACQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIAAAIIgHAAg");
	this.shape_1115.setTransform(39.675,62.8);

	this.shape_1116 = new cjs.Shape();
	this.shape_1116.graphics.f("#B5A497").s().p("AgSgBQANAAAGgHQACgBADAAQAGAAAFADQACABAAAEIgHAAIgMAAQAAADACADQAAAAABAAQAAABABAAQAAAAABAAQABAAAAAAIAAAEIgFAAQgOAAgFgLg");
	this.shape_1116.setTransform(36.875,62.1934);

	this.shape_1117 = new cjs.Shape();
	this.shape_1117.graphics.f("#BFAA97").s().p("AgbAIQAQgEANgGQALgFAKgGQACgCADAAQAAAEgCADIgFAGQgQARggABIAAgIg");
	this.shape_1117.setTransform(94.3,99.8);

	this.shape_1118 = new cjs.Shape();
	this.shape_1118.graphics.f("#F3EADE").s().p("AGCBGQhYgPhbgIQAAgEACgCQAbghgjgQIgGAAIhBAAIgcAAIAAAIIgGAAQhegNhogDIAAgEQgigEgiAAIgBgEQgggEgXgIIgGAAIgyAAIAAAIIgGAAIgGAAQAAgEgCgBQgFgDgJgDQgYgGg2ABQAAAAgBAAQgBAAAAAAQgBgBAAAAQgBAAAAgBQgJgIgSACIAAgIIAAgIIIDAdIAiACIECAPQAPABAQAFIABBdIgCAAQgOAAgSgDg");
	this.shape_1118.setTransform(139.6625,103.9009);

	this.shape_1119 = new cjs.Shape();
	this.shape_1119.graphics.f("#6D5C51").s().p("An6BxQgGgzgMguQgBgfAggEIAAgEIAAgIQAjgHAogBIAGAAQBQgSBkgCIAAgEQAMgBAMgDQAAAAAAAAQAAgBAAAAQABgBAAgBQAAAAAAgCIARAgQgHgiAhgOQAiAAAPgSIAFgHQACgDAAgEIAGAAQASgCAJAJQAAAAABABQAAAAABAAQAAAAABAAQAAAAABAAIAKAGQAdAOAvgDIAHgBIAGAAIAGAAQAWANAogEIAGgBIAlAAIAHAAQAVAOApgFIAGgBQBpADBeANIAGABIAcAAIBBAAIAGAAQAMAPgKALQgCACAAAEIgGgBQgEAAghAJQAGANAZgFIAGAAIAGAAIAAAEQgiAEgiAAIgDAAIgDAAIgfAAIgBgEQgrgEgrAAIgGAAIg4AAIgBgEQipgMixAAIgGAAQhfAPgwAQQAAAEgCABQgUALgVAIQAjAVgFACIgGABIgGAAIgGAAQgMAAgMACQh4AYhiAvIgBgIgAmiAIIgBAEQggAGgwAGIAAA4IABANQBQAEgGgxQAlARA/gVQA9gVAAg2IgGAAQhAABgdAmIgGgBQgYgHgMAAQgNAAgBAIgAE7gjQAwARgygVQAAABAAABQAAABABAAQAAABAAAAQAAAAABAAgAD1gjQBiAEhigIgACkg7QB6AAh6gEg");
	this.shape_1119.setTransform(107.9757,110.256);

	this.shape_1120 = new cjs.Shape();
	this.shape_1120.graphics.f("#AEA398").s().p("AIGC9QgCg5gGgwIASAAQgGA1gBA0IgDAAgAChgLQAjAAAhgEIABgEIAGAAQBaAHBZAOQASADAPAAIAAAKQiJgUiWgGgAGghdIkBgPIgigCIoDgeIAAAIIAAAIIgGAAIgBgEQhPgFgzgfQHoAuHmgCIAAAhQgQgFgPgBgAGTi8IANAAIAGAAIAZAAIAAAEQgTgBgZAFIAAgIg");
	this.shape_1120.setTransform(136.8125,110.675);

	this.shape_1121 = new cjs.Shape();
	this.shape_1121.graphics.f("#ADA398").s().p("Ah2gDQgCgBAAgIQB1AMB8AHIAAAFIglABQhdAAhtgQg");
	this.shape_1121.setTransform(96.15,85.7583);

	this.shape_1122 = new cjs.Shape();
	this.shape_1122.graphics.f("#C0B0A6").s().p("AgBgoQgCgHADgoQAPAbgDAWQgDAUAIAoQANBCgxAAQAhg7gPhFg");
	this.shape_1122.setTransform(78.5602,83.7);

	this.shape_1123 = new cjs.Shape();
	this.shape_1123.graphics.f("#CBC4BD").s().p("AgdgBQB5ADh5AAg");
	this.shape_1123.setTransform(77.8,99.2);

	this.shape_1124 = new cjs.Shape();
	this.shape_1124.graphics.f("#C2B2A3").s().p("AgkANQAigFASgbQADgEAJAIQALAIgCAUQgDAAgCABQgMAHgQAAQgRAAgXgIg");
	this.shape_1124.setTransform(72.8844,91.2789);

	this.shape_1125 = new cjs.Shape();
	this.shape_1125.graphics.f("#CBC4BC").s().p("AgegBQB5ADh5AAg");
	this.shape_1125.setTransform(66.6,98.4);

	this.shape_1126 = new cjs.Shape();
	this.shape_1126.graphics.f("#B1A595").s().p("AgxAGIgGABQgSAEgBgMQAQAAAPgDQAAgBAAAAQAAAAAAgBQAAAAAAgBQABgBAAgBIAFAAQBRgCAfARIAAAEQg5gFhDABg");
	this.shape_1126.setTransform(54.9,93.54);

	this.shape_1127 = new cjs.Shape();
	this.shape_1127.graphics.f("#A79886").s().p("ACFAPQg3gGg/gBQgGgJgRABQhVALgugaIChAHIAGABQBHgDApAaIgHgBg");
	this.shape_1127.setTransform(48.375,73.25);

	this.shape_1128 = new cjs.Shape();
	this.shape_1128.graphics.f("#BCAD9D").s().p("AgeAXIgOgWQAJg4A7AmQALAGAHAJQAJALgPAIQgWAQgRAAQgPAAgMgKg");
	this.shape_1128.setTransform(72.4188,82.765);

	this.shape_1129 = new cjs.Shape();
	this.shape_1129.graphics.f("#817366").s().p("AAbBBQgJgIgDAEQgSAcgiAFQgBAAAAAAQgBAAgBgBQAAAAAAAAQgBAAAAgBQgYgnAJhHIAAgIIAAhAQAGAHANABIAGAAQAugTAnAOQAAAAAAABQABAAAAABQAAAAAAABQAAABAAABQgDAoACAHQAQBFgiA8QACgVgLgIgAgygCIAPAVQAbAWAmgcQAPgIgJgLQgGgJgLgGQgXgPgQAAQgYAAgGAig");
	this.shape_1129.setTransform(72.959,83.1735);

	this.shape_1130 = new cjs.Shape();
	this.shape_1130.graphics.f("#AD9C8D").s().p("ABVANQgbgDgcAAIgBgEQhAgEhBAAIAAgHQABAAAAAAQABAAABgBQAAAAAAAAQABAAAAgBQACgCAAgEQB3AGBMAVQABAAgCAAIgPgBg");
	this.shape_1130.setTransform(51.9459,63.4167);

	this.shape_1131 = new cjs.Shape();
	this.shape_1131.graphics.f("#C8C0B6").s().p("AAAAkQgCgkAAgjIAFAAIAAA/IAAAIIgDAAg");
	this.shape_1131.setTransform(66.975,77.675);

	this.shape_1132 = new cjs.Shape();
	this.shape_1132.graphics.f("#B9ACA1").s().p("AAGAQQgMgBgFgHIAAgIIAAgPQAOAJAHAOQACAEABAEIgHAAg");
	this.shape_1132.setTransform(68.55,73.25);

	this.shape_1133 = new cjs.Shape();
	this.shape_1133.graphics.f("#B1A29B").s().p("AgtADIAAgHIAGAAIAFAAQAygGAeANIAAAEQgogGgzACg");
	this.shape_1133.setTransform(96.8,66.4974);

	this.shape_1134 = new cjs.Shape();
	this.shape_1134.graphics.f("#C3B3AA").s().p("AgbAAQAPAAAOgEQAAAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAgBQANAAALADQAAABAAAAQABAAAAABQAAAAAAABQAAABAAABIgGAAIAAAHIgGAAIgQACQgSAAgJgJg");
	this.shape_1134.setTransform(89.95,66.1026);

	this.shape_1135 = new cjs.Shape();
	this.shape_1135.graphics.f("#A6978D").s().p("AghgEIA9AAIAGAAQAAABAAABQAAABAAAAQAAABgBAAQAAAAAAAAQgPADgPAAIgFABIgMABQgPAAgEgJg");
	this.shape_1135.setTransform(86.85,65.6926);

	this.shape_1136 = new cjs.Shape();
	this.shape_1136.graphics.f("#997452").s().p("AgQAAIAAgDQAoAHgIAAIgggEg");
	this.shape_1136.setTransform(80.8063,41.41);

	this.shape_1137 = new cjs.Shape();
	this.shape_1137.graphics.f("#EAB872").s().p("AhTgLIAFgIIABgIIAGABQAkAGAUAYQABAAAAAAQABAAABAAQAAgBABAAQAAAAAAAAQAaghA+AiQggACAYALQApAShGgPQgDAAgDACQgMAGgPAAQgkAAg2gng");
	this.shape_1137.setTransform(87.5189,34.1975);

	this.shape_1138 = new cjs.Shape();
	this.shape_1138.graphics.f("#CFC7C0").s().p("AgbAAQAJAAAJgDQAAgBAAAAQAAAAABgBQAAAAAAgBQAAgBAAgBQARAAASAEQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAABIgGAAIgYAAIAAAHIgGABIgIABQgLAAAAgJg");
	this.shape_1138.setTransform(70.7,34.6971);

	this.shape_1139 = new cjs.Shape();
	this.shape_1139.graphics.f("#E3C7AC").s().p("AABAgQgFgcgDgjQAXANgLAqIgBAIIgDAAg");
	this.shape_1139.setTransform(76.8229,28.975);

	this.shape_1140 = new cjs.Shape();
	this.shape_1140.graphics.f("#D0C6C4").s().p("AgRAAQAMAAAKgEQAAAAAAAAQABAAAAgBQAAAAAAgBQAAgBAAgBQAGAAAFADQABABABAEIAAAHIgHABIgMABQgNAAgEgJg");
	this.shape_1140.setTransform(70.4,14.5926);

	this.shape_1141 = new cjs.Shape();
	this.shape_1141.graphics.f("#BDA085").s().p("AAHAXQgBAAgBAAQAAgBgBAAQAAAAgBAAQAAAAAAgBQgIgMgZAGIAAgIQAZAFAIgMQAAAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAUgyADAhQADAwgNAAQgFAAgIgIg");
	this.shape_1141.setTransform(75.3129,13.8315);

	this.shape_1142 = new cjs.Shape();
	this.shape_1142.graphics.f("#F5DE80").s().p("AgWBEQgCgBAAgEQAdg3AEhRIAEAAQAdBcgqATQABAkgLAAQgFAAgHgGg");
	this.shape_1142.setTransform(83.4215,22.7107);

	this.shape_1143 = new cjs.Shape();
	this.shape_1143.graphics.f("#FEF699").s().p("AACAsQgBgZgHgPIAAgHIAAgoQASAQgHA/IAAAIg");
	this.shape_1143.setTransform(82.9078,13.275);

	this.shape_1144 = new cjs.Shape();
	this.shape_1144.graphics.f("#EFD47B").s().p("AgXg/QAPBRAAhiIAEAAQgFARAKgBIAGABQAAAoADAnIADAAQAJAPABAaIADAAQgZAfgJhGQgBgFgCA0QgDAEgBAEIgCAHQgLg8AFhTg");
	this.shape_1144.setTransform(80.8847,12.05);

	this.shape_1145 = new cjs.Shape();
	this.shape_1145.graphics.f("#FCF9F5").s().p("ACjA4QgRgEgTAAIgGAAIk8gYIgBgIQgHgVACg6QDEAMC8ATIAGABQAEAjAFAcIAEAAIAAAIQAEAPgqABQAAgBAAgBQAAAAAAgBQAAAAAAgBQgBAAAAAAg");
	this.shape_1145.setTransform(57.0824,28.575);

	this.shape_1146 = new cjs.Shape();
	this.shape_1146.graphics.f("#B7ABA1").s().p("ABjAMQhigLhqgEIAAgIIAmAAIAGAAQBZgBBHAQIAHAAIAAAIIgHAAg");
	this.shape_1146.setTransform(55.5,43.8471);

	this.shape_1147 = new cjs.Shape();
	this.shape_1147.graphics.f("#D9C3B7").s().p("AgTAAIgBgDQAuAHgGAAIgngEg");
	this.shape_1147.setTransform(48.2563,47.1449);

	this.shape_1148 = new cjs.Shape();
	this.shape_1148.graphics.f("#A29086").s().p("AgkgIQAJAKAWgCIAFAAIAfAAIAGAAQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQgTAFgPAAQgaAAgMgRg");
	this.shape_1148.setTransform(39.975,41.9283);

	this.shape_1149 = new cjs.Shape();
	this.shape_1149.graphics.f("#FCFAF5").s().p("ABeA2IgGAAQhIgRhZABIAAgEQgcgEgcAAIgGAAIgfAAQAAgEgCgBQgmgZAJg5IAZAAIAGAAQCFALCLAFIAGAAQABANASgEIAGgBQBEgJgGBAQAAAEgBADQgRAdguAAQgTAAgWgEg");
	this.shape_1149.setTransform(56.6845,38.8496);

	this.shape_1150 = new cjs.Shape();
	this.shape_1150.graphics.f("#FDEFE2").s().p("AgggIQA+AHgCgeQAKAjgJAbQgtgEgQgjg");
	this.shape_1150.setTransform(30.2814,37.9);

	this.shape_1151 = new cjs.Shape();
	this.shape_1151.graphics.f("#FEECE2").s().p("AgIACQAdgWgUAXQgDAGgDAAQgDAAAAgHg");
	this.shape_1151.setTransform(32.188,44.8505);

	this.shape_1152 = new cjs.Shape();
	this.shape_1152.graphics.f("#FEF4E1").s().p("AAYAKIg4gLQgQgJgJgPQA9gIAwAiQACABAAAEQAIAWgJAAQgHAAgWgSg");
	this.shape_1152.setTransform(12.8736,43.6906);

	this.shape_1153 = new cjs.Shape();
	this.shape_1153.graphics.f("#B4A091").s().p("AgdAAIgBgDQBGAHgKAAIg7gEg");
	this.shape_1153.setTransform(26.2813,31.0449);

	this.shape_1154 = new cjs.Shape();
	this.shape_1154.graphics.f("#FCF8E9").s().p("AhIAXQgbgMAKguQAxAbAZAIIAAgDQgwgZALgXQBHABAzAZQAEACADAEQAmA1gyASQhJgBhAgcg");
	this.shape_1154.setTransform(10.5452,35.025);

	this.shape_1155 = new cjs.Shape();
	this.shape_1155.graphics.f("#FCF0E3").s().p("AgIAmQgEgBgDgEQAAgZgGguQBFAEgqBGQgCADgFAAIgHgBg");
	this.shape_1155.setTransform(31.6258,26.4779);

	this.shape_1156 = new cjs.Shape();
	this.shape_1156.graphics.f("#B8AAA0").s().p("ACSAQQiMgFiEgLIAAgDQggABgMgNIANAAIAGAAIE7AXIAHAAQAAABAAABQAAABgBAAQAAABAAAAQAAAAgBABQgIADgJAAIgGAAg");
	this.shape_1156.setTransform(52.725,33);

	this.shape_1157 = new cjs.Shape();
	this.shape_1157.graphics.f("#AB9C8D").s().p("AgOgBQA7gCg7AFg");
	this.shape_1157.setTransform(27.1875,21.1153);

	this.shape_1158 = new cjs.Shape();
	this.shape_1158.graphics.f("#FCF8ED").s().p("ABdAXQgIATgXANQgfgDgrgVQhlAbg2g6IAAgIIAAgxQB8AGCPANQAzAEAKAcQAHARgBAUQgMAbgRAAQgTAAgagjg");
	this.shape_1158.setTransform(17.0017,14.6066);

	this.shape_1159 = new cjs.Shape();
	this.shape_1159.graphics.f("#FCF7EA").s().p("AhzANQgEgBgCgLQgBgEgDgEIAAgIQAkgOA0AVIAFABQgXgXAxgRIAFgBQBTAGAsAbIgDAAQgvAMAgAsQACAEAAADQh8gBhlgig");
	this.shape_1159.setTransform(12.825,24.95);

	this.shape_1160 = new cjs.Shape();
	this.shape_1160.graphics.f("#B5A496").s().p("AC7AXIgGgBQiggUipgLIAAgEQgoACgWgOIAfAAIAHAAQC7AZCsgBIAGAAQABAAAAAAQABAAABABQAAAAABAAQAAAAAAAAQAXAagRAAQgGAAgKgDg");
	this.shape_1160.setTransform(56.0628,3.3782);

	this.shape_1161 = new cjs.Shape();
	this.shape_1161.graphics.f("#AC9B8D").s().p("AghAAQADgDAEgDQACgBADAAQAPANAigGIAGAAIgBAEQgRAEgOAAQgVAAgOgIg");
	this.shape_1161.setTransform(39.05,11.267);

	this.shape_1162 = new cjs.Shape();
	this.shape_1162.graphics.f("#BFB1A8").s().p("ABjAMQh2gEhugLIAAgIIAZAAIAGAAIDeAPIAGAAQAAABAAABQAAABAAAAQAAABAAAAQAAAAgBAAQgLAEgMAAIgHAAg");
	this.shape_1162.setTransform(57.975,13.275);

	this.shape_1163 = new cjs.Shape();
	this.shape_1163.graphics.f("#FCFAF6").s().p("AC9BtQjEgLi8gVIAAgJIAAhHIBLAAIAGAAQBvALB1AEIAHAAQAGAOAZgFIAGgBQAZgFAIAMQABAAAAAAQAAABABAAQAAAAABAAQABAAAAAAIAABJIAAAIIgGAAgACeAMQAAgEgCgBQgEgDgGAAIgHAAIjegPIgBgEQgbgEgcAAIgGAAQgjAGgPgOIAAgIIAAhJIAlAAIAHAAQCoAMCgAUIAGABQAKAjACAlIAAAHQAAAAgBAAQgBAAAAABQgBAAAAAAQAAAAgBABQgFAIgOAAQgGAAgIgCg");
	this.shape_1163.setTransform(56.45,13.275);

	this.shape_1164 = new cjs.Shape();
	this.shape_1164.graphics.f("#E3D3C2").s().p("AgJIlQgFgHgCgFIgGgPQgPAggVg1QgOAUgcgEQhNgLhKgVQAsABAkALQA6ARgOgdIgJAAQAcgMBFgMIgGAAQhbgMiRAEIAAgIIAAggIAFAAQA9AFAngNIgGAAQg2gBgtgHIAAgJIAAgwIAFAAIBLgQQAjgZgEg/QgDgEgBgFQgDgMgCACQgVAggRgUQgcghgkAgIAAgJIAAgwIAFgBQBOgWhTgRIAAgIIAAggQAdAkAtgcQAPAEgBAGQgCAGAGALQAbA0AYgXQAJgMgGgRQgWg8AegYIAAgIQAZAZAGgxQggg6gwAyQg/gQA5A4QgegHhFghIAAgHIAAgwQBfAJA1gJIgFgBQhIgMhHgDIAAgIIAAhRIAFAAQAugFgzgLIAAgIIAAiJQACAEABAFQADALAEACQBkAhB+ACQgBgEgBgDQghguAvgMIADAAQgsgbhTgFIgGABQgxAQAXAXIgFgBQg0gVgjAOIAAgIIAAhQQA2A7BkgbQAsAVAfADQAXgNAIgTQAvBBAbg5QAAgUgHgSQgKgcgxgEQiRgNh7gGIAAgIIAAhQIBpAAIAGAAQAUAnAWAiQABADAAAEIChAXIAMABQALgggQgwQgpgNhMgHQgDAAgEgEICzAAIAHAAIAAAIIgHAAIgfAAQAVAOApgCIAAAEIgGAAIglAAIAABIIAAAIQgDAAgCACQgEACgEAEQAZAOArgJIABgFQAbAAAcAEIABAEIgHAAIgZAAIAAAJIgFAAIhLAAIAABIIAAAIIgGAAIgHAAQgEAQALAAIAGAAQgCA7AHAWIABAIIgGAAIgNAAQANANAfgBIAAAEIgHAAIgYAAQgJA5AmAaQACABAAAEIgHABQgWACgIgLQASAbA3gOQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAgBQAcAAAbAEIABAEIgGAAIgmAAIAAAIIgFAAIhLAAQAKAegEArIAAAIIgGAAIgNAAQABANAMACIAGABIAABHIAAAIQgDAAgCACQgHAGgNABQAGAOASgCIABgEQAOAIAXAAIAGAAQBCAABAAEIABAEIgGAAIhLAAQAiATgUAUQgSATAeAGQARADAAANIgFAAIiigIQAuAbBUgKQATgDAGAKQAAAEgCACQgcAdgUgDQAKAlAPADIBXARIgGAAQhJAEg5gMIgHAAIgrAAIAAgEQgNACgSACQAMARAegFQABAAAAgBQAAAAAAAAQAAgBAAgBQABAAAAgBQAIALAWgDIAHAAQBHAABHAEIABAEIgHAAIhXAAIAIAiQAHAlADADQAEACADAEIgGABQhsAVgQhOIAAAoIAAAIIgGAAIhdAAQArAMAyAEIAGAAQgDAMAvgEQAcgCAhgGQABANASgEIAGgBQAAAEgCADQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAbACATIADATIABAIIgGAAIgxAAIgHAAIg4AAIgEgbQgHgzgBAzIAAALQAAAEgCABIgMAEQghAKg6gLQAeAYA9gHIAIgBIAGAAIAAAYIAAAIQACAlgQAOQgLAJgRAAQgVAAgegMgAjmFqQAiAgA/ADQALhRgXAAQgQgigBAqQAAA1hGgVQAAAEACACgAjViWQAJAQAPAIIA6AMQAtAngPgrQAAgEgCgBQgogcgwAAIgWABgAAchuQAAANAKgLQAKgNgDAAQgDAAgOALgAAuiWQAKgbgKgkQACAeg/gHQAQAjAtAFgAj8i7QBAAcBKABQAygSglg2QgDgEgFgCQgzgZhIgBQgLAXAwAZIAAAEQgYgJgygbQgKAvAbAMgAg0j6QB6ALh6gPIAAAEgAAQkGQACAEAFABQALADADgGQAqhHhGgEQAHAwAAAZgAgblfIAAAEQAqgEgSAAIgYAAgAj5oKQA8A9g+hDQAAAEACACg");
	this.shape_1164.setTransform(28.5,56.1288);

	this.shape_1165 = new cjs.Shape();
	this.shape_1165.graphics.f("#FCF7E9").s().p("ABeAzIiggXQAAgEgCgDQgWghgUgnIBRAAIAGAAQAEAEADAAQBMAHApANQARAvgLAgIgNgBg");
	this.shape_1165.setTransform(22.4911,5.225);

	this.shape_1166 = new cjs.Shape();
	this.shape_1166.graphics.f("#FEFDF2").s().p("AgPhMIAYAAIAGAAIAABwIABANQgIgXgKAaIAAAQIAAAJQgPgpAChwg");
	this.shape_1166.setTransform(87.4571,7.65);

	this.shape_1167 = new cjs.Shape();
	this.shape_1167.graphics.f("#F9F592").s().p("AAAAcQgJAAAEgQIAAgIIAAgfIAFAAQAHAVAAAaIgBAIIgGAAg");
	this.shape_1167.setTransform(80.9075,2.825);

	this.shape_1168 = new cjs.Shape();
	this.shape_1168.graphics.f("#FAF6F1").s().p("AX6EiIgGABQgOAEACgNQAEgNANgGQAAAAAAgBQAAAAABAAQAAgBAAgBQAAgBAAgBQAcgLAMgcQAAAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQAyAGA3ACIAGAAIAAA4IAAAIIgGABQghAGglAAQglAAgqgHgA6UkgIAAgIIFoAAIAFAAIAAAYIAAAIIgFAAIgHAAQipAAi4gYg");
	this.shape_1168.setTransform(207.3,29.7064);

	this.shape_1169 = new cjs.Shape();
	this.shape_1169.graphics.f("#C4BFC0").s().p("AgIACIAAgDIARABIAAACIgRAAg");
	this.shape_1169.setTransform(179.9875,25.15);

	this.shape_1170 = new cjs.Shape();
	this.shape_1170.graphics.f("#C2BBBB").s().p("AgegEQA9gFAAANIgMABIgQABQgVAAgMgKg");
	this.shape_1170.setTransform(165.375,43.1001);

	this.shape_1171 = new cjs.Shape();
	this.shape_1171.graphics.f("#C2BCBC").s().p("AgegEQA8gFABAMIgMACIgQABQgWAAgLgKg");
	this.shape_1171.setTransform(156.7,42.3001);

	this.shape_1172 = new cjs.Shape();
	this.shape_1172.graphics.f("#BCB7B4").s().p("Ag3AIIAAgIIAAgHQAvAIA5gBIAHAAQgxAIgoAAIgWAAg");
	this.shape_1172.setTransform(156.7,32.2321);

	this.shape_1173 = new cjs.Shape();
	this.shape_1173.graphics.f("#C8C5C2").s().p("AgUgBQBSADhSAAg");
	this.shape_1173.setTransform(159.375,13.1);

	this.shape_1174 = new cjs.Shape();
	this.shape_1174.graphics.f("#F8E282").s().p("AAMCAQgag4gBhPQAJhUASgjQAAgBAAAAQAAAAABAAQAAgBABAAQAAAAABAAQACCIgCBxIAAAIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAg");
	this.shape_1174.setTransform(145.2375,22.525);

	this.shape_1175 = new cjs.Shape();
	this.shape_1175.graphics.f("#C5BBAF").s().p("AgVAIIAAgIIAAgHQBVAPhPAAIgGAAg");
	this.shape_1175.setTransform(152.0844,12.075);

	this.shape_1176 = new cjs.Shape();
	this.shape_1176.graphics.f("#C4C0BF").s().p("AgbgBQBvADhvAAg");
	this.shape_1176.setTransform(174.4,14.7);

	this.shape_1177 = new cjs.Shape();
	this.shape_1177.graphics.f("#C4C0BD").s().p("AgZgBQBmADhmAAg");
	this.shape_1177.setTransform(174.1625,24.35);

	this.shape_1178 = new cjs.Shape();
	this.shape_1178.graphics.f("#BDBABB").s().p("AgWgBQBbADhbAAg");
	this.shape_1178.setTransform(181.3625,15.5);

	this.shape_1179 = new cjs.Shape();
	this.shape_1179.graphics.f("#C6C2BF").s().p("AgZgBQBmADhmAAg");
	this.shape_1179.setTransform(166.7125,13.9);

	this.shape_1180 = new cjs.Shape();
	this.shape_1180.graphics.f("#C7C6C4").s().p("AgUgBQBSADhSAAg");
	this.shape_1180.setTransform(166.225,23.55);

	this.shape_1181 = new cjs.Shape();
	this.shape_1181.graphics.f("#F9F6F0").s().p("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");
	this.shape_1181.setTransform(173.211,51.925);

	this.shape_1182 = new cjs.Shape();
	this.shape_1182.graphics.f("#E4C9BD").s().p("Ag6gIQA5ADA2AFIAGAAQgcAJgZAAQgiAAgegRg");
	this.shape_1182.setTransform(132.15,48.3776);

	this.shape_1183 = new cjs.Shape();
	this.shape_1183.graphics.f("#BDA9A6").s().p("AAlAsQgUgMgZAAQgWgigWguQA3AdAwA9QACADAAADQgJAAgHgEg");
	this.shape_1183.setTransform(117.875,24.95);

	this.shape_1184 = new cjs.Shape();
	this.shape_1184.graphics.f("#FCFDF7").s().p("ABQAjQhUAMgcgbQAagUgngBQhDgFgaglQB0ADBrAFIAGAAIAGAAQA/ATggA8QgTgNgdAEg");
	this.shape_1184.setTransform(127.7389,35.825);

	this.shape_1185 = new cjs.Shape();
	this.shape_1185.graphics.f("#BDA99D").s().p("AAtAkIAAgEQhcAKgTg9QAmgGAMAWIAIgFQAdgRANABQAFABAGgMQAkgFgXBKQgBACgGAAIgGAAg");
	this.shape_1185.setTransform(132.3233,28.5623);

	this.shape_1186 = new cjs.Shape();
	this.shape_1186.graphics.f("#ECBC75").s().p("AAbARQgagMgqAFQAAgEACgBQALgHgmgLQBDgMBCAUIgJACQgUADgGASIgFgBg");
	this.shape_1186.setTransform(100.675,40.025);

	this.shape_1187 = new cjs.Shape();
	this.shape_1187.graphics.f("#B79C85").s().p("AkUBcIAAgIQBRAQAXgpQABgDAAgEQAGhAhEAJIAAgIIAZAAIAGAAQAqgBgEgPIAAgIIAAgIQALgrgYgOIgGAAQi9gUjEgMIgGAAQgLAAAFgQIAGAAIAGAAQC8AVDFALIAGAAQAggngKBGQgEAZATARIgBAHIgFAJQAAgEgCgBQgEgDgGAAQAOA5ANAGIABAAQgVgLgBAbQA1AFAugHQAPgCgCAMIgGABIgZAHIC/AMIAAgEQA0gDBOAPIAAAEQCOgTBkAeQAEACADAEQAxAMgGgrQgCgNAJgDQAGgCAGAAQAZgFgDACQgiAdAMBHQmcgLmpgugAG7B9IgGgBQg3gFg5gCQA0AeBCgWgAiRA4QBDAIhEgMIABAEg");
	this.shape_1187.setTransform(93.7986,35.825);

	this.shape_1188 = new cjs.Shape();
	this.shape_1188.graphics.f("#A3794D").s().p("AhfAAIAZgIIAGAAIA+AAIAFAAQArgFAaAMIAFABQAKAAAIACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAABIAAAEIi/gLg");
	this.shape_1188.setTransform(96.175,41.9765);

	this.shape_1189 = new cjs.Shape();
	this.shape_1189.graphics.f("#FCEC8C").s().p("AhEgBQgCgCAAgIQBCgBBFABIAGAAQggAXgnAAQgfAAglgNg");
	this.shape_1189.setTransform(106.725,36.5587);

	this.shape_1190 = new cjs.Shape();
	this.shape_1190.graphics.f("#FEFCF0").s().p("AgUAIQgQgEgQgHQA0gRAvAQIAGABQgDAQgeAAQgQAAgYgFg");
	this.shape_1190.setTransform(106.075,31.7967);

	this.shape_1191 = new cjs.Shape();
	this.shape_1191.graphics.f("#C1A6A6").s().p("AgYgNQAGgEAFgGQACgCAAgEQAZARAKAeIABAIIAAAEQgOgEgjgng");
	this.shape_1191.setTransform(107.025,12.675);

	this.shape_1192 = new cjs.Shape();
	this.shape_1192.graphics.f("#F7E6C7").s().p("AgeAqIABgIQAKgqgLgmQA0gcAGA8IADAAIAAAIQAEA+geAAQgOAAgVgOg");
	this.shape_1192.setTransform(97.1492,10.3035);

	this.shape_1193 = new cjs.Shape();
	this.shape_1193.graphics.f("#AE968D").s().p("ACACZQiUgGiPgLIgDAAQgDiQAAiRIA+AAIAGAAQAAAEgCADQggAlgJBFQgEAaARAFIAGABQBEAqgGhaIAAgIIAAgIQAIgWARAWIACgHQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQABATAXABIABAEQAAAEgCACQgFAGgGAEQAjAoAOADIAAgDQAjAOgEAZIAAAIQAVAtAWAkQAaAAAUAMQAHAEAJAAQAPAKglAAIgPgBg");
	this.shape_1193.setTransform(106.6127,15.3654);

	this.shape_1194 = new cjs.Shape();
	this.shape_1194.graphics.f("#FDFBF0").s().p("AgfgaQA9gDADAyIgDAAQgSAHgMAAQgkAAAFg2g");
	this.shape_1194.setTransform(115.8468,13.1935);

	this.shape_1195 = new cjs.Shape();
	this.shape_1195.graphics.f("#D2B3A9").s().p("Ag5BHQgRgEAEgbQAJhEAgglQACgDAAgEIBdAAIAGAAIgBAJQgHAsgXgNIAAAZIAAAHQgBAAgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAIgCAHQgRgVgIAVIAAAIIgDAAQgGg8g0AdQALAlgKAqIgBAIIgGgBg");
	this.shape_1195.setTransform(99.2279,7.25);

	this.shape_1196 = new cjs.Shape();
	this.shape_1196.graphics.f("#E8B873").s().p("AgYC7QASgIgKgKQgCgCAAgEIAAgIQAChxgCiIIAAgIIAAhYIASAAIAGAAQAHAogEBQIADAAIAAAJIgDAAQACAkgLAUQAHBGAOA5QAAAAABAAQAAABAAAAQABAAAAAAQABAAABAAIAAAIIAAAIIgGABIgNAHIgDAAQABAsgRAAQgEAAgHgEg");
	this.shape_1196.setTransform(148.625,19.1016);

	this.shape_1197 = new cjs.Shape();
	this.shape_1197.graphics.f("#EDDBB7").s().p("AE5DkQgDgEgEgBQhkgfiOAUIAAgEQhNgPg0ADQAAgBAAgBQAAgBAAgBQAAAAAAAAQgBgBAAAAQgIgDgKAAQAGgTAUgEIAJgBQhCgUhEAMQAmALgLAHQgCACAAAEIgGAAIg+AAQACgNgPADQguAHg1gFQABgcAVAMIgBgBQgNgGgOg6QAGAAAEADQACABAAAEQBNA4AqgWQACgCADAAQBHAPgqgSQgXgLAggCQg+gjgbAiQAAAAgBAAQAAABgBAAQAAAAgBAAQgBAAgBAAQgTgZglgGIgGgBQgTgQAEgZQAKhGggAnIAAgIIAAhIQAcAdgFhFQgCghgVAxIAAgIQgCglgKgjQApAMgfgjQAAgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAIAAgIIAAgYIArAAIAHAAIAAAgIAAAIIgEAAQAABigPhRQgFBUALA8IACgHQABgFADgEQACgzABAFQAKBGAZggIAAgIQAGhAgTgQIAAAoIAAAIIgDAAQgDgoAAgoIAAgIQAAgcgGgVIArAAIAGAAQgCBxAPAoIAAgIIAAgQQALgaAIAWIgBgMIAAhxIAHAAQAACRADCQIADAAQCPALCUAGQA2ACgRgLQAAgEgCgCQgwg9g4gdIABgIQADgZgigPIgBgIQgJgfgbgRIAAgEQgYgBgBgTIAAgIIAAgZQAYANAHgtIAAgIICtAAIAGAAQAjAfAQAIQAwAZAgggQAkA1gGBdIANgBQALAiABhCQABhIAGhJIAZAAIAGAAIAABZIAAAIQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAABgBAAQgSAkgJBUQAABPAbA3QABAAAAABQAAAAABAAQAAAAABAAQAAAAABAAQAAAEACACQAKAKgSAJQAcAQAAg5IADAAQAJAagDAnIAAAIQgGAAgGACQgJACACAOQAFAhgdAAQgIAAgLgDgAEaCsQAgg9g/gUQAGAAAAgCQAXhLgkAFQgGAMgFgBQgMgBgeARIgJAFQgMgWglAGQASA+BdgKIAAAEIgGAAQhsgFhzgDQAZAmBEAEQAnADgbAUQAcAaBVgMIANgBQAVAAAPALgAh/B7QAAAIADACQBTAhA4grIgGAAIhEgBIhEABgAhzBTQAQAIAQAEQBFAOAFgaIgGgBQgWgIgZAAQgZAAgcAJgAk5A7QAAAEACACQAXAUAAgyQApgUgdhcIgDAAQgEBSgeA2gAACh9QgFBKBDgaIAEAAQgDgxg4AAIgHABg");
	this.shape_1197.setTransform(112.361,23.0908);

	this.shape_1198 = new cjs.Shape();
	this.shape_1198.graphics.f("#FDFCF7").s().p("ABOBTIgNAAQAGhcglg0QggAfgvgZQgQgIgigeIC5AAIAGAAQgGBJgBBHQAAArgFAAQgDAAgDgLg");
	this.shape_1198.setTransform(134.025,9.4168);

	this.shape_1199 = new cjs.Shape();
	this.shape_1199.graphics.f("#636C60").s().p("AAQBsIgNAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQgFgGgDgJQAAgEgCgDQgKgbgBgeQAYgUAHhCQACgUgDgeQALAFgBAUIADAAIAAC3IAAAIIgGAAg");
	this.shape_1199.setTransform(556.775,322.35);

	this.shape_1200 = new cjs.Shape();
	this.shape_1200.graphics.f("#C2B2A0").s().p("AADAYQgHgCgEgtQANgEABAMIADAAIAAAgIAAAIIgGgBg");
	this.shape_1200.setTransform(558.025,302.575);

	this.shape_1201 = new cjs.Shape();
	this.shape_1201.graphics.f("#64625A").s().p("AgMAcQgDgcAAgbQAHAJASgBIAGAAIAAAIIgGAAIgSAAIAAAfIAAAIIgEAAg");
	this.shape_1201.setTransform(557.4,300.625);

	this.shape_1202 = new cjs.Shape();
	this.shape_1202.graphics.f("#968D7E").s().p("AAKBJQABgUgLgFQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQgMghADgtIAAgIIAAggIASAAIAGAAIAAAIIAAAHIgDAAQgBgLgOAEQAFAuAHACIAGAAIAABQIAAAIg");
	this.shape_1202.setTransform(557.694,306.65);

	this.shape_1203 = new cjs.Shape();
	this.shape_1203.graphics.f("#6A7669").s().p("AB7FGIimAAIhdAAIAAgIIAAgIQAWkoAYkzIADAAQAXAEAVACQBTAHBIgaQANgFALgOIAAERIAAAIIgGAAQgWgHgQAHQAGAOAgADIAGAAQAFC3gLCqIgHAAgAAGBZQBLAEhMgJIABAFgAANAhQBIAihJgnQAAAEABABgAASgjIAAADQAcgOgCAAIgaALgAA5g1QAjgOglgBQAAAPACAAgAAriEQAGALAAAFQABAnA9gWQgsgiAmAFIAGABQgUgHgXAAQgMAAgNACgAhQiEQAAAEABABQAaALAKAKIAGAHQAGAAAGABQAZAJAYgbQAUgKgegNIgLgFQAHAOgpgCIAHAIIgTgGQgTgIATgGIASgEQgHgNgLgFQgIgDgLABIAFgCQANgFgFgEQgEgCgEAAQgRAAgGAxgAAZigQBXAIhYgMIABAEgAB1jEQADgegZAPIgiAPQAQAaAVgTIAHgHQAIA4AEg4g");
	this.shape_1203.setTransform(545.3781,369.85);

	this.shape_1204 = new cjs.Shape();
	this.shape_1204.graphics.f("#657154").s().p("AgEgUQAXgSgYA+IAAABQgCAAADgtg");
	this.shape_1204.setTransform(527.758,328.8816);

	this.shape_1205 = new cjs.Shape();
	this.shape_1205.graphics.f("#697167").s().p("Ai6EwIgxAAIAAgIIAAgoQAyhmAFh0IABgIQgRglgXghIgEgBQgDhQAcgxQALgoAcgXQABgBAEAAQApgnAtAHQBqARBGgdIgDgEQggglA6AbIAFABQAmgOAxAGIAGAAQALAVgFBMQgMC0gZC9IAAgIQgpgVg9AgQgwAZgqAdIgGABQgjATgtAMIAAAIIgGABQgwAOgtARIAAAIIgHAAg");
	this.shape_1205.setTransform(501.8806,372.026);

	this.shape_1206 = new cjs.Shape();
	this.shape_1206.graphics.f("#96A798").s().p("AAAAtQgDgygIgvIAGAAIAFAAQABABAAAAQABAAAAAAQABAAAAAAQAAABABAAQATAogXA/IAAgIg");
	this.shape_1206.setTransform(509.2974,313.5);

	this.shape_1207 = new cjs.Shape();
	this.shape_1207.graphics.f("#737C71").s().p("AADB9QgIg3gGg4QgIg/gFhCIAGAAQAIAuAEAzIABAIQAWhAgTgoQAAAAAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAIAAgIQAUgFAGAMQAAAAABAAQAAABAAAAQABAAAAAAQABAAABAAIAABAIAAAIIgDAAIgDA5QgFA7gIA0IgDAAg");
	this.shape_1207.setTransform(509.925,319.8515);

	this.shape_1208 = new cjs.Shape();
	this.shape_1208.graphics.f("#0D0E0E").s().p("AhDB9QAiAWACgeIABgIQggALgMgsQAMguACg4QAAgYgBgaIAAgIIAAgIIAAhAQAqgHgFBPQAKgkACgcQAMAAAAABQAHBAgBAwQABAAABAAQABAAAAAAQABABAAAAQAAAAABAAIAHAIQAWAWAiAIQgGAjAGAlIAAAIQgMAqgNgaQAIgXgSARQgHAIgIAEQgcAUAXAXIAGAAQgUAJgRAAQghAAgWghg");
	this.shape_1208.setTransform(518.6,323.9552);

	this.shape_1209 = new cjs.Shape();
	this.shape_1209.graphics.f("#5D665A").s().p("AgVEuQAAhMgDg1QATh1AJh6QAKhyACh5IADAAQAAApACAoIAEAAQgDBPgEBLQgMDEgXCsg");
	this.shape_1209.setTransform(530.4,327.975);

	this.shape_1210 = new cjs.Shape();
	this.shape_1210.graphics.f("#7B827E").s().p("AAAAoQgDgoAAgnQAKAMgEAbIgBAIIAAAYIAAAIIgCAAg");
	this.shape_1210.setTransform(532.6533,301.825);

	this.shape_1211 = new cjs.Shape();
	this.shape_1211.graphics.f("#6F736A").s().p("AgBAUQgDgUAAgTIAFAAQAGATgDAUIgDAAIgCAAg");
	this.shape_1211.setTransform(533.3891,294.975);

	this.shape_1212 = new cjs.Shape();
	this.shape_1212.graphics.f("#6B716A").s().p("AADAtQAEgcgKgNIAAgHQADgfgJgSQAJABAHADQAAAAABAAQAAABAAAAQAAABAAABQAAABAAAAIgGAAQAAAVADATIADABIABAHQAEAggLARIABgIg");
	this.shape_1212.setTransform(532.6552,297.4);

	this.shape_1213 = new cjs.Shape();
	this.shape_1213.graphics.f("#0A0C10").s().p("AgDBIQgiggAJg3IABgIQAJgwASALIAAABQATAnACgzQAMACgDBFQgDBIgcAAIgCAAg");
	this.shape_1213.setTransform(528.2618,301.0291);

	this.shape_1214 = new cjs.Shape();
	this.shape_1214.graphics.f("#0F0E0B").s().p("AASBDQgcgRgNgZQgBgDAAgEQAaAVAFgjIALhKQAMBigJAqg");
	this.shape_1214.setTransform(531.0679,281.5);

	this.shape_1215 = new cjs.Shape();
	this.shape_1215.graphics.f("#756A66").s().p("AgdAoQgJgiADgtQBfgKgfBYQAAAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAIgbABIgcgBg");
	this.shape_1215.setTransform(501.1235,284.9292);

	this.shape_1216 = new cjs.Shape();
	this.shape_1216.graphics.f("#7B858C").s().p("AgGANQgFgMABgUQAnARghAWg");
	this.shape_1216.setTransform(511.6014,294.175);

	this.shape_1217 = new cjs.Shape();
	this.shape_1217.graphics.f("#040917").s().p("AgKgNQgCgDAAgEIAZApIgXgig");
	this.shape_1217.setTransform(513.6755,293.4914);

	this.shape_1218 = new cjs.Shape();
	this.shape_1218.graphics.f("#6C7874").s().p("AgCAoIAAgIIAAhHIAFAAIAABHIAAAIIgFAAg");
	this.shape_1218.setTransform(513.325,278.475);

	this.shape_1219 = new cjs.Shape();
	this.shape_1219.graphics.f("#0B1212").s().p("AgIBMIAAgIIAAhHIAAgIIAAgYQAKgJgDgYIgBgIQAKAlABAzQABBBgRAAIgBgBg");
	this.shape_1219.setTransform(514.5554,274.8529);

	this.shape_1220 = new cjs.Shape();
	this.shape_1220.graphics.f("#A4BDB0").s().p("AAmBYQgwgSgngdIAAgIQACg3ARgcIAAAMQAoAJAQgzQADgLAOAEQAFAFACA0IAAAIIAAAXIAAAIIgHAAIAABIIAAAIIgFgBg");
	this.shape_1220.setTransform(508.675,273.5948);

	this.shape_1221 = new cjs.Shape();
	this.shape_1221.graphics.f("#97AC9D").s().p("AgyBXIgNgGIAAgJIAAhvQA3gDA2goQACgBAAgFQAVASgIAvIgBAIIABAIQAEAXgLAIIAAgIQgBgzgFgEQgOgEgEAKQgQAzgogKIABgLQgRAcgCA4IAAAIQgDAAgDgCg");
	this.shape_1221.setTransform(508.2085,268.825);

	this.shape_1222 = new cjs.Shape();
	this.shape_1222.graphics.f("#5F705D").s().p("AgxAEIAAgHIBcAAIAHAAQAAABAAABQAAAAAAABQgBAAAAAAQAAAAAAAAQgYAEgqAAIggAAg");
	this.shape_1222.setTransform(499.375,253.175);

	this.shape_1223 = new cjs.Shape();
	this.shape_1223.graphics.f("#71806F").s().p("AgdBTIgUgPQABAAABAAQAAAAABAAQAAAAAAAAQABgBAAAAQAkhbhHgTIAAAgIAAAIIgDAAQgDgcAAgcICngYIAGgBQAAAFgCABQg3Aog2ADIAABvIAAAJQgDAAgCgCg");
	this.shape_1223.setTransform(504.3219,268.425);

	this.shape_1224 = new cjs.Shape();
	this.shape_1224.graphics.f("#747F6D").s().p("AhlgLQBcgPBpAOIAHABQhGAWhaAIIgKABQgkAAACgfg");
	this.shape_1224.setTransform(505.8958,258.7811);

	this.shape_1225 = new cjs.Shape();
	this.shape_1225.graphics.f("#0D0F0D").s().p("AgIACQAlghglArIgBABQgCAAADgLg");
	this.shape_1225.setTransform(536.2,257.3997);

	this.shape_1226 = new cjs.Shape();
	this.shape_1226.graphics.f("#0D0D0C").s().p("AgVA9QAEgqgEhOQAZgUgLA7QgLA5AoAIQACASgnACQgDAAgDgEg");
	this.shape_1226.setTransform(538.1824,266.7718);

	this.shape_1227 = new cjs.Shape();
	this.shape_1227.graphics.f("#110C11").s().p("AAIAUQgdAAALgnIASAAIAGAAIAAAfIAAAIIgGAAg");
	this.shape_1227.setTransform(557.5756,291.775);

	this.shape_1228 = new cjs.Shape();
	this.shape_1228.graphics.f("#6C5F56").s().p("AgJgCQAAAAAAAAQgBAAAAgBQAAgBAAAAQAAgBAAgBQAXANgCAAIgUgJg");
	this.shape_1228.setTransform(556.3566,287.2616);

	this.shape_1229 = new cjs.Shape();
	this.shape_1229.graphics.f("#0E0E0C").s().p("A5GCrQgIgDAAgPQAcgjAFA0QABAGgHAAQgHAAgMgFgAY0iIQARgCAIglIABAPQAEA4gJAAQgGAAgPggg");
	this.shape_1229.setTransform(388.9694,289.7824);

	this.shape_1230 = new cjs.Shape();
	this.shape_1230.graphics.f("#A3A19C").s().p("AAAAoQgCgoAAgnIAFAAIAABHIAAAIg");
	this.shape_1230.setTransform(553.675,277.675);

	this.shape_1231 = new cjs.Shape();
	this.shape_1231.graphics.f("#F8F7F1").s().p("AgYAcIAAgIIAAhHIAYAAIAGAAQAPgFABANIADAAIAABXIAAAIIgGABIgIAAQgeAAgFgZg");
	this.shape_1231.setTransform(556.475,278.8599);

	this.shape_1232 = new cjs.Shape();
	this.shape_1232.graphics.f("#8D6651").s().p("AAWAYQgBgMgPAEIAAgEQgYACgGgOIALgIQACgDAAgEQAIgLAWADIAGAAIAAAnIAAAIg");
	this.shape_1232.setTransform(556.475,272.0019);

	this.shape_1233 = new cjs.Shape();
	this.shape_1233.graphics.f("#0A090B").s().p("AAlFvIgGAAQgxAIgrgJQgXgGgVgJQATgRAZgFQAbgGAiAIQgogQAYgdIgtgBQgVAAgRABIAAgIQgCgrAFgkQAGgqAQggQAIhwgCh4QgigiADhXQAXAGAVhOQgXgvAmACIAAgEQAAgQADgIQgGgWAeAXIAGAEQAEAQAJATQgGAegfgNQAMCNArCMQAGgegLhDQgJg/AIgJQASAzATAuQgGAsAKAHQAQAOgUgBQAIAYgHAYIgBAIQAPAuAQAaQgPAYAPAgQgQAJgCAYQgTBWAlAqQAEAJAEAGQABAAAAAAQAAAAABABQABAAAAAAQABAAABAAQAPAKgQAQQgGAGgCAGQgQAdgOAAQgMAAgLgSg");
	this.shape_1233.setTransform(547.2313,301.3973);

	this.shape_1234 = new cjs.Shape();
	this.shape_1234.graphics.f("#FDF5B4").s().p("AADBtQgVg0AEhkQgCgvAagQQADgCADAAIAADRIAAAIg");
	this.shape_1234.setTransform(557.3755,252.325);

	this.shape_1235 = new cjs.Shape();
	this.shape_1235.graphics.f("#B87345").s().p("AAcCfIgZAAIgFAAIgBgIQgQhbgOhdQAMgHADhBQADhTASA7QAGg2AMAuIABAIQgUCFAOB7QAAAEgCADIgLAJQAGAOAZgCIAAAEIgGAAg");
	this.shape_1235.setTransform(553.675,257.717);

	this.shape_1236 = new cjs.Shape();
	this.shape_1236.graphics.f("#FAE9A8").s().p("AAFASQgGgJgLgDIAAgHQAjg6gNBUg");
	this.shape_1236.setTransform(547.8957,244.8617);

	this.shape_1237 = new cjs.Shape();
	this.shape_1237.graphics.f("#E4B477").s().p("AAfhnIgBgJQgMgtgFA2QgTg7gDBTQgDBBgMAHIgBgHQgQgqgUgnQALACAHAJIAGAIQAMhWgkA7IAAgJIAAgQIAAgIIAAgIIAAgIIB1AAIAGAAIAAAIIAAAIQgDAAgDABQgbARACAuQgDBlAVAzIANAAIAAA5IAAAIIgGAAQgXgDgIALQgOh7AUiFg");
	this.shape_1237.setTransform(552.75,255.15);

	this.shape_1238 = new cjs.Shape();
	this.shape_1238.graphics.f("#423116").s().p("Ag3AcQgJgTgGgTIAAgIQBegaArApQAAAAABAAQAAABABAAQAAAAABAAQABAAAAAAIAAAPIAAAIIgGAAIh1AAIAAAIQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_1238.setTransform(551.825,237.7298);

	this.shape_1239 = new cjs.Shape();
	this.shape_1239.graphics.f("#849E85").s().p("AgbAAQAWgJAgAGIABADIgGABQgQAFgLAAQgNAAgJgGg");
	this.shape_1239.setTransform(549.95,233.3888);

	this.shape_1240 = new cjs.Shape();
	this.shape_1240.graphics.f("#90B69C").s().p("AgVAFIAAgHQAGgFAFgFQACgCAAgEIAMAGQACACADAAIAIAGQACACADAAQAAADgCADQgHAPgLAAQgJAAgOgOg");
	this.shape_1240.setTransform(546.225,229.7127);

	this.shape_1241 = new cjs.Shape();
	this.shape_1241.graphics.f("#6A8470").s().p("AAZAGIgrAAQgDAAgBgCIgIgFQAegIAeAKQAAAAAAABQABAAAAABQAAAAAAABQAAABAAABIgGAAg");
	this.shape_1241.setTransform(550.25,228.8359);

	this.shape_1242 = new cjs.Shape();
	this.shape_1242.graphics.f("#5B654D").s().p("ABJAbQgrgoheAZIAAAIQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQgFgWgEgYIAGAAQABATAZgDIAFAAQASALAfgKIAHgBIA4AAIAGAAIAAAfIAAAIQgBAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_1242.setTransform(551.2,234.625);

	this.shape_1243 = new cjs.Shape();
	this.shape_1243.graphics.f("#A2C8B3").s().p("AhKAEIAAgHIAAgIQAbAcAPgdQACgDAAgEIAqAAIAGAAIAHAAQAMANAfgFIAGAAIAAAXIAAAIIgGAAIg4AAIAAgEQghgHgWALIgGAAIgGABQgSAAgBgRg");
	this.shape_1243.setTransform(551.5125,231.4325);

	this.shape_1244 = new cjs.Shape();
	this.shape_1244.graphics.f("#6A8778").s().p("AgYgEIArAAIAGAAIAAAHIgGABIgQABQgSAAgJgJg");
	this.shape_1244.setTransform(556.475,229.8801);

	this.shape_1245 = new cjs.Shape();
	this.shape_1245.graphics.f("#100D09").s().p("AgOgMQAUgFAGAMQAAAAABAAQAAAAAAABQABAAAAAAQABAAABAAIAAAHIAAAIIgGABQgGADgEAAQgRAAADgbg");
	this.shape_1245.setTransform(557.3812,218.62);

	this.shape_1246 = new cjs.Shape();
	this.shape_1246.graphics.f("#616B5E").s().p("AgIgFQAjgBgjAMg");
	this.shape_1246.setTransform(554.9125,221.1464);

	this.shape_1247 = new cjs.Shape();
	this.shape_1247.graphics.f("#150D0A").s().p("AAIAPQgIgNgLgJQARAFADgMIADgBIAAAXIAAAIQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAAAg");
	this.shape_1247.setTransform(557.7375,214.9);

	this.shape_1248 = new cjs.Shape();
	this.shape_1248.graphics.f("#819571").s().p("AgUgPIAYgHIAGgBQASAAgKAYQgCADAAAEQgBAAAAAAQgBAAgBAAQAAABgBAAQAAAAAAABQgLAOgGAAQgMAAgDgng");
	this.shape_1248.setTransform(546.1901,220.543);

	this.shape_1249 = new cjs.Shape();
	this.shape_1249.graphics.f("#0F1002").s().p("AgHgDQgCgBAAgEQAUARgCAAIgQgMg");
	this.shape_1249.setTransform(548.1007,213.4124);

	this.shape_1250 = new cjs.Shape();
	this.shape_1250.graphics.f("#506E52").s().p("AgPAAQAPgQALAPQABAAAAABQAAAAABAAQAAAAABAAQABAAABAAIAAAHIgGABIgKABQgMAAgDgJg");
	this.shape_1250.setTransform(557.4,199.6507);

	this.shape_1251 = new cjs.Shape();
	this.shape_1251.graphics.f("#5C6A5D").s().p("AAugHQgwgTgHg9QgDAAgCABQg+AfgHg4QAIgLAXACIAGABIAlAHIAGABQBfA9gJCrQgEhPghgxg");
	this.shape_1251.setTransform(540.0636,251.0769);

	this.shape_1252 = new cjs.Shape();
	this.shape_1252.graphics.f("#646C68").s().p("AgIgLIAHAAIAFAAQAAAEABAEQAFAPgCAAQgDAAgNgXg");
	this.shape_1252.setTransform(524.4075,237.8029);

	this.shape_1253 = new cjs.Shape();
	this.shape_1253.graphics.f("#0B120A").s().p("AgLAAQAugdgtApg");
	this.shape_1253.setTransform(530.3188,226.9543);

	this.shape_1254 = new cjs.Shape();
	this.shape_1254.graphics.f("#090D0A").s().p("AATAuIglgIIAAgEQgxAHAMgyQACgmAvACQAmACgUAsQgFAMAFAJQAuAfgng+QAiAKAFApIgPADQgJABgJAAIgGAAg");
	this.shape_1254.setTransform(537.232,235.2449);

	this.shape_1255 = new cjs.Shape();
	this.shape_1255.graphics.f("#657856").s().p("AgQBZQAAgEgCgDQgIgKgDgQQAXAGgHgVQAAAAAAAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBAAQgCgDAAgEIAEAAQgDglgBgrQAjghACgGIACAHQAGAMgCAUIgGABIgYAHQAFBBAbgnQAAAAABAAQAAAAABgBQAAAAABAAQABAAAAAAQAAAEACADQAJANgkAbIAAAIIAAAIQAAAEgBADQgEAFgGAFIAAAIIAAAIIAAAIIgGAAg");
	this.shape_1255.setTransform(545.166,222.95);

	this.shape_1256 = new cjs.Shape();
	this.shape_1256.graphics.f("#75897C").s().p("AAlBQQghhWgrhJQAWAJAaADIAAgEQABAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQAHAUgWgFQACAQAHAJQACADAAAEQAEAXAFAXQAAABABAAQAAAAAAAAQABAAAAAAQABAAABAAQAGAUAJAUQAAAAAAAAQABAAAAAAQABAAAAAAQABABABAAIAAAIIAAAIQgBAAgBgBQAAAAgBAAQAAAAgBAAQAAAAAAAAg");
	this.shape_1256.setTransform(542.5,234.2);

	this.shape_1257 = new cjs.Shape();
	this.shape_1257.graphics.f("#B4D3BC").s().p("AgYAGIAAgHIAAgIIAAgIIANAAIAGAAQANAHAHAPQAAAAAAAAQABAAAAABQABAAAAAAQABAAAAAAQAAAEACACQABABAAAAQABAAAAAAQABABABAAQAAAAABAAIAAAEQgagCgXgKg");
	this.shape_1257.setTransform(540.95,225.575);

	this.shape_1258 = new cjs.Shape();
	this.shape_1258.graphics.f("#798B77").s().p("AgHAKQgIgHAAgOQAPAAAPAEQAAAAAAAAQAAABAAAAQAAABAAAAQABABAAABIgHAAIgLAAIAAAHIAAAIQgBAAgBAAQgBAAAAAAQgBgBAAAAQgBAAAAgBg");
	this.shape_1258.setTransform(538.8,224.15);

	this.shape_1259 = new cjs.Shape();
	this.shape_1259.graphics.f("#0D0E0D").s().p("AgxBzQAEgVgHgLQASgPAKgZQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQgEhOAoghQgEgdgDgDQgWgNAjgMQAKAoAWgMIAAAEQgnAbgFA+QgLgPgOA2QgNA4gXAlg");
	this.shape_1259.setTransform(521.425,253.35);

	this.shape_1260 = new cjs.Shape();
	this.shape_1260.graphics.f("#5F705F").s().p("AgDAoIAAhXIAFAAIABAIQAEAzgKAkIAAgIg");
	this.shape_1260.setTransform(512.1802,245.475);

	this.shape_1261 = new cjs.Shape();
	this.shape_1261.graphics.f("#617363").s().p("AgDAgIAAhHIAFAAIABAIQAEArgKAcIAAgIg");
	this.shape_1261.setTransform(512.7903,230.975);

	this.shape_1262 = new cjs.Shape();
	this.shape_1262.graphics.f("#5B6A61").s().p("AAWA4QgBAAgBAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQgtguABhAQA/AXgXBAIADAAQABANAJAGQACABAAAEIgGAAg");
	this.shape_1262.setTransform(521.3989,231);

	this.shape_1263 = new cjs.Shape();
	this.shape_1263.graphics.f("#0B1511").s().p("AAHAQIgGAAQAAgEgBgBQgIgGgCgMIAAgIQATAJACAWg");
	this.shape_1263.setTransform(524.05,235.025);

	this.shape_1264 = new cjs.Shape();
	this.shape_1264.graphics.f("#576559").s().p("AgKDBQgCgKgSAKIgGABQgTAEAAgNIAIgHIAEgBIAAAEQAcgWgcguIAAAIIAAAIIgDgBIgJgwQAlgXgJhAIgDAAIgLgDQgNAzgHhIQBHhCgOhnIgBgIQA5gIggAxQgCADAAAEQAOAiASAeQANBHgmASQAVAwAQA4QgLArgWAnQgQAfgLAAQgHAAgFgRgAgFCpQAlAMgTg8QgCgHgCAAQgGAAgIA3g");
	this.shape_1264.setTransform(503.7,226.9926);

	this.shape_1265 = new cjs.Shape();
	this.shape_1265.graphics.f("#5F715F").s().p("AgDAcIAAg/IAFAAIABAIQAEAngKAYIAAgIg");
	this.shape_1265.setTransform(513.4033,219.325);

	this.shape_1266 = new cjs.Shape();
	this.shape_1266.graphics.f("#9AAF9C").s().p("AhgECIgGAAIAAgIIAAgJIAAhIIAAgIIAAgoQALgtgFg8IAAgIIAAgIIAAhwQAChLAQg+IABgIIAxAAIAHAAIBuAAIAGAAQALApgEA4IAAAgIAAAIIgHAAIAABBIAAAIIAAAgIAAAIIgGAAIAABHIAAAIIAAAxIAAAIIgGAAIAABYIAAAIQAAAEgCADQgQAcg4gKIgHAAIhcAAIAAAIIgGAAgAgHC5QAKApAdg3QAVgnALgrQgPg4gWgwQAngSgOhHQgRgegOgiQAAgEACgDQAfgxg5AIIABAIQAPBnhIBCQAHBIANgzIALADIAAAIQgEBLghgcQAJBVgBA8QgBAYAegYQAKgFAFAAQAFAAABAFg");
	this.shape_1266.setTransform(503.4653,227.775);

	this.shape_1267 = new cjs.Shape();
	this.shape_1267.graphics.f("#5A6957").s().p("AA0gqIgGAAIhvAAIAAgIQAMgFAkAGQAgAEAxgFQAFA7gLAtQAFg3gLgpg");
	this.shape_1267.setTransform(507.8281,206.3488);

	this.shape_1268 = new cjs.Shape();
	this.shape_1268.graphics.f("#0F1205").s().p("AgDAUIAAgvQAOAzgOAEg");
	this.shape_1268.setTransform(518.375,202.425);

	this.shape_1269 = new cjs.Shape();
	this.shape_1269.graphics.f("#4E6450").s().p("AhGgDICHAAIAGAAIAAADQhHAEhGAAIAAgHg");
	this.shape_1269.setTransform(547.475,205.65);

	this.shape_1270 = new cjs.Shape();
	this.shape_1270.graphics.f("#7FA394").s().p("AgjgWQA2AEARAjIgJADQgKADgJAAQggAAgLgtg");
	this.shape_1270.setTransform(534.575,188.2302);

	this.shape_1271 = new cjs.Shape();
	this.shape_1271.graphics.f("#B7E3CB").s().p("AgegGQA9gFAAAMIgLAEQgLADgIAAQgTAAgMgOg");
	this.shape_1271.setTransform(530.4,194.6476);

	this.shape_1272 = new cjs.Shape();
	this.shape_1272.graphics.f("#99B9A7").s().p("AgPgLIAGAAIAGAAIAGAAIAGAAQgCALAEAEQAHAIgCAAQgEAAgbgXg");
	this.shape_1272.setTransform(525.1571,180.7366);

	this.shape_1273 = new cjs.Shape();
	this.shape_1273.graphics.f("#322720").s().p("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");
	this.shape_1273.setTransform(279.6,263.6);

	this.shape_1274 = new cjs.Shape();
	this.shape_1274.graphics.f("#948D7A").s().p("AiMOsIAAgJQABhzgBhWQAgnoAWncQAGh1gQhVQARgqgLg3IgBgHQAUAVgGg/QgHhHABhxQABhjARhAIAMgOQAcgNAlAJQADAAgBAMQgICKAPBkIAAgMIAAgRQABghARAyIADgCQAUgLAIgUQAhgPABAPQAAAEADAEQAKBFgMA1QgBADADAEQgxALgsAaQgMAHAAANQgLBbgBBmIAAAIIAAAIQgIBtgQBkIAABpIAAAIIgGAAIAAA3IAAAIQAABBACBAIAEAAQAegaA0AQQAPAFABANQAYArAfAPQAEACADAEQALAcAEA9IAAACIgCAGQgBAEACADQAGANgngEQgDgEgDAAQhFgKgwAOQgZD8gCEPQAABFgwAAQgUAAgdgMgAgvEHQAUAfAogSQAAAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBQAiAEgEgRQgIgeguAaIgGAAIgIAAQgQAAgHAIgAhUkbIAAAIQAbgNgbgjIAAAogAhBt/QAAEQgTEEQAAAEACACQATAXgDATQAAAEACACQAMAMAFgiQgCgHgFhCQgGhiAfASQAAgIACgIQAIgagKgvQgOgEADgHQAwioglh+QAQgCACgQQAFgegQgRQgrAAAAAwg");
	this.shape_1274.setTransform(490.5,158.7978);

	this.shape_1275 = new cjs.Shape();
	this.shape_1275.graphics.f("#627C6A").s().p("AjvBVQAnAEgGgNQgCgEAAgEIADgFQASgrAFg3QACgXAWAPQAHhBAeA9IAGgEQAUAGAagtQAAgBABAAQAAAAAAgBQABAAABAAQAAAAABAAQAAAEgCAEQgBAFgDAEQALAcBFALQAKABgBAMIADgEQApgDAbADIAGAAQAAAEACACQABAAAAABQAAAAABAAQAAAAABAAQABABAAAAIAyAPIAGABQAmAqAlANQAcAchOgLIgGgBIgGAAQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAAAgBAAQgWgJgOgLQgDAEgDABQhSAIgXg1IgHABQgHBDhCgMIgDAAQgMgsAoAMQAAgEACgDQAUgigKgOQgDgEgEgCQhBgWAKAsQgZABgNAgQgDAKgEgIQgVg3gnA7QAJA7A2gNQArgLASAWIgGAAQgiAIgpAAQgqAAgzgIgAB5AnIAIgDQgQgkg3gDQAOA5AxgPg");
	this.shape_1275.setTransform(525.2063,186.3438);

	this.shape_1276 = new cjs.Shape();
	this.shape_1276.graphics.f("#101511").s().p("AgFgKQgBgEAAgEIANAlIgMgdg");
	this.shape_1276.setTransform(517.4568,156.4489);

	this.shape_1277 = new cjs.Shape();
	this.shape_1277.graphics.f("#A7C29B").s().p("AgIgFQADgEACgFQABgDAAgEIAAgIQAUAJgIAmIAAAIIgBAEIgEAAQgXAAAKgjg");
	this.shape_1277.setTransform(533.1958,173.6891);

	this.shape_1278 = new cjs.Shape();
	this.shape_1278.graphics.f("#293530").s().p("AgJAFQAagugKA1QgBAFgDAAQgDAAgJgMg");
	this.shape_1278.setTransform(535.1583,154.036);

	this.shape_1279 = new cjs.Shape();
	this.shape_1279.graphics.f("#98BFA7").s().p("AgWgGQBVANhJAAQgLgBgBgMg");
	this.shape_1279.setTransform(554.4488,186.6);

	this.shape_1280 = new cjs.Shape();
	this.shape_1280.graphics.f("#97C1AB").s().p("AgJAAQAAAAAAAAQgBAAAAgBQAAgBAAAAQAAgBAAgBQAYAJgDAAIgUgFg");
	this.shape_1280.setTransform(555.1001,193.6643);

	this.shape_1281 = new cjs.Shape();
	this.shape_1281.graphics.f("#9EC6B0").s().p("AiLgcIC0AAIAGAAIAGAAIAAAEQA7ABAcAbIgBAEQghAGhBgCIgHAAQAMgYhDAJQAhAYgeAFQgVADgRAAQhHAAgMg5gAhlgUQASAWAhgKIALgEQAAgJghAAIgdABg");
	this.shape_1281.setTransform(537.525,196.0461);

	this.shape_1282 = new cjs.Shape();
	this.shape_1282.graphics.f("#9EC8B2").s().p("AARAcQg9gKg9gDQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQgCgDAAgEIAAgEQgOAAACgLQBtgiCKAWIAAAEQgcAug4AAQgLAAgMgCg");
	this.shape_1282.setTransform(545.9129,182.7719);

	this.shape_1283 = new cjs.Shape();
	this.shape_1283.graphics.f("#769680").s().p("Ah+CUIABgIQAKgvgYghQgRgWgrALQg2ANgKg7QAng7AWA4QADAHAEgJQAMghAagBQgKgsBBAWQAEACADAEQAJAOgUAjQgCADAAADQgngLALArIAEAAQBDAMAHhCIAGgBQAXA0BRgIQAEgBADgEQAOALAWAJQAAAAAAAAQABAAAAABQAAAAAAABQAAABAAABIgGAAIizAAQAOBIBpgRQAggFgigZQBDgJgLAZIAGAAQBBACAigGIAAgEQgbgcg8gBIAAgEIAHABQBOALgdgcQglgNglgqIgGgBIgygPQA9ADA9AJQBKALAig3IgBgEQiLgXhtAjQgCAMAPAAIAAAEIgGAAQgbgDgpADIgDAEQACgMgLgBQhGgLgLgcQADgEACgFQABgEAAgEQAwglANA2IABAIIgGAAIgGAAQAtAngSgXQgEgEACgMQBEAEgLg+QgDgPANgIQAAAEgBAEQgCAEgCAEQgLAoAcgDIABgFQB7gLB3gMIAGgBIAAAIIAAAIIgGAAQg3ABgmAPQAkAOA5gFIAGAAIAADQIAAAIQgBAAgBgBQAAAAgBAAQAAAAgBAAQAAgBAAAAQgMgPgPARQADANAWgFIAGAAIAAAgIAAAIIgGABIgmAHIgGAAIiIAAIAAAIIgZABIgpABQhSAAg4gagADXAwQArANgsgSQAAABAAABQAAABABAAQAAABAAAAQAAAAAAABgADQgPQBJAAhVgNQABANALAAg");
	this.shape_1283.setTransform(532.575,188.8462);

	this.shape_1284 = new cjs.Shape();
	this.shape_1284.graphics.f("#97BFAC").s().p("AgwADQAmgPA2AAIAGAAIAAAPIAAAIIgGAAIgfACQgjAAgagKg");
	this.shape_1284.setTransform(554,176.7526);

	this.shape_1285 = new cjs.Shape();
	this.shape_1285.graphics.f("#2C3924").s().p("AgSAIQASgNAOgRQAAAAABAAQAAgBABAAQAAAAABAAQABAAABAAIAAAfIAAAIQgEAAgBABQgMAHgGAAQgLAAgDgQg");
	this.shape_1285.setTransform(557.1,166.631);

	this.shape_1286 = new cjs.Shape();
	this.shape_1286.graphics.f("#2E3C24").s().p("AgMAEQAzgXgzAbg");
	this.shape_1286.setTransform(552.7875,169.4962);

	this.shape_1287 = new cjs.Shape();
	this.shape_1287.graphics.f("#8F7F6A").s().p("AgDADQgFgFgBgMQAVAdgDAAQgBAAgLgMg");
	this.shape_1287.setTransform(527.0318,49.7769);

	this.shape_1288 = new cjs.Shape();
	this.shape_1288.graphics.f("#7C9884").s().p("AgPADQABAAABAAQABAAAAAAQABgBAAAAQABAAAAAAQACgCAAgEQAGgHAMgBIAGAAIAAAIIAAAHQgBAAgBAAQgBAAAAAAQgBABAAAAQAAAAgBABQgGAIgGAAQgHAAgHgKg");
	this.shape_1288.setTransform(557.4,142.1445);

	this.shape_1289 = new cjs.Shape();
	this.shape_1289.graphics.f("#253325").s().p("AghBoQgDgHgCAAQgWgHgNgBQg0gBACg3QBZgDgmgeQgRgOADggQAZghAlAIQAZgLAhgaQADgDANAIQAcgjAWAjQAGAKASgCIAACAIAAAIQgcAWgXgTQgHgGgkgVQhCgmgGBGQARAGAIAOQAbAygiADQgGgJgDgJg");
	this.shape_1289.setTransform(546.5443,157.6812);

	this.shape_1290 = new cjs.Shape();
	this.shape_1290.graphics.f("#1C352A").s().p("AgHAjQgSgMAFgiQAIgPAVgFIABgEIAGAAIAGAAIAAA3IAAAIIgGAAQgNABgEAHQgEAAgCgBg");
	this.shape_1290.setTransform(556.73,138.025);

	this.shape_1291 = new cjs.Shape();
	this.shape_1291.graphics.f("#71837A").s().p("AANAMIgHAAIgGAAQgGgBgMgHQABAAABAAQABAAAAAAQABgBAAAAQAAAAABAAQABgDAAgDIAAgIQASACAIAMQABAAAAAAQAAAAABABQAAAAABAAQABAAABAAIAAAIIgGAAg");
	this.shape_1291.setTransform(557.1,133.2);

	this.shape_1292 = new cjs.Shape();
	this.shape_1292.graphics.f("#253929").s().p("ABAAvQgIgNgTgCIAAAIQgVAAAOgKIAHgGQgXAIAFggIgGAAQgpgHgnggQAqgEAZAAQANAAANANQAEAEAHgJQACgCAdgKIAABXIAAAIQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_1292.setTransform(552.125,128.775);

	this.shape_1293 = new cjs.Shape();
	this.shape_1293.graphics.f("#334129").s().p("AgNgEQAygJgrAUIgHgLg");
	this.shape_1293.setTransform(555.9689,115.565);

	this.shape_1294 = new cjs.Shape();
	this.shape_1294.graphics.f("#323A29").s().p("AgXgCQA0gngFAlQgBAGgIAMQgGAJgHAAQgLAAgOgZg");
	this.shape_1294.setTransform(549.5716,113.8041);

	this.shape_1295 = new cjs.Shape();
	this.shape_1295.graphics.f("#8F8A72").s().p("AgKAAQAsgXgqAhIgCABQgDAAADgLg");
	this.shape_1295.setTransform(556.9081,109.5955);

	this.shape_1296 = new cjs.Shape();
	this.shape_1296.graphics.f("#908570").s().p("AgRgKQARALAOgKQACgBADAAIAAAIIAAAHIgGABQgKAFgGAAQgPAAABgVg");
	this.shape_1296.setTransform(557.0985,103.3227);

	this.shape_1297 = new cjs.Shape();
	this.shape_1297.graphics.f("#749C8B").s().p("AAFAoIgDAAQgCgPgHgJQAKgTgBgkIADAAQgEAuAHAhg");
	this.shape_1297.setTransform(533.025,130.375);

	this.shape_1298 = new cjs.Shape();
	this.shape_1298.graphics.f("#1D3228").s().p("AgaAYQgCgCAAgEQgPgIACgnIAAgIQAFAJAgAeIAHgCQA6gLgcAdQgMAUgRAAQgNAAgRgOg");
	this.shape_1298.setTransform(544.5098,137.4491);

	this.shape_1299 = new cjs.Shape();
	this.shape_1299.graphics.f("#7A9C8D").s().p("AghgBIAGAAQA8gNgYgbIAMAAIANAAQAGA2gwAFIgDAKQgEAOgEAAQgHAAgHgrg");
	this.shape_1299.setTransform(536.3327,137.8176);

	this.shape_1300 = new cjs.Shape();
	this.shape_1300.graphics.f("#C4F3DC").s().p("AgIgeQAEAxAOAJQAEACgLABIgCAAQgPAAAGg9g");
	this.shape_1300.setTransform(535.0883,128.6796);

	this.shape_1301 = new cjs.Shape();
	this.shape_1301.graphics.f("#0F1012").s().p("AArDYQgLgngggQIgGgBQgVhQgQg1IAAAEQgHApABhIQArhOAGhzQABgoAFAgQgLA+AJgPIAhgvQANAjAAA9QABBOghAqQAbBKABB/g");
	this.shape_1301.setTransform(500.6702,157.0762);

	this.shape_1302 = new cjs.Shape();
	this.shape_1302.graphics.f("#0D1215").s().p("AgDAJQgHgFAFgPQAXALgSAMg");
	this.shape_1302.setTransform(510.5059,128.375);

	this.shape_1303 = new cjs.Shape();
	this.shape_1303.graphics.f("#6C765E").s().p("AgPAaQARgXAKggQAAAAAAAAQABgBAAAAQABAAAAAAQABAAABAAIgBAIIgGAJIAAAPIAAAIQAAAEgBADQgIAOgGAAQgFAAgEgFg");
	this.shape_1303.setTransform(520.15,106.0899);

	this.shape_1304 = new cjs.Shape();
	this.shape_1304.graphics.f("#80A183").s().p("AADAYQgDgagFgVIAFAAIAGAAIAAAnIAAAIg");
	this.shape_1304.setTransform(539.0875,125.55);

	this.shape_1305 = new cjs.Shape();
	this.shape_1305.graphics.f("#CDF4DF").s().p("AgWAEIAAgHQBZAAhTAHIgGAAg");
	this.shape_1305.setTransform(536.4776,118.7);

	this.shape_1306 = new cjs.Shape();
	this.shape_1306.graphics.f("#A6CEB6").s().p("AgzBiIAAgZIADAAQgHghAEguIAAgIIAAgIQAQgVgIgcIgBgIIAGAAQBTgIhZAAIAAgIIAAgIQBdgMglBGQgCADAAAEIgGAAIgFAAQAFAUADAbIADAAQAUAVAXAEIgHAEQgVALgPAQIgLAAIgNAAQAXAcg8ANIAAgIgAggAvQALgBgEgCQgPgJgEgxQgGBAASgDg");
	this.shape_1306.setTransform(538.6773,127.0803);

	this.shape_1307 = new cjs.Shape();
	this.shape_1307.graphics.f("#A8C5B0").s().p("AgbgBQAFgIANAAIAHAAQAcgGABAGIABAIQAAADgCABQgRAKgLAAQgQAAgJgOg");
	this.shape_1307.setTransform(536.3,113.7063);

	this.shape_1308 = new cjs.Shape();
	this.shape_1308.graphics.f("#7EA696").s().p("AgBAcQACghgIgWQADgEAEgDQABgBADAAIAAAIIAAAIIABAIQAIAagOAVIAAgIg");
	this.shape_1308.setTransform(533.7112,121.125);

	this.shape_1309 = new cjs.Shape();
	this.shape_1309.graphics.f("#0D1517").s().p("AgCANQgFgMABgUQAYAjgSAEg");
	this.shape_1309.setTransform(530.4929,111.475);

	this.shape_1310 = new cjs.Shape();
	this.shape_1310.graphics.f("#101115").s().p("AgcBdQASgDgFgmIgRh+QgBgGAFgTQAcgggPgxIgBgIQAYgqgKg3IgBgIQAcAcADA8QAEBGgYATQAdBdgVA0QgCADAAAEQAaAegUA3IAEABQAGADADAIQgIA2gRAeQgIAPgJAWQAAAVgDASIgEABQADhugPhbg");
	this.shape_1310.setTransform(527.7159,138.825);

	this.shape_1311 = new cjs.Shape();
	this.shape_1311.graphics.f("#88997F").s().p("AgMAYIAAgQIAFgIIABgHIAAgIQAGgEADgGQACgCAAgEIAGAAIABAIIABAEQABAIgEADIgFABIAAAHIAAAIIgDAAQgBAUgNAEIAAgIg");
	this.shape_1311.setTransform(522.4278,103.825);

	this.shape_1312 = new cjs.Shape();
	this.shape_1312.graphics.f("#304326").s().p("AgBAHIgBgHIAAgIIAAgQQAGAxgBAAQgBAAgDgSg");
	this.shape_1312.setTransform(540.6439,103.147);

	this.shape_1313 = new cjs.Shape();
	this.shape_1313.graphics.f("#3D471C").s().p("AgEAQIAAgnQATATgTAcg");
	this.shape_1313.setTransform(543.2875,90.95);

	this.shape_1314 = new cjs.Shape();
	this.shape_1314.graphics.f("#A2D3C1").s().p("AgDgFQgBgDAAgEIAJAZIgIgSg");
	this.shape_1314.setTransform(537.7695,98.6695);

	this.shape_1315 = new cjs.Shape();
	this.shape_1315.graphics.f("#8AB2A1").s().p("AAsBvQgBgGgdAGQAAgggPhCIgCgLQghAEgXg3QAMhhBjAnIAGABQAFAmgFA7IAAAPIAAAIIgDAAQABA8gLAtIgBgIgAAcgiQATAngUguQAAAEABADg");
	this.shape_1315.setTransform(534.575,101.6035);

	this.shape_1316 = new cjs.Shape();
	this.shape_1316.graphics.f("#243928").s().p("AgMAQIAAgJIAAgXIASAAIAGAAIABAIQAEAZgTAAIgKgBg");
	this.shape_1316.setTransform(524.8974,94.2386);

	this.shape_1317 = new cjs.Shape();
	this.shape_1317.graphics.f("#244330").s().p("AgVAEIgGAAIAAgHQBqADheAEIgGAAg");
	this.shape_1317.setTransform(532.6464,83.3);

	this.shape_1318 = new cjs.Shape();
	this.shape_1318.graphics.f("#769B87").s().p("AgKAZQgBgCAAgEIABgBQAJgRgBgdIACAAQgHAmASAMQABABAAAEIgGABIgHABQgGAAgDgEg");
	this.shape_1318.setTransform(529.775,79.3645);

	this.shape_1319 = new cjs.Shape();
	this.shape_1319.graphics.f("#BEE2CE").s().p("AhIgFQAAgBgBAAQAAAAAAgBQAAAAAAgBQgBgBAAgBQA/gBBWAFIAAAEQgdANgiAAQgmAAgugQg");
	this.shape_1319.setTransform(533.5,86.3926);

	this.shape_1320 = new cjs.Shape();
	this.shape_1320.graphics.f("#54683B").s().p("AgQgHQBAADg0ALIgGABQgLAAAFgPg");
	this.shape_1320.setTransform(516.6369,93.359);

	this.shape_1321 = new cjs.Shape();
	this.shape_1321.graphics.f("#202524").s().p("Ag0HmQgEg9gLgcQgDgEgFgCQgegPgYgrQgBgNgPgFQg1gQgfAaIgDAAQgDhAAAhBQALgUgEgkIgBgIIAAgIIAAhpQARhjAIhtIAAgIQAShDAMhGIABgIQATgJAFgXIABgIQAsgjAxgeIAMgIQAoBAA4AsQAGAFAJAAQgLhJgphCQgBgCAEgEQAVAwA1AQQAOAFgCgNQASACAHgGIAAAEQAAAEgCADQgEAGgGADIAAAIQgBAAgBAAQAAAAgBAAQAAABAAAAQgBAAAAAAQgKAhgRAXQAKAOANgXQACgDAAgEQAOgEABgUIADAAIAFgSQAEgCgBgIQAJgbAEAXQAKA6ANg7QAeAQALAUIAFAKQAFAKALABQgUBTAUAFQgiBrAOCPQAQCbgCCOIAAAIQgOAHADAPQAMA+hGgEIgGAAIgGAAIgBgIQgOg1gvAlQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgaAugUgHIgGAEQgeg8gGBAQgWgOgCAWQgFA5gSAqIAAgCgAguFdQAAh/gchKQAigrgBhOQgBg8gNgjIghAvQgKAPAMg+QgFgggCAoQgFBygsBOQgBBJAHgpIAAgEQARA1AVBQIAFABQAiAQAKAnIADAAIAAAAgACvlOQALA2gZArIABAHQAQAxgdAgQgFAUABAGIARB+QAFAmgSACQAPBbgDBuIAEAAQADgTAAgVQAKgVAIgPQARgeAIg3QgDgHgGgDIgEgCQAUg2gagdQAAgEACgEQAVg1gdhcQAYgTgEhGQgDg9gdgbIABAIgABGBzQAaBBgchIQAAAEACADgAiQBnIgEAFQAjgBgjgYQAKANgGAHgAiaAbIAAAIQAegYgegfIAAAvgAiniVIACANQANgpgCAAQgBAAgMAcgAACiQIAEADQASgNgYgLQgEAQAGAFgADKk1IADAHQATgEgZgkQgCAVAFAMgAhbleQAOBSgPhaIABAIg");
	this.shape_1321.setTransform(509.925,143.775);

	this.shape_1322 = new cjs.Shape();
	this.shape_1322.graphics.f("#8C9A82").s().p("AgYgSIAAgIQAFhCAdAJQANAFACAbQAIBRgmA3QgZgdAGhKg");
	this.shape_1322.setTransform(504.9851,89.6902);

	this.shape_1323 = new cjs.Shape();
	this.shape_1323.graphics.f("#99BCA0").s().p("AgGBBIAAgpQAKgngCg4IADAAQAJBXgUA5g");
	this.shape_1323.setTransform(514.9975,81.3);

	this.shape_1324 = new cjs.Shape();
	this.shape_1324.graphics.f("#87A687").s().p("AgFCyQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBQgSgTgbgLQgUgJgCgfIgBgQQgRADgDgcQALg/ABhJIAAgIQAxgwAygvQAGgGASAFQAEBWgQBDQAAghgGgfIAAgBQAJArgcAmQAHA4AaAmQABAAAAABQAAAAABAAQAAAAABAAQAAAAABAAQgJg9BGAZQABAAAAAAQAAABAAAAQAAABAAABQAAAAAAABIgGAAQgsgDABArIgGAAIgTAAIAAAYIAAAJIAAAoIAAAIIgGAAIAAgEQgGAEgMAAIgGAAgAgxBxQA1gMhBgEQgFAUARgEgAhDAJIAAAoIAAAIQAVg4gJhYIgDAAQACA4gLAog");
	this.shape_1324.setTransform(521.075,82.8074);

	this.shape_1325 = new cjs.Shape();
	this.shape_1325.graphics.f("#2A301C").s().p("AgXhfQBEgHgbAyQgFAJgMAMQAGAtgSBTQgRhVAFhrg");
	this.shape_1325.setTransform(510.4871,74.0123);

	this.shape_1326 = new cjs.Shape();
	this.shape_1326.graphics.f("#67917F").s().p("AABAPQgIAAgEgSQAXgaAAAhQABALgKAAIgCAAg");
	this.shape_1326.setTransform(534.726,67.9905);

	this.shape_1327 = new cjs.Shape();
	this.shape_1327.graphics.f("#95BEAC").s().p("AgxBuQAAgEgBgBQgTgMAIgnIAAgIIAAhAQAIhVBggHQAdgDgKA3IAAAIIAAAIQgDBVgWBDIgGAAQgMABgTAAIgxgBgAgYgiQAEATAKAAQAKABAAgMQAAgTgHAAQgGAAgLALg");
	this.shape_1327.setTransform(535.9952,71.0821);

	this.shape_1328 = new cjs.Shape();
	this.shape_1328.graphics.f("#2D3E28").s().p("AgEAPIAAgIQAThAgQBPIgDABIAAgIg");
	this.shape_1328.setTransform(542.7405,64.5481);

	this.shape_1329 = new cjs.Shape();
	this.shape_1329.graphics.f("#94B8A2").s().p("AhKCPQgbgmgHg5QAcglgJgqIAAABQAHAegBAgQAQhBgEhXIAAgIIAAgIQAWA5gIBXIgBAIQALhLAChVQAFBfAIBYIgBABQAAAEABACIACARQAAABAKAAIAFAAQA+AIA9AMIAAAEQgfAohWgPQAAgBAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQhHgYAJA9QAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBgAg6BQQAAABAAABQAAABAAAAQABABAAAAQAAABABAAQBWAhA8geIAAgEQhEgEg0AAIgcAAg");
	this.shape_1329.setTransform(531.95,77.275);

	this.shape_1330 = new cjs.Shape();
	this.shape_1330.graphics.f("#324021").s().p("AgFgDQAKgkgBg0IADAAQgBBPgFBoQgKgoAEg3g");
	this.shape_1330.setTransform(544.6097,71.25);

	this.shape_1331 = new cjs.Shape();
	this.shape_1331.graphics.f("#3E2D21").s().p("AgOgRIAYgHIAGgBIAAAnIAAAIIgGABQgGADgEAAQgSAAAEgrg");
	this.shape_1331.setTransform(557.3707,61.3741);

	this.shape_1332 = new cjs.Shape();
	this.shape_1332.graphics.f("#253927").s().p("AhGCHIAblAIAEAAQAcgCAtgPIAAAIIAAARQgRAvAjAZIAJgFQAEgDAGAAIAAAwIAAAIQgXADgBgTIAAgIQg/gCAsASIADAAQghA0ALA0QgRgLgCALQgOBJgoAwQgFAXAMAGIAFADQgGALgEAAQgKAAAChEg");
	this.shape_1332.setTransform(551.8066,80.6097);

	this.shape_1333 = new cjs.Shape();
	this.shape_1333.graphics.f("#8D7F6B").s().p("AghgLQASAIArgPIAGgBIAAAYIAAAIIgGABQgSAGgMAAQgeAAgBgfg");
	this.shape_1333.setTransform(555.55,45.4303);

	this.shape_1334 = new cjs.Shape();
	this.shape_1334.graphics.f("#908069").s().p("AgPAAIgBgFQAkALgEAAIgfgGg");
	this.shape_1334.setTransform(550.7063,33.588);

	this.shape_1335 = new cjs.Shape();
	this.shape_1335.graphics.f("#785E43").s().p("ABJgLQABgBAAgEQgNhsAaBsQARgBACgnQAJA0APg1IAABAIAAAIIgGAAQiIAjh1AVQB6gmBQgsg");
	this.shape_1335.setTransform(545.925,15.425);

	this.shape_1336 = new cjs.Shape();
	this.shape_1336.graphics.f("#917F68").s().p("AgNgCQgBgBAAgEQAfAPgCAAQgCAAgagKg");
	this.shape_1336.setTransform(538.1065,37.843);

	this.shape_1337 = new cjs.Shape();
	this.shape_1337.graphics.f("#8C8068").s().p("AgCAFQgJgCgGgLQArARgJAAQgEAAgPgEg");
	this.shape_1337.setTransform(534.087,48.4003);

	this.shape_1338 = new cjs.Shape();
	this.shape_1338.graphics.f("#918069").s().p("AgFAEIgBgBQgFgDAAgLQAoAFgcASIgCAAQgDAAgBgIg");
	this.shape_1338.setTransform(525.4181,39.8908);

	this.shape_1339 = new cjs.Shape();
	this.shape_1339.graphics.f("#907F65").s().p("AgDgRIgBgIIAJAzIgIgrg");
	this.shape_1339.setTransform(523.4378,41.21);

	this.shape_1340 = new cjs.Shape();
	this.shape_1340.graphics.f("#918066").s().p("AgEgFQgCgDAAgEIANAZIgLgSg");
	this.shape_1340.setTransform(523.651,46.3941);

	this.shape_1341 = new cjs.Shape();
	this.shape_1341.graphics.f("#9A8B75").s().p("AjKBXQAMg8AKhDIADgBQBHgjBhgNQA+gJBcgGIAAAPIAAAYQgOAPAfAFQAAAAAAAAQAAAAAAABQAAAAgBABQgBAAgBAAQgRAHgKgNQgkAZA6ANQAIACgKADQgHADASAJQAtgqgEAyIgDAAIg3AIQgBABAAAIQinAnivAjIgBAAQgIAAAEgSgAicgoQgXA2gEBJQAAANASgFQAsgKAfgWQgGAAgFgDQgUgJgTgMQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAAAIgDgHQgRAWAFg2QADADABAAQAbgMgZgfQgBAAgBAAQAAABgBAAQAAAAAAAAQgBAAAAAAg");
	this.shape_1341.setTransform(502.2731,51.6591);

	this.shape_1342 = new cjs.Shape();
	this.shape_1342.graphics.f("#433629").s().p("AAAAMQABgWgHgOQAXApgSAIg");
	this.shape_1342.setTransform(520.6574,8.425);

	this.shape_1343 = new cjs.Shape();
	this.shape_1343.graphics.f("#61604E").s().p("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");
	this.shape_1343.setTransform(504.025,126.375);

	this.shape_1344 = new cjs.Shape();
	this.shape_1344.graphics.f("#8C8176").s().p("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");
	this.shape_1344.setTransform(354.4138,140.45);

	this.shape_1345 = new cjs.Shape();
	this.shape_1345.graphics.f("#4A2D20").s().p("AjDBgQAlgngIg6IgOhrIgDAAIAAgDIAGgxIFnAAIAHAAQALApgFA3QgPA1gKg0QgCAngRABQgZhsANBsQAAAEgCABQhQAsh6AnQB0gWCKgjIAGAAIAAA5IAAAHQi3AnirAwIgIACQAGgkgigdg");
	this.shape_1345.setTransform(539.4781,16.1);

	this.button_6_1 = new lib.death();
	this.button_6_1.name = "button_6_1";
	this.button_6_1.setTransform(348.85,189.1,1,1,0,0,0,86.3,-45.6);
	new cjs.ButtonHelper(this.button_6_1, 0, 1, 2);

	this.shape_1346 = new cjs.Shape();
	this.shape_1346.graphics.f("#160A0A").s().p("AgYAwQgPgEAFgUQAtABghAXgAAJgrQAAAAAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBQAhAJgFAAIgbgFg");
	this.shape_1346.setTransform(310.4266,288.95);

	this.shape_1347 = new cjs.Shape();
	this.shape_1347.graphics.f("#C3CAB9").s().p("AgQgBQArgegNAlIgCAGIgGADQgHgBgPgPg");
	this.shape_1347.setTransform(305.4895,273.8632);

	this.shape_1348 = new cjs.Shape();
	this.shape_1348.graphics.f("#150A08").s().p("AgeADQAzgSAKASIgNABQgRACgLAAQgOAAgGgDg");
	this.shape_1348.setTransform(300.1,285.4199);

	this.shape_1349 = new cjs.Shape();
	this.shape_1349.graphics.f("#636262").s().p("AhAAQIABgIQAJgXgvAIQgFAOAKAEQAAAAAAABQAAAAABABQAAAAAAABQAAABAAABIgFgBQgVgKABgMIAAgIIDrAAIAGAAQAAAEgCACQAAABgBAAQAAAAAAAAQgBABgBAAQAAAAgBAAIAAAHIAAAIIgGAAQg0AIhPAAIgqAAg");
	this.shape_1349.setTransform(299.1477,279.325);

	this.shape_1350 = new cjs.Shape();
	this.shape_1350.graphics.f("#535250").s().p("AAMANIgYAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAAAAAgBQgKgEAFgOQAugIgJAXIgBAIIgGAAg");
	this.shape_1350.setTransform(290.8244,279.6015);

	this.shape_1351 = new cjs.Shape();
	this.shape_1351.graphics.f("#C4CBC1").s().p("AhWAYIgBgEQBHAKAmgQIAGgDIAKgHIAFgPQAMgmAHAyQAOAJAEgGQAXALgqAOQhJgBhKgEg");
	this.shape_1351.setTransform(303.8955,274.0469);

	this.shape_1352 = new cjs.Shape();
	this.shape_1352.graphics.f("#C4CBB9").s().p("AgUAAQBTgHhTAKg");
	this.shape_1352.setTransform(300.3625,268.0639);

	this.shape_1353 = new cjs.Shape();
	this.shape_1353.graphics.f("#5B5B5E").s().p("AghBPIAAgIIAAgIQAAAAABAAQABgBAAAAQABAAAAAAQAAgBABAAQACgCAAgEQAkADgQgkQgBgEAAgEIAAgIIAAgXQAUgwAHgJQAIgLgFAUQgLAYAOAlIAHAVIACAOQAEAwg7AAIgMAAg");
	this.shape_1353.setTransform(314.0855,272.238);

	this.shape_1354 = new cjs.Shape();
	this.shape_1354.graphics.f("#C6CBBA").s().p("AgPgGQgCgBAAgEQAkAXgBAAQgCAAgfgSg");
	this.shape_1354.setTransform(305.5629,269.248);

	this.shape_1355 = new cjs.Shape();
	this.shape_1355.graphics.f("#C5CDB7").s().p("AgIACIAAgDQAcADgTAAIgJAAg");
	this.shape_1355.setTransform(305.9125,261.8083);

	this.shape_1356 = new cjs.Shape();
	this.shape_1356.graphics.f("#C3CDB9").s().p("AgMAAQAygKgyAOg");
	this.shape_1356.setTransform(308.15,256.7173);

	this.shape_1357 = new cjs.Shape();
	this.shape_1357.graphics.f("#575A5D").s().p("AgCARQgEgSgBgWQAaAVgUAag");
	this.shape_1357.setTransform(311.4094,254.325);

	this.shape_1358 = new cjs.Shape();
	this.shape_1358.graphics.f("#565859").s().p("AgMA4IgGggIAAgIQAEgngEggQARAWANgeIACAHQAQA+gjgdQAFAmgIAxIgEAAIAAgIg");
	this.shape_1358.setTransform(313.7938,263.2);

	this.shape_1359 = new cjs.Shape();
	this.shape_1359.graphics.f("#130909").s().p("Ah1AHQgDAAgDgEQAegKBSAAQBUAAAzADQhrAMh0AAIgSgBg");
	this.shape_1359.setTransform(283.325,286.2025);

	this.shape_1360 = new cjs.Shape();
	this.shape_1360.graphics.f("#585A5D").s().p("AhAgSIB7AAIAGAAQAAAIgEAEQgXAXgoABIgEABQgsAAgOglg");
	this.shape_1360.setTransform(279.925,280.3528);

	this.shape_1361 = new cjs.Shape();
	this.shape_1361.graphics.f("#100A0C").s().p("AjpEaQALg+gLgrQATgNgDhEIAAgQQAAgIgJgIQABhRAagtQAAgBAAAAQAAAAABAAQAAAAABAAQABAAABAAQgGAqA9AKIAAAEQAKAnAVAQIAGgIIAHgQQAUAgAjgSQAEgCADgEQgFhKALhOIgGAAQgwAJgLgVIgDAEQAIg8giAiQgCACgDAAQgpgZgegjQgBAAAEgEQA2ATAHgRQABgCAGAAQBMgLBogRIACgBQADgEAAgIQgGgfAuADIgDAEQASAegFAbIACgIQAIgaAVgPQAsgDgDAbQgBAEgDAEQgjA0A2gLIADACQAKAHAMgBQAjAPg2AFIgFgKQgBgCgHAAQgtAxgZgsQgBgBADgEQgsgxhTAfQgFACgDAIQgGAggBAYQAgAXgFA5QgEA1ABAjIgYAgQAWBUgcBdQhKAghoANIgBAAQgGAAgUgEg");
	this.shape_1361.setTransform(258.2791,316.3348);

	this.shape_1362 = new cjs.Shape();
	this.shape_1362.graphics.f("#120909").s().p("Ah0gCQAAAAAAAAQAAAAgBgBQAAAAAAgBQAAgBAAgBQByAMBvgTQAEgBAGAIQhAAUg8AAQg4AAg2gQg");
	this.shape_1362.setTransform(256,278.3637);

	this.shape_1363 = new cjs.Shape();
	this.shape_1363.graphics.f("#110809").s().p("Ag9AFQAdgdBYAVIAGABQgTAPgoAAQgaAAgmgIg");
	this.shape_1363.setTransform(260.975,267.5429);

	this.shape_1364 = new cjs.Shape();
	this.shape_1364.graphics.f("#605B58").s().p("AAFAbQgFgEgCgMQgEgZgSAQQAAgDgCgDIgFgJIAAgIIAAgIQA5gTAFAxQAEAigNAAQgHAAgKgIg");
	this.shape_1364.setTransform(263.5164,255.724);

	this.shape_1365 = new cjs.Shape();
	this.shape_1365.graphics.f("#645E55").s().p("AgRAeQgxgKAFg1QAhAZARACQAtADAdAJQgKAcgnAAQgOAAgRgEg");
	this.shape_1365.setTransform(259.0972,247.3215);

	this.shape_1366 = new cjs.Shape();
	this.shape_1366.graphics.f("#C1C5BF").s().p("AgPgLQAPAAAPAEQAAAAAAAAQAAAAAAABQAAAAAAABQABABAAABIgDAAQgDAPgGAAQgGAAgNgXg");
	this.shape_1366.setTransform(306.6,241.0553);

	this.shape_1367 = new cjs.Shape();
	this.shape_1367.graphics.f("#B2BBAB").s().p("AgxDBIgGAAIh8AAIgBgIQgFgUgHgUIAAgIQgPilgQikIAZAAIAGAAIFCAAIAGAAQAWArAGgjIADAAQAWB2AMCCIAEAAIAFAhIABAIQAAAUADATIADABQAAAEACADQARAkgmgDIgGAAIjrAAIAAAIIgGAAgAAlCtQBKAEBLAAQApgNgWgLQgEAGgPgKQgGgzgNAnIgEAQIgLAGIADgGQAMgmgrAeQAOAQAIABQgmAQhHgJIAAAEgAB+BeQBDAphFgvQAAAEACACgABEBYIAAAEQA0gGgMAAIgoACgACIAcQAjABgjgFgACbgXIAAAEQAcgJgEAAIgYAFg");
	this.shape_1367.setTransform(291.4401,259.175);

	this.shape_1368 = new cjs.Shape();
	this.shape_1368.graphics.f("#565554").s().p("AiiEXQgTgvgKhxQAZgdgHgjIgGAEQgjg2ARhOQgXAKAPgjQANgcg9gTQBMgDAbgjQAQgVgHguQASgOAlACIAAgEQAdAzgIAJQgXAYAhAEQBFAZgWgjQgDgGgMADQgHABgGAEQAAgEgBgDIgFgJQBBAJgcghIAFAAQANAAARg0IgEAUQgHAtATATIgHAAIgGAAQAZAyApgsQACgCAAgEQAAgEACgCQAVgdgxgJQA0gBAKgwIABANIABAYIAAAIQgFAcAJAOQACACAAAEIgGAAIgNAAQAbAoBUgbQAAAAAAgBQAAAAAAgBQAAAAAAgBQABgBAAgBQAQAOAFAaQALBGgUgVQABg0goALQhSAWgJglQgBAAgBAAQAAAAgBAAQAAAAAAAAQAAABAAAAQgDAHgCAAQhyAWiKgGIAAAIIgGAAIgZAAQAQCjAPCmIAAAIIgGBIQgGgEgCgFgAiBiuQBLgChXgSQgCAVAOgBg");
	this.shape_1368.setTransform(287.0484,252.075);

	this.shape_1369 = new cjs.Shape();
	this.shape_1369.graphics.f("#660000").s().p("AqKGiIAAgKIgBhdIAAghIAAhAIAAgEIgBhUIAAgNIgBhKIAAgiIgBhGIAAgMIAAhTIAAgLIgBhWIAAgLIgBhZIAAgIIgBhYIAAgDIAAgXIGugEIBSAAIMAgHIAGAAIAEAAIAEAAIANAAIACDfIAAAzIAAAjIABArIAAAUIABA3IAAAPIAABLIAAAIIABBPIAAAIIABBBIAAAhIABBCIAAAPIAAAFIAAA6IABAaIAAAPIAABDIgnABIgPAAIhFAAIhOABIiaABIgXAAIgPAAIgdABInSAEIhrABIgCAAIhBAAIghABIhxABIgJAAIgLAAIgSAAIgUAAIgpAAg");
	this.shape_1369.setTransform(246.7,70.375);

	this.shape_1370 = new cjs.Shape();
	this.shape_1370.graphics.f("#322720").s().p("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");
	this.shape_1370.setTransform(279.6,263.6);

	this.shape_1371 = new cjs.Shape();
	this.shape_1371.graphics.f("#8C8176").s().p("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");
	this.shape_1371.setTransform(354.4138,140.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1345},{t:this.shape_1344},{t:this.shape_1343},{t:this.shape_1342},{t:this.shape_1341},{t:this.shape_1340},{t:this.shape_1339},{t:this.shape_1338},{t:this.shape_1337},{t:this.shape_1336},{t:this.shape_1335},{t:this.shape_1334},{t:this.shape_1333},{t:this.shape_1332},{t:this.shape_1331},{t:this.shape_1330},{t:this.shape_1329},{t:this.shape_1328},{t:this.shape_1327},{t:this.shape_1326},{t:this.shape_1325},{t:this.shape_1324},{t:this.shape_1323},{t:this.shape_1322},{t:this.shape_1321},{t:this.shape_1320},{t:this.shape_1319},{t:this.shape_1318},{t:this.shape_1317},{t:this.shape_1316},{t:this.shape_1315},{t:this.shape_1314},{t:this.shape_1313},{t:this.shape_1312},{t:this.shape_1311},{t:this.shape_1310},{t:this.shape_1309},{t:this.shape_1308},{t:this.shape_1307},{t:this.shape_1306},{t:this.shape_1305},{t:this.shape_1304},{t:this.shape_1303},{t:this.shape_1302},{t:this.shape_1301},{t:this.shape_1300},{t:this.shape_1299},{t:this.shape_1298},{t:this.shape_1297},{t:this.shape_1296},{t:this.shape_1295},{t:this.shape_1294},{t:this.shape_1293},{t:this.shape_1292},{t:this.shape_1291},{t:this.shape_1290},{t:this.shape_1289},{t:this.shape_1288},{t:this.shape_1287},{t:this.shape_1286},{t:this.shape_1285},{t:this.shape_1284},{t:this.shape_1283},{t:this.shape_1282},{t:this.shape_1281},{t:this.shape_1280},{t:this.shape_1279},{t:this.shape_1278},{t:this.shape_1277},{t:this.shape_1276},{t:this.shape_1275},{t:this.shape_1274},{t:this.shape_1273},{t:this.shape_1272},{t:this.shape_1271},{t:this.shape_1270},{t:this.shape_1269},{t:this.shape_1268},{t:this.shape_1267},{t:this.shape_1266},{t:this.shape_1265},{t:this.shape_1264},{t:this.shape_1263},{t:this.shape_1262},{t:this.shape_1261},{t:this.shape_1260},{t:this.shape_1259},{t:this.shape_1258},{t:this.shape_1257},{t:this.shape_1256},{t:this.shape_1255},{t:this.shape_1254},{t:this.shape_1253},{t:this.shape_1252},{t:this.shape_1251},{t:this.shape_1250},{t:this.shape_1249},{t:this.shape_1248},{t:this.shape_1247},{t:this.shape_1246},{t:this.shape_1245},{t:this.shape_1244},{t:this.shape_1243},{t:this.shape_1242},{t:this.shape_1241},{t:this.shape_1240},{t:this.shape_1239},{t:this.shape_1238},{t:this.shape_1237},{t:this.shape_1236},{t:this.shape_1235},{t:this.shape_1234},{t:this.shape_1233},{t:this.shape_1232},{t:this.shape_1231},{t:this.shape_1230},{t:this.shape_1229},{t:this.shape_1228},{t:this.shape_1227},{t:this.shape_1226},{t:this.shape_1225},{t:this.shape_1224},{t:this.shape_1223},{t:this.shape_1222},{t:this.shape_1221},{t:this.shape_1220},{t:this.shape_1219},{t:this.shape_1218},{t:this.shape_1217},{t:this.shape_1216},{t:this.shape_1215},{t:this.shape_1214},{t:this.shape_1213},{t:this.shape_1212},{t:this.shape_1211},{t:this.shape_1210},{t:this.shape_1209},{t:this.shape_1208},{t:this.shape_1207},{t:this.shape_1206},{t:this.shape_1205},{t:this.shape_1204},{t:this.shape_1203},{t:this.shape_1202},{t:this.shape_1201},{t:this.shape_1200},{t:this.shape_1199},{t:this.shape_1198},{t:this.shape_1197},{t:this.shape_1196},{t:this.shape_1195},{t:this.shape_1194},{t:this.shape_1193},{t:this.shape_1192},{t:this.shape_1191},{t:this.shape_1190},{t:this.shape_1189},{t:this.shape_1188},{t:this.shape_1187},{t:this.shape_1186},{t:this.shape_1185},{t:this.shape_1184},{t:this.shape_1183},{t:this.shape_1182},{t:this.shape_1181},{t:this.shape_1180},{t:this.shape_1179},{t:this.shape_1178},{t:this.shape_1177},{t:this.shape_1176},{t:this.shape_1175},{t:this.shape_1174},{t:this.shape_1173},{t:this.shape_1172},{t:this.shape_1171},{t:this.shape_1170},{t:this.shape_1169},{t:this.shape_1168},{t:this.shape_1167},{t:this.shape_1166},{t:this.shape_1165},{t:this.shape_1164},{t:this.shape_1163},{t:this.shape_1162},{t:this.shape_1161},{t:this.shape_1160},{t:this.shape_1159},{t:this.shape_1158},{t:this.shape_1157},{t:this.shape_1156},{t:this.shape_1155},{t:this.shape_1154},{t:this.shape_1153},{t:this.shape_1152},{t:this.shape_1151},{t:this.shape_1150},{t:this.shape_1149},{t:this.shape_1148},{t:this.shape_1147},{t:this.shape_1146},{t:this.shape_1145},{t:this.shape_1144},{t:this.shape_1143},{t:this.shape_1142},{t:this.shape_1141},{t:this.shape_1140},{t:this.shape_1139},{t:this.shape_1138},{t:this.shape_1137},{t:this.shape_1136},{t:this.shape_1135},{t:this.shape_1134},{t:this.shape_1133},{t:this.shape_1132},{t:this.shape_1131},{t:this.shape_1130},{t:this.shape_1129},{t:this.shape_1128},{t:this.shape_1127},{t:this.shape_1126},{t:this.shape_1125},{t:this.shape_1124},{t:this.shape_1123},{t:this.shape_1122},{t:this.shape_1121},{t:this.shape_1120},{t:this.shape_1119},{t:this.shape_1118},{t:this.shape_1117},{t:this.shape_1116},{t:this.shape_1115},{t:this.shape_1114},{t:this.shape_1113},{t:this.shape_1112},{t:this.shape_1111},{t:this.shape_1110},{t:this.shape_1109},{t:this.shape_1108},{t:this.shape_1107},{t:this.shape_1106},{t:this.shape_1105},{t:this.shape_1104},{t:this.shape_1103},{t:this.shape_1102},{t:this.shape_1101},{t:this.shape_1100},{t:this.shape_1099},{t:this.shape_1098},{t:this.shape_1097},{t:this.shape_1096},{t:this.shape_1095},{t:this.shape_1094},{t:this.shape_1093},{t:this.shape_1092},{t:this.shape_1091},{t:this.shape_1090},{t:this.shape_1089},{t:this.shape_1088},{t:this.shape_1087},{t:this.shape_1086},{t:this.shape_1085},{t:this.shape_1084},{t:this.shape_1083},{t:this.shape_1082},{t:this.shape_1081},{t:this.shape_1080},{t:this.shape_1079},{t:this.shape_1078},{t:this.shape_1077},{t:this.shape_1076},{t:this.shape_1075},{t:this.shape_1074},{t:this.shape_1073},{t:this.shape_1072},{t:this.shape_1071},{t:this.shape_1070},{t:this.shape_1069},{t:this.shape_1068},{t:this.shape_1067},{t:this.shape_1066},{t:this.shape_1065},{t:this.shape_1064},{t:this.shape_1063},{t:this.shape_1062},{t:this.shape_1061},{t:this.shape_1060},{t:this.shape_1059},{t:this.shape_1058},{t:this.shape_1057},{t:this.shape_1056},{t:this.shape_1055},{t:this.shape_1054},{t:this.shape_1053},{t:this.shape_1052},{t:this.shape_1051},{t:this.shape_1050},{t:this.shape_1049},{t:this.shape_1048},{t:this.shape_1047},{t:this.shape_1046},{t:this.shape_1045},{t:this.shape_1044},{t:this.shape_1043},{t:this.shape_1042},{t:this.shape_1041},{t:this.shape_1040},{t:this.shape_1039},{t:this.shape_1038},{t:this.shape_1037},{t:this.shape_1036},{t:this.shape_1035},{t:this.shape_1034},{t:this.shape_1033},{t:this.shape_1032},{t:this.shape_1031},{t:this.shape_1030},{t:this.shape_1029},{t:this.shape_1028},{t:this.shape_1027},{t:this.shape_1026},{t:this.shape_1025},{t:this.shape_1024},{t:this.shape_1023},{t:this.shape_1022},{t:this.shape_1021},{t:this.shape_1020},{t:this.shape_1019},{t:this.shape_1018},{t:this.shape_1017},{t:this.shape_1016},{t:this.shape_1015},{t:this.shape_1014},{t:this.shape_1013},{t:this.shape_1012},{t:this.shape_1011},{t:this.shape_1010},{t:this.shape_1009},{t:this.shape_1008},{t:this.shape_1007},{t:this.shape_1006},{t:this.shape_1005},{t:this.shape_1004},{t:this.shape_1003},{t:this.shape_1002},{t:this.shape_1001},{t:this.shape_1000},{t:this.shape_999},{t:this.shape_998},{t:this.shape_997},{t:this.shape_996},{t:this.shape_995},{t:this.shape_994},{t:this.shape_993},{t:this.shape_992},{t:this.shape_991},{t:this.shape_990},{t:this.shape_989},{t:this.shape_988},{t:this.shape_987},{t:this.shape_986},{t:this.shape_985},{t:this.shape_984},{t:this.shape_983},{t:this.shape_982},{t:this.shape_981},{t:this.shape_980},{t:this.shape_979},{t:this.shape_978},{t:this.shape_977},{t:this.shape_976},{t:this.shape_975},{t:this.shape_974},{t:this.shape_973},{t:this.shape_972},{t:this.shape_971},{t:this.shape_970},{t:this.shape_969},{t:this.shape_968},{t:this.shape_967},{t:this.shape_966},{t:this.shape_965},{t:this.shape_964},{t:this.shape_963},{t:this.shape_962},{t:this.shape_961},{t:this.shape_960},{t:this.shape_959},{t:this.shape_958},{t:this.shape_957},{t:this.shape_956},{t:this.shape_955},{t:this.shape_954},{t:this.shape_953},{t:this.shape_952},{t:this.shape_951},{t:this.shape_950},{t:this.shape_949},{t:this.shape_948},{t:this.shape_947},{t:this.shape_946},{t:this.shape_945},{t:this.shape_944},{t:this.shape_943},{t:this.shape_942},{t:this.shape_941},{t:this.shape_940},{t:this.shape_939},{t:this.shape_938},{t:this.shape_937},{t:this.shape_936},{t:this.shape_935},{t:this.shape_934},{t:this.shape_933},{t:this.shape_932},{t:this.shape_931},{t:this.shape_930},{t:this.shape_929},{t:this.shape_928},{t:this.shape_927},{t:this.shape_926},{t:this.shape_925},{t:this.shape_924},{t:this.shape_923},{t:this.shape_922},{t:this.shape_921},{t:this.shape_920},{t:this.shape_919},{t:this.shape_918},{t:this.shape_917},{t:this.shape_916},{t:this.shape_915},{t:this.shape_914},{t:this.shape_913},{t:this.shape_912},{t:this.shape_911},{t:this.shape_910},{t:this.shape_909},{t:this.shape_908},{t:this.shape_907},{t:this.shape_906},{t:this.shape_905},{t:this.shape_904},{t:this.shape_903},{t:this.shape_902},{t:this.shape_901},{t:this.shape_900},{t:this.shape_899},{t:this.shape_898},{t:this.shape_897},{t:this.shape_896},{t:this.shape_895},{t:this.shape_894},{t:this.shape_893},{t:this.shape_892},{t:this.shape_891},{t:this.shape_890},{t:this.shape_889},{t:this.shape_888},{t:this.shape_887},{t:this.shape_886},{t:this.shape_885},{t:this.shape_884},{t:this.shape_883},{t:this.shape_882},{t:this.shape_881},{t:this.shape_880},{t:this.shape_879},{t:this.shape_878},{t:this.shape_877},{t:this.shape_876},{t:this.shape_875},{t:this.shape_874},{t:this.shape_873},{t:this.shape_872},{t:this.shape_871},{t:this.shape_870},{t:this.shape_869},{t:this.shape_868},{t:this.shape_867},{t:this.shape_866},{t:this.shape_865},{t:this.shape_864},{t:this.shape_863},{t:this.shape_862},{t:this.shape_861},{t:this.shape_860},{t:this.shape_859},{t:this.shape_858},{t:this.shape_857},{t:this.shape_856},{t:this.shape_855},{t:this.shape_854},{t:this.shape_853},{t:this.shape_852},{t:this.shape_851},{t:this.shape_850},{t:this.shape_849},{t:this.shape_848},{t:this.shape_847},{t:this.shape_846},{t:this.shape_845},{t:this.shape_844},{t:this.shape_843},{t:this.shape_842},{t:this.shape_841},{t:this.shape_840},{t:this.shape_839},{t:this.shape_838},{t:this.shape_837},{t:this.shape_836},{t:this.shape_835},{t:this.shape_834},{t:this.shape_833},{t:this.shape_832},{t:this.shape_831},{t:this.shape_830},{t:this.shape_829},{t:this.shape_828},{t:this.shape_827},{t:this.shape_826},{t:this.shape_825},{t:this.shape_824},{t:this.shape_823},{t:this.shape_822},{t:this.shape_821},{t:this.shape_820},{t:this.shape_819},{t:this.shape_818},{t:this.shape_817},{t:this.shape_816},{t:this.shape_815},{t:this.shape_814},{t:this.shape_813},{t:this.shape_812},{t:this.shape_811},{t:this.shape_810},{t:this.shape_809},{t:this.shape_808},{t:this.shape_807},{t:this.shape_806},{t:this.shape_805},{t:this.shape_804},{t:this.shape_803},{t:this.shape_802},{t:this.shape_801},{t:this.shape_800},{t:this.shape_799},{t:this.shape_798},{t:this.shape_797},{t:this.shape_796},{t:this.shape_795},{t:this.shape_794},{t:this.shape_793},{t:this.shape_792},{t:this.shape_791},{t:this.shape_790},{t:this.shape_789},{t:this.shape_788},{t:this.shape_787},{t:this.shape_786},{t:this.shape_785},{t:this.shape_784},{t:this.shape_783},{t:this.shape_782},{t:this.shape_781},{t:this.shape_780},{t:this.shape_779},{t:this.shape_778},{t:this.shape_777},{t:this.shape_776},{t:this.shape_775},{t:this.shape_774},{t:this.shape_773},{t:this.shape_772},{t:this.shape_771},{t:this.shape_770},{t:this.shape_769},{t:this.shape_768},{t:this.shape_767},{t:this.shape_766},{t:this.shape_765},{t:this.shape_764},{t:this.shape_763},{t:this.shape_762},{t:this.shape_761},{t:this.shape_760},{t:this.shape_759},{t:this.shape_758},{t:this.shape_757},{t:this.shape_756},{t:this.shape_755},{t:this.shape_754},{t:this.shape_753},{t:this.shape_752},{t:this.shape_751},{t:this.shape_750},{t:this.shape_749},{t:this.shape_748},{t:this.shape_747},{t:this.shape_746},{t:this.shape_745},{t:this.shape_744},{t:this.shape_743},{t:this.shape_742},{t:this.shape_741},{t:this.shape_740},{t:this.shape_739},{t:this.shape_738},{t:this.shape_737},{t:this.shape_736},{t:this.shape_735},{t:this.shape_734},{t:this.shape_733},{t:this.shape_732},{t:this.shape_731},{t:this.shape_730},{t:this.shape_729},{t:this.shape_728},{t:this.shape_727},{t:this.shape_726},{t:this.shape_725},{t:this.shape_724},{t:this.shape_723},{t:this.shape_722},{t:this.shape_721},{t:this.shape_720},{t:this.shape_719},{t:this.shape_718},{t:this.shape_717},{t:this.shape_716},{t:this.shape_715},{t:this.shape_714},{t:this.shape_713},{t:this.shape_712},{t:this.shape_711},{t:this.shape_710},{t:this.shape_709},{t:this.shape_708},{t:this.shape_707},{t:this.shape_706},{t:this.shape_705},{t:this.shape_704},{t:this.shape_703},{t:this.shape_702},{t:this.shape_701},{t:this.shape_700},{t:this.shape_699},{t:this.shape_698},{t:this.shape_697},{t:this.shape_696},{t:this.shape_695},{t:this.shape_694},{t:this.shape_693},{t:this.shape_692},{t:this.shape_691},{t:this.shape_690},{t:this.shape_689},{t:this.shape_688},{t:this.shape_687},{t:this.shape_686},{t:this.shape_685},{t:this.shape_684},{t:this.shape_683},{t:this.shape_682},{t:this.shape_681},{t:this.shape_680},{t:this.shape_679},{t:this.shape_678},{t:this.shape_677},{t:this.shape_676},{t:this.shape_675},{t:this.shape_674},{t:this.shape_673},{t:this.shape_672},{t:this.shape_671},{t:this.shape_670},{t:this.shape_669},{t:this.shape_668},{t:this.shape_667},{t:this.shape_666},{t:this.shape_665},{t:this.shape_664},{t:this.shape_663},{t:this.shape_662},{t:this.shape_661},{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_645},{t:this.shape_644},{t:this.shape_643},{t:this.shape_642},{t:this.shape_641},{t:this.shape_640},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7}]}).to({state:[{t:this.shape_1345},{t:this.shape_1335},{t:this.shape_1343},{t:this.shape_1337},{t:this.shape_1336},{t:this.shape_1334},{t:this.shape_1333},{t:this.shape_1342},{t:this.shape_1371},{t:this.shape_1341},{t:this.shape_786},{t:this.shape_788},{t:this.shape_1339},{t:this.shape_1338},{t:this.shape_1340},{t:this.shape_1324},{t:this.shape_1323},{t:this.shape_1325},{t:this.shape_1329},{t:this.shape_1274},{t:this.shape_687},{t:this.shape_1321},{t:this.shape_1322},{t:this.shape_1319},{t:this.shape_1320},{t:this.shape_1316},{t:this.shape_1331},{t:this.shape_1332},{t:this.shape_1327},{t:this.shape_1326},{t:this.shape_1330},{t:this.shape_1328},{t:this.shape_1318},{t:this.shape_1317},{t:this.shape_1313},{t:this.shape_1315},{t:this.shape_1314},{t:this.shape_1287},{t:this.shape_1296},{t:this.shape_1295},{t:this.shape_1294},{t:this.shape_1293},{t:this.shape_1312},{t:this.shape_1310},{t:this.shape_1307},{t:this.shape_1306},{t:this.shape_1309},{t:this.shape_1308},{t:this.shape_1305},{t:this.shape_1304},{t:this.shape_1299},{t:this.shape_1298},{t:this.shape_1297},{t:this.shape_1300},{t:this.shape_1291},{t:this.shape_1290},{t:this.shape_1292},{t:this.shape_1289},{t:this.shape_1288},{t:this.shape_1311},{t:this.shape_1303},{t:this.shape_662},{t:this.shape_657},{t:this.shape_656},{t:this.shape_1301},{t:this.shape_1302},{t:this.shape_1276},{t:this.shape_328},{t:this.shape_327},{t:this.shape_313},{t:this.shape_314},{t:this.shape_1275},{t:this.shape_1370},{t:this.shape_1283},{t:this.shape_1272},{t:this.shape_1286},{t:this.shape_1285},{t:this.shape_1278},{t:this.shape_1277},{t:this.shape_1282},{t:this.shape_1281},{t:this.shape_1271},{t:this.shape_1270},{t:this.shape_1284},{t:this.shape_1279},{t:this.shape_1280},{t:this.shape_931},{t:this.shape_805},{t:this.shape_791},{t:this.shape_790},{t:this.shape_795},{t:this.shape_793},{t:this.shape_794},{t:this.shape_789},{t:this.shape_808},{t:this.shape_807},{t:this.shape_809},{t:this.shape_810},{t:this.shape_806},{t:this.shape_804},{t:this.shape_811},{t:this.shape_779},{t:this.shape_755},{t:this.shape_778},{t:this.shape_780},{t:this.shape_781},{t:this.shape_754},{t:this.shape_753},{t:this.shape_803},{t:this.shape_802},{t:this.shape_799},{t:this.shape_798},{t:this.shape_749},{t:this.shape_748},{t:this.shape_747},{t:this.shape_797},{t:this.shape_801},{t:this.shape_800},{t:this.shape_929},{t:this.shape_796},{t:this.shape_677},{t:this.shape_745},{t:this.shape_744},{t:this.shape_676},{t:this.shape_792},{t:this.shape_746},{t:this.shape_743},{t:this.shape_742},{t:this.shape_741},{t:this.shape_739},{t:this.shape_740},{t:this.shape_734},{t:this.shape_731},{t:this.shape_730},{t:this.shape_732},{t:this.shape_729},{t:this.shape_675},{t:this.shape_674},{t:this.shape_728},{t:this.shape_686},{t:this.shape_787},{t:this.shape_685},{t:this.shape_684},{t:this.shape_679},{t:this.shape_678},{t:this.shape_683},{t:this.shape_682},{t:this.shape_672},{t:this.shape_681},{t:this.shape_673},{t:this.shape_680},{t:this.shape_655},{t:this.shape_783},{t:this.shape_782},{t:this.shape_752},{t:this.shape_751},{t:this.shape_750},{t:this.shape_784},{t:this.shape_785},{t:this.shape_772},{t:this.shape_771},{t:this.shape_773},{t:this.shape_774},{t:this.shape_776},{t:this.shape_770},{t:this.shape_769},{t:this.shape_768},{t:this.shape_767},{t:this.shape_760},{t:this.shape_757},{t:this.shape_758},{t:this.shape_759},{t:this.shape_756},{t:this.shape_775},{t:this.shape_777},{t:this.shape_766},{t:this.shape_765},{t:this.shape_764},{t:this.shape_763},{t:this.shape_640},{t:this.shape_641},{t:this.shape_762},{t:this.shape_761},{t:this.shape_725},{t:this.shape_1168},{t:this.shape_726},{t:this.shape_724},{t:this.shape_723},{t:this.shape_620},{t:this.shape_619},{t:this.shape_738},{t:this.shape_615},{t:this.shape_721},{t:this.shape_722},{t:this.shape_720},{t:this.shape_737},{t:this.shape_736},{t:this.shape_735},{t:this.shape_727},{t:this.shape_733},{t:this.shape_718},{t:this.shape_695},{t:this.shape_693},{t:this.shape_717},{t:this.shape_692},{t:this.shape_713},{t:this.shape_711},{t:this.shape_719},{t:this.shape_715},{t:this.shape_714},{t:this.shape_712},{t:this.shape_706},{t:this.shape_700},{t:this.shape_704},{t:this.shape_691},{t:this.shape_696},{t:this.shape_699},{t:this.shape_698},{t:this.shape_697},{t:this.shape_690},{t:this.shape_688},{t:this.shape_689},{t:this.shape_710},{t:this.shape_709},{t:this.shape_708},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_587},{t:this.shape_588},{t:this.shape_586},{t:this.shape_707},{t:this.shape_585},{t:this.shape_583},{t:this.shape_581},{t:this.shape_580},{t:this.shape_705},{t:this.shape_703},{t:this.shape_702},{t:this.shape_256},{t:this.shape_701},{t:this.shape_578},{t:this.shape_260},{t:this.shape_561},{t:this.shape_257},{t:this.shape_259},{t:this.shape_261},{t:this.shape_577},{t:this.shape_579},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_568},{t:this.shape_570},{t:this.shape_559},{t:this.shape_560},{t:this.shape_558},{t:this.shape_252},{t:this.shape_255},{t:this.shape_268},{t:this.shape_269},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_666},{t:this.shape_258},{t:this.shape_267},{t:this.shape_263},{t:this.shape_254},{t:this.shape_253},{t:this.shape_262},{t:this.shape_716},{t:this.shape_661},{t:this.shape_670},{t:this.shape_671},{t:this.shape_669},{t:this.shape_664},{t:this.shape_663},{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_668},{t:this.shape_667},{t:this.shape_694},{t:this.shape_665},{t:this.shape_311},{t:this.shape_272},{t:this.shape_273},{t:this.shape_270},{t:this.shape_271},{t:this.shape_305},{t:this.shape_306},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_304},{t:this.shape_315},{t:this.shape_301},{t:this.shape_325},{t:this.shape_326},{t:this.shape_324},{t:this.shape_320},{t:this.shape_322},{t:this.shape_323},{t:this.shape_819},{t:this.shape_312},{t:this.shape_310},{t:this.shape_303},{t:this.shape_302},{t:this.shape_300},{t:this.shape_319},{t:this.shape_318},{t:this.shape_316},{t:this.shape_317},{t:this.shape_321},{t:this.shape_284},{t:this.shape_283},{t:this.shape_299},{t:this.shape_282},{t:this.shape_281},{t:this.shape_298},{t:this.shape_288},{t:this.shape_287},{t:this.shape_280},{t:this.shape_274},{t:this.shape_297},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_296},{t:this.shape_238},{t:this.shape_237},{t:this.shape_235},{t:this.shape_290},{t:this.shape_286},{t:this.shape_147},{t:this.shape_289},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_230},{t:this.shape_231},{t:this.shape_168},{t:this.shape_171},{t:this.shape_175},{t:this.shape_174},{t:this.shape_166},{t:this.shape_167},{t:this.shape_164},{t:this.shape_165},{t:this.shape_170},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_163},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_179},{t:this.shape_162},{t:this.shape_160},{t:this.shape_161},{t:this.shape_236},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_241},{t:this.shape_245},{t:this.shape_240},{t:this.shape_527},{t:this.shape_523},{t:this.shape_246},{t:this.shape_247},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_512},{t:this.shape_239},{t:this.shape_243},{t:this.shape_244},{t:this.shape_514},{t:this.shape_242},{t:this.shape_227},{t:this.shape_225},{t:this.shape_226},{t:this.shape_373},{t:this.shape_224},{t:this.shape_222},{t:this.shape_228},{t:this.shape_223},{t:this.shape_221},{t:this.shape_374},{t:this.shape_372},{t:this.shape_362},{t:this.shape_366},{t:this.shape_361},{t:this.shape_360},{t:this.shape_381},{t:this.shape_359},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_229},{t:this.shape_215},{t:this.shape_214},{t:this.shape_364},{t:this.shape_352},{t:this.shape_213},{t:this.shape_187},{t:this.shape_209},{t:this.shape_347},{t:this.shape_186},{t:this.shape_192},{t:this.shape_193},{t:this.shape_212},{t:this.shape_210},{t:this.shape_188},{t:this.shape_201},{t:this.shape_200},{t:this.shape_182},{t:this.shape_199},{t:this.shape_211},{t:this.shape_197},{t:this.shape_196},{t:this.shape_384},{t:this.shape_185},{t:this.shape_176},{t:this.shape_184},{t:this.shape_183},{t:this.shape_385},{t:this.shape_208},{t:this.shape_207},{t:this.shape_205},{t:this.shape_204},{t:this.shape_337},{t:this.shape_332},{t:this.shape_206},{t:this.shape_202},{t:this.shape_335},{t:this.shape_334},{t:this.shape_330},{t:this.shape_331},{t:this.shape_203},{t:this.shape_198},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_99},{t:this.shape_78},{t:this.shape_74},{t:this.shape_75},{t:this.shape_77},{t:this.shape_76},{t:this.shape_73},{t:this.shape_84},{t:this.shape_83},{t:this.shape_85},{t:this.shape_72},{t:this.shape_71},{t:this.shape_82},{t:this.shape_140},{t:this.shape_137},{t:this.shape_116},{t:this.shape_115},{t:this.shape_131},{t:this.shape_114},{t:this.shape_118},{t:this.shape_142},{t:this.shape_143},{t:this.shape_141},{t:this.shape_139},{t:this.shape_136},{t:this.shape_135},{t:this.shape_138},{t:this.shape_110},{t:this.shape_120},{t:this.shape_113},{t:this.shape_111},{t:this.shape_109},{t:this.shape_112},{t:this.shape_108},{t:this.shape_134},{t:this.shape_189},{t:this.shape_133},{t:this.shape_194},{t:this.shape_132},{t:this.shape_130},{t:this.shape_195},{t:this.shape_191},{t:this.shape_190},{t:this.shape_181},{t:this.shape_180},{t:this.shape_129},{t:this.shape_178},{t:this.shape_177},{t:this.shape_124},{t:this.shape_128},{t:this.shape_125},{t:this.shape_127},{t:this.shape_126},{t:this.shape_123},{t:this.shape_100},{t:this.shape_97},{t:this.shape_98},{t:this.shape_86},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_1205},{t:this.shape_93},{t:this.shape_863},{t:this.shape_92},{t:this.shape_104},{t:this.shape_102},{t:this.shape_103},{t:this.shape_1250},{t:this.shape_1269},{t:this.shape_1249},{t:this.shape_1255},{t:this.shape_1248},{t:this.shape_1246},{t:this.shape_1247},{t:this.shape_1245},{t:this.shape_1257},{t:this.shape_1256},{t:this.shape_1240},{t:this.shape_1258},{t:this.shape_1242},{t:this.shape_1243},{t:this.shape_1253},{t:this.shape_1254},{t:this.shape_1259},{t:this.shape_1251},{t:this.shape_1238},{t:this.shape_1237},{t:this.shape_1236},{t:this.shape_1244},{t:this.shape_1241},{t:this.shape_1239},{t:this.shape_1235},{t:this.shape_1234},{t:this.shape_1268},{t:this.shape_1267},{t:this.shape_1266},{t:this.shape_1265},{t:this.shape_1264},{t:this.shape_285},{t:this.shape_279},{t:this.shape_278},{t:this.shape_276},{t:this.shape_275},{t:this.shape_277},{t:this.shape_5},{t:this.shape_1262},{t:this.shape_1263},{t:this.shape_1261},{t:this.shape_1260},{t:this.shape_1252},{t:this.shape_1224},{t:this.shape_1223},{t:this.shape_1221},{t:this.shape_1220},{t:this.shape_1219},{t:this.shape_1222},{t:this.shape_173},{t:this.shape_172},{t:this.shape_169},{t:this.shape_159},{t:this.shape_1215},{t:this.shape_158},{t:this.shape_1218},{t:this.shape_1217},{t:this.shape_1216},{t:this.shape_1232},{t:this.shape_1225},{t:this.shape_1233},{t:this.shape_1226},{t:this.shape_1214},{t:this.shape_1212},{t:this.shape_1211},{t:this.shape_1213},{t:this.shape_1231},{t:this.shape_1230},{t:this.shape_1229},{t:this.shape_1228},{t:this.shape_1227},{t:this.shape_1201},{t:this.shape_1202},{t:this.shape_1200},{t:this.shape_1199},{t:this.shape_1209},{t:this.shape_1210},{t:this.shape_1204},{t:this.shape_1203},{t:this.shape_1208},{t:this.shape_1207},{t:this.shape_1206},{t:this.shape_122},{t:this.shape_121},{t:this.shape_119},{t:this.shape_117},{t:this.shape_106},{t:this.shape_107},{t:this.shape_105},{t:this.shape_101},{t:this.shape_89},{t:this.shape_12},{t:this.shape_13},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_653},{t:this.shape_654},{t:this.shape_648},{t:this.shape_1181},{t:this.shape_647},{t:this.shape_646},{t:this.shape_1369},{t:this.shape_645},{t:this.shape_643},{t:this.shape_644},{t:this.shape_650},{t:this.shape_651},{t:this.shape_652},{t:this.shape_642},{t:this.shape_618},{t:this.shape_616},{t:this.shape_649},{t:this.shape_1179},{t:this.shape_1176},{t:this.shape_1177},{t:this.shape_1180},{t:this.shape_1178},{t:this.shape_1169},{t:this.shape_639},{t:this.shape_1170},{t:this.shape_638},{t:this.shape_1069},{t:this.shape_1068},{t:this.shape_1114},{t:this.shape_1064},{t:this.shape_1067},{t:this.shape_1065},{t:this.shape_1120},{t:this.shape_1062},{t:this.shape_634},{t:this.shape_637},{t:this.shape_632},{t:this.shape_635},{t:this.shape_627},{t:this.shape_636},{t:this.shape_624},{t:this.shape_629},{t:this.shape_625},{t:this.shape_623},{t:this.shape_626},{t:this.shape_904},{t:this.shape_621},{t:this.shape_1100},{t:this.shape_1084},{t:this.shape_633},{t:this.shape_1082},{t:this.shape_1118},{t:this.shape_1035},{t:this.shape_1028},{t:this.shape_1080},{t:this.shape_1034},{t:this.shape_1027},{t:this.shape_1026},{t:this.shape_1025},{t:this.shape_1023},{t:this.shape_631},{t:this.shape_630},{t:this.shape_628},{t:this.shape_490},{t:this.shape_488},{t:this.shape_489},{t:this.shape_1024},{t:this.shape_978},{t:this.shape_979},{t:this.shape_983},{t:this.shape_982},{t:this.shape_981},{t:this.shape_980},{t:this.shape_969},{t:this.shape_968},{t:this.shape_974},{t:this.shape_966},{t:this.shape_967},{t:this.shape_970},{t:this.shape_971},{t:this.shape_964},{t:this.shape_963},{t:this.shape_484},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_510},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_504},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_503},{t:this.shape_505},{t:this.shape_506},{t:this.shape_502},{t:this.shape_497},{t:this.shape_612},{t:this.shape_613},{t:this.shape_611},{t:this.shape_595},{t:this.shape_604},{t:this.shape_594},{t:this.shape_600},{t:this.shape_593},{t:this.shape_592},{t:this.shape_584},{t:this.shape_582},{t:this.shape_617},{t:this.shape_608},{t:this.shape_609},{t:this.shape_607},{t:this.shape_610},{t:this.shape_606},{t:this.shape_614},{t:this.shape_622},{t:this.shape_601},{t:this.shape_603},{t:this.shape_605},{t:this.shape_596},{t:this.shape_602},{t:this.shape_599},{t:this.shape_597},{t:this.shape_598},{t:this.shape_557},{t:this.shape_553},{t:this.shape_549},{t:this.shape_556},{t:this.shape_550},{t:this.shape_552},{t:this.shape_551},{t:this.shape_511},{t:this.shape_501},{t:this.shape_499},{t:this.shape_498},{t:this.shape_500},{t:this.shape_496},{t:this.shape_495},{t:this.shape_547},{t:this.shape_546},{t:this.shape_548},{t:this.shape_544},{t:this.shape_545},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_555},{t:this.shape_554},{t:this.shape_565},{t:this.shape_564},{t:this.shape_543},{t:this.shape_563},{t:this.shape_569},{t:this.shape_566},{t:this.shape_562},{t:this.shape_567},{t:this.shape_542},{t:this.shape_1196},{t:this.shape_1197},{t:this.shape_1198},{t:this.shape_1174},{t:this.shape_1175},{t:this.shape_1173},{t:this.shape_1184},{t:this.shape_1185},{t:this.shape_1183},{t:this.shape_1193},{t:this.shape_1187},{t:this.shape_1182},{t:this.shape_1172},{t:this.shape_1171},{t:this.shape_1195},{t:this.shape_1191},{t:this.shape_1194},{t:this.shape_1192},{t:this.shape_1166},{t:this.shape_1167},{t:this.shape_1143},{t:this.shape_1144},{t:this.shape_1142},{t:this.shape_1189},{t:this.shape_1137},{t:this.shape_1188},{t:this.shape_1186},{t:this.shape_1190},{t:this.shape_1133},{t:this.shape_1135},{t:this.shape_1134},{t:this.shape_1121},{t:this.shape_1119},{t:this.shape_1117},{t:this.shape_1061},{t:this.shape_1060},{t:this.shape_1059},{t:this.shape_1063},{t:this.shape_1066},{t:this.shape_1160},{t:this.shape_1163},{t:this.shape_1162},{t:this.shape_1140},{t:this.shape_1141},{t:this.shape_1164},{t:this.shape_1161},{t:this.shape_1149},{t:this.shape_1146},{t:this.shape_1148},{t:this.shape_1147},{t:this.shape_1145},{t:this.shape_1138},{t:this.shape_1139},{t:this.shape_1156},{t:this.shape_1136},{t:this.shape_1165},{t:this.shape_1159},{t:this.shape_1157},{t:this.shape_1158},{t:this.shape_1022},{t:this.shape_1154},{t:this.shape_1020},{t:this.shape_1152},{t:this.shape_1155},{t:this.shape_1153},{t:this.shape_1151},{t:this.shape_1150},{t:this.shape_1116},{t:this.shape_1115},{t:this.shape_1021},{t:this.shape_1019},{t:this.shape_1018},{t:this.shape_1017},{t:this.shape_1016},{t:this.shape_1014},{t:this.shape_1015},{t:this.shape_1109},{t:this.shape_1110},{t:this.shape_1112},{t:this.shape_1113},{t:this.shape_1131},{t:this.shape_1132},{t:this.shape_1130},{t:this.shape_1127},{t:this.shape_1111},{t:this.shape_1126},{t:this.shape_1129},{t:this.shape_1128},{t:this.shape_1122},{t:this.shape_1125},{t:this.shape_1124},{t:this.shape_1123},{t:this.shape_1083},{t:this.shape_1106},{t:this.shape_1108},{t:this.shape_1081},{t:this.shape_1107},{t:this.shape_1105},{t:this.shape_1103},{t:this.shape_1097},{t:this.shape_1098},{t:this.shape_1101},{t:this.shape_1099},{t:this.shape_1091},{t:this.shape_1090},{t:this.shape_1089},{t:this.shape_1087},{t:this.shape_1088},{t:this.shape_1075},{t:this.shape_1071},{t:this.shape_1077},{t:this.shape_1074},{t:this.shape_1076},{t:this.shape_1104},{t:this.shape_1095},{t:this.shape_1102},{t:this.shape_1012},{t:this.shape_1013},{t:this.shape_1096},{t:this.shape_1093},{t:this.shape_1007},{t:this.shape_1011},{t:this.shape_1010},{t:this.shape_1009},{t:this.shape_1008},{t:this.shape_1094},{t:this.shape_1092},{t:this.shape_902},{t:this.shape_900},{t:this.shape_1005},{t:this.shape_1006},{t:this.shape_901},{t:this.shape_1004},{t:this.shape_908},{t:this.shape_899},{t:this.shape_894},{t:this.shape_898},{t:this.shape_897},{t:this.shape_1045},{t:this.shape_915},{t:this.shape_913},{t:this.shape_896},{t:this.shape_909},{t:this.shape_895},{t:this.shape_910},{t:this.shape_907},{t:this.shape_906},{t:this.shape_912},{t:this.shape_911},{t:this.shape_905},{t:this.shape_1039},{t:this.shape_1040},{t:this.shape_1038},{t:this.shape_1037},{t:this.shape_1052},{t:this.shape_1085},{t:this.shape_1057},{t:this.shape_1036},{t:this.shape_1058},{t:this.shape_1055},{t:this.shape_1056},{t:this.shape_1054},{t:this.shape_1053},{t:this.shape_1042},{t:this.shape_1072},{t:this.shape_1041},{t:this.shape_1046},{t:this.shape_1033},{t:this.shape_1032},{t:this.shape_1031},{t:this.shape_1030},{t:this.shape_1029},{t:this.shape_1051},{t:this.shape_1050},{t:this.shape_1049},{t:this.shape_1048},{t:this.shape_1086},{t:this.shape_1078},{t:this.shape_1073},{t:this.shape_1079},{t:this.shape_1070},{t:this.shape_1047},{t:this.shape_1044},{t:this.shape_962},{t:this.shape_1043},{t:this.shape_958},{t:this.shape_977},{t:this.shape_961},{t:this.shape_957},{t:this.shape_914},{t:this.shape_955},{t:this.shape_954},{t:this.shape_903},{t:this.shape_953},{t:this.shape_956},{t:this.shape_951},{t:this.shape_960},{t:this.shape_976},{t:this.shape_959},{t:this.shape_952},{t:this.shape_972},{t:this.shape_950},{t:this.shape_975},{t:this.shape_965},{t:this.shape_973},{t:this.shape_949},{t:this.shape_926},{t:this.shape_930},{t:this.shape_936},{t:this.shape_946},{t:this.shape_941},{t:this.shape_935},{t:this.shape_934},{t:this.shape_933},{t:this.shape_932},{t:this.shape_925},{t:this.shape_921},{t:this.shape_924},{t:this.shape_923},{t:this.shape_920},{t:this.shape_919},{t:this.shape_918},{t:this.shape_922},{t:this.shape_948},{t:this.shape_947},{t:this.shape_893},{t:this.shape_883},{t:this.shape_943},{t:this.shape_939},{t:this.shape_938},{t:this.shape_937},{t:this.shape_944},{t:this.shape_945},{t:this.shape_940},{t:this.shape_942},{t:this.shape_848},{t:this.shape_838},{t:this.shape_835},{t:this.shape_871},{t:this.shape_877},{t:this.shape_872},{t:this.shape_837},{t:this.shape_869},{t:this.shape_874},{t:this.shape_833},{t:this.shape_840},{t:this.shape_834},{t:this.shape_836},{t:this.shape_830},{t:this.shape_831},{t:this.shape_826},{t:this.shape_832},{t:this.shape_839},{t:this.shape_829},{t:this.shape_828},{t:this.shape_827},{t:this.shape_846},{t:this.shape_849},{t:this.shape_847},{t:this.shape_844},{t:this.shape_845},{t:this.shape_843},{t:this.shape_842},{t:this.shape_841},{t:this.shape_916},{t:this.shape_892},{t:this.shape_891},{t:this.shape_886},{t:this.shape_880},{t:this.shape_885},{t:this.shape_1001},{t:this.shape_884},{t:this.shape_881},{t:this.shape_882},{t:this.shape_1002},{t:this.shape_1000},{t:this.shape_999},{t:this.shape_998},{t:this.shape_890},{t:this.shape_997},{t:this.shape_996},{t:this.shape_995},{t:this.shape_994},{t:this.shape_889},{t:this.shape_887},{t:this.shape_888},{t:this.shape_867},{t:this.shape_993},{t:this.shape_992},{t:this.shape_991},{t:this.shape_990},{t:this.shape_879},{t:this.shape_878},{t:this.shape_868},{t:this.shape_866},{t:this.shape_865},{t:this.shape_870},{t:this.shape_875},{t:this.shape_876},{t:this.shape_873},{t:this.shape_984},{t:this.shape_857},{t:this.shape_856},{t:this.shape_851},{t:this.shape_852},{t:this.shape_864},{t:this.shape_989},{t:this.shape_988},{t:this.shape_987},{t:this.shape_986},{t:this.shape_985},{t:this.shape_862},{t:this.shape_859},{t:this.shape_861},{t:this.shape_860},{t:this.shape_858},{t:this.shape_25},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_23},{t:this.shape_16},{t:this.shape_15},{t:this.shape_24},{t:this.shape_38},{t:this.shape_39},{t:this.shape_36},{t:this.shape_33},{t:this.shape_37},{t:this.shape_32},{t:this.shape_34},{t:this.shape_31},{t:this.shape_30},{t:this.shape_35},{t:this.shape_26},{t:this.shape_27},{t:this.shape_22},{t:this.shape_49},{t:this.shape_29},{t:this.shape_28},{t:this.shape_814},{t:this.shape_815},{t:this.shape_825},{t:this.shape_823},{t:this.shape_824},{t:this.shape_822},{t:this.shape_821},{t:this.shape_818},{t:this.shape_817},{t:this.shape_816},{t:this.shape_820},{t:this.shape_853},{t:this.shape_854},{t:this.shape_855},{t:this.shape_850},{t:this.shape_813},{t:this.shape_521},{t:this.shape_522},{t:this.shape_519},{t:this.shape_520},{t:this.shape_517},{t:this.shape_541},{t:this.shape_540},{t:this.shape_518},{t:this.shape_531},{t:this.shape_1368},{t:this.shape_529},{t:this.shape_530},{t:this.shape_528},{t:this.shape_516},{t:this.shape_515},{t:this.shape_1367},{t:this.shape_1366},{t:this.shape_539},{t:this.shape_537},{t:this.shape_536},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_449},{t:this.shape_450},{t:this.shape_448},{t:this.shape_447},{t:this.shape_533},{t:this.shape_436},{t:this.shape_435},{t:this.shape_437},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_1365},{t:this.shape_538},{t:this.shape_534},{t:this.shape_1364},{t:this.shape_1363},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_425},{t:this.shape_424},{t:this.shape_1362},{t:this.shape_407},{t:this.shape_409},{t:this.shape_1361},{t:this.shape_1360},{t:this.shape_1359},{t:this.shape_354},{t:this.shape_371},{t:this.shape_1358},{t:this.shape_513},{t:this.shape_1357},{t:this.shape_1356},{t:this.shape_1355},{t:this.shape_1354},{t:this.shape_1353},{t:this.shape_1352},{t:this.shape_1351},{t:this.shape_1350},{t:this.shape_1349},{t:this.shape_355},{t:this.shape_1348},{t:this.shape_343},{t:this.shape_367},{t:this.shape_1347},{t:this.shape_1346},{t:this.shape_363},{t:this.shape_472},{t:this.shape_446},{t:this.shape_479},{t:this.shape_477},{t:this.shape_478},{t:this.shape_474},{t:this.shape_475},{t:this.shape_473},{t:this.shape_468},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_430},{t:this.shape_441},{t:this.shape_445},{t:this.shape_442},{t:this.shape_443},{t:this.shape_439},{t:this.shape_438},{t:this.shape_440},{t:this.shape_444},{t:this.shape_476},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_467},{t:this.shape_928},{t:this.shape_927},{t:this.shape_917},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_460},{t:this.shape_461},{t:this.shape_462},{t:this.shape_398},{t:this.shape_400},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_399},{t:this.shape_394},{t:this.shape_403},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_389},{t:this.shape_390},{t:this.shape_402},{t:this.shape_387},{t:this.shape_388},{t:this.shape_386},{t:this.shape_426},{t:this.shape_422},{t:this.shape_423},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_401},{t:this.shape_412},{t:this.shape_411},{t:this.shape_376},{t:this.shape_382},{t:this.shape_383},{t:this.shape_379},{t:this.shape_812},{t:this.shape_380},{t:this.shape_52},{t:this.shape_50},{t:this.shape_48},{t:this.shape_46},{t:this.shape_60},{t:this.shape_47},{t:this.shape_45},{t:this.shape_44},{t:this.shape_375},{t:this.shape_63},{t:this.shape_53},{t:this.shape_64},{t:this.shape_51},{t:this.shape_57},{t:this.shape_58},{t:this.shape_56},{t:this.shape_62},{t:this.shape_61},{t:this.shape_59},{t:this.shape_54},{t:this.shape_55},{t:this.shape_329},{t:this.shape_350},{t:this.shape_353},{t:this.shape_344},{t:this.shape_345},{t:this.shape_346},{t:this.shape_340},{t:this.shape_342},{t:this.shape_341},{t:this.shape_339},{t:this.shape_338},{t:this.shape_336},{t:this.shape_351},{t:this.shape_378},{t:this.shape_377},{t:this.shape_349},{t:this.shape_348},{t:this.shape_356},{t:this.shape_68},{t:this.shape_65},{t:this.shape_67},{t:this.shape_69},{t:this.shape_66},{t:this.shape_1003},{t:this.shape_42},{t:this.shape_43},{t:this.shape_41},{t:this.shape_40},{t:this.shape_21},{t:this.shape_14},{t:this.shape_88},{t:this.shape_87},{t:this.shape_91},{t:this.shape_90},{t:this.shape_70},{t:this.shape_333},{t:this.shape_20},{t:this.instance_9},{t:this.instance_8},{t:this.button_6_1}]},64).wait(169));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(17.8,181,810.4000000000001,232.2);
// library properties:
lib.properties = {
	id: '1A194528EB139948AE882A7DC1B2BF75',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap10.png", id:"Bitmap10"},
		{src:"images/Bitmap12.png", id:"Bitmap12"},
		{src:"images/Bitmap9.png", id:"Bitmap9"},
		{src:"images/lincoln.jpg", id:"lincoln"},
		{src:"images/RifledMuskets.png", id:"RifledMuskets"},
		{src:"images/springfieldtrapdoorallinconversionriflef.jpg", id:"springfieldtrapdoorallinconversionriflef"},
		{src:"images/war.jpg", id:"war"},
		{src:"images/war_death.png", id:"war_death"},
		{src:"sounds/_0425.mp3", id:"_0425"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['1A194528EB139948AE882A7DC1B2BF75'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;