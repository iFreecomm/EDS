define(function(require) {
	var Model = require("web/common/model");
	
	var SpsrModel = Model.extend({
		defaults: {
			swzwk: 0,
			wllx: 1,
			ipdz: "172.0.0.100",
			zwym: "255.255.255.255",
			wgdz: "172.16.0.255",
			dns: "9.9.9.9",
			sxdk: 1,
			xxdk: 1
		},
		urls: {
			"create": "wk2.psp",
			"update": "wk2.psp",
			"delete": "wk2.psp",
			"read": "wk2.psp"
		}
	});
	
	return SpsrModel;
});