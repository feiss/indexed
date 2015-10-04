

// loader

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

// gameloop

// inpit manager

// basic sprite class

// basic particle system