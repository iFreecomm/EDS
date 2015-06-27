define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var Handlebars = require("handlebars");
	var AckId = require("web/common/ackid");
	
	var tmpl = require("text!web/index/zkhy/defaultConf/default_conf_template.html");
	
	var DefaultConfView = Mn.ItemView.extend({
		id: "default_conf",
		template: Handlebars.compile(tmpl),
		events: {
			"click .lxr" : "selectLxr"
		},
		
		onAttach: function() {
			Util.activeLink();
		},
		
		selectLxr: function(e) {
			var self = this;
			var $tar = $(e.target);
			var $lxr = $tar.is(".lxr") ? $tar : $tar.parents(".lxr");
			$lxr.addClass("active").siblings().removeClass("active");
			
			this.model.mustFetch({
				"recordId": $lxr.data("id")
			}).done(function() {
				Util.refreshSelectmenu(self.$el).refreshSlider(self.$el);
			});
		}
	});
	
	return DefaultConfView;
});