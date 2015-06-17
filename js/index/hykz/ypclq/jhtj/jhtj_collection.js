define(function(require) {
	var _ = require("underscore");
	var Backbone = require("backbone");
	var JhtjModel = require("web/index/hykz/ypclq/jhtj/jhtj_model");
	
	var JhtjCollection = Backbone.Collection.extend({
		model: JhtjModel,
		urls: {
			"create": "setEqAllChannelCfg.psp",
			"read": "getEqAllChannelCfg.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.eqGain) {
				var eqGain = res.data.eqGain;
				return _.map(eqGain, function(volume) {
					return {
						volume: volume
					};
				});
			}
			return [];
		}
	});
	
	return JhtjCollection;
});