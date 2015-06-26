define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("web/index/pz/navLeft/navLeft_view");

    var DyxxView = require("web/index/pz/dyxx/dyxx_view");
    var DyxxModel = require("web/index/pz/dyxx/dyxx_model");

    var DyxxRoute = Route.extend({
        initialize: function(options) {
            var self = this;
            this.container = options.container;
            this.dyxxModel = new DyxxModel();

            this.dyxxModel.fetch().done(function() {
                self.showView();
            });
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new DyxxView({
                    model: this.dyxxModel
                })
            });
        }
    });

    return DyxxRoute;
});