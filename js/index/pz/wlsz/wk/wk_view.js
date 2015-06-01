define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/wk/wk_template.html");
	
	var WkView = FormView.extend({
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
		events: {
			"click .saveBtn" : "saveModel"
		},
		saveModel: function(e) {
			this.model.save().done(this.saveSuccess).fail(this.saveError);
		},
		saveSuccess: function() {
			this.showKdbh();
			this.refreshSelectmenu();
			//alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		},
		onRender: function() {
			this.stickit().fixCheckbox().changeNetType();
			this.showKdbh();
		},
		showKdbh: function() {
			if(this.model.get("mainDevice")) {
				if(this.$kdbh) {
					this.$("#netType").append(this.$kdbh);
					this.$kdbh = null;
				}
			} else {
				if(!this.$kdbh) {
					this.$kdbh = this.$("#netType").children().last().detach();
				}
			}
		},
		onAttach: function() {
			this.selectmenu();
		},
		initialize: function() {
			this.listenTo(this.model, "change:netType", this.changeNetType);
		},
		changeNetType: function() {
			var curNet = this.model.get("netType");
			var preNet = this.model.previous("netType");
			this.$("[netType*="+preNet+"]").hide();
			this.$("[netType*="+curNet+"]").show();			
			if(curNet == 1)
			{
				this.$("[netType*=4]").prop("disabled", true).css({"opacity":0.5});
			}
			else
			{
				this.$("[netType*=4]").removeAttr("disabled").css({"opacity":1});
			}
			var netCnnt = this.model.get("netCnnt");
			this.model.set(netCnnt[curNet]);
		}
	});
	
	return WkView;
});
