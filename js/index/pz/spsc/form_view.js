define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!./form_template.html");
	
	var SpscView = Mn.ItemView.extend({
		className: "shadow-box",
		template: tmpl,
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
			"click .saveBtn" : "saveModel"
		},
		
		onRender: function() {
			this.stickit();
			Util.initSlider(this.$el);
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		saveModel: function(e) {
			var self = this;
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;	
			
			this.model.save().done(function(res) {
				if(res.code == 0) {
					self.trigger("changeName", self.model.get("name"));
				}
			}).fail(function() {
				
			});
		},
		
		updateView: function(id) {
			var self = this;
			this.model.set("recordId", id).mustFetch({
				"recordId": id
			}).done(function() {
				self.render();
				Util.selectmenu(self.ui.select, self.ui.formBox);
			});
		}
	});
	
	return SpscView;
});
