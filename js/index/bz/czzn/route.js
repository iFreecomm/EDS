define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("web/index/bz/navLeft/navLeft_view");
    var CzznView = require("web/index/bz/czzn/view");

    var CzznRoute = Route.extend({
        initialize: function(options) {
            this.container = options.container;
            this.showView();
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new CzznView()
            });
        }
    });

    return CzznRoute;
});
