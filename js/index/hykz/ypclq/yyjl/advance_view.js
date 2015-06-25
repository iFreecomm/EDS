define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/ypclq/yyjl/advance_template.html");
	
	var AdvanceView = Mn.ItemView.extend({
		template: tmpl,
		bindings: {
			"#discussEnable": "discussCfg.discussEnable",
			"#discussTime": "discussCfg.time",
			"#discussVidInPort": "discussCfg.vidInPort",
			
			"#silenceEnable": "silenceCfg.silenceEnable",
			"#silenceTime": "silenceCfg.time",
			"#silenceVidInPort": "silenceCfg.vidInPort"
		},
		ui: {
			formBox: ".formBox",
			select: "select",
			moreBtn: ".more"
		},
		events: {
			"click .more": "showMore"
		},
		
		initialize: function() {
			this.listenTo(this.model, "change", this.save);
		},
		onRender: function() {
			this.stickit();
			var $el = this.$el;
			Util.initCheckboxClass($el)
				.addCheckboxEvent($el)
				.initSpinner($el);
			
			this.$(".spinner").unmousewheel()
							  .prop("disabled", true)
							  .on("spinstop", function() { $(this).change(); });
		},
		onAttach: function() {
			Util.selectmenu(this.ui.select, this.ui.formBox);
			this.$("select").each(function() {
				$(this).selectmenu("option", "position", {my:"left bottom", at:"left top", collision:"none"})
					   .selectmenu("menuWidget").css({maxHeight:160});
			})
		},
		
		save: function() {
			$.getJSON("setYyjlAdvanceCfg.psp", Util.encode(Util.fat(this.model.toJSON())))
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		
		showMore: function() {
			var box = this.ui.formBox;
			var btn = this.ui.moreBtn;
			
			if(btn.is(".active")) {
				box.animate({top:240}, "fast", function() {
					box.hide();
				});
				btn.text("更多");
			} else {
				box.show().animate({top:32}, "fast");
				btn.text("关闭");
			}
			btn.toggleClass("active");
		}
	});
	
	return AdvanceView;
});
