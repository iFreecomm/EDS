define(function(require) {
    var Route = require("web/common/route");

    var NavLeftView = require("../navLeft/view");
    var DbcxView = require("./view");

    var DbcxRoute = Route.extend({
        initialize: function(options) {
            this.container = options.container;
            this.showView();
        },

        showView: function() {
            this.show({
                navLeftView: NavLeftView,
                contentRightView: new DbcxView()
            });
        }
    });

    return DbcxRoute;
});
