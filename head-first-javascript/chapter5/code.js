// 创建对象
var chevy = {
    make: "Chevy",
    model: "Bel Air",
    "on sale": true, // 将包含空格的字符串用作属性名时，必须用引号将其括起。
    year: 1957
};

//修改属性
chevy.year = 1958;
chevy["on sale"] = false;
console.log(chevy["on sale"]);

//添加新属性 
chevy.needWashing = true;

//删除属性
delete chevy.needWashing;
console.log(chevy.needWashing);  //undefined



var fido = {
    name: 'Fido',
    weight: 48,
    breed: 'Mixed',
    loves: 'walks'
};

function loseWeight(dog, amount) {
    dog.weight = dog.weight - amount;
}

loseWeight(fido, 10);
alert(fido.name + " now weighs " + fido.weight);
