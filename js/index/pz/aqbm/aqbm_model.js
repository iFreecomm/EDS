define(function(require) {
	var Model = require("web/common/model");
	
	var AqbmModel = Model.extend({
		defaults: {
			enable: 0,
			username: "",
			password: "",
			port: ""
		},
		urls: {
			"create": "setLoginInfo.psp",
			"read": "getLoginInfo.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return AqbmModel;
});