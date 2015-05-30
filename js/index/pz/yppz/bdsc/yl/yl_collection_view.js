define(function(require) {
	var Mn = require("marionette");
	var Slider3View = require("web/slider/slider3/view");
	
	var YlCollectionView = Mn.CollectionView.extend({
		id: "pz_yppz_bdsc_yl",
		childView: Slider3View,
		
		onRender: function() {
			var prefix = "输出";
			this.$el.children().each(function(i) {
				$(this).find("h4").text(prefix + (i + 1));
			});
		}
	});
	
	return YlCollectionView;
});
