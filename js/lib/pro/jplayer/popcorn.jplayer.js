/*! Popcorn Player for jPlayer 2.9.2 ~ (c) 2009-2014 Happyworm Ltd ~ MIT License */
!function(a){var b="//code.jquery.com/jquery-1.11.1.min.js",c="//code.jplayer.org/2.9.0/jplayer/jquery.jplayer.min.js",d="//code.jplayer.org/2.9.0/jplayer/jquery.jplayer.swf",e="html,flash",f=!1,g=!1,h=!1,i={mp3:{codec:"audio/mpeg",flashCanPlay:!0,media:"audio"},m4a:{codec:'audio/mp4; codecs="mp4a.40.2"',flashCanPlay:!0,media:"audio"},m3u8a:{codec:'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',flashCanPlay:!1,media:"audio"},m3ua:{codec:"audio/mpegurl",flashCanPlay:!1,media:"audio"},oga:{codec:'audio/ogg; codecs="vorbis, opus"',flashCanPlay:!1,media:"audio"},flac:{codec:"audio/x-flac",flashCanPlay:!1,media:"audio"},wav:{codec:'audio/wav; codecs="1"',flashCanPlay:!1,media:"audio"},webma:{codec:'audio/webm; codecs="vorbis"',flashCanPlay:!1,media:"audio"},fla:{codec:"audio/x-flv",flashCanPlay:!0,media:"audio"},rtmpa:{codec:'audio/rtmp; codecs="rtmp"',flashCanPlay:!0,media:"audio"},m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:!0,media:"video"},m3u8v:{codec:'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:!1,media:"video"},m3uv:{codec:"audio/mpegurl",flashCanPlay:!1,media:"video"},ogv:{codec:'video/ogg; codecs="theora, vorbis"',flashCanPlay:!1,media:"video"},webmv:{codec:'video/webm; codecs="vorbis, vp8"',flashCanPlay:!1,media:"video"},flv:{codec:"video/x-flv",flashCanPlay:!0,media:"video"},rtmpv:{codec:'video/rtmp; codecs="rtmp"',flashCanPlay:!0,media:"video"}},j=function(a){return a&&"object"==typeof a&&a.hasOwnProperty?!0:!1},k=function(a){var b=!1;return/\.mp3$/i.test(a)?b="mp3":/\.mp4$/i.test(a)||/\.m4v$/i.test(a)?b="m4v":/\.m4a$/i.test(a)?b="m4a":/\.ogg$/i.test(a)||/\.oga$/i.test(a)?b="oga":/\.ogv$/i.test(a)?b="ogv":/\.webm$/i.test(a)&&(b="webmv"),b},l=function(a){var b="",c="";if(j(a))for(var d in a)a.hasOwnProperty(d)&&(b+=c+d,c=",");return f&&console.log('getSupplied(): Generated: supplied = "'+b+'"'),b};a.player("jplayer",{_canPlayType:function(a,b){var c,d=a.toLowerCase(),f={media:{},options:{}},g=!1;if("video"!==d&&"audio"!==d&&("string"==typeof b?/^http.*/i.test(b)&&(c=k(b),c&&(f.media[c]=b,f.options.solution=e,f.options.supplied=c)):f=b,j(f)&&j(f.media))){j(f.options)||(f.options={}),f.options.solution||(f.options.solution=e),f.options.supplied||(f.options.supplied=l(f.media));for(var h=f.options.solution.toLowerCase().split(","),m=f.options.supplied.toLowerCase().split(","),n=0;n<h.length;n++)for(var o,p=h[n].replace(/^\s+|\s+$/g,""),q="html"===p,r="flash"===p,s=0;s<m.length;s++)if(c=m[s].replace(/^\s+|\s+$/g,""),i[c]){!o&&q&&(o=document.createElement(i[c].media));var t=!!(o&&o.canPlayType&&o.canPlayType(i[c].codec)),u=t&&q,v=i[c].flashCanPlay&&r;(u||v)&&(g={html:u,type:c},n=h.length,s=m.length)}}return g},_setup:function(){var i,m,n=this,o="unknown",p={},q={},r=!1,s=0,t=null,u=!1,v=null,w=function(){r?(f&&console.log("Dispatched event : durationchange : "+s),n.dispatchEvent("durationchange")):(f&&console.log("DELAYED EVENT (!ready) : durationchange : "+s),clearTimeout(t),t=setTimeout(w,250))},x=function(){var a=function(a){a.jPlayer.status.duration!==s&&(s=a.jPlayer.status.duration,w())},b=function(a){u||100!==a.jPlayer.status.seekPercent||(u=!0,setTimeout(function(){f&&console.log("Trigger : canplaythrough"),m._trigger($.jPlayer.event.canplaythrough)},0))};i.bind($.jPlayer.event.loadstart,function(){setTimeout(function(){f&&console.log("Trigger : loadeddata"),m._trigger($.jPlayer.event.loadeddata)},0)}).bind($.jPlayer.event.progress,function(c){a(c),b(c)}).bind($.jPlayer.event.timeupdate,function(c){a(c),b(c)}).bind($.jPlayer.event.play,function(){setTimeout(function(){f&&console.log("Trigger : playing"),m._trigger($.jPlayer.event.playing)},0)}),f&&console.log("Created CUSTOM event handlers for FLASH")},y=function(){!function(b){i=b("#"+n.id),"string"==typeof n.src?(o=k(n.src),p[o]=n.src,q.supplied=o,q.solution=e):j(n.src)&&(p=j(n.src.media)?n.src.media:{},q=j(n.src.options)?n.src.options:{},q.solution=q.solution||e,q.supplied=q.supplied||l(n.src.media)),q.swfPath=q.swfPath||d,i.bind(b.jPlayer.event.ready,function(a){a.jPlayer.flash.used&&x(),b(this).jPlayer("setMedia",p).jPlayer("load")});var c=b.jPlayer.reservedEvent+" loadeddata durationchange",g=c.split(/\s+/g),h=function(a){i.bind(b.jPlayer.event[a],function(b){f&&console.log("Dispatched event: "+a+(b&&b.jPlayer?" ("+b.jPlayer.status.currentTime+"s)":"")),n.dispatchEvent(a)}),f&&console.log("Created event handler for: "+a)};for(var t in b.jPlayer.event)if(b.jPlayer.event.hasOwnProperty(t)){var u=!0;for(var y in g)if(g.hasOwnProperty(y)&&g[y]===t){u=!1;break}u?h(t):f&&console.log("Skipped auto event handler creation for: "+t)}i.bind(b.jPlayer.event.loadeddata,function(a){f&&console.log("Dispatched event: loadeddata"+(a&&a.jPlayer?" ("+a.jPlayer.status.currentTime+"s)":"")),n.dispatchEvent("loadeddata"),r=!0}),f&&console.log("Created CUSTOM event handler for: loadeddata"),i.bind(b.jPlayer.event.durationchange,function(a){s=a.jPlayer.status.duration,w()}),f&&console.log("Created CUSTOM event handler for: durationchange"),i.bind(b.jPlayer.event.error,function(a){v=a.jPlayer.error,v.code=v.type===b.jPlayer.error.URL?4:0,f&&console.log("Dispatched event: error"),f&&console.dir(v),n.dispatchEvent("error")}),f&&console.log("Created CUSTOM event handler for: error"),a.player.defineProperty(n,"error",{set:function(){return v},get:function(){return v}}),a.player.defineProperty(n,"currentTime",{set:function(a){return m.status.paused?i.jPlayer("pause",a):i.jPlayer("play",a),a},get:function(){return m.status.currentTime}}),a.player.defineProperty(n,"duration",{set:function(){return r?s:0/0},get:function(){return r?s:0/0}}),a.player.defineProperty(n,"muted",{set:function(a){return i.jPlayer("mute",a),m.options.muted},get:function(){return m.options.muted}}),a.player.defineProperty(n,"volume",{set:function(a){return i.jPlayer("volume",a),m.options.volume},get:function(){return m.options.volume}}),a.player.defineProperty(n,"paused",{set:function(){return m.status.paused},get:function(){return m.status.paused}}),n.play=function(){i.jPlayer("play")},n.pause=function(){i.jPlayer("pause")},i.jPlayer(q),m=i.data("jPlayer")}(jQuery)},z=function(){jQuery.jPlayer?y():h?setTimeout(z,250):(h=!0,a.getScript(c,function(){h=!1,y()}))},A=function(){window.jQuery?z():g?setTimeout(A,250):(g=!0,a.getScript(b,function(){g=!1,z()}))};A()},_teardown:function(){jQuery("#"+this.id).jPlayer("destroy")}})}(Popcorn);