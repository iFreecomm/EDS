define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/bzhy/panel_template.html");
	
	var BzhyCollection = require("web/index/pz/yppz/bzhy/bzhy_collection");
	var BzhyView = require("web/index/pz/yppz/bzhy/bzhy_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var collection = new BzhyCollection();
			collection.fetch({
				reset: true
			}).done(function() {
				self.showChildView("container", new BzhyView({
					collection: collection
				}));
			});
		}
	});
	
	return PanelView;
});
