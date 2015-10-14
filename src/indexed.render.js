/** INDEXED
*** indexed color mode for canvas, and powered by playground and twgl
*** copyright 2015 Diego F. Goberna, MIT licensed
*** see http://github.com/feiss/indexed
*/

var Indexed= {};

Indexed.indexed_vert= "\
attribute vec4 position;\
void main() {\
	gl_Position = position;\
}";

//todo: add optional postprocessing filters
Indexed.indexed_frag="\
precision mediump float;\
uniform vec2 canvasratio;\
uniform vec2 resolution;\
uniform sampler2D fb;\
uniform sampler2D pal;\
void main() {\
	vec2 uv = gl_FragCoord.xy / resolution * canvasratio;\
	uv.y= canvasratio.y - uv.y;\
	vec4 colindex= texture2D(fb, uv);\
	vec4 color= texture2D(pal, colindex.xy);\
\
	uv/= canvasratio;\
	vec2 uv2 = uv * 2.0 - 1.0;\
    color*= smoothstep(1.65, 1.65 - 0.75, length(uv2));\
	gl_FragColor = color;\
}";




Indexed.Renderer= function (canvas_id, width, height, scale, forcecanvas){
	scale= Math.floor(parseInt(scale));
	if (!scale || scale<0) scale= 1;
	this.scale= scale;
	if (typeof canvas_id=='string'){
		this.canvas= document.getElementById(canvas_id);
	}
	else this.canvas= canvas_id;
	if (!this.canvas) {
		this.canvas= document.createElement('canvas');
		this.canvas.width= 256*scale;
		this.canvas.height= 256*scale;
		document.body.appendChild(this.canvas);
	}
	this.width= width || this.canvas.width/scale|0;
	this.height= height || this.canvas.height/scale|0;
	this.canvas.width= this.width*scale;
	this.canvas.height= this.height*scale;
	this.center= {x: this.width/2|0, y: this.height/2|0}
	this.fb= new Indexed.Buffer(this.width, this.height);
	this.palette= new Indexed.Palette();

	var ctest= document.createElement('canvas');
	var webgl_available = twgl.getWebGLContext(ctest);

	if (forcecanvas || !webgl_available){
		this.gl= false;
		this.context= this.canvas.getContext("2d");
		this.backcanvas= null;
		this.backcontext= null;
		if (scale!=1){
			this.backcanvas= document.createElement('canvas');
			this.backcanvas.width= this.width;
			this.backcanvas.height= this.height;
			this.backcontext= this.backcanvas.getContext("2d");
			this.backcontext.fillRect(0,0, this.width, this.height);
			this.imagedata= this.backcontext.getImageData(0,0, this.width, this.height);
		}
		else{
			this.context.fillRect(0,0, this.width*scale, this.height*scale);
			this.imagedata= this.context.getImageData(0,0, this.width, this.height);
		}
		this.prebuffer=   new ArrayBuffer(this.imagedata.data.length);
		this.prebuffer8=  new Uint8ClampedArray(this.prebuffer);
		this.prebuffer32= new Uint32Array(this.prebuffer);

		this.context.imageSmoothingEnabled= false;
	}
	else{
		this.gl = twgl.getWebGLContext(this.canvas);
		this.programInfo = twgl.createProgramInfo(this.gl, [Indexed.indexed_vert, Indexed.indexed_frag]);

		//2 triangles
		this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, 
			{position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]});

		//find power-2 texture sizes for this canvas size
		var twidth= Math.pow(2, Math.ceil(Math.log(this.width)/Math.log(2)));
		var theight= Math.pow(2, Math.ceil(Math.log(this.height)/Math.log(2)));
		var palwidth= Math.pow(2, Math.ceil(Math.log(this.palette.length)/Math.log(2)));
		this.textures= twgl.createTextures(this.gl, {
			pal: {
				min: this.gl.NEAREST,
				mag: this.gl.NEAREST,
				width: palwidth,
				height: 1,
				format: this.gl.RGBA,
				//src: this.palette.data,
				type: this.gl.UNSIGNED_BYTE,
				auto: false
			},
			fb: {
				min: this.gl.NEAREST,
				mag: this.gl.NEAREST,
				format: this.gl.LUMINANCE,
				width: twidth,
				height: theight,
				//src: this.fb.data,
				type: this.gl.UNSIGNED_BYTE,
				auto: false
			}
		});		
		this.uniforms = {
			resolution: [this.gl.canvas.width, this.gl.canvas.height],
			canvasratio: [this.width/twidth, this.height/theight],
			fb: this.textures.fb,
			pal: this.textures.pal
		};

		twgl.resizeCanvasToDisplaySize(this.gl.canvas);
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	this.updatePalette();


};
Indexed.Renderer.prototype= {
	setCursor: function(cursor){
		this.canvas.style.cursor= cursor;
	},
	clear: function(color){
		this.fb.set(color);
	},
	setPalette: function(pal){
		if (pal instanceof Indexed.Palette) this.palette= pal;
		else this.palette.fromString(pal);
		this.updatePalette();
	},
	updatePalette: function(){
		if (!this.gl) return;

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures.pal);
//		twgl.setTextureFromArray(this.gl, this.textures.pal, this.palette.data, {width: this.palette.length, height: 1, format: this.gl.RGB, type: this.gl.UNSIGNED_BYTE, update:true});
		this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
		this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.palette.length, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.palette.data8);
	},
	flip: function(){
		if (this.gl){
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures.fb);
			//twgl.setTextureFromArray(this.gl, this.textures.fb, this.fb.data, {format: this.gl.LUMINANCE, width: this.width, height: this.height, type: this.gl.UNSIGNED_BYTE, update: true});
			this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
			this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.width, this.height, this.gl.LUMINANCE, this.gl.UNSIGNED_BYTE, this.fb.data);

			this.gl.useProgram(this.programInfo.program);
			twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
			twgl.setUniforms(this.programInfo, this.uniforms);
			twgl.drawBufferInfo(this.gl, this.gl.TRIANGLES, this.bufferInfo);
		}
		else{
			var fbdata= this.fb.data, paldata= this.palette.data32, prebuffer= this.prebuffer32;
			for (var i=0, end=this.width*this.height; i< end; i++) {
				prebuffer[i]= paldata[ fbdata[i] ];
			}
			this.imagedata.data.set(this.prebuffer8);
			if (this.backcanvas){
				this.backcontext.putImageData(this.imagedata, 0, 0);
				this.context.drawImage(this.backcanvas, 0, 0, this.canvas.width, this.canvas.height);
			}
			else this.context.putImageData(this.imagedata, 0, 0);
		}
	}
};



