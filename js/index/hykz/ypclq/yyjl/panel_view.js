define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/hykz/ypclq/yyjl/panel_template.html");
	
	var YyjlModel = require("web/index/hykz/ypclq/yyjl/yyjl_model");
	var YyjlView = require("web/index/hykz/ypclq/yyjl/yyjl_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var model = new YyjlModel();
			model.fetch().done(function() {
				self.showChildView("container", new YyjlView({
					model: model
				}));
			});
		}
	});
	
	return PanelView;
});
