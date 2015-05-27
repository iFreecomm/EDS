define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/bdsc_bz/bdsc_template.html");
	
	var BdsrView = Mn.ItemView.extend({
		id: "pz_yppz_bdsc_bz",
		template: tmpl,
		events: {
			"click td": "bz"
		},
		onRender: function() {
			this.renderData();
		},
		onAttach: function() {
			Util.activeLink();
		},
		
		bz: function(e) {
			var $tar = $(e.target);
			
			if($tar.is(".active")) {
				$tar.removeClass("active");
			} else {
				var $trs = this.$("tr").slice(1);
				var index = $tar.index();
				$trs.each(function() {
					$(this).children().eq(index).removeClass("active");
				});
				$tar.addClass("active");
			}
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
		}
	});
	
	return BdsrView;
});
