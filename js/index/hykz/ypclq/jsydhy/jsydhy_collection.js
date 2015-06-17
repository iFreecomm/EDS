define(function(require) {
	var Backbone = require("backbone");
	var JsydhyModel = require("web/index/hykz/ypclq/jsydhy/jsydhy_model");
	
	var JsydhyCollection = Backbone.Collection.extend({
		model: JsydhyModel,
		urls: {
			"read": "yppz_jsydhy.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.jsydhy)
				return res.data.jsydhy;
			return [];
		}
	});
	
	return JsydhyCollection;
});