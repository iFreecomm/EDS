define(function(require) {
	var Backbone = require("backbone");
	var Mn = require("marionette");
	var tmpl = require("text!web/login/login_template.html");
	
	var LoginModel = Backbone.Model.extend({
		urls: {
			"create": "login.psp"
		}
	});
	
	var LoginView = Mn.ItemView.extend({
		id: "wrapper",
		template: tmpl,
		events: {
			"click [type=submit]": "login"
		},
		bindings: {
			"#username": "username",
    		"#password": "password"
		},
		initialize: function() {
			this.model = new LoginModel();
		},
		
		login: function(e) {
			e.preventDefault();
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