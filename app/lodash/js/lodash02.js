

var i = 0;
function addContactToList() {
	console.log('!@@#Y$U#YU$Y#U$Y#‘’');
	console.log(i++);
}
document.querySelector('#confirmBtn').onclick = _.before(5, addContactToList)



// _.defer(function(text) {
//   console.log(text);
// }, 'deferred');
// => 一毫秒或更久一些输出 'deferred'。
// console.log('text21212');



console.log(NaN == NaN);
console.log(_.eq(NaN, NaN))
var obj = {
	a: 'Q',
	b: 'J'
};
var objStr = JSON.stringify(obj, null, '\t');
console.log(objStr);
console.log(typeof objStr);
console.log(JSON.parse(objStr).b)


console.log(_.isArguments(function() { return arguments; }()));
// => true
 
console.log(_.isArguments([1, 2, 3]));
// => false



var a = 1.2;
var b = 3;
console.log(a/b); // 0.39999999999999997
console.log(_.divide(a, b)); // 0.39999999999999997 ==> 没有做特殊处理

console.log((a * 10)/(b*10)) // 0.4






console.log(_.max([4, 2, 8, 6]))
console.log(_.max(4, 2, 8, 6)); //undefined ==> 必须传入数组
console.log(Math.max(4, 2, 8, 6))





