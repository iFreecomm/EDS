define(function(require) {
    var tmpl = require("text!tmpl/login.html");
    
    var Backbone = require("backbone");
    require("stickit");
    
    var LoginModel = Backbone.Model.extend({
    	urls: {
			"create": "json/login.do"
    	}
    });
    
    var LoginView = Backbone.View.extend({
    	name: "login",
    	id: "wrapper",
        events: {
            "click [type=submit]": "submit"
        },
        bindings: {
    		"#username": "username",
    		"#password": "password"
        },
        initialize: function() {
	        this.model = new LoginModel();
	        this.render();
        },
        render: function() {
        	this.$el.html(tmpl);
        	this.stickit();
        },
        submit: function(e) {
            e.preventDefault();
            this.model.save({}, {
            	success: this.success
            });
        },
        success: function(model, resp, opt) {
        	if(resp.state) {
    			require("router").navigate("portal", {trigger: true});
    		} else {
    			console.log("login failed");
    		}
        },
        close: function() {
        	this.unstickit();
        	this.remove();
        }
    });
    
    return LoginView;
});