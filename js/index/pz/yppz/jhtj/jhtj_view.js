define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/pz/yppz/jhtj/jhtj_template.html");
	var JhtjModel = require("web/index/pz/yppz/jhtj/jhtj_model");
	
	var JhtjView = Mn.ItemView.extend({
		id: "pz_yppz_jhtj",
		template: Handlebars.compile(tmpl),
		bindings: {
			".sliderValue": {
				observe: "eqGain",
				getVal: function($el) {
				    return $el.map(function() {
						return +$(this).text();
					}).get();
				},
				update: function($el, val) {
					$el.each(function(i) {
						$(this).text(val[i] || 0);
					});
				}
			}
		},
		events: {
			"click .btn" : "changeOutport"
		},
		initialize: function() {
			//默认输出端口是第一个
			this.model = new JhtjModel();
			this.options.templateHelpers = {
				slideNameArr: ["低频", "中低频", "中频", "中高频", "高频"]
			};
			
			this.listenTo(this.model, "change:eqGain", this.saveJhtj);
		},
		onRender: function() {
			var view =this;
			this.model
			.fetch({
				silent: true,
				data: Util.encode({
					outPort: 0
				})
			})
			.done(function() {
				view.stickit();
				Util.initSlider(view.$el);
			});
		},
		
		/**
		 * 改变输出端口
		 * @param {Object} e
		 */
		changeOutport:function(e) {
			var $btn = $(e.target);
			if($btn.is(".active")) return;
			
			$btn.addClass("active").siblings().removeClass("active");
			
			var port = $btn.data("value");
			this.model.set("outPort", port);
			
			var view = this;
			this.model
			.fetch({
				silent: true,
				data: Util.encode({
					outPort: port
				})
			})
			.done(function() {
				Util.refreshSlider(view.$el);
			});
		},
		
		/**
		 * 保存表单
		 */
		saveJhtj: function() {
			console.log("save");
			
			this.model
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		}
	});
	
	return JhtjView;
});
