define(function(require) {
    var Mn = require("marionette");
    var Util = require("web/common/util");
    
    var tmpl = require("text!./template.html");

    var XtztView = Mn.ItemView.extend({
        id: "zd_xtzt",
        template: tmpl,
        
        onAttach: function() {
        	Util.activeLink();
        }
        
    });
    
    return XtztView;
});
