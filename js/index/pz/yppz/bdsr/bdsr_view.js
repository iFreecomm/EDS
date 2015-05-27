define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/pz/yppz/bdsr/bdsr_template.html");
	var BdsrModel = require("web/index/pz/yppz/bdsr/bdsr_model");
	
	var BdsrView = Mn.ItemView.extend({
		id: "pz_yppz_bdsr",
		template: Handlebars.compile(tmpl),
		events: {
			"click .btn-switch1": "toggleSwitch",
			"click .btn-switch2": "toggleSwitch",
			"click .saveBtn" : "saveBdsr"
		},
		onRender: function() {
			var view =this;
			this.model = new BdsrModel();
			this.model.fetch().done(function() {
				view.renderData();
				Util.initSlider(view.$el);
			});
		},
		
		renderData: function() {
			var vol = this.model.get("volumeSingleInPut");
			this.$(".slide-vertical-box-1").each(function(index) {
				var $this = $(this);
				var curData = vol[index];
				$this.find("[name=audInPort]").val(curData.audInPort);
				$this.find("[name=audInName]").val(curData.audInName);
				(curData.enable === 1) && $this.find("[name=enable]").addClass("active");
				(curData.phtPwrEn === 1) && $this.find("[name=phtPwrEn]").addClass("active");
				$this.find(".slider").slider(curData.involume);
			});
		},
		
		
		toggleSwitch: function(e) {
			$(e.target).toggleClass("active");
		},
		saveBdsr: function(e) {
			this.model.set({
				"volumeSingleInPut": this._getInput()
			})
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		},
		_getInput: function() {
			return this.$(".slide-vertical-box").map(function() {
				var $this = $(this);
				return {
					audInPort: +$this.find("[name=audInPort]").val(),
					audInName: $this.find("[name=audInName]").val(),
					enable: $this.find("[name=enable]").is(".active") ? 1 : 0,
					phtPwrEn: $this.find("[name=phtPwrEn]").is(".active") ? 1 : 0,
					involume: $this.find(".slider").slider("value")
				};
			}).get();
		}
	});
	
	return BdsrView;
});
