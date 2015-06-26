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
			var $td = $(e.target);
			
			$.getJSON("temp.psp", Util.encode({
				enable: $td.is(".locked") ? 1 : 0
			})).done(function(res) {
				if(res.code === 0) {
					$td.toggleClass("locked");
				}
			});
		},
		
		initPzTable: function() {
			var allVenue = this.options.allVenue;
			var lockedVenue = this.options.lockedVenue;
			
			if(allVenue.length > 0) {
				this.$el.append(this._getPzTable(allVenue.slice(0, 16), lockedVenue));
			}
			
			if(allVenue.length > 16) {
				this.$el.append(this._getPzTable(allVenue.slice(16, 32), lockedVenue));
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
				var name = venue.name;
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
			var id = Math.floor(Math.random() * 10)+1;
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
