define(function(require) {
	var Mn = require("marionette");
	var Slider2View = require("web/slider/slider2/view");
	
	var JsydhyCollectionView = Mn.CollectionView.extend({
		id: "pz_yppz_jsydhy",
		childView: Slider2View,
		
		onRender: function() {
			this.$el.children().each(function(i) {
				$(this).find("h4").text(i+17);
			});
		}
	});
	
	return JsydhyCollectionView;
});
