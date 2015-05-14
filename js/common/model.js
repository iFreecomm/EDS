define(function(require) {
	var Backbone = require("backbone");
	var Util = require("web/common/util");
	
	var Model = Backbone.Model.extend({
		
  		//可能去后端获取数据，取决于是否有id属性
  		mayFetch: function(options) {
  			if(options && options.id) {
  				return this.fetch(this.getMayFetchOptions(options));
  			}
  		},
  		getMayFetchOptions: function(options) {
  			var obj = {}, result = {};
  			obj[this.idAttribute] = options.id;
  			result.data = Util.encode(obj);
  			return result;
  		},
  		
  		//一定会去后端获取数据
  		mustFetch: function(options) {
  			if(options) {
  				return this.fetch(this.getMustFetchOptions(options));
  			} else {
  				return this.fetch();
  			}
  		},
  		getMustFetchOptions: function(options) {
  			var result = {};
  			result.data = Util.encode(options);
  			return result;
  		}
  		
	});
	
	return Model;
});