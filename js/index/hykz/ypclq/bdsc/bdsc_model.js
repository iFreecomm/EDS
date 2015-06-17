define(function(require) {
	var Model = require("web/common/model");
	
	var BdscModel = Model.extend({
		defaults: {
			groupNum: 0,
			outPort: 0,
			enable: 0,
			outVol: 0
		},
		urls: {
			"create": "setVolSingleOutCfg.psp",
			"read": "getVolOutControlCfg.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return BdscModel;
});