Indexed.Palette= function(a){
	this.data= undefined;
	this.data8= undefined;
	this.data32= undefined;

	this.length= undefined;
	if (a===undefined) a= 256;
	if (parseInt(a)>0) this.init(a);
	else if (typeof a=='string') this.fromString(a);
	this.TRANSPARENT= 255;
};
Indexed.Palette.prototype={
	init: function(size){
		if (size===undefined) size= 256*4; else size*=4;
		if (this['data']===undefined || this.data.length!==size){
			this.data = new ArrayBuffer(size);
			this.data8= new Uint8Array(this.data);
			this.data32= new Uint32Array(this.data);
			
			this.length= size/4|0;
		}

		for (var i=0; i< this.length; i++){
			this.data8[i*4 ]= i;
			this.data8[i*4+1]= i;
			this.data8[i*4+2]= i;
			this.data8[i*4+3]= 255;
		}
	},
	fromString: function(str){
		var lines= str.split('\n');
		if (lines[0].trim()=='JASC-PAL'){
			var size= parseInt(lines[2]);
			
			this.data = new ArrayBuffer(size*4);
			this.data8= new Uint8Array(this.data);
			this.data32= new Uint32Array(this.data);
			this.length= size;

			for (var i=0; i< size; i++){
				var col= lines[i+3].split(' ');
				this.data8[i*4+0]= parseInt(col[0]);
				this.data8[i*4+1]= parseInt(col[1]);
				this.data8[i*4+2]= parseInt(col[2]);
				this.data8[i*4+3]= 255;
			}
		}
	},
	initGrayscale: function(size){
		if (size!==undefined && this.length!==size) this.init(size);
		this.makeGradient(0, this.length-1, [0,0,0], [255,255,255]);
	},
	setTransparent: function(idx){
		this.TRANSPARENT= Math.min(this.length, Math.max(0, idx));
	},
	makeGradient: function(start, end, colorstart, colorend){
		var steps= end-start;
		var dr= (colorend[0]-colorstart[0])/steps;
		var dg= (colorend[1]-colorstart[1])/steps;
		var db= (colorend[2]-colorstart[2])/steps;

		for (var i= start, ii=i*4; i<= end; i++, ii+=4){
			this.data8[ii  ]= colorstart[0]|0;
			this.data8[ii+1]= colorstart[1]|0;
			this.data8[ii+2]= colorstart[2]|0;
			this.data8[ii+3]= 255;
			colorstart[0]+= dr;
			colorstart[1]+= dg;
			colorstart[2]+= db;
		}
	},
	cycle: function(start, end, direction) {
		if (direction<0) {
			var aux= start;
			start= end;
			end= aux;
			direction= -1;
		}
		else direction= 1;
		
		for (var i= start, ii= i, ij; i!= end; i+= direction, ii=i){
			ij= i+direction;
			this.data32[ii]= this.data32[ij];
		}
		this.data32[end]= this.data32[start];
	},
	getColorIndex: function(r,g,b){
		var col= (0xff000000)|(b<<16)|(g<<8)|r;
		for (var i=0, len=this.data32.length; i< len; i++){
			if (this.data32[i]==col){
				return i;
			}
		}
		return this.TRANSPARENT;
	},
	setRGB: function(i,r,g,b){
		this.data32[i]= (0xff000000)|(b<<16)|(g<<8)|r;
	},
	shiftRGB: function(i,r,g,b){
		this.data[i*3+0]= (this.data[i*3+0] + r)|0;
		this.data[i*3+1]= (this.data[i*3+1] + g)|0;
		this.data[i*3+2]= (this.data[i*3+2] + b)|0;
	}
};

