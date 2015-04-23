define(function(require) {
	var Model = require("web/common/model");
	
	var HsxcModel = Model.extend({
		defaults: {
			name: "默认名称000",
			kzck: 0,
			ydsd: 0,
			srjkxh: 0,
			
			ld: 123,
			dbd: 124,
			bhd: 125,
			sppy: 126,
			czpy: 127,
			
			abc: 16
		},
		urls: {
			"create": "spsr.psp",
			"update": "spsr.psp",
			"delete": "spsr.psp",
			"read": "spsr.psp"
		}
	});
	
	return HsxcModel;
});