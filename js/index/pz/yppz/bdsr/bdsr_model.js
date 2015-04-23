define(function(require) {
	var Model = require("web/common/model");
	
	var BdsrModel = Model.extend({
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
			"create": "yppz_bdsr.psp",
			"update": "yppz_bdsr.psp",
			"delete": "yppz_bdsr.psp",
			"read": "yppz_bdsr.psp"
		}
	});
	
	return BdsrModel;
});