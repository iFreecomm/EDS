define(function(require) {
    var Mn = require("marionette");
    var Util = require("web/common/util");
    
    var tmpl = require("text!./template.html");

    var PingView = Mn.ItemView.extend({
        id: "zd_ping",
        template: tmpl,
        ui: {
        	ip: "#ip",
        	testBtn: ".testBtn",
        	pingResult: ".pingResult"
        },
        events: {
        	"click .testBtn": "test"
        },
        
        onRender: function() {
        	this.ui.ip.initIP();
        },
        onAttach: function() {
        	Util.activeLink();
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
    		this.ui.testBtn.text("取消测试");
    		this.ui.pingResult.empty();
    		this._say("正在测试...");
    		this._say("测试IP是："+this.ui.ip.val());
    		
    		var self = this;
    		this.currentAjax = $.ajax({
    			url: "temp.psp",
    			timeout: 1,
    			dataType: "json",
    			data: Util.encode({
	    			ip: this.ui.ip.val()
	    		})
    		}).done(function(res) {
    			self._testSuccess(res);
    		}).fail(function() {
    			self._testError();
    		});
        },
        _testSuccess: function(res) {
        	this.ui.testBtn.text("开始测试").removeClass("active");
//      	var value = res.data.value;
			var value = Math.random() * 32;
			self._say(value);
			this._say("测试完成！");
        },
        _testError: function() {
        	this.ui.testBtn.text("开始测试").removeClass("active");
			this._say("测试取消了！");
        },
        
        endTest: function() {
    		this.ui.testBtn.text("开始测试");
    		
    		this.currentAjax.abort();
    		this.currentAjax = null;
    		
    		this._say("测试取消了！");
        },
        
        _say: function(result) {
        	this.ui.pingResult.append(result).append("<br>");
        }
        
    });
    
    return PingView;
});
