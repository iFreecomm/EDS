define(function(require) {
    var Mn = require("marionette");
    var tmpl = require("text!web/index/bz/czzn/template.html");
    var Util = require("web/common/util");

    var CzznView = Mn.ItemView.extend({
        id: "bz_czzn",
        template: tmpl,
        
        onAttach: function() {
        	Util.activeLink();
        }
        
    });
    
    return CzznView;
});
