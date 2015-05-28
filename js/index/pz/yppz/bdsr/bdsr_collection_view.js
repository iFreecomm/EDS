define(function(require) {
	var Mn = require("marionette");
	var BdsrView = require("web/index/pz/yppz/bdsr/bdsr_view");
	
	var BdsrCollectionView = Mn.CollectionView.extend({
		id: "pz_yppz_bdsr",
		childView: BdsrView
	});
	
	return BdsrCollectionView;
});
