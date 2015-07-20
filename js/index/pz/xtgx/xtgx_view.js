define(function(require) {
    var Mn = require("marionette");
    var Util = require("web/common/util");
    var tmpl = require("text!./xtgx_template.html");

	require("uploadify");

    var XtgxView = Mn.ItemView.extend({
        id: "pz_xtgx",
        template: tmpl,
        
        onAttach: function() {
        	Util.activeLink();
        	
        	this.$("#licenceBtn").uploadify({
        		"swf": "js/lib/pro/uploadify/uploadify.swf",
        		"uploader": "temp.psp",
        		"buttonText": "升级Licence"
        	});
        	
        	this.$("#logoBtn").uploadify({
        		"swf": "js/lib/pro/uploadify/uploadify.swf",
        		"uploader": "temp.psp",
        		"buttonText": "升级Logo"
        	});
        	
        	this.$("#cfgInBtn").uploadify({
        		"swf": "js/lib/pro/uploadify/uploadify.swf",
        		"uploader": "temp.psp",
        		"buttonText": "配置导入"
        	});
        }
    });
    
    return XtgxView;
});
