define(function(require) {
    var Model = require("web/common/model");

    var TimezoneModel = Model.extend({
    	defaults: {
			timezone: 0,
         	date: "2015-04-05 08:00:00",
         	dataserver: "192.168.1.1",
         	autosync: 1
        },
        urls: {
            "create": "setDateTime.psp",
            "update": "setDateTime.psp",
            "delete": "getDateTime.psp",
            "read": "getDateTime.psp"
        },
        parse: function(res) {
            return res.data;
        }
    });

    return TimezoneModel;
});