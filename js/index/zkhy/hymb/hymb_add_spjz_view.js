define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Util = require("web/common/util");
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
		
		onRender: function() {
			Radio.channel("spjz").reply("getMatrixInOut", this.getMatrixInOut, this);
			
			Radio.channel("basic").on("secVidFlgChange", this.secVidFlgChange, this);
			
			Radio.channel("yhz").on("addLxr", this.addMatrix, this);
			Radio.channel("yhz").on("subLxr", this.subMatrix, this);
			
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
			
			//初始化视频矩阵表格
			this.addMatrix(this.getMatrixLxr());
		},
		onDestroy: function() {
			Radio.channel("spjz").reset();
			
			Radio.channel("basic").off("secVidFlgChange", this.secVidFlgChange);
			
			Radio.channel("yhz").off("addLxr", this.addMatrix);
			Radio.channel("yhz").off("subLxr", this.subMatrix);
		},
		
		/**
		 * @onRender
		 * 获取生成表格的联系人
		 */
		getMatrixLxr: function() {
			return Util.getLxrDataById(this.model.get("venueId"), this.options.allLxr);
		},
		
		/************************************/
		/*************页面交互事件**************/
		/************************************/
		
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
		
		/************************************/
		/*************对外接口事件**************/
		/************************************/
		
		getMatrixInOut: function() {
			var rowHeadArr = this.rowHeadArr;
			var colHeadArr = this.colHeadArr;
			return this.ui.spjz_table_container.find(".active").map(function() {
				var $td = $(this);
				var colIndex = $td.index() - 1;
				var rowIndex = $td.parent().index() - 1;
				
				var src = rowHeadArr[rowIndex];
				var dest = colHeadArr[colIndex];
				return {
					"equSrc": {
						equType: _.isNumber(src.equType) ? src.equType : Const.EquType_Cnt,
						recordId: src.recordId || 0,
						camPort: src.camPort || Const.VidInPort_Cnt,
						vgaPort: src.vgaPort || Const.VidInPort_Cnt
					},
					"equDst": {
						equType: _.isNumber(dest.equType) ? dest.equType : Const.EquType_Cnt,
						recordId: dest.recordId || 0,
						dviPort: dest.dviPort || 0
					}
				}
			}).get();
		},
		
		secVidFlgChange:function(e){
			/*var secVidFlag = this.model.get("secVidFlag");
			var lxrArr = [{
					equType: Const.EquType_AUX,
					addrName: "辅流"
			}];
			if(secVidFlag)
			{
				this.addMatrix(lxrArr);
			}
			else
			{
				this.subMatrix(lxrArr);
			}*/
			//缓存已经配置的矩阵数据
			if(this.matrixInOut === undefined) {
				this.matrixInOut = this.model.get("matrixInOut") || [];
			} else {
				this.matrixInOut = this.getMatrixInOut();
			}
			//清空现有的表格
			this.ui.spjz_table_container.empty();
			//重新绘制表格
			this.renderMatrix();
		},
		
		addMatrix: function(addLxrArr) {
			//缓存已经配置的矩阵数据
			if(this.matrixInOut === undefined) {
				this.matrixInOut = this.model.get("matrixInOut") || [];
			} else {
				this.matrixInOut = this.getMatrixInOut();
			}
			//修改联系人数据
			this.lxrArr = this._getAddLxrArr(addLxrArr);
			//清空现有的表格
			this.ui.spjz_table_container.empty();
			//重新绘制表格
			this.renderMatrix();
		},
		_getAddLxrArr: function(addLxrArr) {
			var lxrArr = this.lxrArr || [];
			return lxrArr.concat(addLxrArr);
		},
		
		subMatrix: function(subLxrArr) {
			//缓存已经配置的矩阵数据
			this.matrixInOut = this.getMatrixInOut();
			//修改联系人数据
			this.lxrArr = this._getSubLxrArr(subLxrArr);
			//清空现有的表格
			this.ui.spjz_table_container.empty();
			//重新绘制表格
			this.renderMatrix();
		},
		_getSubLxrArr: function(subLxrArr) {
			var lxrArr = this.lxrArr || [];
			return _.reject(lxrArr, function(lxr) {
				return Util.isLxrInArr(lxr, subLxrArr);
			});
		},
		
		renderMatrix: function() {
			this.rowHeadArr = this._getRowHead();
			this.colHeadArr = this._getColHead();
			this.rows = this.rowHeadArr.length;
			this.cols = this.colHeadArr.length;
			var $table = this.getTable(this.rows, this.cols);
			
			this.renderTableHead($table);
			this.renderTableBody($table);
			
			this.ui.spjz_table_container.append($table);
		},
		renderTableHead: function($table) {
			var rowHeadArr = this.rowHeadArr;
			var colHeadArr = this.colHeadArr;
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
			var rowHeadArr = this.rowHeadArr;
			var colHeadArr = this.colHeadArr;
			var cols = colHeadArr.length;
			var $tds = this.$tds = $table.find("td");
			var matrixInOut = this.matrixInOut;
			var curInOut, equSrc, equDst, i, l = matrixInOut.length;
			
			for(i = 0; i < l; i ++) {
				curInOut = matrixInOut[i];
				srcIndex = this.getSrcIndex(curInOut.equSrc, rowHeadArr);
				dstIndex = this.getDstIndex(curInOut.equDst, colHeadArr);
				
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
						if(src.recordId === curRow.recordId){
							if(src.camPort != Const.VidInPort_Cnt && src.camPort == curRow.camPort)
			    			{
			    				return i;
			    			}
			    			
			    			if(src.vgaPort != Const.VidInPort_Cnt && src.vgaPort == curRow.vgaPort)
			    			{
			    				return i;
			    			}
						}
						break;
					case Const.EquType_H323:
					case Const.EquType_SIP:
					case Const.EquType_RTSP:
						if(src.recordId === curRow.recordId) {
							return i;
						}
						break;
					case Const.EquType_MP:
					case Const.EquType_PLAYER:
					case Const.EquType_AUX:
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
			var srcArr = this.lxrArr || [];
			srcArr = Util.transSDI2Lxr(srcArr);
			
			srcArr.push({equType:Const.EquType_MP,addrName:"多画面"});
			srcArr.push({equType:Const.EquType_PLAYER,addrName:"播放器"});
			var secVidFlag = this.model.get("secVidFlag");
			if(secVidFlag)
			{
				srcArr.push({equType:Const.EquType_AUX,addrName:"辅流"});
			}
			return srcArr;
		},
		_getColHead: function() {
			var dstArr = [].concat(this.options.dviArr || []);
			_.each(this.lxrArr || [], function(lxr) {
			    if(lxr.equType == Const.EquType_H323 || lxr.equType == Const.EquType_SIP) {
					dstArr.push(lxr);
				}  
			});
			return dstArr;
		}
	});
	
	return SpjzView;
});