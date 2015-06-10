define(function(require) {
	var $ = require("jquery");
	var Moment = require("moment");
	var Handlebars = require("handlebars");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!web/index/zkhy/ydyhy/ydyhy_add_form_template.html");
	
	var YdyhyAddFormView = Mn.ItemView.extend({
		id: "ydyhy_add_form",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#name": "name",
			"#number": "number",
			"#desc": "desc",
			"#meetingType": "meetingType",
			"#tempRecordId": "tempRecordId",
			"#pwChairman": "pwChairman",
			"#yyrq": "yyrq",
			"#jsrq": "jsrq",
			"#tempRecordId": "tempRecordId",
			"#pwMeeting": "pwMeeting",
			
			"#bandwidth": {
				observe: "bandwidth",
				selectName: "bandwidth"
			}
		},
		checkOptions: {
			"#name": {
				constraint: ["notNull", "trimCheck"],
				appendTo: ".formCell"
			},
			"#number": {
				constraint: ["notNull", "numberCheck"],
				appendTo: ".formCell"
			},
    		"#pwMeeting": {
    			constraint: ["passCheck"],
    			appendTo: ".formCell"
    		},
    		"#pwChairman": {
				constraint: ["passCheck"],
				appendTo: ".formCell"
			},
    		"#desc": {
    			constraint: ["trimCheck"],
    			appendTo: ".formCell"
    		}
		},
		ui: {
			formBox: ".formBox",
			select: "select",
			yyrq_con: "#yyrq_container",
			jsrq_con: "#jsrq_container",
			yyrq: "#yyrq",
			jsrq: "#jsrq"
		},
		events: {
			"keyup": "checkInput",
			"click .saveBtn": "saveMeeting",
			"click .cancelBtn": "cancelMeeting"
		},
		
		initialize: function() {
			Util.setSelectBindings(this.bindings);
			
			this.listenTo(this.model, "change:tempRecordId", this.changeHymb);
			this.listenTo(this.model, "change:meetingType", this.changeHylx);
		},
		onRender: function() {
			if(this.model.isNew())
			{
				this.stickit().changeHymb();
			}
			else
			{
//				Radio.channel("yhz").command("loadHymb", this.model.get("venueId"));
			}
			this.stickit().changeHylx();
		},
		onAttach: function() {
			//selectmenu方法中触发了change事件，导致触发changeHymb方法，从而覆盖了原始数据
			//TODO
			Util.selectmenu(this.ui.select, this.ui.formBox);
			this.initYyrqAndJsrq();
			$.timepicker.datetimeRange(
				this.ui.yyrq,
				this.ui.jsrq
			);
			
			if(!this.model.isNew()) {
				this.$("#name").prop("disabled", true).addClass("disabled");
				this.$("#tempRecordId").selectmenu("option", "disabled", true);
			}
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		saveMeeting: function(e) {
			e.preventDefault();
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;
			
			var self = this;
			
			this.saveDateTimeDurationToModel();
			
			var yhzArr = Radio.channel("yhz").request("getYhzArr");
			
			this.model.set("venueId", yhzArr)
					  .save().done(function() {
						  self.saveSuccess();
					  }).fail(function() {
						  self.saveError();
					  });
		},
		saveSuccess: function() {
			this.cancelMeeting();
		},
		saveError: function() {
			alert("保存会议失败！");
		},
		
		cancelMeeting: function() {
			Util.navigate("zkhy/showYdyhy", {trigger: true});
		},
		
		initYyrqAndJsrq: function() {
			this.model.set({
				yyrq: this.getYyrqString(),
				jsrq: this.getJsrqString()
			});
		},
		getYyrqMoment: function() {
			var date = this.model.get("date");
			var time = this.model.get("time");
			if(!date || !time){
				return Moment();
			}
			return Moment(date + " " + time);
		},
		getYyrqString: function() {
			var yyrqMoment = this.getYyrqMoment();
			if(yyrqMoment.isValid()) {
				return yyrqMoment.format("YYYY-MM-DD HH:mm");
			} else {
				return "";
			}
		},
		getJsrqString: function() {
			var duration = this.model.get("duration");
			var yyrqMoment = this.getYyrqMoment();
			if(yyrqMoment.isValid()) {
				yyrqMoment.add(duration, "minutes");
				return yyrqMoment.format("YYYY-MM-DD HH:mm");
			} else {
				return "";
			}
		},
		getDateTime: function() {
			var date, time;
			var yyrqDate = Moment(this.ui.yyrq.val());
			if(yyrqDate.isValid()) {
				date = yyrqDate.format("YYYY-MM-DD");
				time = yyrqDate.format("HH:mm:ss");
				return [date, time];
			}
		},
		getDuration: function() {
			var yyrqDate = Moment(this.ui.yyrq.val());
			var jsrqDate = Moment(this.ui.jsrq.val());
			if(yyrqDate.isValid() && jsrqDate.isValid()) {
				return jsrqDate.diff(yyrqDate, "minutes");
			}
		},
		saveDateTimeDurationToModel: function() {
			if(this.model.get("meetingType") != 1) return; //不是预约会议
			var datetime = this.getDateTime();
			var duration = this.getDuration();
			if(datetime && duration) {
				this.model.set({
					date: datetime[0],
					time: datetime[1],
					duration: duration
				});
			} else {
				alert("日期不合法！");
			}
		},
		getTempRecordId: function() {
			if(this.model.get("tempRecordId")) {
				return this.model.get("tempRecordId");
			} else {
				if(this.options.templateHelpers.allTemp && this.options.templateHelpers.allTemp.length>0)
				{
					var tempId = this.options.templateHelpers.allTemp[0].recordId;
					this.model.set("tempRecordId",tempId);
					return tempId;
				}
					
			}
			return -1;
		},
		changeHymb: function() {
			$.getJSON("getMeetingTempVenue.psp", Util.encode({
				recordId: this.getTempRecordId()
			})).done(function(yhzIdArr) {
				var venueId = [];
				if(yhzIdArr && yhzIdArr.data && yhzIdArr.data.venueId) {
					venueId = yhzIdArr.data.venueId;
				}
				Radio.channel("yhz").command("loadHymb", venueId);
			});
			return this;
		},
		changeHylx: function() {
			var hylx = this.model.get("meetingType");
			if(hylx === 1 || hylx === 0) { //预约会议
				this.ui.yyrq_con.show();
				this.ui.jsrq_con.show();
			} else {
				this.ui.yyrq_con.hide();
				this.ui.jsrq_con.hide();
			}
			if(hylx === 0)
			{
				this.ui.yyrq.prop("disabled", true).addClass("disabled");
			}
			else
			{
				this.ui.yyrq.prop("disabled", false).removeClass("disabled");
			}
			return this;
		}
	});
	
	return YdyhyAddFormView;
});