define(function(require) {
	var _ = require("underscore");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!./hymb_add_yppz_template.html");
	
	var YppzModel = require("./hymb_add_yppz_model");
	
	var YppzView = Mn.ItemView.extend({
		id: "hymb_add_yppz",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#enableSe": "enableSe",
			
			"#time": "time",
			"#decibel": "decibel",
			
			"#discussEnable": "discussCfg.discussEnable",
			"#discussTime": "discussCfg.time",
			"#discussVenueId": "discussCfg.venueId",
			
			"#silenceEnable": "silenceCfg.silenceEnable",
			"#silenceTime": "silenceCfg.time",
			"#silenceVenueId": "silenceCfg.venueId"
		},
		ui: {
			formBox: ".formBox",
			select: "select",
			pzTableContainer: ".pzTable-container"
		},
		events: {
			"click td": "lockVenue"
		},
		
		initialize: function(opt) {
			var hymbModel = opt.hymbModel;
			var model = {
				"enableSe": hymbModel.get("enableSe"),
				"lockedVenue": hymbModel.get("lockedVenue"),
				
				"time": hymbModel.get("time"),
				"decibel": hymbModel.get("decibel"),
				
				"discussCfg": hymbModel.get("discussCfg"),
				"silenceCfg": hymbModel.get("silenceCfg")
			};
			this.model = new YppzModel(Util.flat(model));
		},
		onRender: function() {
			this.stickit();
			this.initPzTable();
			Util.initCheckboxClass(this.$el)
				.addCheckboxEvent(this.$el)
				.initSlider(this.$el)
				.initSpinner(this.$el);
				
			this.$(".spinner").unmousewheel()
							  .prop("disabled", true)
							  .on("spinstop", function() { $(this).change(); });
							  
			Radio.channel("yppz").reply("getYppzModel", this.getYppzModel, this);
		},
		onAttach: function() {
			Util.selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		},
		onDestroy: function() {
			Radio.channel("yppz").reset();
		},
		
		lockVenue: function(e) {
			$(e.target).toggleClass("locked");
			
			var arr = this.$("td.locked").map(function() {
				return $(this).data("recordId");
			}).get();
			
			this.model.set("lockedVenue", arr);
		},
		
		initPzTable: function() {
			var allVenue = this.options.allVenue;
			var lockedVenue = this.options.lockedVenue;
			
			// 最多有32个会场
			var start = 0, num = 11;
			var tmpArr = allVenue.slice(0, num);
			while(tmpArr.length > 0) {
				this.ui.pzTableContainer.append(this._getPzTable(tmpArr, lockedVenue));
				
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
		
		getYppzModel: function() {
			return Util.fat(this.model.toJSON());
		}
	});
	
	return YppzView;
});