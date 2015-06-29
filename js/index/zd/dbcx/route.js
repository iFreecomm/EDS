define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("../navLeft/view");
    var DbcxView = require("./view");
    
    var FileCollection = require("./collection");

    var DbcxRoute = Route.extend({
        initialize: function(options) {
        	var self = this;
            this.container = options.container;
            
            this.collection = new FileCollection();
            this.collection.pageFetch().done(function() {
	            self.showView();
            });
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new DbcxView({
                	collection: this.collection
                })
            });
        }
    });

    return DbcxRoute;
});
