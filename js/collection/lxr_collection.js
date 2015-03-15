define(function(require) {
	var Backbone = require("backbone");
	var LxrModel = require("model/lxr_model");
	
	var LxrList = Backbone.Collection.extend({
		model: LxrModel,
		urls: {
			"create": "json/lxr_show.do",
			"update": "json/lxr_show.do",
			"delete": "json/lxr_show.do",
			"read": "json/lxr_show.do"
		}
	});
	
	return LxrList;
});