var youtube = {
	buttonSingleId: "downloader__yt_btn",
	buttonNearWatchLaterId: "downloader__yt_btn_near_watch_later",
	run: function(document) {
		youtube.doc = document;
		init();
		function init() {
			youtube.thumbnailButtonAdder.add();
			if (document.getElementById(youtube.buttonSingleId)) return;
			var divForSingleVideoButton = document.getElementById("watch7-subscription-container");
			if (divForSingleVideoButton) {
				youtube.singleVideoAdder.add(divForSingleVideoButton);
				return;
			}
		}
	},
	convertUrl: function(href){
		var url = "http://www.thevideomate.com?url=" + href + '&referrer=ytbdownloadext';
		return url;
	},
	singleVideoAdder: {
		add: function(div) {
			var text = "Download";
			var button = youtube.greenRectangularButton.create(youtube.buttonSingleId, text);
			button.style.marginLeft = "10px";
			div.appendChild(button);
		}
	},
	thumbnailButtonAdder: {
		add: function() {
			this.appendButtonNearWatchLater();
		},
		appendButtonNearWatchLater: function() {
			var Dom = document.querySelectorAll(".ux-thumb-wrap");
			for(var i=0; i<Dom.length; i++){
				if (youtube.commonFunction.any(Dom[i].childNodes, function(element) {
					return element.id == youtube.buttonNearWatchLaterId
				})) {
					return;
				}
				var url = youtube.thumbnailButtonAdder.getUrlFromElement(Dom[i]);
				var button = youtube.smallSquareButton.create(youtube.buttonNearWatchLaterId, Downloader.getButtonNearWatchLaterMargin, "Download this video free", url);
				button.style.marginRight = "25px";
				Dom[i].appendChild(button);
			}
		},
		getUrlFromElement: function(element) {
			if (!!element.querySelector("button").getAttribute("data-video-ids")){
				return "http://www.youtube.com/watch?v=" + element.querySelector("button").getAttribute("data-video-ids");
			}
		}
	},
	greenRectangularButton: {
		create: function(id, text) {
			var textSpan = this.createTextSpan(text);
			var imgSpan = youtube.commonFunction.getImageSpanWithoutClassName(function() {
				return youtube.commonFunction.getImg(Downloader.getMargin);
			});
			var button = youtube.doc.createElement("a");
			button.id = id;
			button.className = "None yt-uix-button yt-uix-button-subscribe-branded";
			button.style.filter = "#8abc2e";
			button.style.background = "#8abc2e";
			button.style.border = "1px solid #78a745";
			button.style.color = "white";
			button.style.padding = "3px 17px 2px 4px";
			button.style.textShadow = "none";
			button.style.height = "24px";
			button.setAttribute('target', '_blank');
			button.appendChild(imgSpan);
			button.appendChild(textSpan);
			youtube.commonFunction.setToolTip(button, "Download this video free");
			button.setAttribute('href', youtube.convertUrl(youtube.doc.location.href));
			return button;
		},
		createTextSpan: function(text) {
			var span = youtube.doc.createElement("span");
			span.id = youtube.buttonTextId;
			span.innerHTML = text;
			span.style.marginLeft = "5px";
			return span;
		}
	},
	smallSquareButton: {
		create: function(id, margin, tooltipText, url) {
			var button = youtube.doc.createElement("a");
			button.id = id;
			button.className = "addto-button video-actions yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip";
			button.setAttribute("role", "button");
			button.style.border = "1px solid rgb(116, 153, 62)";
			button.style.background = Downloader.getButtonNearThumbnailBackground();
			button.style.filter = Downloader.getGradientButtonBackgroundMouse();
			button.style.height = "22px";
			button.style.position = "absolute";
			button.setAttribute("onclick", "event.stopPropagation();");
			button.setAttribute('href', youtube.convertUrl(url));
			button.setAttribute('target', '_blank');
			button.appendChild(this.createSpan(margin));
			youtube.commonFunction.setToolTip(button, tooltipText);
			return button;
		},
		createSpan: function(margin) {
			var span = youtube.doc.createElement("span");
			span.className = "yt-uix-button-icon-wrapper";
			span.appendChild(youtube.commonFunction.getImg(margin));
			return span;
		}
	},
	commonFunction: {
		any: function(mass, condition) {
			for (var j = 0; j < mass.length; j++) {
				if (condition(mass[j])) {
					return true;
				}
			}
			return false;
		},
		testCSS: function(prop) {
			return prop in youtube.doc.documentElement.style;
		},
		getImageSpan: function(ImgCallback) {
			var img = ImgCallback();
			var span = youtube.doc.createElement("span");
			span.className = "yt-uix-button-icon-wrapper";
			span.appendChild(img);
			return span;
		},
		getImageSpanWithoutClassName: function(ImgCallback) {
			var img = ImgCallback();
			var span = youtube.doc.createElement("span");
			span.appendChild(img);
			return span;
		},
		setToolTip: function(element, text) {
			element.setAttribute("data-tooltip-text", text);
		},
		getImg: function(marginCallback) {
			var image = youtube.doc.createElement("img");
			image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAYAAADQ4S5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NTFGQUE5RTA5MEVFMjExQkI0QThFNzBDQTQyMEQ1MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQ0MzQTI5NDE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQ0MzQTI5MzE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3QkU0NTUzM0MxMUUyMTFBQkMzOUZBODRGNUMwNTFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY1MUZBQTlFMDkwRUUyMTFCQjRBOEU3MENBNDIwRDUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6xeScQAAAIVJREFUeNpijG8xYkACXUBcyoAKuoG4DMZhQZYJd84v9bSIQ1G9/cSi0pV7J8I1MCFLoivGJsbEQCKgr4YMPOoykDX8B2FHo5DpuFRD5cDqGP8DAc39YEOCehsGUNIAusr6P2FgDVILdlJCq/FRAjbZQNUg/IBHE1wxhqexaEJRDAIAAQYARJxNXEg1uJEAAAAASUVORK5CYII=";
			var margin = marginCallback();
			image.style.marginLeft = margin.marginLeft;
			image.style.marginRight = margin.marginRight;
			image.style.marginTop = margin.marginTop;
			image.style.marginBottom = margin.marginBottom;
			return image;
		}
	}
};

