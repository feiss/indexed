

var assets={};

function filename(path){
	return path.substring(path.lastIndexOf('/')+1);
}

function fileext(path){
	return path.substring(path.lastIndexOf('.')+1).toLowerCase();
}


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
			case 'pal':
			case 'txt':
			case 'ini':
			case 'json':
			case 'cfg':
				loadFile(list[i], function(url, data){
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
}

function loadFile(url, callback) {
	var xobj = new XMLHttpRequest();
	//if (xobj.overrideMimeType) xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(url, xobj.responseText);
		}
	};
	xobj.send(null);
 }


Palette= function(a){
	this.data= undefined;
	this.length= undefined;
	if (parseInt(a)>0) this.init(size);
	else if (typeof a=='string') this.fromString(a);
	this.TRANSPARENT= 255;
};
Palette.prototype={
	init: function(size, r, g, b){
		if (r===undefined) r= 0;
		if (g===undefined) g= 0;
		if (b===undefined) b= 0;
		if (size===undefined) size= 256*3; else size*=3;
		if (this['data']===undefined || this.data.length!==size){
			this.data= new Uint8Array(size);
			this.length= size/3;
		}

		for (var i=0; i< size; i+=3){
			this.data[i  ]= r;
			this.data[i+1]= g;
			this.data[i+2]= b;
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
	this.width= 0;
	this.height= 0;

	this.init= function(a,b){
		this.data= undefined;
		this.width= 0;
		this.height= 0;
		if (a instanceof Image && b instanceof Palette){
			this.fromImage(a, b);
		}
		else if (parseInt(a)>0 && parseInt(b)>0){
			this.data= new Uint8Array(a*b);
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
		this.TRANSPARENT= pal.TRANSPARENT;
		var ctx= c.getContext('2d');
		ctx.drawImage(img, 0,0);
		var imgdata= ctx.getImageData(0, 0, c.width, c.height).data;
		for (var i=0, len= imgdata.length, j=0; i< len; i+=4, j++){
			this.data[j]= pal.getColorIndex(imgdata[i],imgdata[i+1],imgdata[i+2]);
		}
	},
	draw: function(dest, x, y){
		var j= y*dest.width+x;
		var c;
		for (var i = 0, len= this.data.length; i < len;) {
			c= this.data[i];
			if (c!=this.TRANSPARENT){
				dest.data[j]= c;//Math.min(254, (dest[j]+spr.pixels[i]));
			}
			i++;
			if(i%this.width==0) j+= W-this.width+1; else j++;
		};
	}
}

