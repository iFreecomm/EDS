define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/wjll/video_template.html");
	
	var VideoView = Mn.ItemView.extend({
		template: tmpl,
		
		onRender: function() {
			
		}
	});
	
	return VideoView;
});
