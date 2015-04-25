define(function(require) {
	var FormView = require("web/common/formView");
	
	var tmpl = require("text!web/index/pz/yppz/bdsc/bdsc_template.html");
	
	var BdsrView = FormView.extend({
		id: "pz_yppz_bdsc",
		template: tmpl,
		
		events: {
			"click .btn-switch1": "toggleSwitch",
			"click .saveBtn" : "saveBdsc"
		},
		saveBdsr: function(e) {
			this.model.set({
				"volumeSingleOutPut": this._getOutput()
			})
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		},
		_getOutput: function() {
			var $el = this.$el;
			return this.$(".slide-vertical-box").map(function(i) {
				var groupName = "out" + (i + 1);
				var $this = $(this);
				return {
					groupNum: $el.find('[name=' + groupName + ']:checked').val(),
					audInPort: +$this.find("[name=audInPort]").val(),
					audInName: $this.find("[name=audInName]").val(),
					enable: $this.find("[name=enable]").is(".active") ? 1 : 0,
					phtPwrEn: $this.find("[name=phtPwrEn]").is(".active") ? 1 : 0,
					involume: $this.find(".slider").slider("value")
				};
			}).get();
		},
		
		onRender: function() {
			this.fixRadio().initSlider();
		},
		onAttach: function() {
			this.activeLink();
		}
	});
	
	return BdsrView;
});
