define(function(require) {
	var Backbone = require("backbone");
	var LxrModel = require("models/lxr_model");
	
	var LxrList = Backbone.Collection.extend({
		model: LxrModel,
		urls: {
			"create": "json/lxr_show.json",
			"update": "json/lxr_show.json",
			"delete": "json/lxr_show.json",
			"read": "json/lxr_show.json"
		}
	});
	
	return LxrList;
});