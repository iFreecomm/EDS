define(function(require) {
	var Backbone = require("backbone");
	var BzhyModel = require("web/index/hykz/ypclq/bzhy/bzhy_model");
	
	var BzhyCollection = Backbone.Collection.extend({
		model: BzhyModel,
		urls: {
			"read": "getAudGroupMixAll.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.audGroupMixArr)
				return res.data.audGroupMixArr;
			return [];
		}
	});
	
	return BzhyCollection;
});