define(function(require) {
	var Model = require("web/common/model");
	
	var LylxModel = Model.extend({
		idAttribute: "recIdx",
		defaults: {
			
		},
		urls: {
			"create": "addAddr.psp",
			"update": "modifyAddr.psp",
			"delete": "delAddr.psp",
			"read": "getAddrDetail.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return LylxModel;
});