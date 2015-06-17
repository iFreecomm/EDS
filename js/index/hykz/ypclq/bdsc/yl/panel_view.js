define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/hykz/ypclq/bdsc/yl/panel_template.html");
	
	var BdscCollection = require("web/index/hykz/ypclq/bdsc/bdsc_collection");
	var YlCollectionView = require("web/index/hykz/ypclq/bdsc/yl/yl_collection_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var collection = new BdscCollection();
			collection.fetch().done(function() {
				self.showChildView("container", new YlCollectionView({
					collection: collection
				}));
			});
		}
	});
	
	return PanelView;
});