var Downloader = {
	getMargin: function() {
		return {
			marginLeft: '5px',
			marginBottom: '3px',
			marginRight: '2px'
		}
	},
	getGradientButtonBackgroundMouse: function() {
		return null;
	},
	getButtonNearWatchLaterMargin: function() {
		return {
			marginTop: '-2px',
			marginLeft: '3px',
		}
	},
	getSingleVideoButtonHeight: function() {
		return null
	},
	getElementsByClassName: function(doc, classname) {
		return doc.getElementsByClassName(classname)
	},
	getButtonBackground: function() {
		return "-webkit-linear-gradient(top, #9bd152, #6a9d3d)";
	},
	getButtonNearThumbnailBackground: function() {
		return "-webkit-linear-gradient(top, #83C253, #67993C)";
	}
}


youtube_button();
setInterval(function(){
	youtube_button();
},1000)
function youtube_button(){
	if(localStorage.getItem('buttonstatus') == 'ok'){
		clearInterval(youtube_button);
		youtube.run(document);
		window.setInterval(function() {
			youtube.run(document)
		}, 2000);
	}
}

//EP到thevideomate标识
if (window.location.href.indexOf('http://www.thevideomate.com') >= 0){
	localStorage.setItem("eptvmstatus","ok");
}

var URL = function (url){
    if (typeof url == "undefined") {
        url = location.href
    }
    var segment = url.match(/^(\w+\:\/\/)?([\w\d]+(?:\.[\w]+)*)?(?:\:(\d+))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/);
    if (!segment[3]) {
        segment[3] = "80"
    }
    var param = {};
    if (segment[5]){
        var pse = segment[5].match(/([^=&]+)=([^&]+)/g);
        if (pse) {
            for (var i = 0; i < pse.length; i++) {
                param[pse[i].split("=")[0]] = pse[i].split("=")[1];
            }
        }
    }
    return {
        url : segment[0], sechme : segment[1], host : segment[2], port : segment[3], path : segment[4], 
        queryString : segment[5], fregment : segment[6], param : param
    }
};

//获取url参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

/*youtube topbar*/
/*if (!!window.location.href.match('^https?:\/\/(?:www\.)?youtube.com\/watch\?') && document.getElementById('body-container')!==null){
	var youtube_body = document.getElementsByTagName('body')[0];
    var youtube_div = document.createElement('div');
	youtube_div.id = 'TVMtopbartip';
	youtube_div.className = 'toptip';
	youtube_div.style.background = '#feefac';
	youtube_div.style.backgroundImage = '-webkit-linear-gradient(top, #feefac, #ffe696)';
	youtube_div.style.borderBottom = '1px solid #a9aaac';
	youtube_div.style.color = '#fff';
	youtube_div.style.textShadow = 'none';
	youtube_div.style.height = '33px';
	youtube_div.style.paddingTop = '5px';
	youtube_div.style.width = '100%';
	youtube_div.style.position = 'absolute';
	youtube_div.style.zIndex = '9999999';
	youtube_div.style.top = '0';
	youtube_div.style.left = '0';
	youtube_div.innerHTML = '<p style="color:#000;margin:0;padding:0;outline:none;margin-left: 60px;font-size: 14px;font-family: arial;">'
	                    +'<span style="display:inline-block;font-size:16px;margin-right:30px;">Do you want to download this video ?</span>'
	                    +'<a id="install_now" href="http://www.thevideomate.com/?url='+window.location.href+'&referrer=topbar" target="_blank" style="text-decoration:none;margin:0;padding:0;background-image: -webkit-linear-gradient(top, #fffae4, #eaedb8);border: 1px solid #9b8f5d;border-radius: 3px;padding: 6px;display: inline-block;">Click here</a></p>'
	                +'<div id="topbar_close" style="width: 13px;height: 13px;cursor:pointer;position: absolute;top: 13px;right: 13px;background:url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAMAA0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7k8ZfER/A2oxpe6Y1xY3Ue2zlt5Q0klwM/unBxsBBXDZx1zjv1WmTXcun2z38MdtemNTNDDJ5iI+PmAbAyM98Vm3ng/SNV1CW/vbNLye4t/sjC4JkVYsnKqD93OecYzgelXdP0+LSLG3sbff5FsgiTzHLttAwMsSSa/HZyioRstT6RXu7n//Z)"></div>';

	document.getElementById('body').insertBefore(youtube_div, document.getElementById('body-container'));
	document.getElementById('install_now').addEventListener('click', function(){
		youtube_body.style.paddingTop = '34px';
	})
	document.getElementById('topbar_close').addEventListener('click', function(){
	    document.getElementById('TVMtopbartip').style.display = 'none';
	    youtube_body.style.paddingTop = '0px';
	    localStorage.TVMclick=new Date().getDay();
	})
	if (localStorage.TVMclick && localStorage.TVMclick == new Date().getDay().toString()){
		youtube_body.style.paddingTop = '0px';
		document.getElementById('TVMtopbartip').style.display = 'none';
	} else {
		youtube_body.style.paddingTop = '34px';
		document.getElementById('TVMtopbartip').style.display = 'block';
	}
}*/ 

