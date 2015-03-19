define(function(require) {
	var Backbone = require("backbone");
	var YdyhyModel = require("model/ydyhy_model");
	
	var YdyhyList = Backbone.Collection.extend({
		model: YdyhyModel,
		urls: {
			"create": "json/ydyhy_show.do",
			"update": "json/ydyhy_show.do",
			"delete": "json/ydyhy_show.do",
			"read": "json/ydyhy_show.do"
		}
	});
	
	return YdyhyList;
});