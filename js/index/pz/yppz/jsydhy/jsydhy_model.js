define(function(require) {
	var Model = require("web/common/model");
	
	var JsydhyModel = Model.extend({
		defaults: {
			audInPort: 0,
			audInName: "",
			enable: 0,
			involume: 0
		},
		urls: {
			"create": "yppz_jsydhy_set.psp",
			"read": "yppz_jsydhy.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return JsydhyModel;
});