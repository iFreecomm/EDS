define(function(require) {
    var Model = require("web/common/model");

    var DyxxModel = Model.extend({
        defaults: {
            powersaving: 1,
            closedisplay: 1,
            dormant: 1,
            shutdown: 1
        },
        urls: {
            "create": "getPowerSet.psp",
            "update": "setPowerSet.psp",
            "delete":"getPowerSet.psp",
            "read": "getPowerSet.psp"
        },
        parse: function(res) {
            return res.data;
        }
    });

    return DyxxModel;
});