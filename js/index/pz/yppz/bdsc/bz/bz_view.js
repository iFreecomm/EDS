define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/bdsc/bz/bz_template.html");
	
	var BzView = Mn.ItemView.extend({
		id: "pz_yppz_bdsc_bz",
		template: tmpl,
		events: {
			"click td": "saveBz"
		},
		onRender: function() {
			this.renderData();
		},
		
		saveBz: function(e) {
			var $td = $(e.target);
			
			var outPort = $td.index() - 1;
			var groupNum = $td.parent().index();
			
			if($td.is(".active")) {
				$td.removeClass("active");
			} else {
				var $trs = this.$("tr").slice(1);
				$trs.each(function() {
					$(this).children("td").eq(outPort).removeClass("active");
				});
				$td.addClass("active");
			}
			
			this.collection.at(outPort)
			.save({
				groupNum: groupNum
			})
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		
		renderData: function() {
			var $trs = this.$("tr").slice(1);
			
			this.collection.forEach(function(model) {
				var groupNum = model.get("groupNum");
				var audOutPort = model.get("audOutPort");
				
				$trs.eq(groupNum).children("td").eq(audOutPort).addClass("active");
			});
		}
	});
	
	return BzView;
});
