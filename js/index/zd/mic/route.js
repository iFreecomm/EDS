define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("../navLeft/view");
    var MicView = require("./view");

    var MicRoute = Route.extend({
        initialize: function(options) {
            this.container = options.container;
            this.showView();
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new MicView()
            });
        }
    });

    return MicRoute;
});
