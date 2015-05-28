define(function(require) {
	var Mn = require("marionette");
	var JsydhyView = require("web/index/pz/yppz/jsydhy/jsydhy_view");
	
	var JsydhyCollectionView = Mn.CollectionView.extend({
		id: "pz_yppz_jsydhy",
		childView: JsydhyView
	});
	
	return JsydhyCollectionView;
});
