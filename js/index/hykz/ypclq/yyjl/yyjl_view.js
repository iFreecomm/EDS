define(function(require) {
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/ypclq/yyjl/yyjl_template.html");
	
	var YyjlView = Mn.ItemView.extend({
		id: "hykz_ypclq_yyjl",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#duration": "duration",
			"#minimum": "minimum",
			
			"#zbEn": "zbEn",
			"#duration1": "duration1",
			"#camera1": "camera1",
			
			"#jmEn": "jmEn",
			"#duration2": "duration2",
			"#camera2": "camera2"
		},
		ui: {
			formBox: ".formBox",
			select: "select",
			pzTableContainer: ".pzTable-container"
		},
		events: {
			"click .slide-container .more": "showMore",
			"click .formBox .closeBtn": "closeFormBox"
		},
		
		initialize: function() {
			this.listenTo(this.model, "change", this.save);
		},
		onRender: function() {
			this.stickit();
			var $el = this.$el;
			Util.initCheckboxClass($el)
				.addCheckboxEvent($el)
				.initSlider($el)
				.initSpinner($el);
			
			this.$(".spinner").unmousewheel()
				.on("spinstop", function() { $(this).change(); });
			this.ui.pzTableContainer.append(this.getPzTable());
		},
		onAttach: function() {
			Util.selectmenu(this.ui.select, this.ui.formBox);
			this.$("select").selectmenu("option", "position", {my:"left bottom", at:"left top"})
				.selectmenu("menuWidget").css({maxHeight:180});
		},
		
		showMore: function() {
			this.ui.formBox.show().animate({top:'100'}, "fast");
		},
		
		save: function() {
			console.log("save start");
			this.model.save()
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		
		getPzTable: function() {
			var hcName = ["会场", "会场1", "会场2", "会场3", "会场4", "会场5", "会场6", "会场7", "会场8", "会场9", "会场10", "会场11", "会场12", "会场13", "会场14", "会场15", "会场16"];
			var $pzTable = $('<table class="pzTable"></table>');
			var $thead = $('<thead></thead>');
			var $tbody = $('<tbody></tbody>');
			var $tr = $('<tr></tr>');
			var $th = $('<th></th>');
			var $td = $('<td></td>');
			
			var $tr1 = $tr.clone();
			var $tr2 = $tr.clone();
			_.each(hcName, function(name) {
				$tr1.append($th.clone().text(name));
				$tr2.append($td.clone());
			});
			$tr2.children().first().remove();
			$tr2.prepend($th.text("锁定"));
			$thead.append($tr1);
			$tbody.append($tr2);
			
			return $pzTable.append($thead).append($tbody);
		},
		
		closeFormBox: function() {
			var box = this.ui.formBox;
			box.animate({top:'240'}, "fast", function() {
				box.hide();
			});
		}
	});
	
	return YyjlView;
});
