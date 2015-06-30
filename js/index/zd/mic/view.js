define(function(require) {
    var Mn = require("marionette");
    var Util = require("web/common/util");
    
    var tmpl = require("text!./template.html");

    var MicView = Mn.ItemView.extend({
        id: "zd_mic",
        template: tmpl,
        ui: {
			formBox: ".formBox",
			mic: "#mic",
			zy: "#zy",
			testBtn: ".testBtn"
		},
		events: {
			"click .testBtn": "test"
		},
        
        onAttach: function() {
        	Util.activeLink();
        	Util.selectmenu(this.ui.mic, this.ui.formBox);
        },
        onDestroy: function() {
        	clearTimeout(this.timerId);
        },
        
        test: function() {
        	var $btn = this.ui.testBtn;
        	$btn.toggleClass("active");
        	
        	if($btn.is(".active")) {
        		this.startTest();
        	} else {
        		this.endTest();
        	}
        },
        
        startTest: function() {
    		this.ui.testBtn.text("停止测试");
    		this.ui.mic.selectmenu("option", "disabled", true);
        	this._loopTimer();
        },
        _loopTimer: function() {
        	var self = this;
        	_start();
        	
        	function _start() {
        		$.getJSON("temp.psp", Util.encode({
        			micId: self.ui.mic.val()
        		})).done(function(res) {
//      			var value = res.data.value;
					var value = Math.random() * 32;
        			self.ui.zy.val(value)
        			
	        		self.timerId = setTimeout(_start, 1000);
        		});
        	}
        },
        
        endTest: function() {
    		this.ui.testBtn.text("开始测试");
    		this.ui.mic.selectmenu("option", "disabled", false);
        	clearTimeout(this.timerId);
        }
        
    });
    
    return MicView;
});
