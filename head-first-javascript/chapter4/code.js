var emptyArray = []
var array = [1,2,3,4,5]
var arrayLength = array.length
console.log(arrayLength)

var newArray = []
newArray[1] = 3
newArray[2] = 'test'
for (var i = 0; i < newArray.length; i++)
    console.log(newArray[i]);
/*
undefined
code.js:10 3
code.js:10 test
*/

var newArray2 = []
newArray2.push(5)
newArray2.push('test')
for (var i = 0; i < newArray2.length; i++)
    console.log(newArray2[i]);
/*
5
test
*/