define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("../navLeft/navLeft_view");
    var XtgxView = require("./xtgx_view");

    var XtgxRoute = Route.extend({
        initialize: function(options) {
            this.container = options.container;
            this.showView();
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new XtgxView()
            });
        }
    });

    return XtgxRoute;
});
