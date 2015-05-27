define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/fkyz/fkyz_template.html");
	var FkyzModel = require("web/index/pz/yppz/fkyz/fkyz_model");
	
	var FkyzView = Mn.ItemView.extend({
		id: "pz_yppz_fkyz",
		template: tmpl,
		events: {
			"click #afrEn": "changeEn",
			"change [name=afrRange]" : "changeRange",
			"change [name=afrMode]" : "changeMode"
		},
		onRender: function() {
			var view =this;
			this.model = new FkyzModel();
			this.model.fetch().done(function() {
				view.renderData();
				Util.initRadioClass(view.$el).addRadioEvent(view.$el);
			});
		},
		
		/**
		 * 保存反馈抑制字段
		 * @param {Object} e
		 */
		changeEn: function(e) {
			$(e.target).toggleClass("active");
			
			this.model
			.save(this._getEn())
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		_getEn: function() {
			return {
				afrEn: this.$el.find("#afrEn").is(".active") ? 1 : 0
			}
		},
		
		/**
		 * 保存适应会场字段
		 */
		changeRange: function() {
			this.model
			.save(this._getRange())
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		_getRange: function() {
			return {
				afrRange: +this.$el.find("[name=afrRange]:checked").val()
			}
		},
		
		/**
		 * 保存强度选择字段
		 */
		changeMode: function() {
			this.model
			.save(this._getMode())
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		_getMode: function() {
			return {
				afrMode: +this.$el.find("[name=afrMode]:checked").val()
			}
		},
		
		/**
		 * 渲染数据到页面
		 */
		renderData: function() {
			var $el = this.$el;
			var model = this.model;
			//反馈抑制
			model.get("afrEn") && $el.find("#afrEn").addClass("active");
			//强度选择
			var afrMode = model.get("afrMode");
			$el.find("[name=afrMode][value=" + afrMode + "]").prop("checked", true);
			//适应会场
			var afrRange = model.get("afrRange");
			$el.find("[name=afrRange][value=" + afrRange + "]").prop("checked", true);
		}
	});
	
	return FkyzView;
});
