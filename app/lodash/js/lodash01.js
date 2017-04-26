

// 1. _.chunk(array, [size=1])
// 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
console.log(JSON.stringify(_.chunk(['a', 'b', 'c', 'd'], 2), null, '\t'));
// => [['a', 'b'], ['c', 'd']]

console.log(JSON.stringify(_.chunk(['a', 'b', 'c', 'd'], 3), null, '\t'));
// => [['a', 'b', 'c'], ['d']]


console.log(JSON.stringify(_.chunk([{a:'a'},{b:'b'},{c:'c',d:'d'},{e:'e'}], 3), null, '\t'));
// [[{"a":"a"},{"b":"b"},{"c":"c","d":"d"}],[{"e":"e"}]]




// 2. _.concat(array, [values])
// 创建一个新数组，将array与任何数组 或 值连接在一起。
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]




// 3. _.difference(array, [values])
// 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。（愚人码头注：即创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。）该方法使用 SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。
console.log(_.difference([3, 2, 1], [4, 2]));
// => [3, 1]



// 4. _.drop(array, [n=1]) ==> shift()
// 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
// 参数

// array (Array): 要查询的数组。
// [n=1] (number): 要去除的元素个数。
// 返回值

// (Array): 返回array剩余切片。

console.log(_.drop([1, 2, 3]));
// => [2, 3]
 
console.log(_.drop([1, 2, 3], 2));
// => [3]
 
console.log(_.drop([1, 2, 3], 5));
// => []
 
console.log(_.drop([1, 2, 3], 0));
// => [1, 2, 3]


// 5. _.dropRight(array, [n=1]) ==> pop()
// 创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）




// 6. _.dropRightWhile(array, [predicate=_.identity])
// 创建一个切片数组，去除array中从 predicate 返回假值开始到尾部的部分。predicate 会传入3个参数： (value, index, array)。
// 参数

// array (Array): 要查询的数组。
// [predicate=_.identity] (Array|Function|Object|string): 这个函数会在每一次迭代调用。
// 返回值

// (Array): 返回array剩余切片。
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
console.log(JSON.stringify(_.dropRightWhile(users, function(o) { return !o.active; }), null, '\t'));
// => objects for ['barney']
 

// The `_.matches` iteratee shorthand.
console.log(JSON.stringify(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), null, '\t'));
// => objects for ['barney', 'fred']
 
// The `_.matchesProperty` iteratee shorthand.
console.log(JSON.stringify(_.dropRightWhile(users, ['active', false]), null, '\t'));
// => objects for ['barney']
 
// The `_.property` iteratee shorthand.
console.log(JSON.stringify(_.dropRightWhile(users, 'active'), null, '\t'));
// => objects for ['barney', 'fred', 'pebbles']




// 7. _.fill(array, value, [start=0], [end=array.length])

// 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。

// Note: 这个方法会改变 array（愚人码头注：不是创建新数组）。

// 引入版本

// 3.2.0

// 参数

// array (Array): 要填充改变的数组。
// value (*): 填充给 array 的值。
// [start=0] (number): 开始位置（默认0）。
// [end=array.length] (number):结束位置（默认array.length）。
// (Array): 返回 array。
// 返回值
var arrayFill = [1, 2, 3];
 
_.fill(arrayFill, 'a');
console.log(arrayFill);
// => ['a', 'a', 'a']
 
console.log(_.fill(Array(3), 2));
// => [2, 2, 2]
 
;
console.log(_.fill([4, 6, 8, 10], '*', 1, 3));
// => [4, '*', '*', 10]



// 8. _.findIndex(array, [predicate=_.identity])
// 该方法类似_.find，区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。

// 引入版本

// 1.1.0

// 参数

// array (Array): 要搜索的数组。
// [predicate=_.identity] (Array|Function|Object|string): 这个函数会在每一次迭代调用。
// 返回值

// (number): 返回找到元素的 索引值（index），否则返回 -1。

