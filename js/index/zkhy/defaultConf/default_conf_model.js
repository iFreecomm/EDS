define(function(require) {
	var Model = require("web/common/model");
	
	var DefaultConfModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			meetingId: 1,
		},
		urls: {
			"create": "setDefBeginMeetingCfg.psp",
			"read": "getDefBeginMeetingCfg.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return DefaultConfModel;
});