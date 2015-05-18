define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/wlsz/wk/wk_template.html");
	
	var WkView = Mn.ItemView.extend({
		id: "pz_wlsz_wk",
		template: tmpl,
		ui: {
			formBox: ".formBox",
			select: "select"
		},
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
			//alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		},
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
			this.$("h3").children("span").text(this.model.get("device")+1);
			this.changeNetType();
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
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
