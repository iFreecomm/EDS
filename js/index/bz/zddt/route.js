define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("web/index/bz/navLeft/navLeft_view");
    var ZddtView = require("web/index/bz/zddt/view");

    var ZddtRoute = Route.extend({
        initialize: function(options) {
            this.container = options.container;
            this.showView();
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new ZddtView()
            });
        }
    });

    return ZddtRoute;
});
