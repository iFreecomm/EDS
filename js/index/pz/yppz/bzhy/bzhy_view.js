define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/bzhy/bzhy_template.html");
	
	var BzhyView = Mn.ItemView.extend({
		id: "pz_yppz_bzhy",
		template: tmpl,
		events: {
			"click td" : "saveBzhy",
		},
		
		onRender: function() {
			this.renderData();
		},
		
		saveBzhy: function(e) {
			var $td = $(e.target);
			$td.toggleClass("active");
			
			var $tr = $td.parent();
			var trIndex = $tr.index();
			
			var portArr = $tr.find(".active").map(function() {
				return $(this).index() - 1;
			}).get();
			
			this.collection.at(trIndex)
			.save({
				audInPort: portArr,
				inputNum: portArr.length
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
				var audInPort = model.get("audInPort");
				var $tds = $trs.eq(groupNum).children("td");
				
				for(var i = 0, l = audInPort.length; i < l; i ++) {
					$tds.eq(audInPort[i]).addClass("active");
				}
			});
		}
	});
	
	return BzhyView;
});
