define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!web/index/pz/wlsz/wk/wk_template.html");
	var AckId = require("web/common/ackid");
	
	var WkView = Mn.ItemView.extend({
		id: "pz_wlsz_wk",
		template: tmpl,
		bindings: {
			"#prot":  "prot",
			"#device":  "device",
			"#mainDevice": "mainDevice",
			"#netType":  "netType",
			"#ip":  "ip",
			"#mask":  "mask",
			"#gateway":  "gateway",
			"#mainDns":   "mainDns",
			"#autoDial":  "autoDial",
			"#user":  "user",
			"#pwd":  "pwd" 
		},
		checkOptions: {
			"#fwqdz": {
				constraint: ["ipCheck"],
				appendTo: ".formCell"
			},
			"#dlfwqdz": {
				constraint: ["ipCheck"],
				appendTo: ".formCell"
			},
			"#hyfwhm": {
				constraint: ["numberCheck"],
				appendTo: ".formCell"
			},
			"#hchm": {
				constraint: ["numberCheck"],
				appendTo: ".formCell"
			},
			"#yhm": {
				constraint: ["trimCheck"],
				appendTo: ".formCell"
			},
			"#mm": {
				constraint: ["passCheck"],
				appendTo: ".formCell"
			}
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"keyup": "checkInput",
			"click .saveBtn" : "saveModel"
		},
		
		initialize: function() {
			this.listenTo(this.model, "change:netType", this.changeNetType);
			if(this.model.get("mainDevice")) {
				this.listenTo(this.model, "change:mainDevice", this.changeMainDevice);
			}
		},
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
			this.showKdbh();
			this.$("h3").children("span").text(this.options.device+1);
			this.changeNetType();
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		saveModel: function(e) {
			var self = this;
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;
			if(this.ipAndGatewayCheck(this.$("#ip").val(), this.$("#gateway").val(), this.$("#mask").val())) return;
			
			this.model.save().done(function(res) {
				self.saveSuccess(res);
			}).fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function(res) {
			if(res.code != AckId.AckId_Suc)
			{
				switch (res.code){
					case AckId.AckId_SysInCalling:
						Util.alert("正在召开会议，不允许修改网络!");
						break;
					default:
						Util.alert("配置网络失败！");
						break;
				}
			}
			this.showKdbh();
			Util.refreshSelectmenu(this.$el);
			//alert("保存成功！");
		},
		saveError: function() {
			Util.alert("保存失败！");
		},
		
		showKdbh: function() {
			if(this.model.get("mainDevice")) {
				if(this.$kdbh) {
					this.$("#netType").append(this.$kdbh);
					this.$kdbh = null;
				}
			} else {
				if(!this.$kdbh) {
					this.$kdbh = this.$("#netType").children().last().detach().prop("selected", false);
					this.$("#netType").change();
				}
			}
		},
		ipAndGatewayCheck: function(ip, gateway, mask){
			//ip和网关要在同一网段
			ip = ip.split(".");
			gateway = gateway.split(".");
			mask  = mask.split(".");
			for(var i = 0, ilen = ip.length; i < ilen ; i += 1) {
				if((ip[i] & mask[i]) != (gateway[i] & mask[i])) {
					Util.alert("请将IP地址和网关配置成同一网段");
					return true;
				}
			}
			return false;
		},
		changeNetType: function() {
			var curNet = this.model.get("netType");
			var preNet = this.model.previous("netType");
			this.$("[netType*="+preNet+"]").hide();
			this.$("[netType*="+curNet+"]").show();			
			if(curNet == 1) {
				this.$("[netType=4]").prop("disabled", true).addClass("disabled");
			} else {
				this.$("[netType=4]").prop("disabled", false).removeClass("disabled");
			}
			var netCnnt = this.model.get("netCnnt");
			this.model.set(netCnnt[curNet]);
		},
		
		changeMainDevice: function() {
			this.showKdbh();
			Util.refreshSelectmenu(this.$el);
		}
	});
	
	return WkView;
});
