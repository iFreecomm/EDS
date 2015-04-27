define(function(require) {
	var Model = require("web/common/model");
	
	var HsxcModel = Model.extend({
		defaults: {
			aecEn: 0,
			aecMode: 0,
			agcEn: 0
		},
		urls: {
			"create": "yppz_hsxc.psp",
			"update": "yppz_hsxc.psp",
			"delete": "yppz_hsxc.psp",
			"read": "yppz_hsxc.psp"
		},
		parse: function(res) {
			return res.data.CfgArg;
		}
	});
	
	return HsxcModel;
});