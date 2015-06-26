define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("web/index/pz/navLeft/navLeft_view");

    var RqsjView = require("web/index/pz/rqsj/rqsj_view");
    var RqsjModel = require("web/index/pz/rqsj/rqsj_model");

    var RqsjRoute = Route.extend({
        initialize: function(options) {
            var self = this;
            this.container = options.container;
            this.rqsjModel = new RqsjModel();

            this.rqsjModel.fetch().done(function() {
                self.showView();
            });
        },
        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new RqsjView({
                    model: this.rqsjModel
                })
            });
        }
    });

    return RqsjRoute;
});