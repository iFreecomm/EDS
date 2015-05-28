define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/bdsr/panel_template.html");
	
	var BdsrCollection = require("web/index/pz/yppz/bdsr/bdsr_collection");
	var BdsrCollectionView = require("web/index/pz/yppz/bdsr/bdsr_collection_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var collection = new BdsrCollection();
			collection.fetch().done(function() {
				self.showChildView("container", new BdsrCollectionView({
					collection: collection
				}));
			});
		}
	});
	
	return PanelView;
});
