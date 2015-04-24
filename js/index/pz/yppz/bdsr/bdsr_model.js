define(function(require) {
	var Model = require("web/common/model");
	
	var BdsrModel = Model.extend({
		defaults: {
			volumeSingleInPut: []
		},
		urls: {
			"create": "yppz_bdsr.psp",
			"update": "yppz_bdsr.psp",
			"delete": "yppz_bdsr.psp",
			"read": "yppz_bdsr.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return BdsrModel;
});