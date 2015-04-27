define(function(require) {
	var Model = require("web/common/model");
	
	var BdsrModel = Model.extend({
		defaults: {
			groupNum: 1,
			inputNum: 10,
			audInPort: [0,2,4,6,8,10,12,14,16,18]
		},
		urls: {
			"create": "spsr.psp",
			"update": "spsr.psp",
			"delete": "spsr.psp",
			"read": "spsr.psp"
		}
	});
	
	return BdsrModel;
});