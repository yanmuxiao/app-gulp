Mock.mock('http://g.cn', {
    'name'     : '@name',
    'age|1-100': 100,
    'color'    : '@color'
});
$.ajax({
    url: 'http://g.cn',
    dataType:'json'
    }).done(function(data, status, xhr){

    	console.log(JSON.stringify(data, null, 4))    

});