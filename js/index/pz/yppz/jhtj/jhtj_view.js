define(function(require) {
	var FormView = require("web/common/formView");
	
	var tmpl = require("text!web/index/pz/yppz/jhtj/jhtj_template.html");
	
	var JhtjView = FormView.extend({
		id: "pz_yppz_jhtj",
		template: tmpl,
		
		events: {
			"click .saveBtn" : "saveJhtj"
		},
		saveJhtj: function(e) {
			this.model.set({
				"EqSingleChannelCfgArg": this._getCfgArg()
			})
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		},
		_getCfgArg: function() {
			return this.$(".slide-vertical-box").map(function() {
				return {
					EqGain: $(this).find(".slider").slider("value")
				};
			}).get();
		},
		
		onRender: function() {
			this.renderData().fixRadio().initSlider();
		},
		renderData: function() {
			var output = this.model.get("EqSingleChannelCfgArg");
			this.$(".slide-vertical-box").each(function(i) {
				$(this).find(".sliderValue").text(output[i].EqGain || 0);
			});
			return this;
		},
		onAttach: function() {
			this.activeLink();
		}
	});
	
	return JhtjView;
});
