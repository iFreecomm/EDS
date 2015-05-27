define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/pz/yppz/jhtj/jhtj_template.html");
	var JhtjModel = require("web/index/pz/yppz/jhtj/jhtj_model");
	
	var JhtjView = Mn.ItemView.extend({
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
		
		initialize: function() {
			this.options.templateHelpers = {
				slideNameArr: ["低频", "中低频", "中频", "中高频", "高频"]
			};
			
			this.listenTo(this.model, "change:eqGain", this.save);
		},
		onRender: function() {
			this.stickit();
			Util.initSlider(this.$el);
		},

		save: function() {
			this.model
			.save()
			.done(function() {
//				alert("保存成功！");
			})
			.fail(function() {
//				alert("保存失败！");
			});
		}
	});
	
	return JhtjView;
});
