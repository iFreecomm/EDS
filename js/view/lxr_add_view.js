define(function(require) {
	var tmpl = require("text!tmpl/lxr_add.html");
	var LxrModel = require("model/lxr_model");
	
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	require("stickit");
	require("customSelect");
	
	var AddLxrView = Backbone.View.extend({
		id: "lxr_add",
		bindings: {
			"#hcmc": "hcmc",
			"#hclx": "hclx",
			"#sxj": "sxj",
			"#dyyzw": "dyyzw",
			"#cyyyjl": "cyyyjl",
			"[name=MIC]": "MIC",
			"#jlyxj": "jlyxj",
			"#hcdk": "hcdk",
			"#hm": "hm",
			"#IPdz": "IPdz",
			"#dbdk": "dbdk",
			"#dbURL": "dbURL",
			"#pxh": "pxh"
		},
		events: {
			"click #saveBtn": "saveLxr",
			"click #cancelBtn": "cancelLxr"
		},
		initialize: function(opt) {
			var self = this;
			this.model = new LxrModel();
			this.listenTo(this.model, "change:hclx", this.changeHclx);
			
			if(opt.lxrId) {
				this.model.set({id: opt.lxrId});
				this.model.fetch().done(function() {
					self.render();
				});
			} else {
				this.render();
			}
		},
		render: function() {
			this.$el.html(tmpl);
			this.stickit();
			this.$("select").customSelect();
			this.changeHclx();
		},
		changeHclx: function() {
			var curHclx = this.model.get("hclx");
			var preHclx = this.model.previous("hclx");
			this.$("[hclx="+preHclx+"]").hide();
			this.$("[hclx="+curHclx+"]").show();
		},
		saveLxr: function(e) {
			e.preventDefault();
			this.$("#loading").show();
			this.model.save({}, {
				success: this.cancelLxr,
				error: this.saveError
			});
		},
		saveError: function() {
			alert("保存联系人失败！");
			this.$("#loading").hide();
		},
		cancelLxr: function() {
			require("router/index_router").navigate("lxr", {trigger: true});
		},
		close: function() {
			this.unstickit();
			this.remove();
		}
	});
	
	return AddLxrView;
});