Indexed.Buffer= function(a, b){
	this.data= undefined;
	this.palette= null;
	this.width= 0;
	this.height= 0;

	this.init= function(a,b,c){
		this.data= undefined;
		this.width= 0;
		this.height= 0;
		if (a instanceof Image && b instanceof Indexed.Palette){
			this.fromImage(a, b);
		}
		else if (a instanceof Uint8Array){
			this.fromPCX(a, b);
		}
		else if (parseInt(a)>0 && parseInt(b)>0){
			this.data= new Uint8Array(a*b);
			this.palette= new Indexed.Palette();
			this.width= a;
			this.height= b;
		}
	}
	this.init(a,b);
}
Indexed.Buffer.prototype= {
	fromImage: function(img, pal){
		if (this.data) this.data= null;
		this.data= new Uint8Array(img.width*img.height);
		var c= document.createElement('canvas');
		c.width= img.width;
		c.height= img.height;
		this.width= img.width;
		this.height= img.height;
		var ctx= c.getContext('2d');
		ctx.drawImage(img, 0,0);
		var imgdata= ctx.getImageData(0, 0, c.width, c.height).data;
		for (var i=0, len= imgdata.length, j=0; i< len; i+=4, j++){
			this.data[j]= pal.getColorIndex(imgdata[i],imgdata[i+1],imgdata[i+2]);
		}
		this.palette= pal;
	},
	fromPCX: function(img, readpalette){
		var pcx= Indexed.PCXread(img, readpalette);
		this.width= pcx.width;
		this.height= pcx.height;
		this.data= pcx.data;
		this.palette= pcx.palette;
	},
	set: function(color){
		for (var i= 0, len= this.data.length; i<len; i++) this.data[i]= color;
	},
	replaceValues: function(repl){
		//repl is an object {fromValue1:toValue1 .. fromValueN:toValueN}
		for (var i= 0, len= this.data.length; i<len; i++) {
			var r= repl[this.data[i]];
			if (r===undefined) continue;
			this.data[i]= r;
		}
	},
	getSubBuffer: function(x, y, w, h, copypal){
		if (arguments.length==0){
			x= 0;
			y= 0;
			w= this.width;
			h= this.height;
			copypal= true;
		}

		var i,j;
		var x2= x+w, y2= y+h;
		var W= this.width, H= this.height;
		if (x > W || y> H || x2 < 0 || y2 < 0) return null;
		if (x2> W) x2= W;
		if (y2> H) y2= H;
		var x1= x;
		w= x2-x;
		h= y2-y;
		var b= new Indexed.Buffer(w, h);
		for(j=0; y< y2; y++, j++){
			for(i=0, x= x1; x< x2; x++, i++){
				b.data[j*w+i]= this.data[y*W+x];
			}
		}
		//FIX: shallow copy? hmmm nop nop! 
		if (copypal) b.palette= this.palette;
		return b;
	},
	drawBuffer: function(buffer, x, y){
		var j= (y|0)*this.width+(x|0);
		var c;
		for (var i = 0, len= buffer.data.length; i < len;) {
			c= buffer.data[i];
			if (c!=buffer.palette.TRANSPARENT){
				this.data[j]= c;//Math.min(254, (this.data[j]+spr.pixels[i]));
			}
			i++;
			if(i%buffer.width==0) j+= this.width-buffer.width+1; else j++;
		};
	},
	drawSubBuffer: function(buffer, bx, by, bw, bh, x, y){
		var i,j;
		var bx2= bx+bw, by2= by+bh;
		var W= buffer.width, H= buffer.height;
		if (bx > W || by> H || bx2 < 0 || by2 < 0) return null;
		if (bx2> W) bx2= W;
		if (by2> H) by2= H;
		var bx1= bx;
		bw= bx2-bx;
		bh= by2-by;
		var c;
		for(j=y; by< by2; by++, j++){
			for(i=x, bx= bx1; bx< bx2; bx++, i++){
				c= buffer.data[by*W+bx];
				if (c!=buffer.palette.TRANSPARENT){
					this.data[j*this.width+i]= c;
				}
			}
		}
	},
	putPixel: function(col, x, y){
		this.data[y*this.width+x]= col;
	},
	getPixel: function(x, y){
		return this.data[y*this.width+x];
	},
	drawRect: function(col, x, y, w, h, empty){
		var i,j;
		var x2= x+w, y2= y+h;
		var W= this.width, H= this.height;
		if (x > W || y> H || x2 < 0 || y2 < 0) return;
		if (x2> W) x2= W;
		if (y2> H) y2= H;
		var x1= x;
		if (empty===true){
			this.drawLine(col, x,  y,  x2, y);
			this.drawLine(col, x,  y2, x2, y2);
			this.drawLine(col, x,  y,  x,  y2);
			this.drawLine(col, x2, y,  x2, y2);
		}
		else{
			for(; y< y2; y++){
				for(x= x1; x< x2; x++){
					this.data[y*W+x]= col;
				}
			}
		}
	},
	drawLine: function(col, x0, y0, x1, y1){
		var W= this.width;
		var dx= Math.abs(x1-x0);
		var dy= Math.abs(y1-y0);
		var sx= (x0 < x1) ? 1 : -1;
		var sy= (y0 < y1) ? 1 : -1;
		var err = dx-dy;

		while(true){
			this.data[y0*W+x0]= col;

			if ((x0==x1) && (y0==y1)) break;
			var e2 = 2*err;
			if (e2 >-dy){ err-= dy; x0+= sx; }
			if (e2 < dx){ err+= dx; y0+= sy; }
		}
	}
}

