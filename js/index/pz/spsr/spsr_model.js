define(function(require) {
	var Model = require("web/common/model");
	
	var SpsrModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			name: "默认名称000",
			kzck: 0,
			ydsd: 0,
			srjkxh: 0
		},
		urls: {
			"create": "spsr.psp",
			"update": "spsr.psp",
			"delete": "spsr.psp",
			"read": "spsr.psp"
		}
	});
	
	return SpsrModel;
});