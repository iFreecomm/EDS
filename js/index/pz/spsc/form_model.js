define(function(require) {
	var Model = require("web/common/model");
	
	var FormModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			dispName: "DVI1",
			vidPortType: 0,
			vidPortAuxType:0,
			vidExpandMode:0,
			vidFmt:0,
			frameRate:0,
			scanType:0,
			
			bright: 50,
			contrast: 50,
			saturation: 50,
			clock: 0,
			phase: 0,
			horOffset:0,
			vertOffset:0,
			nr2d:5,
			nr3d:5,
			acutance:5
		},
		urls: {
			"update": "setVidOutCfg.psp",
			"read": "getVidOutCfg.psp"
		},
		
		parse: function(res) {
			return res.data;
		}
	});
	
	return FormModel;
});