define(function(require) {
    var Mn = require("marionette");
    var Util = require("web/common/util");
    var tmpl = require("text!./xtgx_template.html");

    var XtgxView = Mn.ItemView.extend({
        id: "pz_xtgx",
        template: tmpl,
        
        onAttach: function() {
        	Util.activeLink();
        }
    });
    
    return XtgxView;
});
