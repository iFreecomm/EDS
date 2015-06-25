define(function(require) {
	var Model = require("web/common/model");
	
	var YyjlModel = Model.extend({
		defaults: {
			"discussCfg.discussEnable": 0,
			"discussCfg.time": 100,
			"discussCfg.vidInPort": 0,
			
			"silenceCfg.silenceEnable": 0,
			"silenceCfg.time": 100,
			"silenceCfg.vidInPort": 0
		},
		urls: {
			"create": "setYyjlAdvanceCfg.psp",
			"read": "getYyjlAdvanceCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return YyjlModel;
});