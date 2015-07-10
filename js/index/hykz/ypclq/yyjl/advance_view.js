define(function(require) {
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/ypclq/yyjl/advance_template.html");
	
	var AdvanceView = Mn.ItemView.extend({
		template: Handlebars.compile(tmpl),
		bindings: {
			"#discussEnable": "discussCfg.discussEnable",
			"#discussTime": "discussCfg.time",
			"#discussVenueId": "discussCfg.venueId",
			
			"#silenceEnable": "silenceCfg.silenceEnable",
			"#silenceTime": "silenceCfg.time",
			"#silenceVenueId": "silenceCfg.venueId"
		},
		ui: {
			formBox: ".formBox",
			select: "select"
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
			});
			this.ui.select.change();
		},
		
		save: function() {
			$.getJSON("setExcitedAudSeniorCfg.psp", Util.encode(Util.fat(this.model.toJSON())))
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		}
	});
	
	return AdvanceView;
});
