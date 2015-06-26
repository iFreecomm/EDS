define(function(require) {
    var Mn = require("marionette");
    var tmpl = require("text!web/index/bz/zddt/template.html");
    var Util = require("web/common/util");

    var ZddtView = Mn.ItemView.extend({
        id: "bz_zddt",
        template: tmpl,
        
        onAttach: function() {
        	Util.activeLink();
        }
        
    });
    
    return ZddtView;
});
