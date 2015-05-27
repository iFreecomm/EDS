define(function(require) {
	var Backbone = require("backbone");
	var BzhyModel = require("web/index/pz/yppz/bzhy/bzhy_model");
	
	var BzhyCollection = Backbone.Collection.extend({
		model: BzhyModel,
		urls: {
			"read": "getAudGroupMixInfoArr.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.AudGroupMixInfoArr)
				return res.data.AudGroupMixInfoArr;
			return [];
		}
	});
	
	return BzhyCollection;
});