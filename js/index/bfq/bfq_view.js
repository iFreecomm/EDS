define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!./template.html");
	
	require("playlist");
	
	var BfqView = Mn.ItemView.extend({
		id: "bfq_show",
		template: tmpl,
		
		onAttach: function() {
			Util.activeLink();
			
			new jPlayerPlaylist({
				jPlayer: "#jquery_jplayer_1",
				cssSelectorAncestor: "#jp_container_1"
			}, [
				{
					title:"Cro Magnon Man",
					artist:"The Stark Palace",
					mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
					oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
					poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
				},
				{
					title:"Your Face",
					artist:"The Stark Palace",
					mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
					oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg",
					poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
				},
				{
					title:"Hidden",
					artist:"Miaow",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
					oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
					poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
				},
				{
					title:"Big Buck Bunny Trailer",
					artist:"Blender Foundation",
					m4v:"http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
					ogv:"http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
					webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
					poster:"http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
				},
				{
					title:"Finding Nemo Teaser",
					artist:"Pixar",
					m4v: "http://www.jplayer.org/video/m4v/Finding_Nemo_Teaser.m4v",
					ogv: "http://www.jplayer.org/video/ogv/Finding_Nemo_Teaser.ogv",
					webmv: "http://www.jplayer.org/video/webm/Finding_Nemo_Teaser.webm",
					poster: "http://www.jplayer.org/video/poster/Finding_Nemo_Teaser_640x352.png"
				},
				{
					title:"Cyber Sonnet",
					artist:"The Stark Palace",
					mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
					oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg",
					poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
				},
				{
					title:"Incredibles Teaser",
					artist:"Pixar",
					m4v: "http://www.jplayer.org/video/m4v/Incredibles_Teaser.m4v",
					ogv: "http://www.jplayer.org/video/ogv/Incredibles_Teaser.ogv",
					webmv: "http://www.jplayer.org/video/webm/Incredibles_Teaser.webm",
					poster: "http://www.jplayer.org/video/poster/Incredibles_Teaser_640x272.png"
				},
				{
					title:"Tempered Song",
					artist:"Miaow",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
					oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
					poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
				},
				{
					title:"Lentement",
					artist:"Miaow",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
					oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg",
					poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
				}
			], {
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
				}
			});
		}
	});
	
	return BfqView;
});