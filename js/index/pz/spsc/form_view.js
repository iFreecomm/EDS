define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!./form_template.html");
	var Const = require("web/common/const");
	var SelectObj = require("web/common/select");
	
	var SpscView = Mn.ItemView.extend({
		className: "shadow-box",
		template: tmpl,
		bindings: {
			"#dispName": "dispName",
			"#vidPortType": {
				observe: "vidPortType",
				selectName: "vidPortType"
			},
			"#vidPortAuxType": {
				observe: "vidPortAuxType",
				selectName: "vidPortAuxType"
			},
			"#vidExpandMode": {
				observe: "vidExpandMode",
				selectName: "vidExpandMode"
			},
			
//			"#vidFmt": {
//				observe: "vidFmt",
//				selectName: "vidOutFmt_vga"
//			},
			
			"#bright": "bright",
			"#contrast": "contrast",
			"#saturation": "saturation",
			"#clock": "clock",
			"#phase": "phase",
			"#horOffset": "horOffset",
			"#vertOffset": "vertOffset",
			"#nr2d": "nr2d",
			"#nr3d": "nr3d",
			"#acutance": "acutance"
		},
		checkOptions: {
			"#dispName": {
				constraint: ["notNull", "trimCheck"],
				appendTo: ".formCell"
			}
		},
		ui: {
			formBox: ".formBox",
			select: "select",
			vga: ".vga",
			vidPortType: "#vidPortType",
			vidPortAuxType: "#vidPortAuxType",
			vidFmt: "#vidFmt"
		},
		events: {
			"keyup": "checkInput",
			"click .saveBtn" : "saveModel"
		},
		initialize: function(opt) {
			Util.setSelectBindings(this.bindings);
		},
		onRender: function() {
			this.changeVga();
			this.changeFmt();
			
			this.stickit();
			
			Util.initSlider(this.$el);
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			
			this.listenTo(this.model, "change:vidPortType", this.changeVidPortType);
			this.listenTo(this.model, "change:vidPortAuxType", this.changeVidAuxPortType);
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		/**
		 * 数字信号改变事件
		 */
		changeVidPortType:function() {
			this.changeFmt();
			Util.refreshSelectmenu(this.ui.vidFmt);
		},
		/**
		 * 模拟信号改变事件
		 */
		changeVidAuxPortType: function() {
			this.changeVga();
			
			this.changeFmt();
			Util.refreshSelectmenu(this.ui.vidFmt);
		},
		/**
		 * 改变分辨率下拉列表
		 */
		changeFmt: function() {
			var vidPortType = this.model.get("vidPortType");
			var vidPortAuxType = this.model.get("vidPortAuxType");
			
			if(vidPortType == Const.VidPortType_Hdmi) {
				this._changeFmt('hdmi');
			} else if(vidPortType == Const.VidPortType_Dvi) {
				if(vidPortAuxType == Const.VidPortType_VGA) {
					this._changeFmt('vga');
				} else if(vidPortAuxType == Const.VidPortType_YPbPr) {
					this._changeFmt('ypbpr');
				}
			}
		},
		_changeFmt: function(selectName) {
			selectName = "vidOutFmt_" + selectName.toLowerCase();
			var arr = SelectObj[selectName];
			if(_.isEmpty(arr)) return;
			
			var binding = { observe: "vidFmt" };
			binding.selectOptions = {};
			binding.selectOptions.collection = arr;
			this.addBinding(this.model, "#vidFmt", binding);
			
			var $fmt = this.ui.vidFmt;
			var fmtVal = this.model.get("vidFmt");
			$fmt.val(fmtVal);
			if($fmt.val() != fmtVal) {
				$fmt.get(0).selectedIndex = 0;
				this.model.set("vidFmt", $fmt.val());
			}
		},
		/**
		 * 隐藏显示VGA相关字段
		 */
		changeVga: function() {
			if(this.model.get("vidPortAuxType") == Const.VidPortType_VGA) {
				this.ui.vga.show();
			} else {
				this.ui.vga.hide();
			}
		},
		
		saveModel: function(e) {
			var self = this;
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;	
			
			this.model.save().done(function(res) {
				if(res.code == 0) {
					self.trigger("changeName", self.model.get("name"));
				}
			}).fail(function() {
				
			});
		},
		
		updateView: function(id) {
			var self = this;
			this.model.fetch({
				data: Util.encode({ "recordId": id }),
				silent: true
			}).done(function() {
				self.model.set("recordId", id);
				self.render();
				Util.selectmenu(self.ui.select, self.ui.formBox);
			});
		}
	});
	
	return SpscView;
});
