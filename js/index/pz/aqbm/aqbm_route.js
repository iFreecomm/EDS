define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("../navLeft/navLeft_view");
    var AqbmView = require("./aqbm_view");
    
    var AqbmModel = require("./aqbm_model");

    var AqbmRoute = Route.extend({
        initialize: function(options) {
        	var self = this;
            this.container = options.container;
            
            this.model = new AqbmModel();
            
            this.model.fetch().done(function() {
	            self.showView();
            });
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new AqbmView({
                	model: this.model
                })
            });
        }
    });

    return AqbmRoute;
});
