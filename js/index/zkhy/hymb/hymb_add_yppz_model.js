define(function(require) {
	var Model = require("web/common/model");
	
	var YppzModel = Model.extend({
		defaults: {
			"enableSe": 0,
			"lockedVenue": [],
			
			"time": 1,
			"decibel": 10,
			
			"discussCfg.discussEnable": 0,
			"discussCfg.time": 100,
			"discussCfg.venueId": 0,
			
			"silenceCfg.silenceEnable": 0,
			"silenceCfg.time": 100,
			"silenceCfg.venueId": 0
		}
	});
	
	return YppzModel;
});