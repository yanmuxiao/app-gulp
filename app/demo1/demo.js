//查询参数
var params = {
		'pageNo': '1',
		'pageSize': '20',
		'APPROVE_STATUS':"4",
		'PAGE_TYPE':3
};
$(function(){
	UI.control.init();
	initEvent();
	initData();
});
function initEvent(){
	$("body").on("click",'.expandToggleBtn',function(){
		var $this = $(this),
			$toggle = $this.find("span"),
			curClassName = $toggle.attr("class"),
			curIndex = $this.parent().attr('index');
		
		if(curClassName == 'icon-uniE91A'){
			$toggle.attr('class','icon-arrow-down10');
			$(".expandedCell[index='"+curIndex+"']").removeClass("hide");
		}else{
			$toggle.attr('class','icon-uniE91A');
			$(".expandedCell[index='"+curIndex+"']").addClass("hide");
		}
	});
	
}

function tableEvent(){
	// $('#tableList .table-body-wrap').off('scroll').scroll(function(event) {
	// 	/* Act on the event */
	// 	var $this = $(this),
	// 		thisWidth = $this.width(),
	// 		allWidth = $(".table").width(),
	// 		curScrollWidth = allWidth-thisWidth,
	// 		$parent = $this.parent();
	// 	//console.log(this.scrollLeft);
	// 	$("#tableList .table-header-wrap").css('left', -this.scrollLeft);
	// 	if(curScrollWidth == this.scrollLeft){
	// 		$parent.removeClass('is-scrolling-middle').addClass('is-scrolling-right')
	// 	}else if(this.scrollLeft == 0){
	// 		$parent.removeClass('is-scrolling-middle').addClass('is-scrolling-left')
	// 	}else{
	// 		$parent.removeClass('is-scrolling-left')
	// 				.removeClass('is-scrolling-right')
	// 				.addClass('is-scrolling-middle')
	// 	}
	// });
	// $('#tableList .scrollYItem').off('mousewheel').on("mousewheel",function(event, delta, deltaX, deltaY) {
	// 	console.log(delta, deltaX, deltaY);
	// 	var $tableFixedBody = $(".table-fixed-body table"),
	// 		scrollVal = parseInt($tableFixedBody.css('marginTop')),
	// 		maxScrollTop = parseInt($tableFixedBody.height());
	// 	if((scrollVal <= 0 && deltaY<0)||(scrollVal == maxScrollTop && deltaY<0)){
	// 		var scrollVal = parseInt($tableFixedBody.css('marginTop'))+delta,
	// 			$tableBodyWrap = $(".table-body-wrap");
	// 		$tableFixedBody.css('marginTop',scrollVal);
	// 		$tableBodyWrap.scrollTop(Math.abs(scrollVal));
	// 	}
	// });

	var contentScroll = true;
	var leftScroll = true;
	var rightScroll = true;
	var contentTimer = null;
	var leftTimer = null;
	var rightTimer = null;
	$('#tableContentScroll').unbind().scroll(function() {
		clearTimeout(contentTimer);
		if(contentScroll) {
			leftScroll = false;
			rightScroll = false;
			contentTimer = setTimeout(function() {
				leftScroll = true;
				rightScroll = true;
			}, 300);
			var scrollTop = $(this).scrollTop();
			$('#tableLeftScroll, #tableRightScroll').scrollTop(scrollTop);
		}
	})
	$('#tableLeftScroll').unbind().scroll(function() {
		clearTimeout(leftTimer);
		if(leftScroll) {
			contentScroll = false;
			rightScroll = false;
			leftTimer = setTimeout(function() {
				contentScroll = true;
				rightScroll = true;
			}, 300);
			var scrollTop = $(this).scrollTop();
			$('#tableContentScroll, #tableRightScroll').scrollTop(scrollTop);
		}
	})
	$('#tableRightScroll').unbind().scroll(function() {
		clearTimeout(rightTimer);
		if(rightScroll) {
			contentScroll = false;
			leftScroll = false;
			rightTimer = setTimeout(function() {
				contentScroll = true;
				leftScroll = true;
			}, 300);
			var scrollTop = $(this).scrollTop();
			$('#tableLeftScroll, #tableContentScroll').scrollTop(scrollTop);
		}
	})


}

function initData(){
	UI.util.showLoadingPanel();
	UI.control.remoteCall('face/dispatchedApprove/getData', params, function(resp){
		$("#tableList").html(tmpl('listTemplate',resp.data.records));
		UI.util.hideLoadingPanel();
		tableEvent();
	}, function(){}, {}, true)
}