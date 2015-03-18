define(function(require) {
	var ydyhy_tmpl = require("text!tmpl/zkhy_ydyhy_add.html");
	var YdyhyModel = require("model/ydyhy_model");
	
	var YhzView = require("view/zkhy_hymb_add_yhz_view");
	
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	
	
	var ZkhyYdyhyView = Backbone.View.extend({
		id: "ydyhy_add",
		className: "contentRight",
		tmpl: Handlebars.compile(ydyhy_tmpl),
		bindings: {
			"#hymc": "hymc",
			"#hyhm": "hyhm",
			"#zxmm": "zxmm",
			"#yyrq": "yyrq",
			"#hymb": "hymb",
			"#hydk": "hydk",
			"#hymm": "hymm",
			"#cxsj": "cxsj"
		},
		initialize: function(opt) {
			var self = this;
			this.model = new YdyhyModel();
			if(opt.hyId) {
				this.model.set({hyId: opt.hyId});
				this.model.fetch().done(function() {
					self.render();
				});
			} else {
				this.render();
			}
		},
		render: function() {
			this.$el.html(this.tmpl(this.model.toJSON()));
			new YhzView({el: this.$("#select-lxr-box-container")});
			this.stickit();
			this.$("select").customSelect();
		}
	});
	
	return ZkhyYdyhyView;
});