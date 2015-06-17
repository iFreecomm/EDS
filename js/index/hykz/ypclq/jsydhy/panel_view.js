define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/hykz/ypclq/jsydhy/panel_template.html");
	
	var JsydhyCollection = require("web/index/hykz/ypclq/jsydhy/jsydhy_collection");
	var JsydhyCollectionView = require("web/index/hykz/ypclq/jsydhy/jsydhy_collection_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var collection = new JsydhyCollection();
			collection.fetch().done(function() {
				self.showChildView("container", new JsydhyCollectionView({
					collection: collection
				}));
			});
		}
	});
	
	return PanelView;
});