(function(current_href) {
	//vimeo player页
	if (!!current_href.match(/^http?:\/\/(?:www\.)?vimeo.com\/\d+/) && document.getElementById('tools')!==null){
		function insert_download_a(){
			if (!document.getElementById('download_btn') && !document.querySelector('.download')){
				var vimeo_a = document.createElement('a');
				vimeo_a.className = 'btn iconify_down_b';
				vimeo_a.id = 'download_btn';
				vimeo_a.title = 'Download this video';
				vimeo_a.innerHTML = 'download';
				vimeo_a.target = '_blank';
				var _href = "http://www.thevideomate.com/?url="+current_href+"&referrer=vimeo";
				vimeo_a.setAttribute('href', _href);
				document.getElementById('tools').insertBefore(vimeo_a, document.querySelector('.stats'));
			}
			//video播放
			window.onload = function(){
				if (!document.getElementById('vimeo_download_btn')) {
					var vimeo_home_player = document.querySelector('.player_container .player');
					var vimeo_home_player_href = "http://www.thevideomate.com/?url="+current_href+"&referrer=vimeo";
					var vimeo_home_player_button = document.createElement('button');
					vimeo_home_player_button.className = 'rounded-box';
					vimeo_home_player_button.id = 'vimeo_download_btn';
					vimeo_home_player_button.innerHTML = '<a href="'+vimeo_home_player_href+'" style="color: rgb(255, 255, 255);" target="_blank" title="Download this video">Download</a>';
					document.querySelector('.sidedock').appendChild(vimeo_home_player_button);
				}
			}
		}
		insert_download_a();
		window.setInterval(function() {
			insert_download_a();
		}, 2000);
	//viemo首页
	} else if (current_href == "https://vimeo.com/"){
		function vimeo_home_a(){
			//缩略图
			var vimeo_home_li = document.getElementById('featured_videos').querySelectorAll('li');
			for (var i = 0; i < vimeo_home_li.length; i++){
				if (!vimeo_home_li[i].querySelector('.vimeo_li_download_btn')){
					var vimeo_home_li_a = vimeo_home_li[i].querySelector('a');
					var vimeo_home_li_href = vimeo_home_li_a.getAttribute('data-id');
					var vimeo_home_li_a_a = document.createElement('a');
					vimeo_home_li_a_a.style.width = '18px';
					vimeo_home_li_a_a.style.height = '18px';
					vimeo_home_li_a_a.title = 'Download this video';
					vimeo_home_li_a_a.className = 'vimeo_li_download_btn';
					vimeo_home_li_a_a.style.position = 'absolute';
					vimeo_home_li_a_a.style.bottom = '46px';
					vimeo_home_li_a_a.style.right = '2px';
					vimeo_home_li_a_a.style.backgroundColor = 'rgb(138, 188, 46)';
					vimeo_home_li_a_a.style.borderRadius = '3px';
					vimeo_home_li_a_a.style.padding = '4px 0 2px 6px';
					vimeo_home_li_a_a.setAttribute("target", "_blank");
					var vimeo_home_li_a_a_href = "http://www.thevideomate.com/?url="+current_href+vimeo_home_li_href+"&referrer=vimeo";
					vimeo_home_li_a_a.setAttribute('href', vimeo_home_li_a_a_href);
					vimeo_home_li_a_a.setAttribute("onclick", "event.stopPropagation();");
					var vimeo_home_li_a_a_img = document.createElement("img");
						vimeo_home_li_a_a_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAYAAADQ4S5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NTFGQUE5RTA5MEVFMjExQkI0QThFNzBDQTQyMEQ1MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQ0MzQTI5NDE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQ0MzQTI5MzE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3QkU0NTUzM0MxMUUyMTFBQkMzOUZBODRGNUMwNTFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY1MUZBQTlFMDkwRUUyMTFCQjRBOEU3MENBNDIwRDUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6xeScQAAAIVJREFUeNpijG8xYkACXUBcyoAKuoG4DMZhQZYJd84v9bSIQ1G9/cSi0pV7J8I1MCFLoivGJsbEQCKgr4YMPOoykDX8B2FHo5DpuFRD5cDqGP8DAc39YEOCehsGUNIAusr6P2FgDVILdlJCq/FRAjbZQNUg/IBHE1wxhqexaEJRDAIAAQYARJxNXEg1uJEAAAAASUVORK5CYII=";
					vimeo_home_li_a_a.appendChild(vimeo_home_li_a_a_img);
					vimeo_home_li_a.appendChild(vimeo_home_li_a_a);
				}
			}
			//video播放
			window.onload = function(){
				if (!document.getElementById('vimeo_download_btn')) {
					var vimeo_home_player = document.querySelector('.player_container .player');
					var vimeo_home_player_urlid = vimeo_home_player.getAttribute('data-fallback-url').match(/video\/\d+/)[0].split('/')[1];
					var vimeo_home_player_href = "http://www.thevideomate.com/?url="+current_href+vimeo_home_player_urlid+"&referrer=vimeo";
					var vimeo_home_player_button = document.createElement('button');
					vimeo_home_player_button.className = 'rounded-box';
					vimeo_home_player_button.id = 'vimeo_download_btn';
					vimeo_home_player_button.innerHTML = '<a href="'+vimeo_home_player_href+'" style="color: rgb(255, 255, 255);" target="_blank" title="Download this video">Download</a>';
					document.querySelector('.sidedock').appendChild(vimeo_home_player_button);
				}
			}
		}

		vimeo_home_a();
		window.setInterval(function() {
			vimeo_home_a();
		}, 2000);
	//metacafe
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?metacafe.com\/watch\/\d+/)){
		window.onload = function(){
		 	if (!document.getElementById('metacafe_download_btn')) {
				var metacafe_container = document.querySelector('#SocialButtons');
				var metacafe_url = "http://www.metacafe.com"+URL(current_href).path;
				var metacafe_download_url = "http://www.thevideomate.com/?url="+metacafe_url+"&referrer=metacafe";
				var metacafe_container_li = document.createElement('li');
				metacafe_container_li.innerHTML = '<a href="'+metacafe_download_url+'" id="metacafe_download_btn" class="V2Button" style="background:#fff;height: 30px;line-height: 30px;padding: 6px 10px;text-decoration:none;" target="_blank" title="Download this video">Download</a>';
				metacafe_container.appendChild(metacafe_container_li);
			}
		}
	// break
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?break.com\/video\//)){
	 	if (!document.getElementById('break_download_btn')) {
	 		document.querySelector('#content-main .row article .brk-cdp-heading').style.width = '70%';
			var break_span = document.querySelector('.js-brk-fav-btn-cont');
			var break_span_a = document.createElement('a');
			break_span_a.id = 'break_download_btn';
			var break_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=break";
			break_span_a.setAttribute('href', break_download_url);
			break_span_a.setAttribute('target', '_blank');
			break_span_a.setAttribute('title', 'Download this video');
			break_span_a.innerHTML = '<button class="brk-share-btns download_btn" style="float:right;background-position: -690px -2px;margin: 5px 5px 0 0;border:0;outline:0;width: 84px;height: 24px;text-indent: -9999pt;">Download</button>';
			break_span.appendChild(break_span_a);
			break_span_a.querySelector('.download_btn').addEventListener('mouseover', function(){
				this.style.backgroundPosition = '-601px -2px';
			})
			break_span_a.querySelector('.download_btn').addEventListener('mouseout', function(){
				this.style.backgroundPosition = '-690px -2px';
			})
		}
	// Howcast
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?howcast.com\/videos\//)){
	 	if (!document.getElementById('howcast_download_btn')) {
			var howcast_share = document.querySelector('#video-caption .dropdown-share');
			howcast_share.style.right = '10px';
			var howcast_div = document.createElement('div');
			howcast_div.id = 'howcast_download_btn';
			howcast_div.className = 'dropdown download';
			howcast_div.style.position = 'absolute';
			howcast_div.style.top = '21px';
			howcast_div.style.right = '78px';
			var howcast_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=howcast";
			howcast_div.innerHTML = '<a class="toggle" href="'+howcast_download_url+'" target="_blank" title="Download this video" style="padding-top: 2px;padding-bottom: 2px;">Download</a>';
			document.querySelector('#video-caption').insertBefore(howcast_div, howcast_share);
		}
	// ehow
	} else if (current_href.match(/^http?:\/\/(?:www\.)?ehow.com\/video_(.*)\.html/)){
	 	if (!document.getElementById('ehow_download_btn')) {
			var ehow_container = document.querySelector('.seriesHeader');
			var ehow_div = document.createElement('div');
			ehow_div.id = 'ehow_download_btn';
			ehow_div.className = 'download';
			ehow_div.style.position = 'absolute';
			ehow_div.style.top = '50px';
			ehow_div.style.right = '20px';
			ehow_div.style.zIndex = '10';
			var ehow_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=ehow";
			ehow_div.innerHTML = '<a href="'+ehow_download_url+'" target="_blank" title="Download this video" style="display: inline-block;padding: 4px 10px 4px;color: #fff;text-align: center;vertical-align: middle;cursor: pointer;background: #84929a;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;text-decoration: none;">Download</a>';
			ehow_container.appendChild(ehow_div);
		}
	// blip.tv
	} else if (current_href.match(/^http?:\/\/(?:www\.)?blip.tv\/([a-z|-]+)\/((\w|-)+)/)){
	 	if (!document.getElementById('blip_download_btn')) {
			var blip_container = document.querySelector('.DescContainer');
			var blip_div = document.createElement('div');
			blip_div.id = 'blip_download_btn';
			blip_div.className = 'download';
			blip_div.style.position = 'absolute';
			blip_div.style.top = '0px';
			blip_div.style.right = '-30px';
			var blip_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=blip";
			blip_div.innerHTML = '<a href="'+blip_download_url+'" target="_blank" title="Download this video" style="display: inline-block;padding: 4px 10px 4px;color: #fff;text-align: center;vertical-align: middle;cursor: pointer;background: #84929a;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;text-decoration: none;">Download</a>';
			blip_container.appendChild(blip_div);
		}
	// collegehumor
	} else if (current_href.match(/^http?:\/\/(?:www\.)?collegehumor.com\/(video|embed)\/(\d+)\/((\w|-)+)/)){
	 	if (!document.getElementById('collegehumor_download_btn')) {
			var collegehumor_container = document.querySelector('.share-bar .large');
			var collegehumor_li = document.createElement('li');
			collegehumor_li.id = 'collegehumor_download_btn';
			var collegehumor_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=collegehumor";
			collegehumor_li.innerHTML = '<a href="'+collegehumor_download_url+'" target="_blank" title="Download this video"><span class="btn-share btn-share-twitter">Download</span></a>';
			collegehumor_container.appendChild(collegehumor_li);
		}

	// yahoo 缩略图
	} else if(current_href.match(/^http?:\/\/(?:www\.)?screen.yahoo.com/)  && getQueryString('url') == null){
		
		function yahoo_insert_a(){
			//缩略图
			var yahoo_thumb_li = document.querySelectorAll('.scrollstrip-cb .thumb');
			for (var i = 0; i < yahoo_thumb_li.length; i++){
				if (!yahoo_thumb_li[i].querySelector('.yahoo_download_btn')){
					var yahoo_thumb_li_a = yahoo_thumb_li[i].querySelector('a');
					var yahoo_thumb_li_a_href = yahoo_thumb_li_a.getAttribute('href');
					var yahoo_thumb_a_a = document.createElement('a');
					yahoo_thumb_a_a.title = 'Download this video';
					yahoo_thumb_a_a.className = 'yahoo_download_btn';
					yahoo_thumb_a_a.style.position = 'absolute';
					yahoo_thumb_a_a.style.bottom = '0px';
					yahoo_thumb_a_a.style.right = '2px';
					yahoo_thumb_a_a.style.backgroundColor = 'rgb(138, 188, 46)';
					yahoo_thumb_a_a.style.borderRadius = '3px';
					yahoo_thumb_a_a.style.padding = '2px';
					yahoo_thumb_a_a.setAttribute("target", "_blank");
					var yahoo_thumb_a_a_href = "http://www.thevideomate.com/?url=http://screen.yahoo.com"+yahoo_thumb_li_a_href+"&referrer=yahoo";
					yahoo_thumb_a_a.setAttribute('href', yahoo_thumb_a_a_href);
					yahoo_thumb_a_a.setAttribute("onclick", "event.stopPropagation();");
					var yahoo_thumb_a_a_img = document.createElement("img");
						yahoo_thumb_a_a_img.style.border = '0';
						yahoo_thumb_a_a_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAYAAADQ4S5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NTFGQUE5RTA5MEVFMjExQkI0QThFNzBDQTQyMEQ1MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQ0MzQTI5NDE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQ0MzQTI5MzE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3QkU0NTUzM0MxMUUyMTFBQkMzOUZBODRGNUMwNTFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY1MUZBQTlFMDkwRUUyMTFCQjRBOEU3MENBNDIwRDUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6xeScQAAAIVJREFUeNpijG8xYkACXUBcyoAKuoG4DMZhQZYJd84v9bSIQ1G9/cSi0pV7J8I1MCFLoivGJsbEQCKgr4YMPOoykDX8B2FHo5DpuFRD5cDqGP8DAc39YEOCehsGUNIAusr6P2FgDVILdlJCq/FRAjbZQNUg/IBHE1wxhqexaEJRDAIAAQYARJxNXEg1uJEAAAAASUVORK5CYII=";
					yahoo_thumb_a_a.appendChild(yahoo_thumb_a_a_img);
					yahoo_thumb_li_a.appendChild(yahoo_thumb_a_a);
				}
			}

			//视频播放页
			if (current_href.match(/^http?:\/\/(?:www\.)?screen.yahoo.com\/([a-z|-]+)\/((\w|-)+)\.html/)){
				if (!document.getElementById('yahoo_download_btn')) {
					var yahoo_container = document.querySelector('.video-meta .title-share');
					var yahoo_div = document.createElement('div');
					yahoo_div.id = 'yahoo_download_btn';
					yahoo_div.style.position = 'absolute';
					yahoo_div.style.top = '0px';
					yahoo_div.style.right = '70px';
					yahoo_div.innerHTML = '<a href="" target="_blank" title="Download this video" style="display: inline-block;padding: 4px 10px 4px;color: #fff;text-align: center;vertical-align: middle;cursor: pointer;background: #84929a;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;text-decoration: none;">Download</a>';
					yahoo_container.appendChild(yahoo_div);
				}
				var yahoo_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=yahoo";
				document.getElementById('yahoo_download_btn').querySelector('a').setAttribute('href', yahoo_download_url);
			}
		}
		yahoo_insert_a();
		window.setInterval(function() {
			yahoo_insert_a();
		}, 2000);
	// xvideos
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?xvideos.com/) && !current_href.match(/^http?:\/\/(?:www\.)?xvideos.com\/(video)\d+\//)){
		//缩略图
		var xvideos_thumb_li = document.querySelectorAll('#content .thumbBlock');
		for (var i = 0; i < xvideos_thumb_li.length; i++){
			if (!xvideos_thumb_li[i].querySelector('.xvideos_download_btn')){
				var xvideos_thumb_a = xvideos_thumb_li[i].querySelector('.thumb a');
				var xvideos_thumb_a_href = xvideos_thumb_a.getAttribute('href');
				var xvideos_thumb_a_a = document.createElement('a');
				xvideos_thumb_a_a.style.width = '18px';
				xvideos_thumb_a_a.style.height = '18px';
				xvideos_thumb_a_a.title = 'Download this video';
				xvideos_thumb_a_a.className = 'xvideos_download_btn';
				xvideos_thumb_a_a.style.position = 'absolute';
				xvideos_thumb_a_a.style.bottom = '53px';
				xvideos_thumb_a_a.style.right = '2px';
				xvideos_thumb_a_a.style.backgroundColor = 'rgb(138, 188, 46)';
				xvideos_thumb_a_a.style.borderRadius = '3px';
				xvideos_thumb_a_a.style.padding = '2px';
				xvideos_thumb_a_a.setAttribute("target", "_blank");
				var xvideos_thumb_a_a_href = "http://www.thevideomate.com/?url=http://www.xvideos.com"+xvideos_thumb_a_href+"&referrer=xvideos";
				xvideos_thumb_a_a.setAttribute('href', xvideos_thumb_a_a_href);
				xvideos_thumb_a_a.setAttribute("onclick", "event.stopPropagation();");
				var xvideos_thumb_a_a_img = document.createElement("img");
					xvideos_thumb_a_a_img.style.border = '0';
					xvideos_thumb_a_a_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAYAAADQ4S5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NTFGQUE5RTA5MEVFMjExQkI0QThFNzBDQTQyMEQ1MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQ0MzQTI5NDE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQ0MzQTI5MzE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3QkU0NTUzM0MxMUUyMTFBQkMzOUZBODRGNUMwNTFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY1MUZBQTlFMDkwRUUyMTFCQjRBOEU3MENBNDIwRDUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6xeScQAAAIVJREFUeNpijG8xYkACXUBcyoAKuoG4DMZhQZYJd84v9bSIQ1G9/cSi0pV7J8I1MCFLoivGJsbEQCKgr4YMPOoykDX8B2FHo5DpuFRD5cDqGP8DAc39YEOCehsGUNIAusr6P2FgDVILdlJCq/FRAjbZQNUg/IBHE1wxhqexaEJRDAIAAQYARJxNXEg1uJEAAAAASUVORK5CYII=";
				xvideos_thumb_a_a.appendChild(xvideos_thumb_a_a_img);
				xvideos_thumb_a.appendChild(xvideos_thumb_a_a);
			}
		}
	// xvideos 视频播放页
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?xvideos.com\/(video)\d+\//) && getQueryString('url') == null){
		if (!document.getElementById('xvideos_download_btn')) {
			var xvideos_tabVote = document.getElementById('tabVote');
			var xvideos_li = document.createElement('li');
			xvideos_li.id = 'xvideos_download_btn';
			xvideos_li.className = 'headtab closable';
			var xvideos_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=xvideos";
			xvideos_li.innerHTML = '<a href="'+xvideos_download_url+'" target="_blank" onclick="event.stopPropagation();">Download</a>';
			xvideos_tabVote.parentNode.insertBefore(xvideos_li, xvideos_tabVote.nextSibling);
		}
	// redtube 视频播放页
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?redtube.com\/\d+/) && getQueryString('url') == null){
		if (!document.getElementById('redtube_download_btn')) {
			var redtube_fav_wrap = document.querySelector('#favAddRemoveDiv');
			var redtube_fav_a = document.createElement('a');
			redtube_fav_a.id = 'redtube_download_btn';
			redtube_fav_a.className = 'favAddButton';
			redtube_fav_a.style.marginBottom = '5px';
			redtube_fav_a.setAttribute('target', '_blank');
			redtube_fav_a.setAttribute('onclick', 'event.stopPropagation();');
			redtube_fav_a.setAttribute('title', 'Download this video');
			redtube_fav_a.innerText = 'Download';
			var redtube_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=redtube";
			redtube_fav_a.setAttribute('href', redtube_download_url);
			redtube_fav_wrap.insertBefore(redtube_fav_a, redtube_fav_wrap.firstChild);

			var redtube_belowVideo = document.querySelector('.belowVideo');
			redtube_belowVideo.innerHTML = '';
			var redtube_belowVideo_a = document.createElement('a');
			redtube_belowVideo_a.style.marginBottom = '5px';
			redtube_belowVideo_a.setAttribute('target', '_blank');
			redtube_belowVideo_a.setAttribute('onclick', 'event.stopPropagation();');
			redtube_belowVideo_a.setAttribute('title', 'Download this video');
			redtube_belowVideo_a.setAttribute('href', redtube_download_url);
			redtube_belowVideo_a.innerHTML = '<span style="color: #3f2c18;background-color: #ffcf42;background-image: -webkit-gradient(linear, left top, left bottom, from(#ffcf42), to(#ffa911));background-image: -webkit-linear-gradient(top, #ffcf42, #ffa911);background-image: -moz-linear-gradient(top, #ffcf42, #ffa911);background-image: -ms-linear-gradient(top, #ffcf42, #ffa911);background-image: -o-linear-gradient(top, #ffcf42, #ffa911);border-color: #b48225;border-style: solid;border-width: 0 0 1px 0;-webkit-border-radius: 4px;border-radius: 4px;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;font-size: 17px;font-weight: 700;display: inline-block;float: none;padding: 0 25px;height: 38px;line-height: 38px;vertical-align: middle;text-align: center;text-decoration: none;text-shadow: 0 1px rgba(255,255,255,0.5);margin-left: 9px;cursor: pointer;">Download</span>';
			redtube_belowVideo.appendChild(redtube_belowVideo_a);
		}
	// xhamster
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?xhamster.com/) && !current_href.match(/^http?:\/\/(?:www\.)?xhamster.com\/movies\/\d+\/(.*.html)/)){
		//列表页
		var xhamster_video = document.querySelectorAll('#content .box .video');
		for (var i = 0; i < xhamster_video.length; i++){
			if (!xhamster_video[i].querySelector('.xhamster_download_btn')){
				var xhamster_video_a = xhamster_video[i].querySelector('a');
				var xhamster_video_a_href = xhamster_video_a.getAttribute('href');
				var xhamster_video_a_a = document.createElement('a');
				xhamster_video_a_a.style.width = '14px';
				xhamster_video_a_a.style.height = '16px';
				xhamster_video_a_a.title = 'Download this video';
				xhamster_video_a_a.className = 'xvideos_download_btn';
				xhamster_video_a_a.style.position = 'absolute';
				xhamster_video_a_a.style.bottom = '-3px';
				xhamster_video_a_a.style.right = '52px';
				xhamster_video_a_a.style.backgroundColor = 'rgb(138, 188, 46)';
				xhamster_video_a_a.style.borderRadius = '3px';
				xhamster_video_a_a.style.padding = '1px 1px 1px 2px';
				xhamster_video_a_a.setAttribute("target", "_blank");
				var xhamster_video_a_a_href = "http://www.thevideomate.com/?url="+xhamster_video_a_href+"&referrer=xhamster";
				xhamster_video_a_a.setAttribute('href', xhamster_video_a_a_href);
				xhamster_video_a_a.setAttribute("onclick", "event.stopPropagation();");
				var xhamster_video_a_a_img = document.createElement("img");
					xhamster_video_a_a_img.style.border = '0';
					xhamster_video_a_a_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAYAAADQ4S5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NTFGQUE5RTA5MEVFMjExQkI0QThFNzBDQTQyMEQ1MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQ0MzQTI5NDE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQ0MzQTI5MzE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3QkU0NTUzM0MxMUUyMTFBQkMzOUZBODRGNUMwNTFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY1MUZBQTlFMDkwRUUyMTFCQjRBOEU3MENBNDIwRDUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6xeScQAAAIVJREFUeNpijG8xYkACXUBcyoAKuoG4DMZhQZYJd84v9bSIQ1G9/cSi0pV7J8I1MCFLoivGJsbEQCKgr4YMPOoykDX8B2FHo5DpuFRD5cDqGP8DAc39YEOCehsGUNIAusr6P2FgDVILdlJCq/FRAjbZQNUg/IBHE1wxhqexaEJRDAIAAQYARJxNXEg1uJEAAAAASUVORK5CYII=";
				xhamster_video_a_a.appendChild(xhamster_video_a_a_img);
				xhamster_video_a.appendChild(xhamster_video_a_a);
			}
		}
	// xhamster 视频播放页
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?xhamster.com\/movies\/\d+\/(.*.html)/) && getQueryString('url') == null){
		if (!document.getElementById('xhamster_download_btn')) {
			var xhamster_a = document.querySelector('#btnLoad');
			var xhamster_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=xhamster";
			xhamster_a.setAttribute('href', xhamster_download_url);
		}
	// xnxx
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?xnxx.com/) && !current_href.match(/^http?:\/\/(?:www\.)?xnxx.com\/(video)\d+\//)){
		//列表页
		var xnxx_thumb_li = document.querySelectorAll('table .thumbs li');
		for (var i = 0; i < xnxx_thumb_li.length; i++){
			if (!xnxx_thumb_li[i].querySelector('.xnxx_download_btn')){
				var xnxx_thumb_a = xnxx_thumb_li[i].querySelector('a');
				var xnxx_thumb_a_href = xnxx_thumb_a.getAttribute('href');
				var xnxx_thumb_a_a = document.createElement('a');
				xnxx_thumb_a_a.style.width = '14px';
				xnxx_thumb_a_a.style.height = '16px';
				xnxx_thumb_a_a.title = 'Download this video';
				xnxx_thumb_a_a.className = 'xnxx_download_btn';
				xnxx_thumb_a_a.style.position = 'absolute';
				xnxx_thumb_a_a.style.bottom = '0px';
				xnxx_thumb_a_a.style.right = '12px';
				xnxx_thumb_a_a.style.backgroundColor = 'rgb(138, 188, 46)';
				xnxx_thumb_a_a.style.borderRadius = '3px';
				xnxx_thumb_a_a.style.padding = '1px 1px 1px 2px';
				xnxx_thumb_a_a.setAttribute("target", "_blank");
				var xnxx_thumb_a_a_href = "http://www.thevideomate.com/?url="+xnxx_thumb_a_href+"&referrer=xnxx";
				xnxx_thumb_a_a.setAttribute('href', xnxx_thumb_a_a_href);
				xnxx_thumb_a_a.setAttribute("onclick", "event.stopPropagation();");
				var xnxx_thumb_a_a_img = document.createElement("img");
					xnxx_thumb_a_a_img.style.border = '0';
					xnxx_thumb_a_a_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAYAAADQ4S5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NTFGQUE5RTA5MEVFMjExQkI0QThFNzBDQTQyMEQ1MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQ0MzQTI5NDE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQ0MzQTI5MzE4NUQxMUUyQUMzNURDOTQ2QzVBMDNFRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3QkU0NTUzM0MxMUUyMTFBQkMzOUZBODRGNUMwNTFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY1MUZBQTlFMDkwRUUyMTFCQjRBOEU3MENBNDIwRDUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6xeScQAAAIVJREFUeNpijG8xYkACXUBcyoAKuoG4DMZhQZYJd84v9bSIQ1G9/cSi0pV7J8I1MCFLoivGJsbEQCKgr4YMPOoykDX8B2FHo5DpuFRD5cDqGP8DAc39YEOCehsGUNIAusr6P2FgDVILdlJCq/FRAjbZQNUg/IBHE1wxhqexaEJRDAIAAQYARJxNXEg1uJEAAAAASUVORK5CYII=";
				xnxx_thumb_a_a.appendChild(xnxx_thumb_a_a_img);
				xnxx_thumb_a.appendChild(xnxx_thumb_a_a);
			}
		}
	// xnxx 视频播放页
	} else if (!!current_href.match(/^http?:\/\/(?:www\.)?xnxx.com\/(video)\d+\//) && getQueryString('url') == null){
		if (!document.getElementById('xnxx_download_btn')) {
			var xnxx_player = document.querySelector('#player');
			var xnxx_download_url = "http://www.thevideomate.com/?url="+current_href+"&referrer=xnxx";
			var xnxx_a = document.createElement('a');
			xnxx_a.style.marginBottom = '5px';
			xnxx_a.setAttribute('target', '_blank');
			xnxx_a.setAttribute('onclick', 'event.stopPropagation();');
			xnxx_a.setAttribute('title', 'Download this video');
			xnxx_a.setAttribute('href', xnxx_download_url);
			xnxx_a.innerHTML = '<span style="color: #3f2c18;background-color: #ffcf42;background-image: -webkit-gradient(linear, left top, left bottom, from(#ffcf42), to(#ffa911));background-image: -webkit-linear-gradient(top, #ffcf42, #ffa911);background-image: -moz-linear-gradient(top, #ffcf42, #ffa911);background-image: -ms-linear-gradient(top, #ffcf42, #ffa911);background-image: -o-linear-gradient(top, #ffcf42, #ffa911);border-color: #b48225;border-style: solid;border-width: 0 0 1px 0;-webkit-border-radius: 4px;border-radius: 4px;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;font-size: 17px;font-weight: 700;display: inline-block;float: none;padding: 0 25px;height: 38px;line-height: 38px;vertical-align: middle;text-align: center;text-decoration: none;text-shadow: 0 1px rgba(255,255,255,0.5);margin-left: 9px;cursor: pointer;">Download</span>';
			xnxx_player.appendChild(xnxx_a);
		}
	}

}(window.location.href));






