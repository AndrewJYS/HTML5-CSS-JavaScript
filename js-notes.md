# javascript  

## prompt()  

浏览器提供了一个内置函数，可以用来获取用户输入；这个函数就是prompt。函数prompt与你使用过的函数alert很像（它也显示一个对话框，其中包含你指定的字符串），但它还提供了让用户输入响应的区域。这种响应将作为函数调用结果以字符串的形式返回；如果用户取消了对话框或没有输入任何响应，返回的将是null。  

```js
guess = prompt("Ready, aim, fire! (enter a number from 0-6):");
```

## 函数  

### 参数数量错误  

如果传入的实参不够,js将没有相应实参的形参设置为未定义.  

```js
function makeTea(cups, tea) {
    console.log("Brewing " + cups + " cups of " + tea);
}
makeTea(3);

// 输出 Brewing 3 cups of undefined
```

如果传递的实参太多，JavaScript将忽略多余的实参  

```js
function makeTea(cups, tea) {
    console.log("Brewing " + cups + " cups of " + tea);
}
makeTea(3, "Earl Grey", "hey ma!", 42);

//输出 Brewing 3 cups of Earl Grey
```

### 局部变量和全局变量  

如果你使用未声明的变量，它就会是全局的。这意味着即便你首次使用一个变量时是在函数内部（因为你想将其作为局部变量），这个变量也将是全局的，在函数外面也可用（这可能带来麻烦）。  

```js
function playTurn(player, location) {
    points = 0; //这是全局变量
    if (location == 1) {
        points = points + 100;
    }
    return points;
}
var total = playTurn("Jai", 1);
alert(points);

// 上述代码与下述等价  

var points = 0; //定义了一个全局变量
function playTurn(player, location) {
    points = 0;
    if (location == 1) {
        points = points + 100;
    }
    return points;
}
var total = playTurn("Jai", 1);
alert(points);
```

### 按值传递与按引用传递  

变量存储指向对象的引用。  
基本类型变量存储的是实际值。  
因此，基本类型作为参数时，实参是按值传递的，这意味着传递的是实参的副本。函数中对参数的修改并不影响实参的值。
对象作为参数时，你在函数中修改对象的属性，修改的将是原始对象的属性。  

```js
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
alert(fido.name + " now weighs " + fido.weight);  //38
```

## 数组  

建立空数组

```js
var emptyArray = []
```

返回.length数组长度  

```js
var array = [1,2,3,4,5]
var arrayLength = array.length  
console.log(arrayLength) //5
```

使用[]访问数组元素，如果索引超出数组边界，得到的结果将是undefined  

给数组添加元素时，只需直接给指定索引处元素赋值即可(数组内的元素没有必要类型相同)  

```js
var newArray = []
newArray[1] = 3
newArray[2] = 'test'
for (var i = 0; i < newArray.length; i++)
    console.log(newArray[i]);
/*
undefined
3
test
*/
```

另一种给数组赋值的方式是push方法  

```js
var newArray2 = []
newArray2.push(5)
newArray2.push('test')
for (var i = 0; i < newArray2.length; i++)
    console.log(newArray2[i]);
/*
5
test
*/
```

## 对象  

### 对象的基本操作  

```js
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
console.log(chevy["on sale"]); //false

//添加新属性 
chevy.needWashing = true;

//删除属性
//删除属性时，不仅删除了属性的值，还删除了属性本身。
//因此，删除属性needWashing后，如果你试图使用chevy.needWashing，结果将为undefined
delete chevy.needWashing;
console.log(chevy.needWashing);  //undefined
```

### 给对象添加行为  

对象中添加函数，那么属性名就是函数名，且声明格式不同于外部函数，语法如下：  

```js
functionName: function() {......}
```

```js
var fiat = {
    started = false;
    //......属性

    start: function() {
        this.started = true;
    }, //注意不要忘记逗号

    stop: function() {
        this.started = false;
    }, //注意不要忘记逗号

    drive: function() {
        if (this.started) {
            alert("Zoom zoom!");
        } else {
            alert("You need to start the engine first.");
        }
    }
}
```

如果上述对象的drive方法中不加上this，那么会报错（started is not defined），因为函数中引用的变量通常被解析为局部变量、函数形参或全局变量。在方法drive中，started不属于上述任何一种变量，而是对象fiat的一个属性。这样就会判定started没有被声明过(not defined)  

## DOM  

JavaScript和HTML通过文档对象模型（DOM）实现交互。  

（1）在浏览器中加载网页时，浏览器不仅对HTML进行分析并将其渲染到显示器，还创建一系列表示标记的对象。这些对象存储在DOM中。首先创建document节点；然后提取HTML网页的顶级元素（一般是\<html\>）作为document子节点加入DOM中，将其视为当前元素； 对于嵌套在当前元素的每个元素，都将其作为当前元素的子节点加入到DOM中；对于刚添加的每个元素，都重复第3步，直到所有元素都加入到了DOM中。**整个结构就像树形数据结构，顶部总是document，你可在JavaScript代码中使用它来访问整个DOM**  

