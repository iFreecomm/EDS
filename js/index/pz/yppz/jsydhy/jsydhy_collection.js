define(function(require) {
	var Backbone = require("backbone");
	var JsydhyModel = require("web/index/pz/yppz/jsydhy/jsydhy_model");
	
	var JsydhyCollection = Backbone.Collection.extend({
		model: JsydhyModel,
		urls: {
			"read": "yppz_fsydhy.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.fsydhy)
				return res.data.fsydhy;
			return [];
		}
	});
	
	return JsydhyCollection;
});