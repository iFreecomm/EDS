define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
    var CcszView = require("web/index/pz/ccsz/ccsz_view");

    var CcszRoute = Route.extend({
        initialize: function(options) {
            this.container = options.container;
            this.showView();
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new CcszView()
            });
        }
    });

    return CcszRoute;
});
