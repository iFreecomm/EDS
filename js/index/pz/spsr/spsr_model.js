define(function(require) {
	var Model = require("web/common/model");
	
	var SpsrModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			cameraName: "SDI1",
			vidPortType: 0,
			
			bright: 50,
			contrast: 50,
			saturation: 50,
			clock: 126,
			phase: 127,
			horOffset:128,
			vertOffset:128,
			nr2d:5,
			nr3d:5,
			acutance:5
		},
		urls: {
			"update": "setVidInCfg.psp",
			"read": "getVidInCfg.psp"
		},
		
		parse: function(res) {
			return res.data;
		}
	});
	
	return SpsrModel;
});