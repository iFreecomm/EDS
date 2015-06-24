define(function(require) {
	var Mn = require("marionette");
	var Radio = require("radio");
	var tmpl = require("text!web/index/hykz/ypclq/bdsr/panel_template.html");
	
	var BdsrCollection = require("web/index/hykz/ypclq/bdsr/bdsr_collection");
	var BdsrCollectionView = require("web/index/hykz/ypclq/bdsr/bdsr_collection_view");
	
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
				Radio.channel("ypclq").on("refresh", self._refresh, self);
			});
		},
		
		_refresh: function(data) {
			var bdsrArr = data.bdsr;
			this.$(".slider").each(function() {
				$(this).slider("value", 28);
			});
		}
	});
	
	return PanelView;
});
