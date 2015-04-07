define(function(require) {
	var Model = require("web/common/model");
	
	var SpscModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			name: "默认名称000",
			szxh: 0,
			mnxh: 0,
			fbl: 0,
			xsms: 0,
			ld: 123,
			dbd: 123,
			bhd: 123,
			sppy: 123,
			czpy: 221
		},
		urls: {
			"create": "spsc.psp",
			"update": "spsc.psp",
			"delete": "spsc.psp",
			"read": "spsc.psp"
		}
	});
	
	return SpscModel;
});