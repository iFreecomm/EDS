define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!./spsc_template.html");
	
	var FormView = require("./form_view");
	var FormModel = require("./form_model");
	
	var SpscView = Mn.LayoutView.extend({
		id: "pz_spsc",
		template: Handlebars.compile(tmpl),
		regions: {
			formBoxContainer: ".formBox-container"
		},
		events: {
			"click .lxr" : "selectLxr"
		},
		
		initialize: function() {
			this.formModel = new FormModel();
			this.formView = new FormView({
				model: this.formModel
			});
			
			this.listenTo(this.formView, "changeName", this.changeName);
		},
		onRender: function() {
			var $lxr = this.$(".lxr").eq(0).addClass("active");
			if($lxr.length == 0) return;
			
			this.showFormView($lxr);
		},
		
		selectLxr: function(e) {
			var $lxr = $(e.currentTarget);
			$lxr.addClass("active").siblings().removeClass("active");
			
			this.showFormView($lxr);
		},
		
		showFormView: function($lxr) {
			var self = this;
			var id = $lxr.data("id");
			
			if(this.getChildView("formBoxContainer")) {
				this.formView.updateView(id);
			} else {
				this.formModel.set("recordId", id).mustFetch({
					"recordId": id
				}).done(function() {
					self.showChildView("formBoxContainer", self.formView);
				});
			}
		},
		
		changeName: function(name) {
			this.$(".lxr.active").children(".lxr-head").text(name);
		}
	});
	
	return SpscView;
});
