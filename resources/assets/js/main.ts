window.$ = window.jQuery = require('jquery');
window._ = require('lodash');
window.___ = require('underscore');
window.attachFastClick = require('fastclick');
window.stream = require('getstream');
window.moment = require('moment');
window.cloudinary = require('cloudinary-core');
window.momentTimeZone = require('moment-timezone/builds/moment-timezone-with-data.js');
// require('commonjs');
require('hammerjs');
require('foundation-sites');
require('localforage');
require('foundation-datepicker/js/foundation-datepicker.min.js');
require('filepicker-js');
window.IScroll = require('angular-iscroll/node_modules/iscroll');
// require('socket.io');

//video-js packages
window.videojs = require('video.js');
require('videojs-youtube');
require('videojs-chromecast');
require('videojs-airplay/dist/videojs.airplay');
// require('videojs-playlist/dist/videojs-playlist.min');
// require('videojs-playlist-ui');
// require('videojs-playlist-thumbs');
require('videojs-resolution-switcher');
require('videojs-per-source-behaviors');
require('videojs-socialshare/videojs.socialShare');
require('videojs-suggestedvideoendcap');

// video-js vimeo
// https://github.com/didacte/videojs-vimeo
!function e(t,n,o){function r(u,a){if(!n[u]){if(!t[u]){var s="function"==typeof require&&require;if(!a&&s)return s(u,!0);if(i)return i(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[u]={exports:{}};t[u][0].call(f.exports,function(e){var n=t[u][1][e];return r(n?n:e)},f,f.exports,e,t,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(e,t,n){(function(e){!function(e,o){"object"==typeof n&&"undefined"!=typeof t?t.exports=o():"function"==typeof define&&define.amd?define(o):(e.Vimeo=e.Vimeo||{},e.Vimeo.Player=o())}(this,function(){"use strict";function t(e,t){return t={exports:{}},e(t,t.exports),t.exports}function n(e,t,n){var o=k.get(e.element)||{};t in o||(o[t]=[]),o[t].push(n),k.set(e.element,o)}function o(e,t){var n=k.get(e.element)||{};return n[t]||[]}function r(e,t,n){var o=k.get(e.element)||{};if(!o[t])return!0;if(!n)return o[t]=[],k.set(e.element,o),!0;var r=o[t].indexOf(n);return r!==-1&&o[t].splice(r,1),k.set(e.element,o),o[t]&&0===o[t].length}function i(e,t){var n=o(e,t);if(n.length<1)return!1;var i=n.shift();return r(e,t,i),i}function u(e,t){var n=k.get(e);k.set(t,n),k.delete(e)}function a(e,t){return 0===e.indexOf(t.toLowerCase())?e:""+t.toLowerCase()+e.substr(0,1).toUpperCase()+e.substr(1)}function s(e){return e instanceof window.HTMLElement}function c(e){return!isNaN(parseFloat(e))&&isFinite(e)&&Math.floor(e)==e}function f(e){return/^(https?:)?\/\/(player.)?vimeo.com(?=$|\/)/.test(e)}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,n=e.url,o=t||n;if(!o)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(c(o))return"https://vimeo.com/"+o;if(f(o))return o.replace("http:","https:");if(t)throw new TypeError("“"+t+"” is not a valid video id.");throw new TypeError("“"+o+"” is not a vimeo.com url.")}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return S.reduce(function(t,n){var o=e.getAttribute("data-vimeo-"+n);return(o||""===o)&&(t[n]=""===o?1:o),t},t)}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(function(n,o){if(!f(e))throw new TypeError("“"+e+"” is not a vimeo.com url.");var r="https://vimeo.com/api/oembed.json?url="+encodeURIComponent(e);for(var i in t)t.hasOwnProperty(i)&&(r+="&"+i+"="+encodeURIComponent(t[i]));var u="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;u.open("GET",r,!0),u.onload=function(){if(404===u.status)return void o(new Error("“"+e+"” was not found."));if(403===u.status)return void o(new Error("“"+e+"” is not embeddable."));try{var t=JSON.parse(u.responseText);n(t)}catch(e){o(e)}},u.onerror=function(){var e=u.status?" ("+u.status+")":"";o(new Error("There was an error fetching the embed code from Vimeo"+e+"."))},u.send()})}function p(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var o=document.createElement("div");return o.innerHTML=n,t.appendChild(o.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,t=[].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),n=function(e){"console"in window&&console.error&&console.error("There was an error creating an embed: "+e)};t.forEach(function(e){try{if(null!==e.getAttribute("data-vimeo-defer"))return;var t=h(e),o=l(t);d(o,t).then(function(t){return p(t,e)}).catch(n)}catch(e){n(e)}})}function y(e){return"string"==typeof e&&(e=JSON.parse(e)),e}function m(e,t,n){if(e.element.contentWindow.postMessage){var o={method:t};void 0!==n&&(o.value=n);var r=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));r>=8&&r<10&&(o=JSON.stringify(o)),e.element.contentWindow.postMessage(o,e.origin)}}function g(e,t){t=y(t);var n=[],u=void 0;if(t.event){if("error"===t.event){var a=o(e,t.data.method);a.forEach(function(n){var o=new Error(t.data.message);o.name=t.data.name,n.reject(o),r(e,t.data.method,n)})}n=o(e,"event:"+t.event),u=t.data}else if(t.method){var s=i(e,t.method);s&&(n.push(s),u=t.value)}n.forEach(function(t){try{if("function"==typeof t)return void t.call(e,u);t.resolve(u)}catch(e){}})}function w(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _="undefined"!=typeof Array.prototype.indexOf,b="undefined"!=typeof window.postMessage;if(!_||!b)throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var T="undefined"!=typeof window?window:"undefined"!=typeof e?e:"undefined"!=typeof self?self:{},E=(t(function(e,t){!function(e){function t(e,t){function o(e){return this&&this.constructor===o?(this._keys=[],this._values=[],this._itp=[],this.objectOnly=t,void(e&&n.call(this,e))):new o(e)}return t||w(e,"size",{get:y}),e.constructor=o,o.prototype=e,o}function n(e){this.add?e.forEach(this.add,this):e.forEach(function(e){this.set(e[0],e[1])},this)}function o(e){return this.has(e)&&(this._keys.splice(g,1),this._values.splice(g,1),this._itp.forEach(function(e){g<e[0]&&e[0]--})),-1<g}function r(e){return this.has(e)?this._values[g]:void 0}function i(e,t){if(this.objectOnly&&t!==Object(t))throw new TypeError("Invalid value used as weak collection key");if(t!=t||0===t)for(g=e.length;g--&&!_(e[g],t););else g=e.indexOf(t);return-1<g}function u(e){return i.call(this,this._values,e)}function a(e){return i.call(this,this._keys,e)}function s(e,t){return this.has(e)?this._values[g]=t:this._values[this._keys.push(e)-1]=t,this}function c(e){return this.has(e)||this._values.push(e),this}function f(){(this._keys||0).length=this._values.length=0}function l(){return v(this._itp,this._keys)}function h(){return v(this._itp,this._values)}function d(){return v(this._itp,this._keys,this._values)}function p(){return v(this._itp,this._values,this._values)}function v(e,t,n){var o=[0],r=!1;return e.push(o),{next:function(){var i,u=o[0];return!r&&u<t.length?(i=n?[t[u],n[u]]:t[u],o[0]++):(r=!0,e.splice(e.indexOf(o),1)),{done:r,value:i}}}}function y(){return this._values.length}function m(e,t){for(var n=this.entries();;){var o=n.next();if(o.done)break;e.call(t,o.value[1],o.value[0],this)}}var g,w=Object.defineProperty,_=function(e,t){return e===t||e!==e&&t!==t};"undefined"==typeof WeakMap&&(e.WeakMap=t({delete:o,clear:f,get:r,has:a,set:s},!0)),"undefined"!=typeof Map&&"function"==typeof(new Map).values&&(new Map).values().next||(e.Map=t({delete:o,has:a,get:r,set:s,keys:l,values:h,entries:d,forEach:m,clear:f})),"undefined"!=typeof Set&&"function"==typeof(new Set).values&&(new Set).values().next||(e.Set=t({has:u,add:c,delete:o,clear:f,keys:h,values:h,entries:p,forEach:m})),"undefined"==typeof WeakSet&&(e.WeakSet=t({delete:o,add:c,clear:f,has:u},!0))}("undefined"!=typeof t&&"undefined"!=typeof T?T:window)}),t(function(e){var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(t,n,o){n[t]=n[t]||o(),"undefined"!=typeof e&&e.exports?e.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof T?T:T,function(){function e(e,t){d.add(e,t),h||(h=v(d.drain))}function n(e){var n,o="undefined"==typeof e?"undefined":t(e);return null==e||"object"!=o&&"function"!=o||(n=e.then),"function"==typeof n&&n}function o(){for(var e=0;e<this.chain.length;e++)r(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function r(e,t,o){var r,i;try{t===!1?o.reject(e.msg):(r=t===!0?e.msg:t.call(void 0,e.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(e){o.reject(e)}}function i(t){var r,a=this;if(!a.triggered){a.triggered=!0,a.def&&(a=a.def);try{(r=n(t))?e(function(){var e=new s(a);try{r.call(t,function(){i.apply(e,arguments)},function(){u.apply(e,arguments)})}catch(t){u.call(e,t)}}):(a.msg=t,a.state=1,a.chain.length>0&&e(o,a))}catch(e){u.call(new s(a),e)}}}function u(t){var n=this;n.triggered||(n.triggered=!0,n.def&&(n=n.def),n.msg=t,n.state=2,n.chain.length>0&&e(o,n))}function a(e,t,n,o){for(var r=0;r<t.length;r++)!function(r){e.resolve(t[r]).then(function(e){n(r,e)},o)}(r)}function s(e){this.def=e,this.triggered=!1}function c(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function f(t){if("function"!=typeof t)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var n=new c(this);this.then=function(t,r){var i={success:"function"!=typeof t||t,failure:"function"==typeof r&&r};return i.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");i.resolve=e,i.reject=t}),n.chain.push(i),0!==n.state&&e(o,n),i.promise},this.catch=function(e){return this.then(void 0,e)};try{t.call(void 0,function(e){i.call(n,e)},function(e){u.call(n,e)})}catch(e){u.call(n,e)}}var l,h,d,p=Object.prototype.toString,v="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),l=function(e,t,n,o){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:o!==!1})}}catch(e){l=function(e,t,n){return e[t]=n,e}}d=function(){function e(e,t){this.fn=e,this.self=t,this.next=void 0}var t,n,o;return{add:function(r,i){o=new e(r,i),n?n.next=o:t=o,n=o,o=void 0},drain:function(){var e=t;for(t=n=h=void 0;e;)e.fn.call(e.self),e=e.next}}}();var y=l({},"constructor",f,!1);return f.prototype=y,l(y,"__NPO__",0,!1),l(f,"resolve",function(e){var n=this;return e&&"object"==("undefined"==typeof e?"undefined":t(e))&&1===e.__NPO__?e:new n(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");t(e)})}),l(f,"reject",function(e){return new this(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");n(e)})}),l(f,"all",function(e){var t=this;return"[object Array]"!=p.call(e)?t.reject(TypeError("Not an array")):0===e.length?t.resolve([]):new t(function(n,o){if("function"!=typeof n||"function"!=typeof o)throw TypeError("Not a function");var r=e.length,i=Array(r),u=0;a(t,e,function(e,t){i[e]=t,++u===r&&n(i)},o)})}),l(f,"race",function(e){var t=this;return"[object Array]"!=p.call(e)?t.reject(TypeError("Not an array")):new t(function(n,o){if("function"!=typeof n||"function"!=typeof o)throw TypeError("Not a function");a(t,e,function(e,t){n(t)},o)})}),f})})),k=new WeakMap,S=["id","url","width","maxwidth","height","maxheight","portrait","title","byline","color","autoplay","autopause","loop","responsive"],x=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),j=new WeakMap,M=new WeakMap,C=function(){function e(t){var n=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(w(this,e),window.jQuery&&t instanceof jQuery&&(t.length>1&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),t=t[0]),"string"==typeof t&&(t=document.getElementById(t)),!s(t))throw new TypeError("You must pass either a valid element or a valid id.");if("IFRAME"!==t.nodeName){var r=t.querySelector("iframe");r&&(t=r)}if("IFRAME"===t.nodeName&&!f(t.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(j.has(t))return j.get(t);this.element=t,this.origin="*";var i=new E(function(e,r){var i=function(t){if(f(t.origin)&&n.element.contentWindow===t.source){"*"===n.origin&&(n.origin=t.origin);var o=y(t.data),r="event"in o&&"ready"===o.event,i="method"in o&&"ping"===o.method;return r||i?(n.element.setAttribute("data-ready","true"),void e()):void g(n,o)}};if(window.addEventListener?window.addEventListener("message",i,!1):window.attachEvent&&window.attachEvent("onmessage",i),"IFRAME"!==n.element.nodeName){var a=h(t,o),s=l(a);d(s,a).then(function(e){var o=p(e,t);return n.element=o,u(t,o),e}).catch(function(e){return r(e)})}});return M.set(this,i),j.set(this.element,this),"IFRAME"===this.element.nodeName&&m(this,"ping"),this}return x(e,[{key:"callMethod",value:function(e){var t=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new E(function(r,i){return t.ready().then(function(){n(t,e,{resolve:r,reject:i}),m(t,e,o)})})}},{key:"get",value:function(e){var t=this;return new E(function(o,r){return e=a(e,"get"),t.ready().then(function(){n(t,e,{resolve:o,reject:r}),m(t,e)})})}},{key:"set",value:function(e,t){var o=this;return E.resolve(t).then(function(t){if(e=a(e,"set"),void 0===t||null===t)throw new TypeError("There must be a value to set.");return o.ready().then(function(){return new E(function(r,i){n(o,e,{resolve:r,reject:i}),m(o,e,t)})})})}},{key:"on",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(!t)throw new TypeError("You must pass a callback function.");if("function"!=typeof t)throw new TypeError("The callback must be a function.");var r=o(this,"event:"+e);0===r.length&&this.callMethod("addEventListener",e).catch(function(){}),n(this,"event:"+e,t)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");var n=r(this,"event:"+e,t);n&&this.callMethod("removeEventListener",e).catch(function(e){})}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=M.get(this);return E.resolve(e)}},{key:"addCuePoint",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.callMethod("addCuePoint",{time:e,data:t})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}]),e}();return v(),C})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,n){(function(t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(){if(!p){p=!0;var e="\n      .vjs-vimeo iframe {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n    ",t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e)),t.appendChild(n)}}n.__esModule=!0;var s="undefined"!=typeof window?window.videojs:"undefined"!=typeof t?t.videojs:null,c=o(s),f=e(1),l=o(f),h=c.default.getComponent("Component"),d=c.default.getComponent("Tech"),p=!1,v=function(e){function t(n,o){r(this,t);var u=i(this,e.call(this,n,o));return a(),u.setPoster(n.poster),u.initVimeoPlayer(),u}return u(t,e),t.prototype.initVimeoPlayer=function(){var e=this,t={url:this.options_.source.src,byline:!1,portrait:!1,title:!1};this.options_.autoplay&&(t.autoplay=!0),this.options_.height&&(t.height=this.options_.height),this.options_.width&&(t.width=this.options_.width),this.options_.maxheight&&(t.maxheight=this.options_.maxheight),this.options_.maxwidth&&(t.maxwidth=this.options_.maxwidth),this.options_.loop&&(t.loop=this.options_.loop),this._player=new l.default(this.el(),t),this.initVimeoState(),["play","pause","ended","timeupdate","progress","seeked"].forEach(function(t){e._player.on(t,function(n){e._vimeoState.progress.duration!=n.duration&&e.trigger("durationchange"),e._vimeoState.progress=n,e.trigger(t)})}),this._player.on("pause",function(){return e._vimeoState.playing=!1}),this._player.on("play",function(){e._vimeoState.playing=!0,e._vimeoState.ended=!1}),this._player.on("ended",function(){e._vimeoState.playing=!1,e._vimeoState.ended=!0}),this._player.on("volumechange",function(t){return e._vimeoState.volume=t}),this._player.on("error",function(t){return e.trigger("error",t)}),this.triggerReady()},t.prototype.initVimeoState=function(){var e=this._vimeoState={ended:!1,playing:!1,volume:0,progress:{seconds:0,percent:0,duration:0}};this._player.getCurrentTime().then(function(t){return e.progress.seconds=t}),this._player.getDuration().then(function(t){return e.progress.duration=t}),this._player.getPaused().then(function(t){return e.playing=!t}),this._player.getVolume().then(function(t){return e.volume=t})},t.prototype.createEl=function(){var e=c.default.createEl("div",{id:this.options_.techId});return e.style.cssText="width:100%;height:100%;top:0;left:0;position:absolute",e.className="vjs-vimeo",e},t.prototype.controls=function(){return!0},t.prototype.supportsFullScreen=function(){return!0},t.prototype.src=function(){return this.options_.source},t.prototype.currentSrc=function(){return this.options_.source.src},t.prototype.currentTime=function(){return this._vimeoState.progress.seconds},t.prototype.setCurrentTime=function(e){this._player.setCurrentTime(e)},t.prototype.volume=function(){return this._vimeoState.volume},t.prototype.setVolume=function(e){return this._player.setVolume(volume)},t.prototype.duration=function(){return this._vimeoState.progress.duration},t.prototype.buffered=function(){var e=this._vimeoState.progress;return c.default.createTimeRange(0,e.percent*e.duration)},t.prototype.paused=function(){return!this._vimeoState.playing},t.prototype.pause=function(){this._player.pause()},t.prototype.play=function(){this._player.play()},t.prototype.muted=function(){return 0===this._vimeoState.volume},t.prototype.ended=function(){return this._vimeoState.ended},t}(d);v.prototype.featuresTimeupdateEvents=!0,v.isSupported=function(){return!0},d.withSourceHandlers(v),v.nativeSourceHandler={},v.nativeSourceHandler.canPlayType=function(e){return"video/vimeo"===e?"maybe":""},v.nativeSourceHandler.canHandleSource=function(e){return e.type?v.nativeSourceHandler.canPlayType(e.type):e.src?v.nativeSourceHandler.canPlayType(e.src):""},v.nativeSourceHandler.handleSource=function(e,t){t.src(e.src)},v.nativeSourceHandler.dispose=function(){},v.registerSourceHandler(v.nativeSourceHandler),h.registerComponent("Vimeo",v),d.registerTech("Vimeo",v),v.VERSION="0.0.1",n.default=v}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[2]);