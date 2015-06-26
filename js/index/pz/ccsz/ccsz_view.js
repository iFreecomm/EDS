define(function(require) {
    var Mn = require("marionette");
    var tmpl = require("text!web/index/pz/ccsz/ccsz_template.html");
    var Util = require("web/common/util");

    var CcszView = Mn.ItemView.extend({
        id: "pz_ccsz",
        template: tmpl,
        events: {
            "click .resetBtn" : "ccsz"
        },
        
        onAttach: function() {
        	Util.activeLink();
        },
        
        ccsz: function() {
            $.getJSON("temp.psp").done(this.saveSuccess).fail(this.saveError);
        },
        saveSuccess:function(){
            Util.alert("恢复出厂设置成功");
        },
        saveError:function(){
            Util.alert("恢复出厂设置失败，请重试");
        }
    });
    
    return CcszView;
});
