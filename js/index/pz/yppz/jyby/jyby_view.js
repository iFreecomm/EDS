define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/jyby/jyby_template.html");
	
	var JybyView = Mn.ItemView.extend({
		id: "pz_yppz_jyby",
		template: tmpl,
		events: {
			"click .btn": "clickBtn"
		},
		
		onRender: function() {
			var self = this;
			this.$("[getHref]").each(function() {
				var $btn = $(this);
				var getHref = $btn.attr("getHref");
				$.getJSON(getHref).done(function(res) {
					var enable = res.data.enable;
					$btn.data("enable", enable);
					enable && $btn.addClass("active"); 
				});
			});
		},
		
		clickBtn: function(e) {
			var $btn = $(e.target);
			var setHref = $btn.attr("setHref");
			if($btn.attr("getHref")) {
				var enable = $btn.data("enable");
				enable = enable ? 0 : 1;
				
				$.getJSON(setHref, Util.encode({
	  				enable: enable
	  			})).done(function(res){
	  				if(res.code == 0)
	  				{
	  					$btn.data("enable", enable).toggleClass("active");
	  				}
	  				else
	  				{
	  					Util.alert("保存失败！");
	  				}
	  			});
			} else {
				$.getJSON(setHref);
			}
		}
	});
	
	return JybyView;
});
