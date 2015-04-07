define(function(require) {
	var Model = require("web/common/model");
	
	var H323Model = Model.extend({
		defaults: {
			qygk: 1,
			gkdz: "172.0.0.1",
			hchm: "255.255.255.254",
			rzmc: "认证名称123",
			rzmm: "8888"
		},
		urls: {
			"create": "H323.psp",
			"update": "H323.psp",
			"delete": "H323.psp",
			"read": "H323.psp"
		}
	});
	
	return H323Model;
});