define(function(require) {
	var Backbone = require("backbone");
	var BdscModel = require("web/index/pz/yppz/bdsc/bdsc_model");
	
	var BdscCollection = Backbone.Collection.extend({
		model: BdscModel,
		urls: {
			"read": "getVolOutControlCfg.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.volumeSingleOutPut)
				return res.data.volumeSingleOutPut;
			return [];
		}
	});
	
	return BdscCollection;
});