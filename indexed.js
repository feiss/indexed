

var indexed_vert= "\
attribute vec4 position;\
void main() {\
	gl_Position = position;\
}";

var indexed_frag="\
precision mediump float;\
uniform vec2 resolution;\
uniform sampler2D fb;\
uniform sampler2D pal;\
void main() {\
	vec2 uv = gl_FragCoord.xy / resolution;\
	uv.y= 1.0-uv.y;\
	vec4 colindex= texture2D(fb, uv);\
	vec4 color= texture2D(pal, colindex.xy);\
	gl_FragColor = color;\
}";



var assets={};




function loadAssets(list, onfinish, onprogress){
	var total= list.length, loaded= 0;
	for(var i in list){
		switch(fileext(list[i])){
			case 'png':
			case 'gif':
			case 'jpg':
			case 'jpeg':
				var img= new Image();
				img.onload= function(){
					assets[filename(this.src)]= this;
					loaded++;
					if (loaded>=total){
						if (onfinish) onfinish();
					}
					else if (onprogress) onprogress(loaded/total);
				};
				img.src= list[i];
			break;
			case 'pcx':
				loadBinaryFile(list[i], function(url, data){
					assets[filename(url)]= data;
					loaded++;
					if (loaded>=total){
						if (onfinish) onfinish();
					}
					else if (onprogress) onprogress(loaded/total);
				})
			break;
			case 'pal':
			case 'txt':
			case 'ini':
			case 'json':
			case 'cfg':
				loadTextFile(list[i], function(url, data){
					assets[filename(url)]= data;
					loaded++;
					if (loaded>=total){
						if (onfinish) onfinish();
					}
					else if (onprogress) onprogress(loaded/total);
				})
			break;
		}
	}

	function filename(path){
		return path.substring(path.lastIndexOf('/')+1);
	}

	function fileext(path){
		return path.substring(path.lastIndexOf('.')+1).toLowerCase();
	}
}

function loadTextFile(url, callback) {
	var xobj = new XMLHttpRequest();
	if (xobj.overrideMimeType) xobj.overrideMimeType("text/plain");
	xobj.responseType = 'text';
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(url, xobj.responseText);
		}
	};
	xobj.send(null);
 }

function loadBinaryFile(url, callback) {
	var xobj = new XMLHttpRequest();
	if (xobj.overrideMimeType) xobj.overrideMimeType("application/octet-stream");
	xobj.responseType = 'arraybuffer';
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(url, new Uint8Array(xobj.response));
		}
	};
	xobj.send(null);
 }


Stage= function (canvas_id, width, height, scale, forcecanvas){
	scale= Math.floor(parseInt(scale));
	if (!scale || scale<0) scale= 1;
	this.scale= scale;
	this.canvas= document.getElementById(canvas_id);
	if (!this.canvas) {
		this.canvas= document.createElement('canvas');
		this.canvas.width= 256*scale;
		this.canvas.height= 256*scale;
		document.body.appendChild(this.canvas);
	}
	this.width= width || this.canvas.width/scale|0;
	this.height= height || this.canvas.height/scale|0;
	console.log(this.width);
	this.canvas.width= this.width*scale;
	this.canvas.height= this.height*scale;
	this.center= {x: this.width/2|0, y: this.height/2|0}
	this.fb= new Buffer(this.width, this.height);
	this.palette= new Palette();

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
		this.context.imageSmoothingEnabled= false;
	}
	else{
		this.gl = twgl.getWebGLContext(this.canvas);
		this.programInfo = twgl.createProgramInfo(this.gl, [indexed_vert, indexed_frag]);

		//2 triangles
		this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, 
			{position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]});

		this.textures= twgl.createTextures(this.gl, {
			pal: {
				min: this.gl.NEAREST,
				mag: this.gl.NEAREST,
				width: this.palette.length,
				height: 1,
				format: this.gl.RGB,
				src: this.palette.data,
				type: this.gl.UNSIGNED_BYTE,
				auto: false
			},
			fb: {
				min: this.gl.NEAREST,
				mag: this.gl.NEAREST,
				format: this.gl.LUMINANCE,
				width: this.width,
				height: this.height,
				src: this.fb.data,
				type: this.gl.UNSIGNED_BYTE,
				auto: false
			}
		});
		this.uniforms = {
			resolution: [this.gl.canvas.width, this.gl.canvas.height],
			fb: this.textures.fb,
			pal: this.textures.pal
		};

		twgl.resizeCanvasToDisplaySize(this.gl.canvas);
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

};
Stage.prototype= {
	clear: function(color){
		this.fb.set(color);
	},
	setPalette: function(pal){
		if (pal instanceof Palette) this.palette= pal;
		else this.palette.fromString(pal);
		this.updatePalette();
	},
	updatePalette: function(){
		if (!this.gl) return;

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures.pal);
		twgl.setTextureFromArray(this.gl, this.textures.pal, this.palette.data, 
			{width: this.palette.length, height: 1, format: this.gl.RGB, type: this.gl.UNSIGNED_BYTE, update:true});
	},
	flip: function(){
		if (this.gl){
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures.fb);
			twgl.setTextureFromArray(this.gl, this.textures.fb, this.fb.data, {format: this.gl.LUMINANCE, width: this.width, height: this.height, type: this.gl.UNSIGNED_BYTE, update: true});

			this.gl.useProgram(this.programInfo.program);
			twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
			twgl.setUniforms(this.programInfo, this.uniforms);
			twgl.drawBufferInfo(this.gl, this.gl.TRIANGLES, this.bufferInfo);
		}
		else{
			var col, data= this.imagedata.data;
			for (var i=0, end=this.width*this.height, ii=0; i< end; i++, ii+=4) {
				col= this.fb.data[i]*3;
				data[ii  ]= this.palette.data[col  ];
				data[ii+1]= this.palette.data[col+1];	
				data[ii+2]= this.palette.data[col+2];
			}
			if (this.backcanvas){
				this.backcontext.putImageData(this.imagedata, 0, 0);
				this.context.drawImage(this.backcanvas, 0, 0, this.canvas.width, this.canvas.height);
			}
			else this.context.putImageData(this.imagedata, 0, 0);
		}
	}
};



