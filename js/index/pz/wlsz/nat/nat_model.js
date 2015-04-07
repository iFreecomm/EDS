define(function(require) {
	var Model = require("web/common/model");
	
	var NATModel = Model.extend({
		defaults: {
			qynat: 1,
			ipdz: "172.0.0.1",
			hjqsdk: 3000,
			hjjsdk: 3010,
			mtqsdk: 6000,
			mtjsdk: 6020
		},
		urls: {
			"create": "nat.psp",
			"update": "nat.psp",
			"delete": "nat.psp",
			"read": "nat.psp"
		}
	});
	
	return NATModel;
});