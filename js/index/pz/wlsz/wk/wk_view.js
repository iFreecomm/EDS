define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/wlsz/wk/wk_template.html");
	
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
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
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
			this.$("h3").children("span").text(this.model.get("device")+1);
			this.changeNetType();
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		},
		
		saveModel: function(e) {
			this.model.save().done(this.saveSuccess).fail(this.saveError);
		},
		saveSuccess: function() {
			this.showKdbh();
			Util.refreshSelectmenu(this.$el);
			//alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
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
		
		changeNetType: function() {
			var curNet = this.model.get("netType");
			var preNet = this.model.previous("netType");
			this.$("[netType*="+preNet+"]").hide();
			this.$("[netType*="+curNet+"]").show();			
			if(curNet == 1)
			{
				this.$("[netType*=4]").prop("disabled", true).addClass("disabled");
			}
			else
			{
				this.$("[netType*=4]").removeAttr("disabled").css({"opacity":1});
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
