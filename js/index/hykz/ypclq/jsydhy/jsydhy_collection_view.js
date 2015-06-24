define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Slider2View = require("web/slider/slider2/view");
	
	var JsydhyCollectionView = Mn.CollectionView.extend({
		id: "hykz_ypclq_jsydhy",
		childView: Slider2View,
		
		onRender: function() {
			this.$el.children().each(function(i) {
				$(this).find("h4").text(i+17);
			});
		}
	});
	
	return JsydhyCollectionView;
});