var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

console.log(_.findIndex(users, function(o) { return o.user == 'barney'; }));
// => 0
 
// The `_.matches` iteratee shorthand.
console.log(_.findIndex(users, { 'user': 'fred', 'active': false }));
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
console.log(_.findIndex(users, ['active', false]));
// => 0
 
// The `_.property` iteratee shorthand.
console.log(_.findIndex(users, 'active'));
// => 2


// 9. _.forEachRight(collection, [iteratee=_.identity])
// 这个方法类似 _.forEach，不同之处在于，_.forEachRight 是从右到左遍历集合中每一个元素的。


// 10. _.includes(collection, value, [fromIndex=0])
// 检查 value(值) 是否在 collection(集合) 中。如果 collection(集合)是一个字符串，那么检查 value（值，子字符串） 是否在字符串中， 否则使用 SameValueZero 做等值比较。 如果指定 fromIndex 是负数，那么从 collection(集合) 的结尾开始检索。

// 添加版本

// 0.1.0

// 参数

// collection (Array|Object|string): 要检索的集合。
// value (*): 要检索的值。
// [fromIndex=0] (number): 要检索的 索引位置。
// 返回

// (boolean): 如果找到 value 返回 true， 否则返回 false。
console.log(_.includes([1, 2, 3], 1));
// => true
 
console.log(_.includes([1, 2, 3], 1, 2));
// => false
 
console.log(_.includes({ 'user': 'fred', 'age': 40 }, 'fred'));
// => true
 
console.log(_.includes('pebbles', 'eb'));
// => true


// 11. _.orderBy(collection, [iteratees=[_.identity]], [orders])
// 此方法类似于_.sortBy，除了它允许指定 iteratee（迭代函数）结果如何排序。 如果没指定 orders（排序），所有值以升序排序。 否则，指定为"desc" 降序，或者指定为 "asc" 升序，排序对应值。

// 添加版本

// 4.0.0

// 参数

// collection (Array|Object): 用来迭代的集合。
// [iteratees=[_.identity]] (Array[]|Function[]|Object[]|string[]): 排序的迭代函数。
// [orders] (string[]): iteratees迭代函数的排序顺序。
// 返回

// (Array): 排序排序后的新数组。
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// 以 `user` 升序排序 再  `age` 以降序排序。
console.log(JSON.stringify(_.orderBy(users, ['user', 'age'], ['asc', 'desc']), null, '\t'));
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]



// 11. _.partition(collection, [predicate=_.identity])
// 创建一个分成两组的元素数组，第一组包含predicate（断言函数）返回为 truthy（真值）的元素，第二组包含predicate（断言函数）返回为 falsey（假值）的元素。predicate 调用1个参数：(value)。

// 添加版本

// 3.0.0

// 参数

// collection (Array|Object): 用来迭代的集合。
// [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
// 返回

// (Array): 返回元素分组后的数组。

// 例子
var users = [
  { 'user': 'barney',  'age': 36, 'active': false },
  { 'user': 'fred',    'age': 40, 'active': true },
  { 'user': 'pebbles', 'age': 1,  'active': false }
];
 
console.log(JSON.stringify(_.partition(users, function(o) { return o.active; }), null, '\t'));
// => objects for [['fred'], ['barney', 'pebbles']]
 
// The `_.matches` iteratee shorthand.
console.log(JSON.stringify(_.partition(users, { 'age': 1, 'active': false }), null, '\t'));
// => objects for [['pebbles'], ['barney', 'fred']]
 
// The `_.matchesProperty` iteratee shorthand.
console.log(JSON.stringify(_.partition(users, ['active', false]), null, '\t'));
// => objects for [['barney', 'pebbles'], ['fred']]
 
// The `_.property` iteratee shorthand.
console.log(JSON.stringify(_.partition(users, 'active'), null, '\t'));
// => objects for [['fred'], ['barney', 'pebbles']]






































