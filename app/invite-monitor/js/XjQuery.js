/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-23 14:49:58
 * @version XjQuery 20150523
 */


var XjQuery = (function() {

	// 常用共用变量
	var oBody = $('body').eq(0);


	// removeMask
	var removeMask = function() {
		if ($("#mask-div").length > 0) {
			$("#mask-div").hide().remove();
		}
	};
	// mask
	var mask = function(config) {
		var defaults = {
			hideAuto: false,
			timeout: 1200,
			loading: false,
			style: ''
		};
		var option = $.extend(defaults, config);
		var loadCSS = '';
		if (option.loading) {
			loadCSS = 'loading';
		}
		var maskHtml = "<div id='mask-div' class='mask-div " +
			loadCSS + "' style='" + option.style + "'></div>";
		oBody.append(maskHtml);
		// 禁止点击和滑动冒泡==> 原生方法，注意和toucher的区别，toucher直接return  false;
		$("#mask-div").on('touchmove', function(event) {
			event.stopPropagation();
			event.preventDefault();
		}, false);
		if (option.hideAuto) {
			setTimeout(removeMask, option.timeout);
		}
	};



	//自动隐藏的tips
	var tips = function(oText, timeout) {
		var tipHtml = "<div class='tips-info'>" + oText + "</div>";
		oBody.append(tipHtml);
		setTimeout(function() {
			$('.tips-info').hide().remove();
		}, timeout);
		return false;
	};



	// 验证表单的函数
	// 参数：focusArg==>验证不通过是是否获取焦点，默认不获取
	var validate = function(validataArr) {
		var oBoolean = true;
		var validate = $('.validate');
		if (validate.length > 0) {
			$('.validate').each(function() {
				var dataPattern = $(this).attr('data-pattern');
				if (dataPattern != undefined) {
					var reg = new RegExp(validataArr[dataPattern][0], 'g')
					if (!reg.test($(this).val())) {
						var oText = validataArr[dataPattern][1];
						if (oText == undefined) {
							oText = '验证不通过！';
						}
						XjQuery.mask({
							hideAuto: true,
							style: 'background-color: rgba(0,0,0,0);'
						});
						tips(oText, 1200);
						if (validataArr.focusArg) {
							$(this).focus();
						}
						oBoolean = false;
						return false; //跳出each循环
					}
				}
			}) /*each*/
		}
		return oBoolean; //验证通过了就返回true，不通过返回false
	};




	// input输入删除
	var inputDelete = function(inputDeleteCalss) {
		$(inputDeleteCalss).each(function() {
			$(this).keyup(function() {
				if ($(this).val().length > 0) {
					$(this).next('.delete-btn')[0].style.display = 'block';
				} else {
					$(this).next('.delete-btn')[0].style.display = 'none';
				}
			})
			$(this).focus(function() {
				if ($(this).val().length > 0) {
					$(this).next('.delete-btn')[0].style.display = 'block';
				} else {
					$(this).next('.delete-btn')[0].style.display = 'none';
				}
			})
			$(this).blur(function() {
				var _this = $(this);
				setTimeout(function() {
					_this.next('.delete-btn')[0].style.display = 'none';
				}, 90);
			})
		})
		$('.delete-btn').each(function() {
			util.toucher(this).on('singleTap', function() {
				$(this).prev(inputDeleteCalss).val('').focus();
				this.style.display = 'none';
			})
		})
	};



	

	return {
		validate: validate,
		inputDelete: inputDelete,
		tips: tips,
		mask: mask,
		removeMask: removeMask,
	}

})();