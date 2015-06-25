define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/ypclq/yyjl/pzTable_template.html");
	
	var YyjlView = Mn.ItemView.extend({
		template: tmpl,
		events: {
			"click td.used": "lockVenue"
		},
		
		onRender: function() {
			this.initPzTable();
			Radio.channel("ypclq").on("refresh", this._refresh, this);
		},
		onDestroy: function() {
			Radio.channel("ypclq").off("refresh", this._refresh);
		},
		
		lockVenue: function(e) {
			var $td = $(e.target);
			$td.toggleClass("locked");
		},
		
		initPzTable: function() {
			var allVenue = this.options.allVenue;
			var lockedVenue = this.options.lockedVenue;
			var $table = this.$(".pzTable");
			var $secondTable = $table.clone();
			
			this._setPzTable($table, allVenue.slice(0, 16), lockedVenue);
			
			if(allVenue.length > 16) {
				this._setPzTable($secondTable, allVenue.slice(16, 32), lockedVenue);
				this.$el.append($secondTable);
			}
		},
		
		_setPzTable: function($table, allVenue, lockedVenue) {
			var $ths = $table.find("th").slice(1);
			var $tds = $table.find("td"), curTd;
			_.each(allVenue, function(venue, index) {
				$ths.eq(index).text(venue.name).addClass("used");
				curTd = $tds.eq(index);
				curTd.addClass("used");
				if(_.contains(lockedVenue, venue.recordId)) {
					curTd.addClass("locked");
				}
			});
		},
		
		_refresh: function(data) {
			var index = Math.floor(Math.random() * 10);
			this.$("td.used").removeClass("active").eq(index).addClass("active");
		}
	});
	
	return YyjlView;
});
