define(function(require) {
	var Backbone = require("backbone");
	var HymbModel = require("model/hymb_model");
	
	var LxrList = Backbone.Collection.extend({
		model: HymbModel,
		urls: {
			"create": "json/hymb_show.do",
			"update": "json/hymb_show.do",
			"delete": "json/hymb_show.do",
			"read": "json/hymb_show.do"
		}
	});
	
	return LxrList;
});