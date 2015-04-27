define(function(require) {
	var Model = require("web/common/model");
	
	var ZdjzModel = Model.extend({
		defaults: {
			ansEn: 0,
			ansMode: 0
		},
		urls: {
			"create": "yppz_zdjz.psp",
			"update": "yppz_zdjz.psp",
			"delete": "yppz_zdjz.psp",
			"read": "yppz_zdjz.psp"
		},
		parse: function(res) {
			return res.data.CfgArg;
		}
	});
	
	return ZdjzModel;
});