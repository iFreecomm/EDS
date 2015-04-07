define(function(require) {
	var $ = require("jquery");
	var Moment = require("moment");
	var Handlebars = require("handlebars");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/zkhy/ydyhy/ydyhy_add_form_template.html");
	
	var YdyhyAddFormView = FormView.extend({
		id: "ydyhy_add_form",
		template: Handlebars.compile(tmpl),
		ui: {
			yyrq_con: "#yyrq_container",
			jsrq_con: "#jsrq_container",
			yyrq: "#yyrq",
			jsrq: "#jsrq"
		},
		events: {
			"click .saveBtn": "saveMeeting",
			"click .cancelBtn": "cancelMeeting"
		},
		saveMeeting: function(e) {
			e.preventDefault();
			var self = this;
			
			this.saveDateTimeDurationToModel();
			
			var yhzArr = Radio.channel("venueId").request("getYhzArr");
			
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
			Backbone.history.navigate("zkhy/showYdyhy", {trigger: true});
		},
		
		initialize: function() {
			this.listenTo(this.model, "change:tempRecordId", this.changeHymb);
			this.listenTo(this.model, "change:meetingType", this.changeHylx);
			
			this.bindings = this.getBindings({
				"#name": "name",
				"#number": "number",
				"#desc": "desc",
				"#meetingType": "meetingType",
				"#pwChairman": "pwChairman",
				"#yyrq": "yyrq",
				"#jsrq": "jsrq",
				"#tempRecordId": "tempRecordId",
				"#pwMeeting": "pwMeeting"
			}, [
				"bandwidth"
			]);
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
				return this.options.templateHelpers.allTemp[0].recordId;
			}
		},
		changeHymb: function() {
			$.getJSON("getMeetingTempVenue.psp", JSON.stringify({
				recordId: this.getTempRecordId()
			})).done(function(yhzIdArr) {
				var venueId = [];
				if(yhzIdArr && yhzIdArr.data && yhzIdArr.data.venueId) {
					venueId = yhzIdArr.data.venueId;
				}
				Radio.channel("venueId").command("loadHymb", venueId);
			});
			return this;
		},
		changeHylx: function() {
			var hylx = this.model.get("meetingType");
			if(hylx === 1) { //预约会议
				this.ui.yyrq_con.show();
				this.ui.jsrq_con.show();
			} else {
				this.ui.yyrq_con.hide();
				this.ui.jsrq_con.hide();
			}
			return this;
		},
		onRender: function() {
			this.stickit().changeHymb().changeHylx();
		},
		onAttach: function() {
			this.selectmenu();
			this.initYyrqAndJsrq();
			$.timepicker.datetimeRange(
				this.ui.yyrq,
				this.ui.jsrq
			);
		}
	});
	
	return YdyhyAddFormView;
});