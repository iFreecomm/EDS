define(function(require) {
	var Mn = require("marionette");
	var YlView = require("web/index/pz/yppz/bdsc/yl/yl_view");
	
	var YlCollectionView = Mn.CollectionView.extend({
		id: "pz_yppz_bdsc_yl",
		childView: YlView
	});
	
	return YlCollectionView;
});
