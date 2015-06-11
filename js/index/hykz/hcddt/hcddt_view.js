define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	
	var tmpl = require("text!web/index/hykz/hcddt/hcddt_template.html");
	
	var LxrShowView = Mn.ItemView.extend({
		id: "hykz_hcddt",
		template: Handlebars.compile(tmpl),
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
		onAttach: function() {
			Util.activeLink();
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
	  					alert("保存失败！");
	  				}
	  			});
			} else {
				$.getJSON(setHref);
			}
		}
	});
	
	return LxrShowView;
});
