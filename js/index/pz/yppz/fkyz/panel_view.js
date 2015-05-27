define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/fkyz/panel_template.html");
	
	var FkyzModel = require("web/index/pz/yppz/fkyz/fkyz_model");
	var FkyzView = require("web/index/pz/yppz/fkyz/fkyz_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var model = new FkyzModel();
			model.fetch().done(function() {
				self.showChildView("container", new FkyzView({
					model: model
				}));
			});
		}
	});
	
	return PanelView;
});