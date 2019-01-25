var fullScreen = {
	initialize:function(target){
		try{
			this.doc = top.document;
			this._target = target || this.doc.documentElement;
			this._bindFullScreenEvent();
		}catch(err){}
	},
	_bindFullScreenEvent:function(){
		// if(!this.isSupported()){
		// 	return;
		// }
		var self = this;
		function onFullScreenChange(){
			self.fire("fullscreenchange",{isFullScreen:self.isFullScreen()});
		}
		var eventName = "fullscreenchange";
		// if(L.Browser.webkit){
		// 	eventName = "webkitfullscreenchange";
		// }else if(L.Browser.gecko){
		// 	eventName = "mozfullscreenchange";
		// }
		this._target.addEventListener(eventName,onFullScreenChange);
	},
	// isSupported:function(){
	// 	return !L.Browser.ie;
	// },
	isFullScreen:function(){
		return (this.doc.fullScreenElement && this.doc.fullScreenElement !== null)
				|| this.doc.mozFullScreen
				|| this.doc.webkitIsFullScreen;
	},
	requestFullScreen:function(){
		var element = this._target;
		if (element.requestFullscreen)
			element.requestFullscreen();
		else if (element.msRequestFullscreen)
			element.msRequestFullscreen();
		else if (element.mozRequestFullScreen)
			element.mozRequestFullScreen();
		else if (element.webkitRequestFullscreen)
			element.webkitRequestFullscreen();
	},
	exitFullScreen:function(){
		if (this.doc.exitFullscreen)
			this.doc.exitFullscreen();
		else if (this.doc.msExitFullscreen)
			this.doc.msExitFullscreen();
		else if (this.doc.mozCancelFullScreen)
			this.doc.mozCancelFullScreen();
		else if (this.doc.webkitExitFullscreen)
			this.doc.webkitExitFullscreen();
	},
	toggleFullScreen:function(){
		if (this.isFullScreen())
			this.exitFullScreen();
		else
			this.requestFullScreen();
	}
}



/*
  * 全屏
*/
function fullScreen(ele){
  var fullScreenEnabled  = document.fullScreenEnabled || document.webkitFullScreenEnabled || document.mozFullScreenEnabled || document.msFullScreenEnabled;
  var isFullScreen         = document.fullScreenElement || document.webkitFullScreenElement || document.mozFullScreenElement || document.msFullScreenElement;
  if (fullScreenEnabled === undefined || fullScreenEnabled) {
     if (isFullScreen === undefined) {
        if (ele.requestFullScreen) {
           ele.requestFullScreen();
        } else if (ele.webkitRequestFullScreen) {
           ele.webkitRequestFullScreen();
        } else if (ele.mozRequestFullScreen) {
           ele.mozRequestFullScreen();
        } else if (ele.msRequestFullScreen) {
           ele.msRequestFullScreen();
        } else {
           console.log('不存在进入全屏的方法！ => undefined');
        }
     } else if (isFullScreen === null) {
        if (ele.requestFullScreen) {
           ele.requestFullScreen();
        } else if (ele.webkitRequestFullScreen) {
           ele.webkitRequestFullScreen();
        } else if (ele.mozRequestFullScreen) {
           ele.mozRequestFullScreen();
        } else if (ele.msRequestFullScreen) {
           ele.msRequestFullScreen();
        } else {
           console.log('不存在进入全屏的方法！ => null');
        }
     } else {
       console.log('元素已经是全屏状态了！');
       return true;
     }
  } else {
    console.log('不支持全屏模式！');
  }
}

/*
  * 退出全屏
*/
function exitFullScreen(){
  var fullScreenEnabled  = document.fullScreenEnabled || document.webkitFullScreenEnabled || document.mozFullScreenEnabled || document.msFullScreenEnabled;
  var isFullScreen         = document.fullScreenElement || document.webkitFullScreenElement || document.mozFullScreenElement || document.msFullScreenElement;
  if (fullScreenEnabled === undefined || fullScreenEnabled) {
     if (isFullScreen === undefined) {
        if (document.exitFullScreen) {
           document.exitFullScreen();
        } else if (document.webkitExitFullScreen) {
           document.webkitExitFullScreen();
        } else if (document.webkitCancelFullScreen) {
           document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
           document.mozCancelFullScreen();
        } else if (document.msExitFullScreen) {
           document.msExitFullScreen();
        } else if (document.msCancelFullScreen) {
           document.msCancelFullScreen();
        } else {
           console.log('不存在退出全屏的方法！ => undefined');
        }
     } else if (isFullScreen !== null) {
        if (document.exitFullScreen) {
           document.exitFullScreen();
        } else if (document.webkitExitFullScreen) {
           document.webkitExitFullScreen();
        } else if (document.webkitCancelFullScreen) {
           document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
           document.mozCancelFullScreen();
        } else if (document.msExitFullScreen) {
           document.msExitFullScreen();
        } else if (document.msCancelFullScreen) {
           document.msCancelFullScreen();
        } else {
           console.log('不存在退出全屏的方法！ => null');
        }
     } else {
       console.log('元素已经是非全屏状态了！');
       return true;
     }
  } else {
    console.log('不支持全屏模式！');
  }
}