define(function(require) {
	require("css!style/lxr_add.css");
	var tmpl = require("text!tmpl/lxr_add.html");
	var LxrModel = require("models/lxr_model");
	
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	require("stickit");
	require("customSelect");
	
	var AddLxrView = Backbone.View.extend({
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
			"click #cancelBtn": "cancelLxr",
			"click #defaultBtn": "defaultLxr"
		},
		initialize: function(opt) {
			//this.model.fetch();
			this.model = new LxrModel();
			this.listenTo(this.model, "change:hclx", this.changeHclx);
			var self = this;
			if(opt.lxrId) {
				$.ajax({
		    		type: "GET",
		    		url: "json/lxr.json",
		    		dataType: "json",
		    		data: opt.lxrId
		    	}).done(function(data) {
		    		self.model.set(data);
		    		self.render();
		    	});
			} else {
				this.render();
			}
		},
		render: function() {
			this.$el.html(tmpl).appendTo($("#c1"));
			this.stickit();
			$("select").customSelect();
			this.model.trigger("change:hclx");
		},
		close: function() {
			this.remove().unstickit();
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
			this.model.save();
		},
		cancelLxr: function(e) {
			e.preventDefault();
			require("app/index").navigate("lxr", {trigger: true});
		},
		defaultLxr: function(e) {
			e.preventDefault();
			
		}
	});
	
	return AddLxrView;
});