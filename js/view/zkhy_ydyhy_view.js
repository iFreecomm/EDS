define(function(require) {
	var ydyhy_tmpl = require("text!tmpl/zkhy_ydyhy.html");
	var YdyhyModel = require("model/ydyhy_model");
	
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	
	
	var ZkhyYdyhyView = Backbone.View.extend({
		id: "ydyhy",
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
				this.model.set({id: opt.hyId});
				this.model.fetch().done(function() {
					self.render();
				});
			} else {
				this.render();
			}
		},
		render: function() {
			this.$el.html(this.tmpl(this.model.toJSON()));
			this.stickit();
			this.$("select").customSelect();
		}
	});
	
	return ZkhyYdyhyView;
});