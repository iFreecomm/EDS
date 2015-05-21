define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/bdsc_bz/bdsc_template.html");
	
	var BdsrView = Mn.ItemView.extend({
		id: "pz_yppz_bdsc",
		template: tmpl,
		
		events: {
			"click .btn-switch1": "toggleSwitch",
			"click .saveBtn" : "saveBdsc"
		},
		toggleSwitch: function(e) {
			$(e.target).toggleClass("active");
		},
		saveBdsc: function(e) {
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
					groupNum: +$el.find('[name=' + groupName + ']:checked').val(),
					enable: $this.find("[name=enable]").is(".active") ? 1 : 0,
					outVol: $this.find(".slider").slider("value")
				};
			}).get();
		},
		
		onRender: function() {
			this.renderData();
			Util.initRadioClass(this.$el)
				.addRadioEvent(this.$el)
				.initSlider(this.$el);
		},
		renderData: function() {
//			var output = this.model.get("volumeSingleOutPut");
//			var $el = this.$el;
//			this.$(".slide-vertical-box").each(function(i) {
//				var curOut = output[i];
//				var groupName = "out" + (i + 1);
//				var groupNum = curOut.groupNum;
//				var groupSelector = '[name=' + groupName + '][value=' + groupNum + ']';
//				var $this = $(this);
//				$el.find(groupSelector).prop("checked", true);
//				curOut.enable && $this.find("[name=enable]").addClass("active");
//				$this.find(".sliderValue").text(curOut.outVol || 0);
//			});
			return this;
		},
		onAttach: function() {
			Util.activeLink();
		}
	});
	
	return BdsrView;
});
