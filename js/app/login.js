define(function(require) {
    	alert($({}).jquery);
    var Backbone = require("backbone"),
    	ModelBinder = require("modelbinder");
    
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
        _modelBinder: new ModelBinder(),
        initialize: function() {
        	this._modelBinder.bind(this.model, this.el);
        },
        close: function() {
        	this._modelBinder.unbind();
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