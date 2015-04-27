define(function(require) {
	var Model = require("web/common/model");
	
	var JhtjModel = Model.extend({
		defaults: {
			EqSingleChannelCfgArg: []
		},
		urls: {
			"create": "yppz_jhtj.psp",
			"update": "yppz_jhtj.psp",
			"delete": "yppz_jhtj.psp",
			"read": "yppz_jhtj.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return JhtjModel;
});