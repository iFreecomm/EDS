define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/bzhy/bzhy_template.html");
	var BzhyModel = require("web/index/pz/yppz/bzhy/bzhy_model");
	
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
			
			var trIndex = $td.parent().index();
			
			var portArr = $td.siblings(".active").map(function() {
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
			this.collection.forEach(function(model) {
				var groupNum = model.get("groupNum");
				var audInPort = model.get("audInPort");
				var $tds = this.$(".pzTable").find("tr").eq(groupNum+1).children("td");
				
				for(var i = 0, l = audInPort.length; i < l; i ++) {
					$tds.eq(audInPort[i]).addClass("active");
				}
			}, this);
			
			
		}
	});
	
	return BzhyView;
});
