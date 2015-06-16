define(function(require) {
	var Model = require("web/common/model");
	
	var BdsrModel = Model.extend({
		defaults: {
			audInPort: 0,
			audInName: "",
			enable: 0,
			phtPwrEn: 0,
			involume: 0
		},
		urls: {
			"create": "setVolInSingleCfg.psp",
			"read": "getVolInControlCfg.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return BdsrModel;
});