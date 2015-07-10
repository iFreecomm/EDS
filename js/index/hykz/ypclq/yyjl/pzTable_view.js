define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Util = require("web/common/util");
	
	var YyjlView = Mn.ItemView.extend({
		template: false,
		events: {
			"click td": "lockVenue"
		},
		
		onRender: function() {
			this.initPzTable();
			Radio.channel("ypclq").on("refresh", this._refresh, this);
		},
		onDestroy: function() {
			Radio.channel("ypclq").off("refresh", this._refresh);
		},
		
		lockVenue: function(e) {
			var $td = $(e.target), $lockedTd = this.$("td.locked");
			if($td.is(".locked") || $td.is(".active")) {
				$lockedTd = $lockedTd.not($td);
			} else {
				$lockedTd = $lockedTd.add($td);
			}
			
			var arr = $lockedTd.map(function() {
				return $(this).data("recordId");
			}).get();
			
			$.getJSON("setExcitedAudVenueCfg.psp", Util.encode({
				lockedVenue: arr
			})).done(function(res) {
				if(res.code === 0) {
					$td.toggleClass("locked");
				}else{
					Util.alert("锁定会场失败！");
				}
			});
		},
		
		initPzTable: function() {
			var allVenue = this.options.allVenue;
			var lockedVenue = this.options.lockedVenue;
			
			// 最多有32个会场，最多可以放下三行，所以每行最多可以放下11个会场
			var start = 0, num = 11;
			var tmpArr = allVenue.slice(0, num);
			while(tmpArr.length > 0) {
				this.$el.append(this._getPzTable(tmpArr, lockedVenue));
				
				start += num;
				tmpArr = allVenue.slice(start, start+num);
			}
		},
		
		_getPzTable: function(allVenue, lockedVenue) {
			var $table = $('<table class="pzTable"></table>');
			var $thead = $('<thead></thead>');
			var $tbody = $('<tbody></tbody>');
			var $tr1 = $('<tr><th>会场</th></tr>');
			var $tr2 = $('<tr><th>锁定</th></tr>');
			var $th = $('<th></th>');
			var $td = $('<td></td>');
			
			var curTd;
			_.each(allVenue, function(venue, index) {
				var name = venue.addrName;
				var recordId = venue.recordId;
				var $span = $('<span></span>').text(name);
				$tr1.append($th.clone().append($span).attr("title", name));
				
				curTd = $td.clone().attr("title", name).data("recordId", recordId);
				if(_.contains(lockedVenue, recordId)) {
					curTd.addClass("locked");
				}
				$tr2.append(curTd);
			});
			
			return $table.append($thead.append($tr1)).append($tbody.append($tr2));
		},
		
		_refresh: function(data) {
			var id = data.currentExcitedVenueId || 0;
			this.$("td").removeClass("active").each(function() {
				var $this = $(this);
				if($this.data("recordId") === id) {
					$this.addClass("active");
					return false;
				}
			});
		}
	});
	
	return YyjlView;
});
