define(function(require) {
    var Mn = require("marionette");
    var Util = require("web/common/util");
    
    var tmpl = require("text!./template.html");

    var MicView = Mn.ItemView.extend({
        id: "zd_mic",
        template: tmpl,
        ui: {
			formBox: ".formBox",
			select: "select"
		},
        
        onAttach: function() {
        	Util.activeLink();
        	Util.selectmenu(this.ui.select, this.ui.formBox);
        }
        
    });
    
    return MicView;
});
