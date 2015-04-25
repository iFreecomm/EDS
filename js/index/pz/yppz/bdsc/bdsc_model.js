define(function(require) {
	var Model = require("web/common/model");
	
	var BdscModel = Model.extend({
		defaults: {
			VolumeSingleOutPut : []
		},
		urls: {
			"create": "yppz_bdsc.psp",
			"update": "yppz_bdsc.psp",
			"delete": "yppz_bdsc.psp",
			"read": "yppz_bdsc.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return BdscModel;
});