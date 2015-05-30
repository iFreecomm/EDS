define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/jyby/jyby_template.html");
	
	var JybyView = Mn.ItemView.extend({
		id: "pz_yppz_jyby",
		template: tmpl,
		events: {
			"click .btn": "toggleSwitch"
		},
		
		onRender: function() {
			var self = this;
			$.when(
				$.getJSON("getMuteFlag.psp"),//静音
				$.getJSON("getShieldFlag.psp")//闭音
			).done(function(mute,shield) {
				if(mute[0].data.enable == 1)
				{
					self.$(".btn-switch4").addClass("active");
				}
				
				if(shield[0].data.enable == 1)
				{
					self.$(".btn-switch5").addClass("active");
				}
			});
		},
		
		urls: ["setMuteFlag.psp", "setShieldFlag.psp"],
		toggleSwitch: function(e) {
			var $this = $(e.target);
  			var index = $this.index();
  			var value = $this.is(".active") ? 1 : 0;
  			$.getJSON(this.urls[index], Util.encode({
  				enable: value
  			})).done(function(res){
  				if(res.code == 0)
  				{
  					$this.toggleClass("active");
  				}
  				else
  				{
  					alert("保存失败！");
  				}
  			});
  		}
	});
	
	return JybyView;
});
