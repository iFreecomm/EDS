define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_spjz_template.html");
	var Const = require("web/common/const");
	
	var SpjzView = Mn.ItemView.extend({
		id: "hymb_add_spjz",
		template: tmpl,
		bindings: {
			"#enableVM": "enableVM"
		},
		ui: {
			"spjz_table_container": ".spjz-table-container"
		},
		events: {
			"mouseover @ui.spjz_table_container": "mouseoverTD",
			"click @ui.spjz_table_container": "clickTD"
		},
		mouseoverTD: function(e) {
			var $td = $(e.target);
			this.$tds.removeClass("hover hoverIn");
			if(!$td.is("td")) return;
			
			var colIndex = $td.index() - 1;
			var rowIndex = $td.parent().index() - 1;
			var rows = this.rows;
			var cols = this.cols;
			var i = 0, start = cols * rowIndex;
			
			for(i = 0; i < rows; i ++) {
				this.$tds.eq(colIndex + i * cols).addClass("hover");
			}
			for(i = 0; i < cols; i ++) {
				this.$tds.eq(start + i).addClass("hover");
			}
			
			$td.addClass("hoverIn");
		},
		clickTD: function(e) {
			var $td = $(e.target);
			if(!$td.is("td")) return;
			
			var colIndex = $td.index() - 1;
			var rowIndex = $td.parent().index() - 1;
			var rows = this.rows;
			var cols = this.cols;
			for(var i = 0; i < rows; i ++) {
				if(i === rowIndex) {
					$td.toggleClass("active");
				} else {
					this.$tds.eq(colIndex + i * cols).removeClass("active");
				}
			}
		},
		
		initialize: function() {
			Radio.channel("spjz").reset();
			Radio.channel("spjz").reply("getMatrixInOut", this.getMatrixInOut, this);
		},
		
		getMatrixInOut: function() {
			var rowHeadArr = this._getRowHead();
			var colHeadArr = this._getColHead();
			return this.ui.spjz_table_container.find(".active").map(function() {
				var $td = $(this);
				var colIndex = $td.index() - 1;
				var rowIndex = $td.parent().index() - 1;
				
				var src = rowHeadArr[rowIndex];
				var dest = colHeadArr[colIndex];
				return {
					"equSrc": {
						equType: _.isNumber(src.equType) ? src.equType : 11,
						recordId: src.recordId || 0,
						camPort: src.camPort || 0,
						vgaPort: src.vgaPort || 0
					},
					"equDst": {
						equType: _.isNumber(dest.equType) ? dest.equType : 11,
						recordId: dest.recordId || 0,
						dviPort: dest.dviPort || 0,
					}
				}
			}).get();
		},
		
		onRender: function() {
			var rowHeadArr = this._getRowHead();
			var colHeadArr = this._getColHead();
			var rows = this.rows = rowHeadArr.length;
			var cols = this.cols = colHeadArr.length;
			var $table = this.getTable(rows, cols);
			
			this.renderTableHead($table);
			this.renderTableBody($table);
			
			this.ui.spjz_table_container.append($table);
		},
		
		renderTableHead: function($table) {
			var rowHeadArr = this._getRowHead();
			var colHeadArr = this._getColHead();
			var $trs = $table.find("tr");
			var $colTH = $trs.eq(0).find("th");
			var $rowTH = $trs.slice(1).find("th");
			
			$colTH.eq(0).text(this.options.tableName);
			
			$colTH.slice(1).each(function(i, ele) {
				ele.innerText = colHeadArr[i].addrName;
			});
			
			$rowTH.each(function(i, ele) {
				ele.innerText = rowHeadArr[i].addrName;
			});
		},
		
		renderTableBody: function($table) {
			var rowHeadArr = this._getRowHead();
			var colHeadArr = this._getColHead();
			var cols = colHeadArr.length;
			var $tds = this.$tds = $table.find("td");
			var matrixInOut = this.model.get("matrixInOut") || [];
			var curInOut, equSrc, equDst, i, l = matrixInOut.length;
			
			for(i = 0; i < l; i ++) {
				curInOut = matrixInOut[i];
				srcIndex = this.getSrcIndex(curInOut.equSrc, rowHeadArr);
				dstIndex = this.getSrcIndex(curInOut.equDst, colHeadArr);
				
				if(srcIndex === -1 || dstIndex === -1) continue;
				$tds.eq(dstIndex + srcIndex * cols).addClass("active");
			}
		},
		
		getSrcIndex: function(src, rowHeadArr) {
			src = src || {};
			rowHeadArr = rowHeadArr || [];
			var curRow = null,
				equType = src.equType;
			
			for(var i = 0, l = rowHeadArr.length; i < l; i ++) {
				curRow = rowHeadArr[i];
				if(equType !== curRow.equType) continue;
				
				switch (equType) {
					case Const.EquType_SDI:
					case Const.EquType_H323:
					case Const.EquType_SIP:
					case Const.EquType_RTSP:
						if(src.recordId === curRow.recordId) {
							return i;
						}
						break;
					case Const.EquType_MP:
					case Const.EquType_PLAYER:
						return i;
						break;
					default:
				}
			}
			
			return -1;
		},
		
		getDstIndex: function(dst, colHeadArr) {
			dst = dst || {};
			colHeadArr = colHeadArr || [];
			var curCol = null,
				equType = dst.equType;
			
			for(var i = 0, l = colHeadArr.length; i < l; i ++) {
				curCol = colHeadArr[i];
				if(equType !== curCol.equType) continue;
				
				switch (equType) {
					case Const.EquType_H323:
					case Const.EquType_SIP:
						if(dst.recordId === curCol.recordId) {
							return i;
						}
						break;
					case Const.EquType_OUTPUT:
						if(dst.dviPort === curCol.dviPort) {
							return i;
						}
						break;
					default:
				}
			}
			
			return -1;
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
		},
		
		_getRowHead: function() {
			//return this.options.spjzHead.rowHead;
			var srcArr = this.options.spjzHead;
			srcArr.push({equType:Const.EquType_MP,addrName:"多画面"});
			srcArr.push({equType:Const.EquipType_PLAYER,addrName:"播放器"});
			return srcArr;
		},
		_getColHead: function() {
			//return this.options.spjzHead.colHead;
			var dstArr = [{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_MBDVI1,addrName:"DVI1"},{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_MBDVI2,addrName:"DVI2"},
			{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_MBDVI3,addrName:"DVI3"},{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_MBDVI4,addrName:"DVI4"},
			{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_EXB1DVI1,addrName:"DVI5"},{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_EXB1DVI2,addrName:"DVI6"},
			{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_EXB1DVI3,addrName:"DVI7"},{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_EXB1DVI4,addrName:"DVI8"},
			{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_EXB2DVI1,addrName:"DVI9"},{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_EXB2DVI2,addrName:"DVI10"},
			{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_EXB2DVI3,addrName:"DVI11"},{equType:Const.EquipType_OUTPUT,dviPort:Const.VidOutPort_EXB2DVI4,addrName:"DVI12"}];
			
			$.each(this.options.spjzHead, function(i,addr){      
			    if(addr.equType == Const.EquType_H323 || addr.equType == Const.EquType_SIP)
				{
					dstArr.push(addr);
				}  
			});
			
			return dstArr;
		},
		
		onDestroy: function() {
			Radio.channel("spjz").reset();
		}
	});
	
	return SpjzView;
});