define(function(require) {
	var Backbone = require("backbone");
	var BdsrModel = require("web/index/hykz/ypclq/bdsr/bdsr_model");
	
	var BdsrCollection = Backbone.Collection.extend({
		model: BdsrModel,
		urls: {
			"read": "getVolInControlCfg.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.volumeSingleInPut)
				return res.data.volumeSingleInPut;
			return [];
		}
	});
	
	return BdsrCollection;
});