define(function(require) {
	var Model = require("web/common/model");
	
	var YyjlModel = Model.extend({
		defaults: {
			"discussCfg.discussEnable": 0,
			"discussCfg.time": 100,
			"discussCfg.venueId": 0,
			
			"silenceCfg.silenceEnable": 0,
			"silenceCfg.time": 100,
			"silenceCfg.venueId": 0
		},
		urls: {
			"create": "setExcitedAudSeniorCfg.psp",
			"read": "getExcitedAudSeniorCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return YyjlModel;
});