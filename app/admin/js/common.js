
var XjQuery = (function() {


	// 验证表单的函数
	// 参数：focusArg==>验证不通过是是否获取焦点，默认不获取
	var validate = function(validateArr) {
	    var oBoolean = true;
	    var validate = $('.validate');


	    if (validate.length > 0) {
	        validate.each(function() {
	            var dataPattern = $(this).attr('data-pattern');
	            if (dataPattern != undefined) {
	                
	                var reg = new RegExp(validateArr[dataPattern][0],'g');
	                if (!reg.test($(this).val())) {
	                    var oText = validateArr[dataPattern][1];
	                    if (oText == undefined) {
	                        oText = '验证不通过！';
	                    }

	                    if(validateArr.validateFalse) {
	                    	validateArr.validateFalse();
	                    } else {
	                    	layer.msg(oText);
	                    }
	                    

	                    if (validateArr.focusArg) {
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



	return {
        validate : validate
    }



})();