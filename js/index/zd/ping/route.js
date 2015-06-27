define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("../navLeft/view");
    var PingView = require("./view");

    var PingRoute = Route.extend({
        initialize: function(options) {
            this.container = options.container;
            this.showView();
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new PingView()
            });
        }
    });

    return PingRoute;
});
