define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_spjz_template.html");
	
	var SpjzView = Mn.ItemView.extend({
		id: "hymb_add_spjz",
		template: tmpl,
		bindings: {
			"#enableSpjz": "enableSpjz"
		},
		ui: {
			"spjz_table_container": ".spjz-table-container"
		},
		
		onRender: function() {
			var rowHeadArr = ["多画面", "播放器", "法官SDI1", "公诉人会场1", "辩护人SDI3", "嫌疑人SDI4", "证人SDI5", "全景SDI6", "证人书记员", "全景观众席", "书记员电脑VGA1", "公诉人电脑VGA2", "辩护人电脑VGA3", "证据展台VGA4"];
			var colHeadArr = ["场景一", "输出11080P60", "输出21080P60", "输出31080P60", "输出41080P60", "法官会场", "公诉人会场", "辩护人会场", "嫌疑人会场", "证人会场", "直播会场", "法庭会场"];
			var rows = rowHeadArr.length;
			var cols = colHeadArr.length - 1;
			var $table = this.getTable(rows, cols);
			var $trs = $table.find("tr");
			var $tds = $table.find("td");
			var $colTH = $trs.eq(0).find("th");
			var $rowTH = $trs.slice(1).find("th");
			
			$colTH.each(function(i, ele) {
				ele.innerText = colHeadArr[i];
			});
			
			$rowTH.each(function(i, ele) {
				ele.innerText = rowHeadArr[i];
			});
			
			this.ui.spjz_table_container.mouseover(function(e) {
				var $td = $(e.target);
				$tds.removeClass("hover hoverIn");
				if(!$td.is("td")) return;
				
				var colIndex = $td.index() - 1;
				var rowIndex = $td.parent().index() - 1;
				var i = 0, start = cols * rowIndex;
				
				for(i = 0; i < rows; i ++) {
					$tds.eq(colIndex + i * cols).addClass("hover");
				}
				for(i = 0; i < cols; i ++) {
					$tds.eq(start + i).addClass("hover");
				}
				
				$td.addClass("hoverIn");
			}).click(function(e) {
				var $td = $(e.target);
				if(!$td.is("td")) return;
				
				var colIndex = $td.index() - 1;
				for(var i = 0; i < rows; i ++) {
					$tds.eq(colIndex + i * cols).removeClass("active");
				}
				
				$td.addClass("active");
			}).append($table);
		},
		
		/* 
		 * 增加了列表头和行表头
		 * 所以实际上表格的行数和列数是rows+1,cols+1
		 */ 
		getTable: function(rows, cols) {
			var th = "<th></th>";
			var td = "<td></td>";
			var i, firstTR, tr, table, thArr = [], tdArr = [], trArr = [];
			
			for(i = 0; i < cols; i ++) {
				thArr.push(th);
				tdArr.push(td);
			}
			
			firstTR = "<tr>" + th + thArr.join("") + "</tr>";
			tr = "<tr>" + th + tdArr.join("") + "</tr>";
			
			for(i = 0; i < rows; i ++) {
				trArr.push(tr);
			}
			
			table = "<table>" + firstTR + trArr.join("") + "</table>";
			
			return $(table);
		}
	});
	
	return SpjzView;
});