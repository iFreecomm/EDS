define(function(require) {
    var Mn = require("marionette");
    var Util = require("web/common/util");
    
    var tmpl = require("text!./template.html");

    var MicView = Mn.ItemView.extend({
        id: "zd_mic",
        template: tmpl,
        
        onAttach: function() {
        	Util.activeLink();
        }
        
    });
    
    return MicView;
});
