define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/hsxc/panel_template.html");
	
	var HsxcModel = require("web/index/pz/yppz/hsxc/hsxc_model");
	var HsxcView = require("web/index/pz/yppz/hsxc/hsxc_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var model = new HsxcModel();
			model.fetch().done(function() {
				self.showChildView("container", new HsxcView({
					model: model
				}));
			});
		}
	});
	
	return PanelView;
});
