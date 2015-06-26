define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("web/index/bz/navLeft/navLeft_view");
    var BbxxView = require("web/index/bz/bbxx/view");

    var BbxxRoute = Route.extend({
        initialize: function(options) {
            this.container = options.container;
            this.showView();
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new BbxxView()
            });
        }
    });

    return BbxxRoute;
});
