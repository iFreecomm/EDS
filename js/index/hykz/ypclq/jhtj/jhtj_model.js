define(function(require) {
	var Model = require("web/common/model");
	
	var JhtjModel = Model.extend({
		defaults: {
			volume: 0
		},
		urls: {
			"create": "setEqAllChannelCfg.psp",
			"read": "getEqAllChannelCfg.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return JhtjModel;
});