define(function(require) {
	var Model = require("web/common/model");
	
	var DhmModel = Model.extend({
		defaults: {
			venueId: [],
			enableMp: 0,
			fadeInTime: 1000,
			fadeOutTime: 1000,
			minAlphaValue: 60,
			backgroundColor: 0
		},
		urls: {
			"create": "setVidMultiPic.psp",
			"read": "getVidMultiPic.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return DhmModel;
});