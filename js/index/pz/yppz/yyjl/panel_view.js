define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/yyjl/panel_template.html");
	
//	var YyjlModel = require("web/index/pz/yppz/yyjl/yyjl_model");
//	var YyjlView = require("web/index/pz/yppz/yyjl/yyjl_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
//			var model = new YyjlModel();
//			model.fetch().done(function() {
//				this.showChildView("container", new YyjlView({
//					model: model
//				}));
//			});
		}
	});
	
	return PanelView;
});
