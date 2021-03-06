/** INDEXED
*** indexed color mode for canvas, and powered by playground and twgl
*** indexed module copyright 2015 Diego F. Goberna

*** playground by rezoner (http://github.com/rezoner/playground)
*** twgl by greggman (https://github.com/greggman/twgl.js)

*** see http://github.com/feiss/indexed
*/
/*     
  PlaygroundJS r7
  http://playgroundjs.com
  (c) 2012-2015 http://rezoner.net
  Playground may be freely distributed under the MIT license.
*/
(function(){var ease=function(progress,easing){if(typeof ease.cache[easing]==="function"){return ease.cache[easing](progress);}else{return ease.spline(progress,easing||ease.defaultEasing);}};var extend=function(){for(var i=1;i<arguments.length;i++){for(var j in arguments[i]){arguments[0][j]=arguments[i][j];}}
return arguments[0];};extend(ease,{defaultEasing:"016",cache:{linear:function(t){return t},inQuad:function(t){return t*t},outQuad:function(t){return t*(2-t)},inOutQuad:function(t){return t<.5?2*t*t:-1+(4-2*t)*t},inCubic:function(t){return t*t*t},outCubic:function(t){return(--t)*t*t+1},inOutCubic:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},inQuart:function(t){return t*t*t*t},outQuart:function(t){return 1-(--t)*t*t*t},inOutQuart:function(t){return t<.5?8*t*t*t*t:1-8*(--t)*t*t*t},inQuint:function(t){return t*t*t*t*t},outQuint:function(t){return 1+(--t)*t*t*t*t},inOutQuint:function(t){return t<.5?16*t*t*t*t*t:1+16*(--t)*t*t*t*t},inSine:function(t){return-1*Math.cos(t/1*(Math.PI*0.5))+1;},outSine:function(t){return Math.sin(t/1*(Math.PI*0.5));},inOutSine:function(t){return-1/2*(Math.cos(Math.PI*t)-1);},inExpo:function(t){return(t==0)?0:Math.pow(2,10*(t-1));},outExpo:function(t){return(t==1)?1:(-Math.pow(2,-10*t)+1);},inOutExpo:function(t){if(t==0)return 0;if(t==1)return 1;if((t/=1/2)<1)return 1/2*Math.pow(2,10*(t-1));return 1/2*(-Math.pow(2,-10*--t)+2);},inCirc:function(t){return-1*(Math.sqrt(1-t*t)-1);},outCirc:function(t){return Math.sqrt(1-(t=t-1)*t);},inOutCirc:function(t){if((t/=1/2)<1)return-1/2*(Math.sqrt(1-t*t)-1);return 1/2*(Math.sqrt(1-(t-=2)*t)+1);},inElastic:function(t){var s=1.70158;var p=0;var a=1;if(t==0)return 0;if(t==1)return 1;if(!p)p=0.3;if(a<1){a=1;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(1/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t-s)*(2*Math.PI)/p));},outElastic:function(t){var s=1.70158;var p=0;var a=1;if(t==0)return 0;if(t==1)return 1;if(!p)p=0.3;if(a<1){a=1;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(1/a);return a*Math.pow(2,-10*t)*Math.sin((t-s)*(2*Math.PI)/p)+1;},inOutElastic:function(t){var s=1.70158;var p=0;var a=1;if(t==0)return 0;if((t/=1/2)==2)return 1;if(!p)p=(0.3*1.5);if(a<1){a=1;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(1/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t-s)*(2*Math.PI)/p));return a*Math.pow(2,-10*(t-=1))*Math.sin((t-s)*(2*Math.PI)/p)*0.5+1;},inBack:function(t,s){if(s==undefined)s=1.70158;return 1*t*t*((s+1)*t-s);},outBack:function(t,s){if(s==undefined)s=1.70158;return 1*((t=t/1-1)*t*((s+1)*t+s)+1);},inOutBack:function(t,s){if(s==undefined)s=1.70158;if((t/=1/2)<1)return 1/2*(t*t*(((s*=(1.525))+1)*t-s));return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2);},inBounce:function(t){return 1-this.outBounce(1-t);},outBounce:function(t){if((t/=1)<(1/2.75)){return(7.5625*t*t);}else if(t<(2/2.75)){return(7.5625*(t-=(1.5/2.75))*t+.75);}else if(t<(2.5/2.75)){return(7.5625*(t-=(2.25/2.75))*t+.9375);}else{return(7.5625*(t-=(2.625/2.75))*t+.984375);}},inOutBounce:function(t){if(t<1/2)return this.inBounce(t*2)*0.5;return this.outBounce(t*2-1)*0.5+0.5;}},translateEasing:function(key){if(!this.cache[key]){var array=key.split('');var sign=1;var signed=false;for(var i=0;i<array.length;i++){var char=array[i];if(char==="-"){sign=-1;signed=true;array.splice(i--,1);}else if(char==="+"){sign=1;array.splice(i--,1);}else array[i]=parseInt(array[i],16)*sign;}
var min=Math.min.apply(null,array);var max=Math.max.apply(null,array);var diff=max-min;var cache=[];var normalized=[];for(var i=0;i<array.length;i++){if(signed){var diff=Math.max(Math.abs(min),Math.abs(max))
normalized.push((array[i])/diff);}else{var diff=max-min;normalized.push((array[i]-min)/diff);}}
this.cache[key]=normalized;}
return this.cache[key]},splineK:{},splineX:{},splineY:{},insertIntermediateValues:function(a){var result=[];for(var i=0;i<a.length;i++){result.push(a[i]);if(i<a.length-1)result.push(a[i+1]+(a[i]-a[i+1])*0.6);}
return result;},spline:function(x,key){if(!this.splineK[key]){var xs=[];var ys=this.translateEasing(key);if(!ys.length)return 0;for(var i=0;i<ys.length;i++)xs.push(i*(1/(ys.length-1)));var ks=xs.map(function(){return 0});ks=this.getNaturalKs(xs,ys,ks);this.splineX[key]=xs;this.splineY[key]=ys;this.splineK[key]=ks;}
if(x>1)return this.splineY[key][this.splineY[key].length-1];var ks=this.splineK[key];var xs=this.splineX[key];var ys=this.splineY[key];var i=1;while(xs[i]<x)i++;var t=(x-xs[i-1])/(xs[i]-xs[i-1]);var a=ks[i-1]*(xs[i]-xs[i-1])-(ys[i]-ys[i-1]);var b=-ks[i]*(xs[i]-xs[i-1])+(ys[i]-ys[i-1]);var q=(1-t)*ys[i-1]+t*ys[i]+t*(1-t)*(a*(1-t)+b*t);return q;},getNaturalKs:function(xs,ys,ks){var n=xs.length-1;var A=this.zerosMat(n+1,n+2);for(var i=1;i<n;i++)
{A[i][i-1]=1/(xs[i]-xs[i-1]);A[i][i]=2*(1/(xs[i]-xs[i-1])+1/(xs[i+1]-xs[i]));A[i][i+1]=1/(xs[i+1]-xs[i]);A[i][n+1]=3*((ys[i]-ys[i-1])/((xs[i]-xs[i-1])*(xs[i]-xs[i-1]))+(ys[i+1]-ys[i])/((xs[i+1]-xs[i])*(xs[i+1]-xs[i])));}
A[0][0]=2/(xs[1]-xs[0]);A[0][1]=1/(xs[1]-xs[0]);A[0][n+1]=3*(ys[1]-ys[0])/((xs[1]-xs[0])*(xs[1]-xs[0]));A[n][n-1]=1/(xs[n]-xs[n-1]);A[n][n]=2/(xs[n]-xs[n-1]);A[n][n+1]=3*(ys[n]-ys[n-1])/((xs[n]-xs[n-1])*(xs[n]-xs[n-1]));return this.solve(A,ks);},solve:function(A,ks){var m=A.length;for(var k=0;k<m;k++)
{ var i_max=0;var vali=Number.NEGATIVE_INFINITY;for(var i=k;i<m;i++)
if(A[i][k]>vali){i_max=i;vali=A[i][k];}
this.splineSwapRows(A,k,i_max); for(var i=k+1;i<m;i++){for(var j=k+1;j<m+1;j++)
A[i][j]=A[i][j]-A[k][j]*(A[i][k]/A[k][k]);A[i][k]=0;}}
for(var i=m-1;i>=0;i--)
{var v=A[i][m]/A[i][i];ks[i]=v;for(var j=i-1;j>=0;j--)
{A[j][m]-=A[j][i]*v;A[j][i]=0;}}
return ks;},zerosMat:function(r,c){var A=[];for(var i=0;i<r;i++){A.push([]);for(var j=0;j<c;j++)A[i].push(0);}
return A;},splineSwapRows:function(m,k,l){var p=m[k];m[k]=m[l];m[l]=p;}});window.ease=ease;})();PLAYGROUND={};function playground(args){return new PLAYGROUND.Application(args);};PLAYGROUND.Utils={extend:function(){for(var i=1;i<arguments.length;i++){for(var j in arguments[i]){arguments[0][j]=arguments[i][j];}}
return arguments[0];},merge:function(a){for(var i=1;i<arguments.length;i++){var b=arguments[i];for(var key in b){var value=b[key];if(typeof a[key]!=="undefined"){if(typeof a[key]==="object")this.merge(a[key],value);else a[key]=value;}else{a[key]=value;}}}
return a;},invoke:function(object,methodName){var args=Array.prototype.slice.call(arguments,2);for(var i=0;i<object.length;i++){var current=object[i];if(current[methodName])current[methodName].apply(current,args);}},throttle:function(fn,threshold){threshold||(threshold=250);var last,deferTimer;return function(){var context=this;var now=+new Date,args=arguments;if(last&&now<last+threshold){ clearTimeout(deferTimer);deferTimer=setTimeout(function(){last=now;fn.apply(context,args);},threshold);}else{last=now;fn.apply(context,args);}};},wrapTo:function(value,target,max,step){if(value===target)return target;var result=value;var d=this.wrappedDistance(value,target,max);if(Math.abs(d)<step)return target;result+=(d<0?-1:1)*step;if(result>max){result=result-max;}else if(result<0){result=max+result;}
return result;},wrap:function(value,min,max){if(value<min)return max+(value%max);if(value>=max)return value%max;return value;},circWrap:function(val){return this.wrap(val,0,Math.PI*2);},circWrapTo:function(value,target,step){return this.wrapTo(value,target,Math.PI*2,step);},wrappedDistance:function(a,b,max){if(a===b)return 0;else if(a<b){var l=-a-max+b;var r=b-a;}else{var l=b-a;var r=max-a+b;}
if(Math.abs(l)>Math.abs(r))return r;else return l;},circWrappedDistance:function(a,b){return this.wrappedDistance(a,b,Math.PI*2)},ground:function(num,threshold){return(num/threshold|0)*threshold;},circDistance:function(a,b){return this.circWrappedDistance(a,b)},};PLAYGROUND.Utils.ease=ease;PLAYGROUND.Events=function(){this.listeners={};};PLAYGROUND.Events.prototype={on:function(event,callback,context){if(typeof event==="object"){var result={};for(var key in event){result[key]=this.on(key,event[key],context)}
return result;}
if(!this.listeners[event])this.listeners[event]=[];var listener={once:false,callback:callback,context:context};this.listeners[event].push(listener);return listener;},once:function(event,callback,context){if(typeof event==="object"){var result={};for(var key in event){result[key]=this.once(key,event[key],context)}
return result;}
if(!this.listeners[event])this.listeners[event]=[];var listener={once:true,callback:callback,context:context};this.listeners[event].push(listener);return listener;},off:function(event,callback){for(var i=0,len=this.listeners[event].length;i<len;i++){if(this.listeners[event][i]===callback){this.listeners[event].splice(i--,1);len--;}}},trigger:function(event,data){if(this.listeners["event"]){for(var i=0,len=this.listeners["event"].length;i<len;i++){var listener=this.listeners["event"][i];listener.callback.call(listener.context||this,event,data);}}
if(this.listeners[event]){for(var i=0,len=this.listeners[event].length;i<len;i++){var listener=this.listeners[event][i];listener.callback.call(listener.context||this,data);if(listener.once){this.listeners[event].splice(i--,1);len--;}}}}};PLAYGROUND.States=function(app){this.app=app;PLAYGROUND.Events.call(this);app.on("step",this.step.bind(this));};PLAYGROUND.States.prototype={step:function(delta){if(!this.next)return;if(this.current&&this.current.locked)return;var state=this.next;if(typeof state==="function")state=new state;if(!state.__created){state.__created=true;state.app=this.app;this.trigger("createstate",{state:state});if(state.create)state.create();}
if(this.current){this.trigger("leavestate",{prev:this.current,next:state,state:this.current});}
this.trigger("enterstate",{prev:this.current,next:state,state:state});this.current=state;if(this.current&&this.current.enter){this.current.enter();}
this.app.state=this.current;this.next=false;},set:function(state){if(this.current&&this.current.leave)this.current.leave();this.next=state;this.step(0);}};PLAYGROUND.Utils.extend(PLAYGROUND.States.prototype,PLAYGROUND.Events.prototype);PLAYGROUND.Application=function(args){var app=this;PLAYGROUND.Events.call(this);PLAYGROUND.Utils.merge(this,this.defaults,args);this.autoWidth=this.width?false:true;this.autoHeight=this.height?false:true;this.autoScale=this.scale?false:true;if(!this.container)this.container=document.body;if(this.container!==document.body)this.customContainer=true;if(typeof this.container==="string")this.container=document.querySelector(this.container);this.updateSize();this.states=new PLAYGROUND.States(this);this.states.on("event",this.emitLocalEvent,this);this.mouse=new PLAYGROUND.Mouse(this,this.container);this.mouse.on("event",this.emitGlobalEvent,this);this.touch=new PLAYGROUND.Touch(this,this.container);this.touch.on("event",this.emitGlobalEvent,this);this.keyboard=new PLAYGROUND.Keyboard();this.keyboard.on("event",this.emitGlobalEvent,this);this.gamepads=new PLAYGROUND.Gamepads(this);this.gamepads.on("event",this.emitGlobalEvent,this);this.tweens=new PLAYGROUND.TweenManager(this);this.ease=PLAYGROUND.Utils.ease;PLAYGROUND.Sound(this);window.addEventListener("resize",this.handleResize.bind(this));this.images={};this.atlases={};this.data={};this.loader=new PLAYGROUND.Loader(this);this.loadFoo(0.25);this.plugins=[];for(var key in PLAYGROUND){var property=PLAYGROUND[key];if(property.plugin)this.plugins.push(new property(this));}
this.emitGlobalEvent("preload");this.firstBatch=true;if(this.disabledUntilLoaded)this.skipEvents=true;function onPreloadEnd(){app.loadFoo(0.25);setTimeout(function(){app.emitLocalEvent("create");app.setState(PLAYGROUND.DefaultState);app.handleResize();if(PLAYGROUND.LoadingScreen)app.setState(PLAYGROUND.LoadingScreen);PLAYGROUND.GameLoop(app);app.loader.once("ready",function(){app.firstBatch=false;if(app.disabledUntilLoaded)app.skipEvents=false;app.setState(PLAYGROUND.DefaultState);app.emitLocalEvent("ready");app.handleResize();});});};this.loader.once("ready",onPreloadEnd);};PLAYGROUND.Application.prototype={defaults:{smoothing:1,paths:{base:"",images:"images/"},offsetX:0,offsetY:0,skipEvents:false,disabledUntilLoaded:true},setState:function(state){this.states.set(state);},getPath:function(to){return this.paths.base+(this.paths[to]||(to+"/"));},getAssetEntry:function(path,folder,defaultExtension){var folder=this.paths[folder]||(folder+"/");var fileinfo=path.match(/(.*)\..*/);var key=fileinfo?fileinfo[1]:path;var temp=path.split(".");var basename=path;if(temp.length>1){var ext=temp.pop();path=temp.join(".");}else{var ext=defaultExtension;basename+="."+defaultExtension;}
return{key:key,url:this.paths.base+folder+basename,path:this.paths.base+folder+path,ext:ext};},emitLocalEvent:function(event,data){this.trigger(event,data);if((event!=="render"||!this.skipEvents||this.loader.ready)&&this[event])this[event](data);},emitGlobalEvent:function(event,data){if(!this.state)return this.emitLocalEvent(event,data);this.trigger(event,data);if((event!=="render"||!this.skipEvents||this.loader.ready)&&this.event)this.event(event,data);if((event!=="render"||!this.skipEvents||this.loader.ready)&&this[event])this[event](data);if(this.state.event)this.state.event(event,data);if(this.state[event])this.state[event](data);this.trigger("post"+event,data);},updateSize:function(){if(this.customContainer){var containerWidth=this.container.offsetWidth;var containerHeight=this.container.offsetHeight;}else{var containerWidth=window.innerWidth;var containerHeight=window.innerHeight;}
if(!this.autoScale&&!this.autoWidth&&!this.autoHeight){}else if(!this.autoHeight&&this.autoWidth){if(this.autoScale)this.scale=containerHeight/this.height;this.width=Math.ceil(containerWidth/this.scale);}else if(!this.autoWidth&&this.autoHeight){if(this.autoScale)this.scale=containerWidth/this.width;this.height=Math.ceil(containerHeight/this.scale);}else if(this.autoWidth&&this.autoHeight&&this.autoScale){this.scale=1;this.width=containerWidth;this.height=containerHeight;}else if(this.autoWidth&&this.autoHeight){this.width=Math.ceil(containerWidth/this.scale);this.height=Math.ceil(containerHeight/this.scale);}else{this.scale=Math.min(containerWidth/this.width,containerHeight/this.height);}
this.offsetX=(containerWidth-this.width*this.scale)/2|0;this.offsetY=(containerHeight-this.height*this.scale)/2|0;this.center={x:this.width/2|0,y:this.height/2|0};},handleResize:function(){this.updateSize();this.mouse.handleResize();this.touch.handleResize();this.emitGlobalEvent("resize",{});},request:function(url){function promise(success,fail){var request=new XMLHttpRequest();var app=this;request.open("GET",url,true);request.onload=function(event){var xhr=event.target;if(xhr.status!==200&&xhr.status!==0){return fail(new Error("Failed to get "+url));}
success(xhr);}
request.send();}
return new Promise(promise);},loadFoo:function(timeout){var loader=this.loader;this.loader.add("foo "+timeout);setTimeout(function(){loader.success("foo "+timeout);},timeout*1000);},loadData:function(){for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(typeof arg==="object"){for(var key in arg)this.loadData(arg[key]);}else{this.loadDataItem(arg);}}},loadDataItem:function(name){var entry=this.getAssetEntry(name,"data","json");var app=this;this.loader.add();this.request(entry.url).then(processData);function processData(request){if(entry.ext==="json"){app.data[entry.key]=JSON.parse(request.responseText);}else{app.data[entry.key]=request.responseText;}
app.loader.success(entry.url);}},loadImage:function(){return this.loadImages.apply(this,arguments);},loadImages:function(){var promises=[];for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(typeof arg==="object"){for(var key in arg)promises=promises.concat(this.loadImages(arg[key]));}else{promises.push(this.loadOneImage(arg));}}
return Promise.all(promises);},loadOneImage:function(name){var app=this;if(!this._imageLoaders)this._imageLoaders={};if(!this._imageLoaders[name]){var promise=function(resolve,reject){var loader=app.loader;var entry=app.getAssetEntry(name,"images","png");app.loader.add(entry.path);var image=new Image;image.addEventListener("load",function(){app.images[entry.key]=image;resolve(image);loader.success(entry.url);entry.image=image;app.emitLocalEvent("imageready",entry);});image.addEventListener("error",function(){reject("can't load "+entry.url);loader.error(entry.url);});image.src=entry.url;};app._imageLoaders[name]=new Promise(promise);}
return this._imageLoaders[name];},loadFont:function(){var promises=[];for(var i=0;i<arguments.length;i++){var arg=arguments[i];promises.push(this.loadFontItem(arg));}
return Promise.all(promises);},loadFonts:function(){return this.loadFont.apply(this,arguments);},loadFontItem:function(name){var app=this;if(!this._fontPromises)this._fontPromises={};if(!this._fontPromises[name]){var promise=function(resolve,reject){app.loader.add("font "+name);var checkingTimer=setInterval(function(){var base=cq(100,32).font("14px somethingrandom").fillStyle("#fff").textBaseline("top").fillText("lorem ipsum dolores sit",0,4);var test=cq(100,32).font("14px '"+name+"'").fillStyle("#fff").textBaseline("top").fillText("lorem ipsum dolores sit",0,4);if(!cq.compare(base,test)){app.loader.success("font"+name);clearInterval(checkingTimer);resolve();}});}
this._fontPromises[name]=new Promise(promise);}
return this._fontPromises[name];},render:function(){}};PLAYGROUND.Utils.extend(PLAYGROUND.Application.prototype,PLAYGROUND.Events.prototype);PLAYGROUND.GameLoop=function(app){app.lifetime=0;app.ops=0;app.opcost=0;var lastTick=Date.now();var frame=0;function render(dt){app.emitGlobalEvent("prerender",dt)
app.emitGlobalEvent("render",dt)
app.emitGlobalEvent("postrender",dt)};function step(dt){app.emitGlobalEvent("step",dt)};function gameLoop(){requestAnimationFrame(gameLoop);if(app.frameskip){frame++;if(frame===app.frameskip){frame=0;}else return;}
var delta=Date.now()-lastTick;lastTick=Date.now();if(delta>1000)return;var dt=delta/1000;app.lifetime+=dt;app.elapsed=dt;step(dt);render(dt);app.opcost=delta/1000;app.ops=1000/app.opcost;};requestAnimationFrame(gameLoop);};PLAYGROUND.Gamepads=function(app){this.app=app;PLAYGROUND.Events.call(this);this.getGamepads=navigator.getGamepads||navigator.webkitGetGamepads;this.gamepadmoveEvent={};this.gamepaddownEvent={};this.gamepadupEvent={};this.gamepads={};this.app.on("step",this.step.bind(this));};PLAYGROUND.Gamepads.prototype={buttons:{0:"1",1:"2",2:"3",3:"4",4:"l1",5:"r1",6:"l2",7:"r2",8:"select",9:"start",12:"up",13:"down",14:"left",15:"right"},zeroState:function(){var buttons=[];for(var i=0;i<=15;i++){buttons.push({pressed:false,value:0});}
return{axes:[],buttons:buttons};},createGamepad:function(){var result={buttons:{},sticks:[{x:0,y:0},{x:0,y:0}]};for(var i=0;i<16;i++){var key=this.buttons[i];result.buttons[key]=false;}
return result;},step:function(){if(!navigator.getGamepads)return;var gamepads=navigator.getGamepads();for(var i=0;i<gamepads.length;i++){var current=gamepads[i];if(!current)continue;if(!this[i])this[i]=this.createGamepad();var buttons=[].concat(current.buttons);for(var h=12;h<=15;h++){buttons[h]={pressed:false,value:0};}
var previous=this[i];if(current.axes){if(Math.abs(current.axes[0])>0.01){if(current.axes[0]<0)buttons[14].pressed=true;if(current.axes[0]>0)buttons[15].pressed=true;}
if(Math.abs(current.axes[1])>0.01){if(current.axes[1]<0)buttons[12].pressed=true;if(current.axes[1]>0)buttons[13].pressed=true;}
var stickChanged=false;var stickA=false;var stickB=false;if(previous.sticks[0].x!==current.axes[0]){stickChanged=true;stickA=true;}
if(previous.sticks[0].y!==current.axes[1]){stickChanged=true;stickA=true;}
if(previous.sticks[1].x!==current.axes[2]){stickChanged=true;stickB=true;}
if(previous.sticks[1].y!==current.axes[3]){stickChanged=true;stickB=true;}
if(stickChanged){this.gamepadmoveEvent.old=[Utils.extend({},previous.sticks[0]),Utils.extend({},previous.sticks[1])];previous.sticks[0].x=current.axes[0];previous.sticks[0].y=current.axes[1];previous.sticks[1].x=current.axes[2];previous.sticks[1].y=current.axes[3];this.gamepadmoveEvent.sticks=previous.sticks;if(stickA)this.gamepadmoveEvent.a=previous.sticks[0];else this.gamepadmoveEvent.a=false;if(stickB)this.gamepadmoveEvent.b=previous.sticks[1];else this.gamepadmoveEvent.b=false;this.gamepadmoveEvent.gamepad=i;this.trigger("gamepadmove",this.gamepadmoveEvent);}}
for(var j=0;j<buttons.length;j++){var key=this.buttons[j];if(buttons[j].pressed&&!previous.buttons[key]){previous.buttons[key]=true;this.gamepaddownEvent.button=this.buttons[j];this.gamepaddownEvent.gamepad=i;this.trigger("gamepaddown",this.gamepaddownEvent);}
else if(!buttons[j].pressed&&previous.buttons[key]){previous.buttons[key]=false;this.gamepadupEvent.button=this.buttons[j];this.gamepadupEvent.gamepad=i;this.trigger("gamepadup",this.gamepadupEvent);}}}}};PLAYGROUND.Utils.extend(PLAYGROUND.Gamepads.prototype,PLAYGROUND.Events.prototype);PLAYGROUND.Keyboard=function(){PLAYGROUND.Events.call(this);this.keys={};document.addEventListener("keydown",this.keydown.bind(this));document.addEventListener("keyup",this.keyup.bind(this));document.addEventListener("keypress",this.keypress.bind(this));this.keydownEvent={};this.keyupEvent={};this.preventDefault=true;};PLAYGROUND.Keyboard.prototype={keycodes:{37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete",8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"escape",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock",186:"semicolon",187:"equal",188:"comma",189:"dash",190:"period",191:"slash",192:"graveaccent",219:"openbracket",220:"backslash",221:"closebraket",222:"singlequote"},keypress:function(e){},bypassKeys:["f12","f5","ctrl","alt","shift"],keydown:function(e){if(e.which>=48&&e.which<=90)var keyName=String.fromCharCode(e.which).toLowerCase();else var keyName=this.keycodes[e.which];if(this.keys[keyName])return;this.keydownEvent.key=keyName;this.keydownEvent.original=e;this.keys[keyName]=true;this.trigger("keydown",this.keydownEvent);if(this.preventDefault&&document.activeElement===document.body){var bypass=e.metaKey;if(!bypass){for(var i=0;i<this.bypassKeys.length;i++){if(this.keys[this.bypassKeys[i]]){bypass=true;break}}}
if(!bypass){e.returnValue=false;e.keyCode=0;e.preventDefault();e.stopPropagation();}}},keyup:function(e){if(e.which>=48&&e.which<=90)var keyName=String.fromCharCode(e.which).toLowerCase();else var keyName=this.keycodes[e.which];this.keyupEvent.key=keyName;this.keyupEvent.original=e;this.keys[keyName]=false;this.trigger("keyup",this.keyupEvent);}};PLAYGROUND.Utils.extend(PLAYGROUND.Keyboard.prototype,PLAYGROUND.Events.prototype);PLAYGROUND.Pointer=function(app){this.app=app;app.on("touchstart",this.touchstart,this);app.on("touchend",this.touchend,this);app.on("touchmove",this.touchmove,this);app.on("mousemove",this.mousemove,this);app.on("mousedown",this.mousedown,this);app.on("mouseup",this.mouseup,this);app.on("mousewheel",this.mousewheel,this);this.pointers=app.pointers={};};PLAYGROUND.Pointer.plugin=true;PLAYGROUND.Pointer.prototype={updatePointer:function(pointer){this.pointers[pointer.id]=pointer;},removePointer:function(pointer){delete this.pointers[pointer.id];},touchstart:function(e){e.touch=true;this.updatePointer(e);this.app.emitGlobalEvent("pointerdown",e);},touchend:function(e){e.touch=true;this.removePointer(e);this.app.emitGlobalEvent("pointerup",e);},touchmove:function(e){e.touch=true;this.updatePointer(e);this.app.emitGlobalEvent("pointermove",e);},mousemove:function(e){e.mouse=true;this.updatePointer(e);this.app.emitGlobalEvent("pointermove",e);},mousedown:function(e){e.mouse=true;this.app.emitGlobalEvent("pointerdown",e);},mouseup:function(e){e.mouse=true;this.app.emitGlobalEvent("pointerup",e);},mousewheel:function(e){e.mouse=true;this.app.emitGlobalEvent("pointerwheel",e);}};PLAYGROUND.Loader=function(app){this.app=app;PLAYGROUND.Events.call(this);this.reset();};PLAYGROUND.Loader.prototype={add:function(id){this.queue++;this.count++;this.ready=false;this.trigger("add",id);return id;},error:function(id){this.trigger("error",id);},success:function(id){this.queue--;this.progress=1-this.queue/this.count;this.trigger("load",id);if(this.queue<=0){this.reset();this.trigger("ready");}},reset:function(){this.progress=0;this.queue=0;this.count=0;this.ready=true;}};PLAYGROUND.Utils.extend(PLAYGROUND.Loader.prototype,PLAYGROUND.Events.prototype);PLAYGROUND.Mouse=function(app,element){var self=this;this.app=app;PLAYGROUND.Events.call(this);this.element=element;this.preventContextMenu=true;this.mousemoveEvent={};this.mousedownEvent={};this.mouseupEvent={};this.mousewheelEvent={};this.x=0;this.y=0;element.addEventListener("mousemove",this.mousemove.bind(this));element.addEventListener("mousedown",this.mousedown.bind(this));element.addEventListener("mouseup",this.mouseup.bind(this));this.enableMousewheel();this.element.addEventListener("contextmenu",function(e){if(self.preventContextMenu&&!e.metaKey)e.preventDefault();});element.requestPointerLock=element.requestPointerLock||element.mozRequestPointerLock||element.webkitRequestPointerLock;document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||document.webkitExitPointerLock;this.handleResize();};PLAYGROUND.Mouse.prototype={lock:function(){this.locked=true;this.element.requestPointerLock();},unlock:function(){this.locked=false;document.exitPointerLock();},getElementOffset:function(element){var offsetX=0;var offsetY=0;do{offsetX+=element.offsetLeft;offsetY+=element.offsetTop;}
while((element=element.offsetParent));return{x:offsetX,y:offsetY};},handleResize:function(){this.elementOffset=this.getElementOffset(this.element);},mousemove:PLAYGROUND.Utils.throttle(function(e){this.x=this.mousemoveEvent.x=(e.pageX-this.elementOffset.x-this.app.offsetX)/this.app.scale|0;this.y=this.mousemoveEvent.y=(e.pageY-this.elementOffset.y-this.app.offsetY)/this.app.scale|0;this.mousemoveEvent.original=e;if(this.locked){this.mousemoveEvent.movementX=e.movementX||e.mozMovementX||e.webkitMovementX||0;this.mousemoveEvent.movementY=e.movementY||e.mozMovementY||e.webkitMovementY||0;}
if(this.app.mouseToTouch){this.mousemoveEvent.id=this.mousemoveEvent.identifier=255;this.trigger("touchmove",this.mousemoveEvent);}else{this.mousemoveEvent.id=this.mousemoveEvent.identifier=255;this.trigger("mousemove",this.mousemoveEvent);}},16),mousedown:function(e){var buttonName=["left","middle","right"][e.button];this.mousedownEvent.x=this.mousemoveEvent.x;this.mousedownEvent.y=this.mousemoveEvent.y;this.mousedownEvent.button=buttonName;this.mousedownEvent.original=e;this[buttonName]=true;this.mousedownEvent.id=this.mousedownEvent.identifier=255;if(this.app.mouseToTouch){this.trigger("touchmove",this.mousedownEvent);this.trigger("touchstart",this.mousedownEvent);}else{this.trigger("mousedown",this.mousedownEvent);}},mouseup:function(e){var buttonName=["left","middle","right"][e.button];this.mouseupEvent.x=this.mousemoveEvent.x;this.mouseupEvent.y=this.mousemoveEvent.y;this.mouseupEvent.button=buttonName;this.mouseupEvent.original=e;this.mouseupEvent.id=this.mouseupEvent.identifier=255;if(this.app.mouseToTouch){this.trigger("touchend",this.mouseupEvent);}else{this.trigger("mouseup",this.mouseupEvent);}
this[buttonName]=false;},mousewheel:function(e){this.mousewheelEvent.x=this.mousemoveEvent.x;this.mousewheelEvent.y=this.mousemoveEvent.y;this.mousewheelEvent.button=["none","left","middle","right"][e.button];this.mousewheelEvent.original=e;this.mousewheelEvent.id=this.mousewheelEvent.identifier=255;this[e.button]=false;this.trigger("mousewheel",this.mousewheelEvent);},enableMousewheel:function(){var eventNames='onwheel'in document||document.documentMode>=9?['wheel']:['mousewheel','DomMouseScroll','MozMousePixelScroll'];var callback=this.mousewheel.bind(this);var self=this;for(var i=eventNames.length;i;){self.element.addEventListener(eventNames[--i],PLAYGROUND.Utils.throttle(function(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,deltaX=0,deltaY=0,absDelta=0,absDeltaXY=0,fn;orgEvent.type="mousewheel"; if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta;}
if(orgEvent.detail){delta=orgEvent.detail*-1;}
if(orgEvent.deltaY){deltaY=orgEvent.deltaY*-1;delta=deltaY;} 
if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY;}
var result=delta?delta:deltaY;self.mousewheelEvent.x=self.mousemoveEvent.x;self.mousewheelEvent.y=self.mousemoveEvent.y;self.mousewheelEvent.delta=result/Math.abs(result);self.mousewheelEvent.original=orgEvent;callback(self.mousewheelEvent);orgEvent.preventDefault();},40),false);}}};PLAYGROUND.Utils.extend(PLAYGROUND.Mouse.prototype,PLAYGROUND.Events.prototype);PLAYGROUND.Sound=function(app){var audioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;if(audioContext){if(!PLAYGROUND.audioContext)PLAYGROUND.audioContext=new audioContext;app.audioContext=PLAYGROUND.audioContext;app.sound=new PLAYGROUND.SoundWebAudioAPI(app,app.audioContext);app.music=new PLAYGROUND.SoundWebAudioAPI(app,app.audioContext);}else{app.sound=new PLAYGROUND.SoundAudio(app);app.music=new PLAYGROUND.SoundAudio(app);}};PLAYGROUND.Application.prototype.playSound=function(key,loop){return this.sound.play(key,loop);};PLAYGROUND.Application.prototype.stopSound=function(sound){this.sound.stop(sound);};PLAYGROUND.Application.prototype.loadSound=function(){return this.loadSounds.apply(this,arguments);};PLAYGROUND.Application.prototype.loadSounds=function(){for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(typeof arg==="object"){for(var key in arg)this.loadSounds(arg[key]);}else{this.sound.load(arg);}}};PLAYGROUND.SoundWebAudioAPI=function(app,audioContext){this.app=app;var canPlayMp3=(new Audio).canPlayType("audio/mp3");var canPlayOgg=(new Audio).canPlayType('audio/ogg; codecs="vorbis"');if(this.app.preferedAudioFormat==="mp3"){if(canPlayMp3)this.audioFormat="mp3";else this.audioFormat="ogg";}else{if(canPlayOgg)this.audioFormat="ogg";else this.audioFormat="mp3";}
this.context=audioContext;this.gainNode=this.context.createGain()
this.gainNode.connect(this.context.destination);this.compressor=this.context.createDynamicsCompressor();this.compressor.connect(this.gainNode);this.output=this.gainNode;this.gainNode.gain.value=1.0;this.pool=[];this.volume=1.0;this.setMasterPosition(0,0,0);this.loops=[];this.app.on("step",this.step.bind(this));};PLAYGROUND.SoundWebAudioAPI.prototype={buffers:{},aliases:{},alias:function(alias,source,volume,rate){this.aliases[alias]={source:source,volume:volume,rate:rate};},setMaster:function(volume){this.volume=volume;this.gainNode.gain.value=volume;},load:function(file){var entry=this.app.getAssetEntry(file,"sounds",this.audioFormat);var sampler=this;var request=new XMLHttpRequest();request.open("GET",entry.url,true);request.responseType="arraybuffer";var id=this.app.loader.add(entry.url);request.onload=function(){sampler.context.decodeAudioData(this.response,function(decodedBuffer){sampler.buffers[entry.key]=decodedBuffer;sampler.app.loader.success(entry.url);});}
request.send();},cleanArray:function(array,property){for(var i=0,len=array.length;i<len;i++){if(array[i]===null||(property&&array[i][property])){array.splice(i--,1);len--;}}},setMasterPosition:function(x,y,z){this.masterPosition={x:x,y:y,z:z};this.context.listener.setPosition(x,y,z)
},getSoundBuffer:function(){if(!this.pool.length){for(var i=0;i<100;i++){var buffer,gain,panner;var nodes=[buffer=this.context.createBufferSource(),gain=this.context.createGain(),panner=this.context.createPanner()];panner.distanceModel="linear";
panner.refDistance=1;panner.maxDistance=600;panner.rolloffFactor=1.0;this.pool.push(nodes);nodes[0].connect(nodes[1]);nodes[1].connect(this.output);}}
return this.pool.pop();},play:function(name,loop){var alias=this.aliases[name];var nodes=this.getSoundBuffer();if(alias)name=alias.source;bufferSource=nodes[0];bufferSource.gainNode=nodes[1];bufferSource.pannerNode=nodes[2];bufferSource.buffer=this.buffers[name];bufferSource.loop=loop||false;bufferSource.key=name;bufferSource.alias=alias;this.setVolume(bufferSource,1.0);this.setPlaybackRate(bufferSource,1.0);if(this.loop){}
bufferSource.start(0);bufferSource.volumeLimit=1;this.setPosition(bufferSource,this.masterPosition.x,this.masterPosition.y,this.masterPosition.z);return bufferSource;},stop:function(what){if(!what)return;what.stop(0);},setPlaybackRate:function(sound,rate){if(!sound)return;if(sound.alias)rate*=sound.alias.rate;return sound.playbackRate.value=rate;},setPosition:function(sound,x,y,z){if(!sound)return;sound.pannerNode.setPosition(x,y||0,z||0);},setVelocity:function(sound,x,y,z){if(!sound)return;sound.pannerNode.setPosition(x,y||0,z||0);},getVolume:function(sound){if(!sound)return;return sound.gainNode.gain.value;},setVolume:function(sound,volume){if(!sound)return;if(sound.alias)volume*=sound.alias.volume;return sound.gainNode.gain.value=Math.max(0,volume);},fadeOut:function(sound){if(!sound)return;sound.fadeOut=true;this.loops.push(sound);return sound;},fadeIn:function(sound){if(!sound)return;sound.fadeIn=true;this.loops.push(sound);this.setVolume(sound,0);return sound;},step:function(delta){for(var i=0;i<this.loops.length;i++){var loop=this.loops[i];if(loop.fadeIn){var volume=this.getVolume(loop);volume=this.setVolume(loop,Math.min(1.0,volume+delta*0.5));if(volume>=1.0){this.loops.splice(i--,1);}}
if(loop.fadeOut){var volume=this.getVolume(loop);volume=this.setVolume(loop,Math.min(1.0,volume-delta*0.5));if(volume<=0){this.loops.splice(i--,1);this.stop(loop);}}}}};PLAYGROUND.SoundAudio=function(app){this.app=app;var canPlayMp3=(new Audio).canPlayType("audio/mp3");var canPlayOgg=(new Audio).canPlayType('audio/ogg; codecs="vorbis"');if(this.app.preferedAudioFormat==="mp3"){if(canPlayMp3)this.audioFormat="mp3";else this.audioFormat="ogg";}else{if(canPlayOgg)this.audioFormat="ogg";else this.audioFormat="mp3";}};PLAYGROUND.SoundAudio.prototype={samples:{},setMaster:function(volume){this.volume=volume;},setMasterPosition:function(){},setPosition:function(x,y,z){return;},load:function(file){var url="sounds/"+file+"."+this.audioFormat;var loader=this.app.loader;this.app.loader.add(url);var audio=this.samples[file]=new Audio;audio.addEventListener("canplay",function(){loader.success(url);});audio.addEventListener("error",function(){loader.error(url);});audio.src=url;},play:function(key,loop){var sound=this.samples[key];sound.currentTime=0;sound.loop=loop;sound.play();return sound;},stop:function(what){if(!what)return;what.pause();},step:function(delta){},setPlaybackRate:function(sound,rate){return;},setVolume:function(sound,volume){sound.volume=volume*this.volume;},setPosition:function(){}};PLAYGROUND.Touch=function(app,element){PLAYGROUND.Events.call(this);this.app=app;this.element=element;this.touches={};this.x=0;this.y=0;element.addEventListener("touchmove",this.touchmove.bind(this));element.addEventListener("touchstart",this.touchstart.bind(this));element.addEventListener("touchend",this.touchend.bind(this));};PLAYGROUND.Touch.prototype={getElementOffset:function(element){var offsetX=0;var offsetY=0;do{offsetX+=element.offsetLeft;offsetY+=element.offsetTop;}
while((element=element.offsetParent));return{x:offsetX,y:offsetY};},handleResize:function(){this.elementOffset=this.getElementOffset(this.element);},touchmove:function(e){for(var i=0;i<e.changedTouches.length;i++){var touch=e.changedTouches[i];touchmoveEvent={}
this.x=touchmoveEvent.x=(touch.pageX-this.elementOffset.x-this.app.offsetX)/this.app.scale|0;this.y=touchmoveEvent.y=(touch.pageY-this.elementOffset.y-this.app.offsetY)/this.app.scale|0;touchmoveEvent.original=touch;touchmoveEvent.id=touchmoveEvent.identifier=touch.identifier;this.touches[touch.identifier].x=touchmoveEvent.x;this.touches[touch.identifier].y=touchmoveEvent.y;this.trigger("touchmove",touchmoveEvent);}
e.preventDefault();},touchstart:function(e){for(var i=0;i<e.changedTouches.length;i++){var touch=e.changedTouches[i];var touchstartEvent={}
this.x=touchstartEvent.x=(touch.pageX-this.elementOffset.x-this.app.offsetX)/this.app.scale|0;this.y=touchstartEvent.y=(touch.pageY-this.elementOffset.y-this.app.offsetY)/this.app.scale|0;touchstartEvent.original=e.touch;touchstartEvent.id=touchstartEvent.identifier=touch.identifier;this.touches[touch.identifier]={x:touchstartEvent.x,y:touchstartEvent.y};this.trigger("touchstart",touchstartEvent);}
e.preventDefault();},touchend:function(e){for(var i=0;i<e.changedTouches.length;i++){var touch=e.changedTouches[i];var touchendEvent={};touchendEvent.x=(touch.pageX-this.elementOffset.x-this.app.offsetX)/this.app.scale|0;touchendEvent.y=(touch.pageY-this.elementOffset.y-this.app.offsetY)/this.app.scale|0;touchendEvent.original=touch;touchendEvent.id=touchendEvent.identifier=touch.identifier;delete this.touches[touch.identifier];this.trigger("touchend",touchendEvent);}
e.preventDefault();}};PLAYGROUND.Utils.extend(PLAYGROUND.Touch.prototype,PLAYGROUND.Events.prototype);PLAYGROUND.Tween=function(manager,context){PLAYGROUND.Events.call(this);this.manager=manager;this.context=context;PLAYGROUND.Utils.extend(this,{actions:[],index:-1,prevEasing:"045",prevDuration:0.5});this.current=false;};PLAYGROUND.Tween.prototype={add:function(properties,duration,easing){if(duration)this.prevDuration=duration;else duration=0.5;if(easing)this.prevEasing=easing;else easing="045";this.actions.push([properties,duration,easing]);return this;},discard:function(){this.manager.discard(this.context,this);return this;},to:function(properties,duration,easing){return this.add(properties,duration,easing);},loop:function(){this.looped=true;return this;},repeat:function(times){this.actions.push(["repeat",times]);},wait:function(time){this.actions.push(["wait",time]);return this;},delay:function(time){this.actions.push(["wait",time]);},stop:function(){this.manager.remove(this);return this;},play:function(){this.manager.add(this);this.finished=false;return this;},end:function(){var lastAnimationIndex=0;for(var i=this.index+1;i<this.actions.length;i++){if(typeof this.actions[i][0]==="object")lastAnimationIndex=i;}
this.index=lastAnimationIndex-1;this.next();this.delta=this.duration;this.step(0);return this;},forward:function(){this.delta=this.duration;this.step(0);},rewind:function(){this.delta=0;this.step(0);},next:function(){this.delta=0;this.index++;if(this.index>=this.actions.length){if(this.looped){this.trigger("loop",{tween:this});this.index=0;}else{this.trigger("finished",{tween:this});this.trigger("finish",{tween:this});this.finished=true;this.manager.remove(this);return;}}
this.current=this.actions[this.index];if(this.current[0]==="wait"){this.duration=this.current[1];this.currentAction="wait";}else{var properties=this.current[0];this.keys=Object.keys(properties);this.change=[];this.before=[];this.types=[];for(i=0;i<this.keys.length;i++){var key=this.keys[i];var value=this.context[key];if(typeof properties[key]==="number"){this.before.push(value);this.change.push(properties[key]-value);this.types.push(0);}else if(typeof properties[key]==="string"&&properties[key].indexOf("rad">-1)){this.before.push(value);this.change.push(PLAYGROUND.Utils.circWrappedDistance(value,parseFloat(properties[key])));this.types.push(2);}else{var before=cq.color(value);this.before.push(before);var after=cq.color(properties[key]);var temp=[];for(var j=0;j<3;j++){temp.push(after[j]-before[j]);}
this.change.push(temp);this.types.push(1);}}
this.currentAction="animate";this.duration=this.current[1];this.easing=this.current[2];}},prev:function(){},step:function(delta){this.delta+=delta;if(!this.current)this.next();switch(this.currentAction){case"animate":this.doAnimate(delta);break;case"wait":this.doWait(delta);break;}},doAnimate:function(delta){this.progress=Math.min(1,this.delta/this.duration);var mod=PLAYGROUND.Utils.ease(this.progress,this.easing);for(var i=0;i<this.keys.length;i++){var key=this.keys[i];switch(this.types[i]){case 0:this.context[key]=this.before[i]+this.change[i]*mod;break;case 1:var change=this.change[i];var before=this.before[i];var color=[];for(var j=0;j<3;j++){color.push(before[j]+change[j]*mod|0);}
this.context[key]="rgb("+color.join(",")+")";break;case 2:this.context[key]=PLAYGROUND.Utils.circWrap(this.before[i]+this.change[i]*mod);break;}}
if(this.progress>=1){this.next();}},doWait:function(delta){if(this.delta>=this.duration)this.next();}};PLAYGROUND.Utils.extend(PLAYGROUND.Tween.prototype,PLAYGROUND.Events.prototype);PLAYGROUND.TweenManager=function(app){this.tweens=[];if(app){this.app=app;this.app.tween=this.tween.bind(this);}
this.delta=0;this.app.on("step",this.step.bind(this));};PLAYGROUND.TweenManager.prototype={defaultEasing:"128",circ:function(value){return{type:"circ",value:value};},discard:function(object,safe){for(var i=0;i<this.tweens.length;i++){var tween=this.tweens[i];if(tween.context===object&&tween!==safe)this.remove(tween);}},tween:function(context){var tween=new PLAYGROUND.Tween(this,context);this.add(tween);return tween;},step:function(delta){this.delta+=delta;for(var i=0;i<this.tweens.length;i++){var tween=this.tweens[i];if(!tween._remove)tween.step(delta);if(tween._remove)this.tweens.splice(i--,1);}},add:function(tween){tween._remove=false;var index=this.tweens.indexOf(tween);if(index===-1)this.tweens.push(tween);},remove:function(tween){tween._remove=true;}};PLAYGROUND.Application.prototype.loadAtlases=function(){for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(typeof arg==="object"){for(var key in arg)this.loadAtlases(arg[key]);}else{this._loadAtlas(arg)}}};PLAYGROUND.Application.prototype.loadAtlas=function(){return this.loadAtlases.apply(this,arguments);};PLAYGROUND.Application.prototype._loadAtlas=function(filename){var entry=this.getAssetEntry(filename,"atlases","png");this.loader.add(entry.url);var atlas=this.atlases[entry.key]={};var image=atlas.image=new Image;image.addEventListener("load",function(){loader.success(entry.url);});image.addEventListener("error",function(){loader.error(entry.url);});image.src=entry.url;var request=new XMLHttpRequest();request.open("GET",entry.path+".json",true);this.loader.add(entry.path+".json");var loader=this.loader;request.onload=function(){var data=JSON.parse(this.response);atlas.frames=[];for(var i=0;i<data.frames.length;i++){var frame=data.frames[i];atlas.frames.push({region:[frame.frame.x,frame.frame.y,frame.frame.w,frame.frame.h],offset:[frame.spriteSourceSize.x||0,frame.spriteSourceSize.y||0],width:frame.sourceSize.w,height:frame.sourceSize.h});}
loader.success(entry.path+".json");}
request.send();};PLAYGROUND.Application.prototype.loadFontOld=function(name){var styleNode=document.createElement("style");styleNode.type="text/css";var formats={"woff":"woff","ttf":"truetype"};var sources="";for(var ext in formats){var type=formats[ext];sources+=" url(\"fonts/"+name+"."+ext+"\") format('"+type+"');"}
styleNode.textContent="@font-face { font-family: '"+name+"'; src: "+sources+" }";document.head.appendChild(styleNode);var layer=cq(32,32);layer.font("10px Testing");layer.fillText(16,16,16).trim();var width=layer.width;var height=layer.height;this.loader.add("font "+name);var self=this;function check(){var layer=cq(32,32);layer.font("10px "+name).fillText(16,16,16);layer.trim();if(layer.width!==width||layer.height!==height){self.loader.ready("font "+name);}else{setTimeout(check,250);}};check();};PLAYGROUND.DefaultState={};PLAYGROUND.LoadingScreen={logoRaw:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAASBAMAAADPiN0xAAAAGFBMVEUAAQAtLixHSUdnaGaJioimqKXMzsv7/fr5shgVAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98EAwkeA4oQWJ4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQ4y72UvW+rMBDAz+FrpVKrrFmesmapWNOlrKjSe1kZ+uoVAvj+/frujG1SaJcqJwU7voOf7xMQzQmsIDi5NPTMsLRntH3U+F6SAZo3NlCvcgBFJz8o+vkDiE63lI95Y/UmpinsZWkgJWJiDbAVQ16htptxSTNloIlugwaw001Ey3ASF3so6L1qLNXzQS5S0UGKL/CI5wWNriE0UH9Yty37LqIVg+wsqu7Ix0MwVBSF/dU+jv2SNnma021LEdPqVnMeU3xAu0kXcSGjmq7Ox4E2Wn88LZ2+EFj3avjixzai6VPVyuYveZLHF2XfdDnvAq27DIHGuq+0DJFsE30OtB1KqOwd8Dr7PcM4b+jfj2g5lp4WyntBK66qua3JzEA+uXJpwH/NlVuzRVPY/kTLB2mjuN+KwdZ8FOy8j2gDbEUSqumnSCY4lf4ibq3IhVM4ycZQRnv+zFqVdJQVn6BxvUqebGpuaNo3sZxwBzjajiMZOoBiwyVF+kCr+nUaJOaGpnAeRPPJZTr4FqmHRXcneEo4DqQ/ftfdnLeDrUAME8xWKPeKCwW6YkEpXfs3p1EWJhdcUAYP0TI/uYaV8cgjwBovaeyWwji2T9rTFIdS/cP/MnkTLRUWxgNNZVin7bT5fqT9miDcUVJzR1gRpfIONMmulU+5Qqr6zXAUqAAAAABJRU5ErkJggg==",create:function(){var self=this;this.logo=new Image;this.logo.addEventListener("load",function(){self.ready=true;self.createElements();});this.logo.src=this.logoRaw;this.background="#000";if(window.getComputedStyle){this.background=window.getComputedStyle(document.body).backgroundColor||"#000";}},enter:function(){this.current=0;},leave:function(){this.locked=true;this.animation=this.app.tween(this).to({current:1},0.5);},step:function(delta){if(this.locked){if(this.animation.finished){this.locked=false;this.wrapper.parentNode.removeChild(this.wrapper);}}else{this.current=this.current+Math.abs(this.app.loader.progress-this.current)*delta;}},createElements:function(){this.width=window.innerWidth*0.6|0;this.height=window.innerHeight*0.1|0;this.wrapper=document.createElement("div");this.wrapper.style.width=this.width+"px";this.wrapper.style.height=this.height+"px";this.wrapper.style.background="#000";this.wrapper.style.border="4px solid #fff";this.wrapper.style.position="absolute";this.wrapper.style.left=(window.innerWidth/2-this.width/2|0)+"px";this.wrapper.style.top=(window.innerHeight/2-this.height/2|0)+"px";this.wrapper.style.zIndex=100;this.app.container.appendChild(this.wrapper);this.progressBar=document.createElement("div");this.progressBar.style.width="0%";this.progressBar.style.height=this.height+"px";this.progressBar.style.background="#fff";this.wrapper.appendChild(this.progressBar);},render:function(){if(!this.ready)return;this.progressBar.style.width=(this.current*100|0)+"%";}};
/**
 * @license twgl.js 0.0.28 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/greggman/twgl.js for details
 */
/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
!function(a,b){"function"==typeof define&&define.amd?define([],b):a.twgl=b()}(this,function(){var a,b,c;return function(d){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,b){return function(){var c=v.call(arguments,0);return"string"!=typeof c[0]&&1===c.length&&c.push(null),n.apply(d,c.concat([a,b]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var b=r[a];delete r[a],t[a]=!0,m.apply(d,b)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,b,c,f){var h,k,l,m,n,s,u=[],v=typeof c;if(f=f||a,"undefined"===v||"function"===v){for(b=!b.length&&c.length?["require","exports","module"]:b,n=0;n<b.length;n+=1)if(m=o(b[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=c?c.apply(q[a],u):void 0,a&&(h&&h.exports!==d&&h.exports!==q[a]?q[a]=h.exports:l===d&&s||(q[a]=l))}else a&&(q[a]=c)},a=b=n=function(a,b,c,e,f){if("string"==typeof a)return p[a]?p[a](b):j(o(a,b).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!b)return;b.splice?(a=b,b=c,c=null):a=d}return b=b||function(){},"function"==typeof c&&(c=e,e=f),e?m(d,a,b,c):setTimeout(function(){m(d,a,b,c)},4),n},n.config=function(a){return n(a)},a._defined=q,c=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},c.amd={jQuery:!0}}(),c("node_modules/almond/almond.js",function(){}),c("twgl/twgl",[],function(){function a(a){fa=new Uint8Array([255*a[0],255*a[1],255*a[2],255*a[3]])}function b(a){ea=a}function c(a,b){for(var c=["webgl","experimental-webgl"],d=null,e=0;e<c.length;++e){try{d=a.getContext(c[e],b)}catch(f){}if(d)break}return d}function d(a,b){var d=c(a,b);return d}function e(a){return a.split("\n").map(function(a,b){return b+1+": "+a}).join("\n")}function f(a,b,c,d){var f=d||da,g=a.createShader(c);a.shaderSource(g,b),a.compileShader(g);var h=a.getShaderParameter(g,a.COMPILE_STATUS);if(!h){var i=a.getShaderInfoLog(g);return f(e(b)+"\n*** Error compiling shader: "+i),a.deleteShader(g),null}return g}function g(a,b,c,d,e){var f=e||da,g=a.createProgram();b.forEach(function(b){a.attachShader(g,b)}),c&&c.forEach(function(b,c){a.bindAttribLocation(g,d?d[c]:c,b)}),a.linkProgram(g);var h=a.getProgramParameter(g,a.LINK_STATUS);if(!h){var i=a.getProgramInfoLog(g);return f("Error in program linking:"+i),a.deleteProgram(g),null}return g}function h(a,b,c,d){var e,g="",h=document.getElementById(b);if(!h)throw"*** Error: unknown script element"+b;if(g=h.text,!c)if("x-shader/x-vertex"===h.type)e=a.VERTEX_SHADER;else if("x-shader/x-fragment"===h.type)e=a.FRAGMENT_SHADER;else if(e!==a.VERTEX_SHADER&&e!==a.FRAGMENT_SHADER)throw"*** Error: unknown shader type";return f(a,g,c?c:e,d)}function i(a,b,c,d,e){for(var f=[],i=0;i<b.length;++i){var j=h(a,b[i],a[Ia[i]],e);if(!j)return null;f.push(j)}return g(a,f,c,d,e)}function j(a,b,c,d,e){for(var h=[],i=0;i<b.length;++i){var j=f(a,b[i],a[Ia[i]],e);if(!j)return null;h.push(j)}return g(a,h,c,d,e)}function k(a,b){return b===a.SAMPLER_2D?a.TEXTURE_2D:b===a.SAMPLER_CUBE?a.TEXTURE_CUBE_MAP:void 0}function l(a,b){function c(b,c){var e=a.getUniformLocation(b,c.name),f=c.type,g=c.size>1&&"[0]"===c.name.substr(-3);if(f===a.FLOAT&&g)return function(b){a.uniform1fv(e,b)};if(f===a.FLOAT)return function(b){a.uniform1f(e,b)};if(f===a.FLOAT_VEC2)return function(b){a.uniform2fv(e,b)};if(f===a.FLOAT_VEC3)return function(b){a.uniform3fv(e,b)};if(f===a.FLOAT_VEC4)return function(b){a.uniform4fv(e,b)};if(f===a.INT&&g)return function(b){a.uniform1iv(e,b)};if(f===a.INT)return function(b){a.uniform1i(e,b)};if(f===a.INT_VEC2)return function(b){a.uniform2iv(e,b)};if(f===a.INT_VEC3)return function(b){a.uniform3iv(e,b)};if(f===a.INT_VEC4)return function(b){a.uniform4iv(e,b)};if(f===a.BOOL&&g)return function(b){a.uniform1iv(e,b)};if(f===a.BOOL)return function(b){a.uniform1i(e,b)};if(f===a.BOOL_VEC2)return function(b){a.uniform2iv(e,b)};if(f===a.BOOL_VEC3)return function(b){a.uniform3iv(e,b)};if(f===a.BOOL_VEC4)return function(b){a.uniform4iv(e,b)};if(f===a.FLOAT_MAT2)return function(b){a.uniformMatrix2fv(e,!1,b)};if(f===a.FLOAT_MAT3)return function(b){a.uniformMatrix3fv(e,!1,b)};if(f===a.FLOAT_MAT4)return function(b){a.uniformMatrix4fv(e,!1,b)};if((f===a.SAMPLER_2D||f===a.SAMPLER_CUBE)&&g){for(var h=[],i=0;i<c.size;++i)h.push(d++);return function(b,c){return function(d){a.uniform1iv(e,c),d.forEach(function(d,e){a.activeTexture(a.TEXTURE0+c[e]),a.bindTexture(b,d)})}}(k(a,f),h)}if(f===a.SAMPLER_2D||f===a.SAMPLER_CUBE)return function(b,c){return function(d){a.uniform1i(e,c),a.activeTexture(a.TEXTURE0+c),a.bindTexture(b,d)}}(k(a,f),d++);throw"unknown type: 0x"+f.toString(16)}for(var d=0,e={},f=a.getProgramParameter(b,a.ACTIVE_UNIFORMS),g=0;f>g;++g){var h=a.getActiveUniform(b,g);if(!h)break;var i=h.name;"[0]"===i.substr(-3)&&(i=i.substr(0,i.length-3));var j=c(b,h);e[i]=j}return e}function m(a,b){a=a.uniformSetters||a;for(var c=arguments.length,d=1;c>d;++d){var e=arguments[d];if(Array.isArray(e))for(var f=e.length,g=0;f>g;++g)m(a,e[g]);else for(var h in e){var i=a[h];i&&i(e[h])}}}function n(a,b){function c(b){return function(c){a.bindBuffer(a.ARRAY_BUFFER,c.buffer),a.enableVertexAttribArray(b),a.vertexAttribPointer(b,c.numComponents||c.size,c.type||a.FLOAT,c.normalize||!1,c.stride||0,c.offset||0)}}for(var d={},e=a.getProgramParameter(b,a.ACTIVE_ATTRIBUTES),f=0;e>f;++f){var g=a.getActiveAttrib(b,f);if(!g)break;var h=a.getAttribLocation(b,g.name);d[g.name]=c(h)}return d}function o(a,b){for(var c in b){var d=a[c];d&&d(b[c])}}function p(a,b,c){o(b.attribSetters||b,c.attribs),c.indices&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,c.indices)}function q(a,b,c,d,e){b=b.map(function(a){var b=document.getElementById(a);return b?b.text:a});var f=j(a,b,c,d,e);if(!f)return null;var g=l(a,f),h=n(a,f);return{program:f,uniformSetters:g,attribSetters:h}}function r(a,b){b=b||1,b=Math.max(1,b);var c=a.clientWidth*b|0,d=a.clientHeight*b|0;return a.width!==c||a.height!==d?(a.width=c,a.height=d,!0):!1}function s(a,b,c,d){if(b instanceof WebGLBuffer)return b;c=c||a.ARRAY_BUFFER;var e=a.createBuffer();return a.bindBuffer(c,e),a.bufferData(c,b,d||a.STATIC_DRAW),e}function t(a){return"indices"===a}function u(a){if(a instanceof Int8Array)return ha;if(a instanceof Uint8Array)return ia;if(a instanceof Int16Array)return ja;if(a instanceof Uint16Array)return ka;if(a instanceof Int32Array)return la;if(a instanceof Uint32Array)return ma;if(a instanceof Float32Array)return na;throw"unsupported typed array type"}function v(a,b){switch(b){case a.BYTE:return Int8Array;case a.UNSIGNED_BYTE:return Uint8Array;case a.SHORT:return Int16Array;case a.UNSIGNED_SHORT:return Uint16Array;case a.INT:return Int32Array;case a.UNSIGNED_INT:return Uint32Array;case a.FLOAT:return Float32Array;default:throw"unknown gl type"}}function w(a){return a instanceof Int8Array?!0:a instanceof Uint8Array?!0:!1}function x(a){return a&&a.buffer&&a.buffer instanceof ArrayBuffer}function y(a,b){var c;if(c=a.indexOf("coord")>=0?2:a.indexOf("color")>=0?4:3,b%c>0)throw"can not guess numComponents. You should specify it.";return c}function z(a,b){if(x(a))return a;if(x(a.data))return a.data;Array.isArray(a)&&(a={data:a});var c=a.type;return c||(c="indices"===b?Uint16Array:Float32Array),new c(a.data)}function A(a,b){var c={};return Object.keys(b).forEach(function(d){if(!t(d)){var e=b[d],f=e.attrib||e.name||e.attribName||ea+d,g=z(e,d);c[f]={buffer:s(a,g,void 0,e.drawType),numComponents:e.numComponents||e.size||y(d),type:u(g),normalize:void 0!==e.normalize?e.normalize:w(g),stride:e.stride||0,offset:e.offset||0}}}),c}function B(a,b){var c={attribs:A(a,b)},d=b.indices;return d?(d=z(d,"indices"),c.indices=s(a,d,a.ELEMENT_ARRAY_BUFFER),c.numElements=d.length,c.elementType=d instanceof Uint32Array?a.UNSIGNED_INT:a.UNSIGNED_SHORT):c.numElements=Ja(b),c}function C(a,b){var c={};return Object.keys(b).forEach(function(d){var e="indices"===d?a.ELEMENT_ARRAY_BUFFER:a.ARRAY_BUFFER,f=z(b[d],d);c[d]=s(a,f,e)}),c}function D(a,b,c,d,e){var f=c.indices,g=void 0===d?c.numElements:d;e=void 0===e?0:e,f?a.drawElements(b,g,void 0===c.elementType?a.UNSIGNED_SHORT:c.elementType,e):a.drawArrays(b,e,g)}function E(a,b){var c=null,d=null;b.forEach(function(b){if(b.active!==!1){var e=b.programInfo,f=b.bufferInfo,g=!1;e!==c&&(c=e,a.useProgram(e.program),g=!0),(g||f!==d)&&(d=f,p(a,e,f)),m(e,b.uniforms),D(a,b.type||a.TRIANGLES,f,b.count,b.offset)}})}function F(a,b){void 0!==b.colorspaceConversion&&(Ka.colorSpaceConversion=a.getParameter(a.UNPACK_COLORSPACE_CONVERSION_WEBGL)),void 0!==b.premultiplyAlpha&&(Ka.premultiplyAlpha=a.getParameter(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL)),void 0!==b.flipY&&(Ka.flipY=a.getParameter(a.UNPACK_FLIP_Y_WEBGL))}function G(a,b){void 0!==b.colorspaceConversion&&a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ka.colorSpaceConversion),void 0!==b.premultiplyAlpha&&a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Ka.premultiplyAlpha),void 0!==b.flipY&&a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,Ka.flipY)}function H(a,b,c){var d=c.target||a.TEXTURE_2D;a.bindTexture(d,b),c.min&&a.texParameteri(d,a.TEXTURE_MIN_FILTER,c.min),c.mag&&a.texParameteri(d,a.TEXTURE_MAG_FILTER,c.mag),c.wrap&&(a.texParameteri(d,a.TEXTURE_WRAP_S,c.wrap),a.texParameteri(d,a.TEXTURE_WRAP_T,c.wrap)),c.wrapS&&a.texParameteri(d,a.TEXTURE_WRAP_S,c.wrapS),c.wrapT&&a.texParameteri(d,a.TEXTURE_WRAP_T,c.wrapT)}function I(a){return a=a||fa,x(a)?a:new Uint8Array([255*a[0],255*a[1],255*a[2],255*a[3]])}function J(a){return 0===(a&a-1)}function K(a,b,c,d,e){c=c||ga;var f=c.target||a.TEXTURE_2D;d=d||c.width,e=e||c.height,a.bindTexture(f,b),J(d)&&J(e)?a.generateMipmap(f):(a.texParameteri(f,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(f,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(f,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE))}function L(a,b){return b=b||{},b.cubeFaceOrder||[a.TEXTURE_CUBE_MAP_POSITIVE_X,a.TEXTURE_CUBE_MAP_NEGATIVE_X,a.TEXTURE_CUBE_MAP_POSITIVE_Y,a.TEXTURE_CUBE_MAP_NEGATIVE_Y,a.TEXTURE_CUBE_MAP_POSITIVE_Z,a.TEXTURE_CUBE_MAP_NEGATIVE_Z]}function M(a,b){var c=L(a,b),d=c.map(function(a,b){return{face:a,ndx:b}});return d.sort(function(a,b){return a.face-b.face}),d}function N(a){var b={};return Object.keys(a).forEach(function(c){b[c]=a[c]}),b}function O(){}function P(a,b){b=b||O;var c=new Image;return c.onerror=function(){var d="couldn't load image: "+a;da(d),b(d,c)},c.onload=function(){b(null,c)},c.src=a,c}function Q(a,b,c){c=c||ga;var d=c.target||a.TEXTURE_2D;if(a.bindTexture(d,b),c.color!==!1){var e=I(c.color);if(d===a.TEXTURE_CUBE_MAP)for(var f=0;6>f;++f)a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+f,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,e);else a.texImage2D(d,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,e)}}function R(a,b,c,d){d=d||O,c=c||ga,Q(a,b,c),c=N(c);var e=P(c.src,function(e,f){e?d(e,b,f):(La(a,b,f,c),d(null,b,f))});return e}function S(a,b,c,d){function e(e){return function(f,m){--k,f?l.push(f):m.width!==m.height?l.push("cubemap face img is not a square: "+m.src):(F(a,c),a.bindTexture(i,b),5===k?L(a).forEach(function(b){a.texImage2D(b,0,g,g,h,m)}):a.texImage2D(e,0,g,g,h,m),G(a,c),a.generateMipmap(i)),0===k&&d(l.length?l:void 0,j,b)}}d=d||O;var f=c.src;if(6!==f.length)throw"there must be 6 urls for a cubemap";var g=c.format||a.RGBA,h=c.type||a.UNSIGNED_BYTE,i=c.target||a.TEXTURE_2D;if(i!==a.TEXTURE_CUBE_MAP)throw"target must be TEXTURE_CUBE_MAP";Q(a,b,c),c=N(c);var j,k=6,l=[],m=L(a,c);j=f.map(function(a,b){return P(a,e(m[b]))})}function T(a){switch(a){case pa:case sa:return 1;case ta:return 2;case qa:return 3;case ra:return 4;default:throw"unknown type: "+a}}function U(a,b){return x(b)?u(b):a.UNSIGNED_BYTE}function V(a,b,c,d){d=d||ga;var e=d.target||a.TEXTURE_2D,f=d.width,g=d.height,h=d.format||a.RGBA,i=d.type||U(a,c),j=T(h),k=c.length/j;if(k%1)throw"length wrong size of format: "+Ha(a,h);if(f||g){if(g){if(!f&&(f=k/g,f%1))throw"can't guess width"}else if(g=k/f,g%1)throw"can't guess height"}else{var l=Math.sqrt(k/(e===a.TEXTURE_CUBE_MAP?6:1));l%1===0?(f=l,g=l):(f=k,g=1)}if(!x(c)){var m=v(a,i);c=new m(c)}if(a.pixelStorei(a.UNPACK_ALIGNMENT,d.unpackAlignment||1),F(a,d),e===a.TEXTURE_CUBE_MAP){var n=k/6*j;M(a,d).forEach(function(b){var d=n*b.ndx,e=c.subarray(d,d+n);a.texImage2D(b.face,0,h,f,g,0,h,i,e)})}else a.texImage2D(e,0,h,f,g,0,h,i,c);return G(a,d),{width:f,height:g}}function W(a,b,c){var d=c.target||a.TEXTURE_2D;a.bindTexture(d,b);var e=c.format||a.RGBA,f=c.type||a.UNSIGNED_BYTE;if(F(a,c),d===a.TEXTURE_CUBE_MAP)for(var g=0;6>g;++g)a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+g,0,e,c.width,c.height,0,e,f,null);else a.texImage2D(d,0,e,c.width,c.height,0,e,f,null)}function X(a,b,c){c=c||O,b=b||ga;var d=a.createTexture(),e=b.target||a.TEXTURE_2D,f=b.width||1,g=b.height||1;a.bindTexture(e,d),e===a.TEXTURE_CUBE_MAP&&(a.texParameteri(e,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(e,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE));var h=b.src;if(h)if("function"==typeof h&&(h=h(a,b)),"string"==typeof h)R(a,d,b,c);else if(x(h)||Array.isArray(h)&&("number"==typeof h[0]||Array.isArray(h[0])||x(h[0]))){var i=V(a,d,h,b);f=i.width,g=i.height}else if(Array.isArray(h)&&"string"==typeof h[0])S(a,d,b,c);else{if(!(h instanceof HTMLElement))throw"unsupported src type";La(a,d,h,b),f=h.width,g=h.height}else W(a,d,b);return b.auto!==!1&&K(a,d,b,f,g),H(a,d,b),d}function Y(a,b,c,d,e){d=d||c.width,e=e||c.height;var f=c.target||a.TEXTURE_2D;a.bindTexture(f,b);var g,h=c.format||a.RGBA,i=c.src;if(g=i&&(x(i)||Array.isArray(i)&&"number"==typeof i[0])?c.type||U(a,i):c.type||a.UNSIGNED_BYTE,f===a.TEXTURE_CUBE_MAP)for(var j=0;6>j;++j)a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,h,d,e,0,h,g,null);else a.texImage2D(f,0,h,d,e,0,h,g,null)}function Z(a){return"string"==typeof a||Array.isArray(a)&&"string"==typeof a[0]}function $(a,b,c){function d(){0===f&&setTimeout(function(){c(g.length?g:void 0,b)},0)}function e(a){--f,a&&g.push(a),d()}c=c||O;var f=0,g=[],h={};return Object.keys(b).forEach(function(c){var d=b[c],g=void 0;Z(d.src)&&(g=e,++f),h[c]=X(a,d,g)}),d(),h}function _(a){return Na[a]}function aa(a){return Oa[a]}function ba(a,b,c,d){var e=a.FRAMEBUFFER,f=a.createFramebuffer();a.bindFramebuffer(e,f),c=c||a.drawingBufferWidth,d=d||a.drawingBufferHeight,b=b||Ma;var g=0,h={framebuffer:f,attachments:[]};return b.forEach(function(b){var f=b.attachment,i=b.format,j=_(i);if(j||(j=Ba+g++),!f)if(aa(i))f=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,f),a.renderbufferStorage(a.RENDERBUFFER,i,c,d);else{var k=N(b);k.width=c,k.height=d,k.auto=void 0===b.auto?!1:b.auto,f=X(a,k)}if(f instanceof WebGLRenderbuffer)a.framebufferRenderbuffer(e,j,a.RENDERBUFFER,f);else{if(!(f instanceof WebGLTexture))throw"unknown attachment type";a.framebufferTexture2D(e,j,b.texTarget||a.TEXTURE_2D,f,b.level||0)}h.attachments.push(f)}),h}function ca(a,b,c,d,e){d=d||a.drawingBufferWidth,e=e||a.drawingBufferHeight,c=c||Ma,c.forEach(function(c,f){var g=b.attachments[f],h=c.format;if(g instanceof WebGLRenderbuffer)a.bindRenderbuffer(a.RENDERBUFFER,g),a.renderbufferStorage(a.RENDERBUFFER,h,d,e);else{if(!(g instanceof WebGLTexture))throw"unknown attachment type";Y(a,g,c,d,e)}})}var da=window.console&&window.console.error?window.console.error.bind(window.console):function(){},ea="",fa=new Uint8Array([128,192,255,255]),ga={},ha=5120,ia=5121,ja=5122,ka=5123,la=5124,ma=5125,na=5126,oa=6402,pa=6406,qa=6407,ra=6408,sa=6409,ta=6410,ua=32854,va=32855,wa=36194,xa=33189,ya=6401,za=36168,Aa=34041,Ba=36064,Ca=36096,Da=36128,Ea=33306,Fa=33071,Ga=9729,Ha=function(){function a(a){b||(b={},Object.keys(a).forEach(function(c){"number"==typeof a[c]&&(b[a[c]]=c)}))}var b;return function(c,d){return a(),b[d]||"0x"+d.toString(16)}}(),Ia=["VERTEX_SHADER","FRAGMENT_SHADER"],Ja=function(){var a=["position","positions","a_position"];return function(b){for(var c,d=0;d<a.length&&(c=a[d],!(c in b));++d);d===a.length&&(c=Object.keys(b)[0]);var e=b[c],f=e.length||e.data.length,g=e.numComponents||y(c,f),h=f/g;if(f%g>0)throw"numComponents "+g+" not correct for length "+f;return h}}(),Ka={},La=function(){var a=document.createElement("canvas").getContext("2d");return function(b,c,d,e){e=e||ga;var f=e.target||b.TEXTURE_2D,g=d.width,h=d.height,i=e.format||b.RGBA,j=e.type||b.UNSIGNED_BYTE;if(F(b,e),b.bindTexture(f,c),f===b.TEXTURE_CUBE_MAP){var k,l,m=d.width,n=d.height;if(m/6===n)k=n,l=[0,0,1,0,2,0,3,0,4,0,5,0];else if(n/6===m)k=m,l=[0,0,0,1,0,2,0,3,0,4,0,5];else if(m/3===n/2)k=m/3,l=[0,0,1,0,2,0,0,1,1,1,2,1];else{if(m/2!==n/3)throw"can't figure out cube map from element: "+(d.src?d.src:d.nodeName);k=m/2,l=[0,0,1,0,0,1,1,1,0,2,1,2]}a.canvas.width=k,a.canvas.height=k,g=k,h=k,M(b,e).forEach(function(c){var e=l[2*c.ndx+0]*k,f=l[2*c.ndx+1]*k;a.drawImage(d,e,f,k,k,0,0,k,k),b.texImage2D(c.face,0,i,i,j,a.canvas)}),a.canvas.width=1,a.canvas.height=1}else b.texImage2D(f,0,i,i,j,d);G(b,e),e.auto!==!1&&K(b,c,e,g,h),H(b,c,e)}}(),Ma=[{format:ra,type:ia,min:Ga,wrap:Fa},{format:Aa}],Na={};Na[Aa]=Ea,Na[ya]=Da,Na[za]=Da,Na[oa]=Ca,Na[xa]=Ca;var Oa={};return Oa[ua]=!0,Oa[va]=!0,Oa[wa]=!0,Oa[Aa]=!0,Oa[xa]=!0,Oa[ya]=!0,Oa[za]=!0,{createAttribsFromArrays:A,createBuffersFromArrays:C,createBufferInfoFromArrays:B,createAttributeSetters:n,createProgram:g,createProgramFromScripts:i,createProgramFromSources:j,createProgramInfo:q,createUniformSetters:l,drawBufferInfo:D,drawObjectList:E,getWebGLContext:d,resizeCanvasToDisplaySize:r,setAttributes:o,setAttributePrefix:b,setBuffersAndAttributes:p,setUniforms:m,createTexture:X,setEmptyTexture:W,setTextureFromArray:V,loadTextureFromUrl:R,setTextureFromElement:La,setTextureFilteringForSize:K,setTextureParameters:H,setDefaultTextureColor:a,createTextures:$,resizeTexture:Y,createFramebufferInfo:ba,resizeFramebufferInfo:ca}}),c("main",["twgl/twgl"],function(a){return a}),b(["main"],function(a){return a},void 0,!0),c("build/js/twgl-includer",function(){}),b("main")});
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
