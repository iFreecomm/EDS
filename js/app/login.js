define(function(require) {
    var Backbone = require("backbone");
    require("stickit");
    
    Backbone.sync = function(method, model, callback) {
    	$.ajax({
    		type: "GET",
    		url: "json/login.json",
    		data: model.attributes,
    		dataType: "json"
    	}).done(function(data) {
    		if(data.state) {
    			location.href = "portal.html";
    		} else {
    			console.log("login failed");
    		}
    	});
    };
    
    var LoginView = Backbone.View.extend({
        el: ".login-box",
        model: new Backbone.Model(),
        initialize: function() {
        	this.stickit(this.model, {
        		"#username": "username",
        		"#password": "password",
        		"[name=ah]": "ah"
        	});
        },
        close: function() {
        	this.unstickit();
        },
        events: {
            "click [type=submit]": "submit"
        },
        submit: function(e) {
            e.preventDefault();
            this.model.save();
        }
    });
    
    new LoginView();
});