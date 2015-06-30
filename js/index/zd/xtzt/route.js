define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("../navLeft/view");
    var XtztView = require("./view");

    var XtztRoute = Route.extend({
        initialize: function(options) {
        	var self = this;
            this.container = options.container;
            
            $.getJSON("getXtztData.psp").done(function(res) {
            	self.xtztData = res.data;
            	
            	self.showView();
            });
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new XtztView({
                	templateHelpers: {
                		xtztData: this.xtztData
                	}
                })
            });
        }
    });

    return XtztRoute;
});
