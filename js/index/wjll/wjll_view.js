define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/wjll/wjll_template.html");
	
	var WjllView = Mn.LayoutView.extend({
		id: "wjll_show",
		template: Handlebars.compile(tmpl),
		regions: {
			container: "#fileListContainer"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("container", options.fileView);
		},
		
		onAttach: function() {
			Radio.channel("index").command("activeLink");
			this.selectmenu();
		},
		
		// 使用jqueryui中的selectmeu控件
		selectmenu: function() {
			this.$("select").selectmenu({
				change: this._selectChangeEvent,
				appendTo: this.$(".formBox")
			});
			return this;
		},
		_selectChangeEvent: function(event, ui) {
			$(this).change();
		},
	});
	
	return WjllView;
});