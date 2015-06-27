define(function(require) {
    var Mn = require("marionette");
    var Util = require("web/common/util");
    
    var tmpl = require("text!./template.html");

    var DbcxView = Mn.ItemView.extend({
        id: "zd_dbcx",
        template: tmpl,
        
        onAttach: function() {
        	Util.activeLink();
        }
        
    });
    
    return DbcxView;
});
