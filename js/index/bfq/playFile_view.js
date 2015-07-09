define(function(require) {
	var _ = require("underscore");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!./template.html");
	
	require("playlist");
	
	var PlayFileView = Mn.ItemView.extend({
		id: "bfq_show",
		template: tmpl,
		
		onAttach: function() {
			Util.activeLink("bfq");
			
			var playList = this.getPlayList();
			
			var myPlayList = new jPlayerPlaylist({
				jPlayer: "#jquery_jplayer_1",
				cssSelectorAncestor: "#jp_container_1"
			}, playList, {
				swfPath: "js/lib/pro/jplayer",
				supplied: "webmv, ogv, m4v, oga, mp3",
				useStateClassSkin: true,
				autoBlur: false,
				smoothPlayBar: true,
				keyEnabled: true,
				audioFullScreen: true,
				size: {
					width: "640px",
					height: "360px",
					cssClass: "jp-video-360p"
				},
				ready: function() {
					//播放器会引起页面title变化，这里修正它
					document.title = document.title.replace(/#.*/, "");
					//自动播放，并且解决IE8样式问题
					myPlayList.play();
				}
			});
		},
		
		getPlayList: function() {
			var list = localStorage.getItem("playList");
			list = list || "[]";
			list = JSON.parse(list);
			
			var self = this;
			return _.map(list, function(model) {
				var oMedia =  {
					title: model.fileName,
					artist: model.artist
				};
				
				var path = model.filePath;
//				var path = "Alias0" + model.filePath;
				if(self._isAudio(path)) {
					oMedia.mp3 = path;
					oMedia.poster = "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png";
				} else {
					oMedia.m4v = path;
					oMedia.poster = "http://www.jplayer.org/audio/poster/Miaow_640x360.png";
				}
				
				return oMedia;
			});
		},
		_isVideo: function(path) {
			return /^rtsp:|\.mp4$/.test(path);
		},
		_isAudio: function(path) {
			return /\.mp3/.test(path);
		}
	});
	
	return PlayFileView;
});