define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!web/index/pz/spsc/spsc_template.html");
	
	var SpscView = Mn.ItemView.extend({
		id: "pz_spsc",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#name": "name",
			"#szxh": "szxh",
			"#mnxh": "mnxh",
			"#fbl": "fbl",
			"#xsms": "xsms",
			
			"#ld": "ld",
			"#dbd": "dbd",
			"#bhd": "bhd",
			"#sppy": "sppy",
			"#czpy": "czpy"
		},
		checkOptions: {
			"#name": {
				constraint: ["notNull", "trimCheck"],
				appendTo: ".formCell"
			}
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"keyup": "checkInput",
			"click .lxr" : "selectLxr"
		},
		
		onRender: function() {
			this.stickit();
			Util.initSlider(this.$el);
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
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
	
	return SpscView;
});
