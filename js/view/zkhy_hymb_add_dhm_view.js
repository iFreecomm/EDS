define(function(require) {
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	require("jqueryui");
	
	var tmpl = require("text!tmpl/zkhy_hymb_add_dhm.html");
	
	var DhmView = Backbone.View.extend({
		id: "hymb_add_dhm",
		className: "tabContent",
		tmpl: Handlebars.compile(tmpl),
		events: {
			"click .mode-box-container .mode-box": "selectMode"
		},
		bindings: {
			
		},
		initialize: function() {
			var self = this;
			var allLxrUrl = "json/selectedLxr.json";
			$.getJSON(allLxrUrl).done(function(allLxr) {
				self.render(allLxr).initDrag().initDrop();
			});
		},
		render: function(allLxr) {
			this.$el.html(this.tmpl(allLxr));
			return this;
		},
		initDrag: function() {
			this.$(".lxr-box2").find(".lxr").draggable({
				helper: "clone",
				zIndex: 9999
			});
			this.$(".mode-box-selected-container").find("td").draggable({
				helper: "clone"
			});
			return this;
		},
		initDrop: function() {
			this.$(".mode-box-selected-container").find("td,.td").droppable({
				drop: function(event, ui) {
					var $lxr = $("<div class='lxr-desc'></div>");
					$lxr.text(ui.draggable.text());
					$(this).html($lxr);
					$lxr.draggable({
						helper: "clone"
					});
				}
			});
			return this;
		},
		selectMode: function(e) {
			var $tar = $(e.target);
			var $box = $tar.is(".mode-box") ? $tar : $tar.parents(".mode-box");
			$box.addClass("active").siblings().removeClass("active");
			this.$(".mode-box-selected-container").children().html($box.html());
			this.initDrop();
		},
		close: function() {
			this.unstickit();
			this.remove();
		}
	});
	
	return DhmView;
});