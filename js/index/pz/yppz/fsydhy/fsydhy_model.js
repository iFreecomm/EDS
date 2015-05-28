define(function(require) {
	var Model = require("web/common/model");
	
	var FsydhyModel = Model.extend({
		defaults: {
			audOutPort: 0,
			enable: 0,
			outVol: 0
		},
		urls: {
			"create": "yppz_fsydhy.psp",
			"read": "yppz_fsydhy.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return FsydhyModel;
});