（2）JavaScript代码可通过与DOM交互来访问元素及其内容，还可使用DOM来创建或删除元素。  

```html
<!--示例 HTML-->
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Planets</title>
</head>
<body>
    <h1>Green Planet</h1>
    <p id="greenplanet">All is well</p>
    <h1>Red Planet</h1>
    <p id="redplanet">Nothing to report</p>
    <h1>Blue Planet</h1>
    <p id="blueplanet">All systems A-OK</p>
</body>
</html>
```

使用document对象来访问DOM，这是一个内置对象，有许多属性和方法，其中包括我们用来从DOM中获取一个元素的getElementById。

方法getElementById接受一个id，并返回该id指定的元素。使用getElementById从DOM获取元素时，得到的是一个元素对象。

innerHTML是这个元素对象的属性，是包含在元素中的内容。**属性innerHTML表示元素包含的所有内容，包括嵌套的元素（例如，段落元素除文本外，还可能包含\<em\>和\<img\>元素**  

```js
var planet = document.getElementById("greenplanet");
planet.innerHTML = "Red Alert: hit by phaser fire!";
```

（3）JavaScript代码修改DOM时，浏览器将动态地更新网页，让用户能够在网页中看到新内容。  

但是运行下述代码并不会看到元素内容改变，原因是：我们将代码放在了网页的\<head\>元素中，因此它执行时浏览器尚未读取网页的其他部分。  

```html
<!doctype html>
<html lang="en">
<head>
    <!--省略-->
    <script>
        var planet = document.getElementById("greenplanet");
        planet.innerHTML = "Red Alert: hit by phaser fire!";
    </script>
</head>
<body>
    <!--省略-->
</body>
</html>
```

正确的做法是创建一个函数，在其中包含要在网页加载完毕后执行的代码。然后，将这个函数赋给对象window的属性onload。这样，网页加载完毕后才会执行这个函数。  

```html
<script>
    function init() {
        var planet = document.getElementById("greenplanet");
        planet.innerHTML = "Red Alert: hit by phaser fire!";
    }
    window.onload = init; <!--不要在init后面加()，这里不是调用函数-->
</script>
```

### 设置特性  

```js
var planet = document.getElementById("greenplanet");
planet.setAttribute("class", "redtext");
//相当于html中给id为"greenplanet"添加class="redtext"的属性  

var planetClass = planet.getAttribute("class");
//获取属性值
```

当getElementById(), getAttribute()获取值不存在，浏览器会返回null  

## 异步编码--处理事件  

以响应事件的方式组织代码是另一种代码编写方式。要以这种方式编写代码，需要考虑可能发生的事件以及代码应如何响应这些事件。在计算机科学中，通常说这种代码是异步（asynchronous）的，因为我们编写的代码仅在相应的事件发生时才会被调用。为让处理程序在事件发生时得以调用，你首先需要注册它。  

### 网页加载事件  

网页加载事件的触发时间点是：浏览器加载完网页、显示网页的所有内容并生成了表示网页的DOM。  

```js
window.onload = pageLoadedHandler;

function pageLoadedHandler() {
    alert("I'm alive!");
}
```

### 单击事件  

```js
window.onload = init;
function init() {
    var image = document.getElementById("zero");
    image.onclick = showAnswer;
}

function showAnswer() {
    var image = document.getElementById("zero");
    image.src = "zero.jpg";
}
```

网页加载完毕后，将调用加载事件处理程序。在这个处理程序中，我们将一个处理程序赋给了图像的属性onclick，但要等到用户单击图像时才会调用它。因此，这两个处理程序是在不同的时间调用的.  

### 如何让同一个处理程序用于某一类的所有元素  

单击事件处理程序被调用时，将向它传递一个事件对象。事实上，大多数文档对象模型（DOM）事件发生时，都会向相应的处理程序传递一个事件对象。

比如：用户单击图像时，将触发单击事件，这将导致一个event对象被创建，在事件处理程序中，你可使用这个事件对象来获取有关事件的信息，如事件类型、触发事件的元素等。  

```js
function showAnswer(eventObj) {
    var image = eventObj.target;
}

//target指出了触发事件的是哪个元素。
```

### 基于时间的事件  

下述代码让定时器等待5000毫秒再执行timerHandler()  

```js
setTimeout(timerHandler, 5000);

function timerHandler() {
    alert("Hey what are you doing just sitting there staring at a blank screen?");
}
```

setTimeout还可接受处理程序的参数  

```js
setTimeout(reblur, 2000, image);

function reblur(image) {
    var name = image.id;
    name = name + "blur.jpg";
    image.src = name;
}
```

## 参考  

Head First JavaScript Programming  
