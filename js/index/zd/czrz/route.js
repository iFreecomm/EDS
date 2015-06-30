define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("../navLeft/view");
    var CzrzView = require("./view");
    
    var TableView = require("./table_view");
    var TableCollection = require("./table_collection");
    
    var SearchModel = require("./model");

    var CzrzRoute = Route.extend({
        initialize: function(options) {
        	var self = this;
            this.container = options.container;
            
            this.searchModel = new SearchModel();
            this.collection = new TableCollection();
            this.collection.searchTerms = this.searchModel.toJSON();
            
            this.collection.pageFetch().done(function() {
	            self.showView();
            });
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new CzrzView({
                	model: this.searchModel
                }),
                tableView: new TableView({
                	collection: this.collection
                })
            });
        }
    });

    return CzrzRoute;
});
