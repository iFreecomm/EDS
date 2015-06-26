define(function(require) {
    var Mn = require("marionette");
    var tmpl = require("text!web/index/bz/bbxx/template.html");
    var Util = require("web/common/util");

    var BbxxView = Mn.ItemView.extend({
        id: "bz_bbxx",
        template: tmpl,
        
        onAttach: function() {
        	Util.activeLink();
        }
        
    });
    
    return BbxxView;
});