Palette= function(a){
	this.data= undefined;
	this.length= undefined;
	if (a===undefined) a= 256;
	if (parseInt(a)>0) this.init(a);
	else if (typeof a=='string') this.fromString(a);
	this.TRANSPARENT= 255;
};
Palette.prototype={
	init: function(size){
		if (size===undefined) size= 256*3; else size*=3;
		if (this['data']===undefined || this.data.length!==size){
			this.data= new Uint8Array(size);
			this.length= size/3;
		}

		for (var i=0; i< size; i+=3){
			this.data[i  ]= i;
			this.data[i+1]= i;
			this.data[i+2]= i;
		}
	},
	fromString: function(str){
		var lines= str.split('\n');
		if (lines[0].trim()=='JASC-PAL'){
			var entries= parseInt(lines[2]);
			this.data= new Uint8Array(entries*3);
			this.length= entries;
			for (var i=0; i< entries; i++){
				var col= lines[i+3].split(' ');
				this.data[i*3+0]= parseInt(col[0]);
				this.data[i*3+1]= parseInt(col[1]);
				this.data[i*3+2]= parseInt(col[2]);
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

		for (var i= start, ii=i*3; i<= end; i++, ii+=3){
			this.data[ii  ]= Math.floor(colorstart[0]);
			this.data[ii+1]= Math.floor(colorstart[1]);
			this.data[ii+2]= Math.floor(colorstart[2]);
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
			direction= -1
		}
		else direction= 1;
		
		for (var i= start, ii= i*3, ij; i!= end; i+= direction, ii=i*3){
			ij= (i+direction)*3;
			this.data[ii  ]= this.data[ij];
			this.data[ii+1]= this.data[ij+1];
			this.data[ii+2]= this.data[ij+2];
		}
		this.data[end*3  ]= this.data[start*3+0];
		this.data[end*3+1]= this.data[start*3+1];
		this.data[end*3+2]= this.data[start*3+2];
	},
	getColorIndex: function(r,g,b){
		for (var i=0, len=this.data.length; i< len; i+=3){
			if (this.data[i]==r && this.data[i+1]==g && this.data[i+2]==b){
				return Math.floor(i/3);
			}
		}
		return this.TRANSPARENT;
	}
};

Buffer= function(a, b){
	this.data= undefined;
	this.palette= null;
	this.width= 0;
	this.height= 0;

	this.init= function(a,b,c){
		this.data= undefined;
		this.width= 0;
		this.height= 0;
		if (a instanceof Image && b instanceof Palette){
			this.fromImage(a, b);
		}
		else if (a instanceof Uint8Array && b === undefined){
			this.fromPCX(a);
		}
		else if (parseInt(a)>0 && parseInt(b)>0){
			this.data= new Uint8Array(a*b);
			this.palette= new Palette();
			this.width= a;
			this.height= b;
		}
	}
	this.init(a,b);
}
Buffer.prototype= {
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
	fromPCX: function(img){
		var pcx= PCXread(img, true);
		this.width= pcx.width;
		this.height= pcx.height;
		this.data= pcx.data;
		this.palette= pcx.palette;
		console.log(pcx);
	},
	set: function(color){
		for (var i= 0, len= this.data.length; i<len; i++) this.data[i]= color;
	},
	draw: function(buffer, x, y){
		var j= y*this.width+x;
		var c;
		for (var i = 0, len= buffer.data.length; i < len;) {
			c= buffer.data[i];
			if (c!=buffer.palette.TRANSPARENT){
				this.data[j]= c;//Math.min(254, (this.data[j]+spr.pixels[i]));
			}
			i++;
			if(i%buffer.width==0) j+= this.width-buffer.width+1; else j++;
		};
	}
}

//fast and incomplete pcx reader. It assumes a lot of things by default.
function PCXread(data, readpalette){
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
		pcx.palette= new Palette(256);
		for (var i= data.length-768, j=0, len= data.length; i < len; i++, j++) {
			pcx.palette.data[j]= data[i];
		}
	}

	return pcx;

	function word(offset){
		return (data[offset+1]<<8)|data[offset];
	}
}