define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var Slider4View = require("web/slider/slider4/view");
	
	var JhtjCollectionView = Mn.CollectionView.extend({
		childView: Slider4View,
		
		initialize: function() {
			this.on("childview:save:collection", this.save);
		},
		onRender: function() {
			var names = ["低频", "中低频", "中频", "中高频", "高频"];
			
			this.$el.children().each(function(i) {
				$(this).find("h4").text(names[i]);
			});
		},
		
		save: function() {
			var col = this.collection.toJSON();
			var eqGain = _.pluck(col, "volume");
			var outPort = this.options.outPort;
			
			$.getJSON(
				"setEqSingleChannelCfg.psp",
				Util.encode({
					outPort: outPort,
					eqGain: eqGain
				})
			)
			.done(function() {
				//success
			})
			.fail(function() {
				//fail
			});
		}
	});
	
	return JhtjCollectionView;
});
