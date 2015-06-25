define(function(require) {
	var Model = require("web/common/model");
	
	var SlideModel = Model.extend({
		defaults: {
			time: 1,
			decibel: 10
		},
		urls: {
			"create": "setYyjlSlideCfg.psp",
			"read": "getYyjlSlideCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return SlideModel;
});