define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	
	var tmpl = require("text!web/index/hykz/hcddt/hcddt_template.html");
	
	require("mobilyblocks");
	
	var LxrShowView = Mn.ItemView.extend({
		id: "hykz_hcddt",
		template: Handlebars.compile(tmpl),
		events: {
			"click .btn": "clickBtn",
			"click .delBtn": "delLxr",
			"click .box-container a": "selectLxr",
			"click .circleMenu li": "circleMenu"
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
			this.$(".circleMenu").mobilyblocks().find(".trigger").click();
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
		},
		
		delLxr: function(e) {
			e.preventDefault();
			var $btn = $(e.target);
			var id = $btn.data("id");
			
			$.getJSON("delSession.psp", Util.encode({
				recordId: id
			})).done(function(res) {
				if(res.code === 0) {
					$btn.parents("li").remove();
				} else {
					Util.alert("删除会场失败！");	
				}
			}).fail(function() {
				Util.alert("删除会场失败！");
			});
			
		},
		
		selectLxr: function(e) {
			e.preventDefault();
			var $a = $(e.currentTarget);
			this.$(".box-container").find("a").removeClass("active");
			$a.addClass("active");
			
			this.selectedId = $a.next().data("id");
		},
		
		circleMenu: function(e) {
			if(typeof this.selectedId !== 'number') {
				Util.alert("必须选择一个联系人！");
				return false;
			}
			
			var $li = $(e.currentTarget);
			
			var self = this;
			var ctrlType = $li.data("ctrltype");
			
			$.getJSON("temp.psp", Util.encode({
				recordId: this.selectedId,
				ctrlType: ctrlType
			}));
		}
	});
	
	return LxrShowView;
});
