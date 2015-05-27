define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/bdsr/panel_template.html");
	
	var BdsrModel = require("web/index/pz/yppz/bdsr/bdsr_model");
	var BdsrView = require("web/index/pz/yppz/bdsr/bdsr_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var model = new BdsrModel();
			model.fetch().done(function() {
				self.showChildView("container", new BdsrView({
					model: model
				}));
			});
		}
	});
	
	return PanelView;
});
