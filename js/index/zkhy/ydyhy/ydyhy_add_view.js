define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/zkhy/ydyhy/ydyhy_add_template.html");
	
	var YdyhyAddView = Mn.LayoutView.extend({
		id: "zkhy_ydyhy_add",
		template: tmpl,
		regions: {
			yhz: "#zkhy_ydyhy_add_yhz",
			form: "#zkhy_ydyhy_add_form"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("yhz", options.zkhyYdyhyAddYhzView);
			this.showChildView("form", options.zkhyYdyhyAddFormView);
		},
		onAttach: function() {
			Util.activeLink("zkhy/showYdyhy");
		}
	});
	
	return YdyhyAddView;
});