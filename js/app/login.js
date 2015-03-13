define(function(require) {
    var Backbone = require("backbone");
    require("stickit");
    
    var LoginModel = Backbone.Model.extend({
    	urls: {
			"create": "json/login.json"
    	}
    });
    
    var LoginView = Backbone.View.extend({
        el: ".login-box",
        model: new LoginModel(),
        events: {
            "click [type=submit]": "submit"
        },
        bindings: {
    		"#username": "username",
    		"#password": "password"
        },
        initialize: function() {
        	this.stickit();
        },
        close: function() {
        	this.remove().unstickit();
        },
        submit: function(e) {
            e.preventDefault();
            this.model.save({}, {
            	success: this.success
            });
        },
        success: function(model, resp, opt) {
//      	if(resp.state) {
//  			location.href = "portal.html";
//  		} else {
//  			console.log("login failed");
//  		}
alert("success");
        }
    });
    
    new LoginView();
});