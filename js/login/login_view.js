define(function(require) {
	var $ = require("jquery");
	var Backbone = require("backbone");
	var Mn = require("marionette");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!web/login/login_template.html");
	
	var LoginModel = Backbone.Model.extend({
		urls: {
			"create": "login.psp"
		}
	});
	
	var LoginView = Mn.ItemView.extend({
		id: "wrapper",
		template: tmpl,
		bindings: {
			"#username": "username",
    		"#password": "password"
		},
		checkOptions: {
			"#username": {
				constraint: ["notNull", "trimCheck"],
				appendTo: ".login-box",
				offsetLeft: -10,
				offsetTop: 10
			},
    		"#password": {
    			constraint: ["notNull", "passCheck"],
    			appendTo: ".login-box",
    			offsetLeft: -10,
    			offsetTop: 10
    		}
		},
		events: {
			"keyup": "checkInput",
			"click [type=submit]": "login"
		},
		
		initialize: function() {
			this.model = new LoginModel();
		},
		onRender: function() {
			this.stickit();
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		login: function(e) {
			e.preventDefault();
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;
			
			var self = this;
			this.model.set("version","super");
			this.model.save().done(function(res) {
				self.success(res);
			});
		},
		success: function(res) {
			if(res.code === 0) {
    			Backbone.history.navigate("portal", {trigger: true});
    		} else {
    			//console.log("login failed");
    		}
		}
	});
	
	return LoginView;
});