//fast and incomplete pcx reader. It assumes a lot of things by default.
Indexed.PCXread= function(data, readpalette){
	var pcx={width: 0, height: 0, data: null, palette: null};

	var w= word(8);
	var h= word(10);
	if (!w || !h) return console.error('pcx dimensions wrong '+w+','+h);
	pcx.width= w+1;
	pcx.height= h+1;
	pcx.data= new Uint8Array(pcx.width*pcx.height);

	//rle
	var d, num, z=0;
	for (var i= 128, len=data.length-769; i < len; ) {
		d= data[i++];
		num= 1;
		if((d & 0xc0) === 0xc0) {
			num= d&0x3f;
			d= data[i++];
		}
		for(var j= 0; j < num; j++ ) {
			pcx.data[z++]= d;
		}
	}

	//palette
	if (readpalette===true){
		pcx.palette= new Indexed.Palette(256);
		for (var i= data.length-768, j=0, len= data.length; i < len; ) {
			pcx.palette.data8[j++]= data[i++];
			pcx.palette.data8[j++]= data[i++];
			pcx.palette.data8[j++]= data[i++];
			pcx.palette.data8[j++]= 255;
		}
	}

	return pcx;

	function word(offset){
		return (data[offset+1]<<8)|data[offset];
	}
}





/// plugin for playground
if (window.PLAYGROUND){

	PLAYGROUND.Renderer= function(app){
		this.app= app;
		app.on('create', this.create.bind(this));
		app.on('postrender', this.postrender.bind(this));
	}
	PLAYGROUND.Renderer.plugin= true;
	PLAYGROUND.Renderer.prototype={
		create: function(data){
			this.app.layer= new Indexed.Renderer(this.app.container, this.app.width, this.app.height, this.app.scale, this.app.forcecanvas);
		},
		postrender: function(){
			this.app.layer.flip();
		}
	};	

	PLAYGROUND.Application.prototype.loadPCX = function() {
		var promises = [];
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (typeof arg === "object") {
				for (var key in arg) promises = promises.concat(this.loadOnePCX(arg[key]));
			} 
			else {
				promises.push(this.loadOnePCX(arg));
			}
		}
		return Promise.all(promises);
	};

	PLAYGROUND.Application.prototype.loadOnePCX = function(name) {
		if(!this.pcx) this.pcx = {};
		var entry = this.getAssetEntry(name, "images", "pcx");
		this.loader.add();
		var self= this;

		var xobj = new XMLHttpRequest();
		if (xobj.overrideMimeType) xobj.overrideMimeType("application/octet-stream");
		xobj.responseType = 'arraybuffer';
		xobj.open('GET', entry.url, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4){
				if (xobj.status == "200") {
					self.pcx[entry.key]= new Indexed.Buffer(new Uint8Array(xobj.response), true);
					self.loader.success(entry.url);
				}
				else{
					self.loader.error("Could not load "+entry.url);
				}
			}
		};
		xobj.send(null);
	};


}