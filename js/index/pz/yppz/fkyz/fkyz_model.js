define(function(require) {
	var Model = require("web/common/model");
	
	var FkyzModel = Model.extend({
		defaults: {
			afrEn: 0,
			afrMode: 0,
			afrRange: 0
		},
		urls: {
			"create": "yppz_fkyz.psp",
			"update": "yppz_fkyz.psp",
			"delete": "yppz_fkyz.psp",
			"read": "yppz_fkyz.psp"
		},
		parse: function(res) {
			return res.data.CfgArg;
		}
	});
	
	return FkyzModel;
});