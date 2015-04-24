define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/wk1/wk1_template.html");
	
	require("stickit");
	require("jqueryui");
	
	var Wk1View = FormView.extend({
		id: "pz_wlsz_wk1",
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
			//alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		},
		onRender: function() {
			this.stickit().fixIE8().changeNetType();
		},
		onAttach: function() {
			this.selectmenu();
		},
		initialize: function(opt) {
			this.listenTo(this.model, "change:netType", this.changeNetType);
		},
		changeNetType: function() {
			var curNet = this.model.get("netType");
			var preNet = this.model.previous("netType");
			this.$("[netType*="+preNet+"]").hide();
			this.$("[netType*="+curNet+"]").show();			
			if(curNet == 1)
			{
				this.$("[netType*=4]").editable = false;
			}
			var netCnnt = this.model.get("netCnnt");
			var curNetCfg = netCnnt[curNet];
			var self = this;
			$.each(curNetCfg, function(attr,value){      
			    self.model.set(attr,value);
			});
		}
	});
	
	return Wk1View;
});
