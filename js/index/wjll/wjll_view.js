define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/wjll/wjll_template.html");
	
	var FileView = require("web/index/wjll/file_view");
	var FileCollection = require("web/index/wjll/file_collection");
	
	var BurnDiskView = require("web/index/wjll/burnDisk_view");
	var VideoView = require("web/index/wjll/video_view");
	var AudioView = require("web/index/wjll/audio_view");
	
	var WjllView = Mn.LayoutView.extend({
		id: "wjll_show",
		template: Handlebars.compile(tmpl),
		regions: {
			fileContainer: "#fileContainer",
			searchTermsContainer: "#searchTermsContainer",
			burnDiskContainer: "#burnDiskContainer",
			videoViewContainer: "#videoViewContainer",
			audioViewContainer: "#audioViewContainer"
		},
		ui: {
			"prevPageBtn": ".prevPage",
			"nextPageBtn": ".nextPage",
			"curPage": ".curPage"
		},
		events: {
			"click .burnDisk": "burnDisk",
			"click .batchDelete": "batchDelete",
			
			"click .prevPage": "prevPage",
			"click .nextPage": "nextPage"
		},
		
		burnDisk: function() {
			if(!this.burnDiskView) {
				this.burnDiskView = new BurnDiskView();
				this.showChildView("burnDiskContainer", this.burnDiskView);
			}
			this.burnDiskView.preBurnDisk();
		},
		
		batchDelete: function() {
			Radio.channel("fileList").command("batchDelete");
		},
		
		prevPage: function() {
			this.searchTerms = this.searchTerms || this.options.searchTerms;
			this.pageNum--;
			this._search();
		},
		
		nextPage: function() {
			this.searchTerms = this.searchTerms || this.options.searchTerms;
			this.pageNum++;
			this._search();
		},
		
		showPageBtns: function() {
			if(this.pageNum === 1) {
				this.ui.prevPageBtn.hide();
			} else {
				this.ui.prevPageBtn.show();
			}
			
			if(this.endFlag === 1) {
				this.ui.nextPageBtn.hide();
			} else {
				this.ui.nextPageBtn.show();
			}
			
			this.ui.curPage.text(this.pageNum);
		},
		
		initialize: function() {
			this.searchTerms = this.options.searchTerms;
			this.pageNum = this.options.pageNum;
			this.endFlag = this.options.endFlag;
			Radio.channel("wjll").comply("searchFile", this.searchFile, this);
			Radio.channel("wjll").comply("deleteSearchFile", this.deleteSearchFile, this);
			Radio.channel("wjll").comply("playFile", this.playFile, this);
		},
		
		searchFile: function(searchTerms) {
			this.searchTerms = searchTerms;
			this.pageNum = 1;
			this._search();
		},
		
		deleteSearchFile: function(fileNum) {
			//如果是最后一页并且所有文件被删除，那么请求前一页
			if(this.endFlag === 1 && fileNum === 0) {
				this.pageNum = (this.pageNum - 1) || 1;
			}
			this._search();
		},
		
		playFile: function(opt) {
			var path = opt.path;
			if(this._isVideo(path)) {
				this.closeAudio();
				this.playVideoFile(opt);
			} else if(this._isAudio(path)) {
				this.closeVideo();
				this.playAudioFile(opt);
			}
		},
		_isVideo: function(path) {
			return /^rtsp:|\.mp4$/.test(path);
		},
		_isAudio: function(path) {
			return /\.mp3/.test(path);
		},
		
		closeVideo: function() {
			if(this.videoView) {
				this.videoView.pause();
				this.videoView.hide();
			}
		},
		
		closeAudio: function() {
			if(this.audioView) {
				this.audioView.pause();
				this.audioView.hide();
			}
		},
		
		playVideoFile: function(opt) {
			if(!this.videoView) {
				this.videoView = new VideoView({
					opt: opt
				});
				this.showChildView("videoViewContainer", this.videoView);
			} else {
				this.videoView.play(opt);
			}
		},
		
		playAudioFile: function(opt) {
			if(!this.audioView) {
				this.audioView = new AudioView({
					opt: opt
				});
				this.showChildView("audioViewContainer", this.audioView);
			} else {
				this.audioView.play(opt);
			}
		},
		
		_search: function() {
			var self = this;
			var collection = new FileCollection();
			
			$.getJSON("getFileList.psp", JSON.stringify({
				searchTerms: this.searchTerms,
				pageNum: this.pageNum
			})).done(function(fileList) {
				self.endFlag = fileList.data.endFlag;
				collection.reset(fileList.data.fileList);
				self.showChildView("fileContainer", new FileView({
					collection: collection
				}));
				self.showPageBtns();
			});
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("searchTermsContainer", options.searchTermsView);
			this.showChildView("fileContainer", options.fileView);
		},
		
		onRender: function() {
			this.showPageBtns();
		},
		
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		},
		
		onDestroy: function() {
			Radio.channel("wjll").reset();
		}
	});
	
	return WjllView;
});