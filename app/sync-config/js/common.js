//全选事件

var XjQuery = (function() {

    var selectAll = function(allID, checkboxList) {
        $(allID).change(function(){
            var checkedTF = this.checked;
            $(checkboxList).each(function(){
                $(this).prop('checked',checkedTF);
            });
        })
        $(checkboxList).change(function() {
            if(!this.checked){
                $(allID).prop('checked',false);
            } else if ($(checkboxList + ':checked').length == $(checkboxList).length) {
                $(allID).prop('checked',true);
            }
        })
    }

    return {
        selectAll: selectAll
    }


})()


