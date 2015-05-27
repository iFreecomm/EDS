define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/hsxc/hsxc_template.html");
	var HsxcModel = require("web/index/pz/yppz/hsxc/hsxc_model");
	
	var HsxcView = Mn.ItemView.extend({
		id: "pz_yppz_hsxc",
		template: tmpl,
		events: {
			"click #aecEn": "changeAec",
			"click #agcEn": "changeAgc",
			"change [name=aecMode]" : "changeMode"
		},
		onRender: function() {
			var view =this;
			this.model = new HsxcModel();
			this.model.fetch().done(function() {
				view.renderData();
				Util.initRadioClass(view.$el).addRadioEvent(view.$el);
			});
		},
		
		/**
		 * 保存回声消除字段
		 * @param {Object} e
		 */
		changeAec: function(e) {
			$(e.target).toggleClass("active");
			
			this.model
			.save(this._getAec())
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		_getAec: function() {
			return {
				aecEn: this.$el.find("#aecEn").is(".active") ? 1 : 0
			}
		},
		
		/**
		 * 保存自动增益字段
		 * @param {Object} e
		 */
		changeAgc: function(e) {
			$(e.target).toggleClass("active");
			
			this.model
			.save(this._getAgc())
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		_getAgc: function() {
			return {
				agcEn: this.$el.find("#agcEn").is(".active") ? 1 : 0
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
				aecMode: +this.$el.find("[name=aecMode]:checked").val()
			}
		},
		
		/**
		 * 渲染数据到页面
		 */
		renderData: function() {
			var $el = this.$el;
			var model = this.model;
			//回声消除
			model.get("aecEn") && $el.find("#aecEn").addClass("active");
			//自动增益
			model.get("agcEn") && $el.find("#agcEn").addClass("active");
			//强度选择
			var aecMode = model.get("aecMode");
			$el.find("[name=aecMode][value=" + aecMode + "]").prop("checked", true);
		}
	});
	
	return HsxcView;
});
