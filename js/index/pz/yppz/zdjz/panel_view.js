define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/zdjz/panel_template.html");
	
	var ZdjzModel = require("web/index/pz/yppz/zdjz/zdjz_model");
	var ZdjzView = require("web/index/pz/yppz/zdjz/zdjz_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var model = new ZdjzModel();
			model.fetch().done(function() {
				self.showChildView("container", new ZdjzView({
					model: model
				}));
			});
		}
	});
	
	return PanelView;
});
