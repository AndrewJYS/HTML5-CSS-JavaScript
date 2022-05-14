# CSS notes

## html文件连接到外部样式表  

使用link元素，告诉浏览器，利用外部样式表为这个页面增加样式。其中type指明了信息类型为"text/css"即CSS样式表，rel指明了HTML文件与所连接的文件之间的关系，即要连接到一个样式表。  
**注意不再需要style元素。**

```html
<head>
    <meta charset="utf-8">
    <title>Head First Lounge</title>
    <link type="text/css" rel="stylesheet" href="lounge.css">
</head>
```

## 继承与覆盖继承  

元素可以自动继承父元素的样式，如果要对某个子元素进行继承覆盖，只需为它提供一个特定的规则，比如\<em\>元素是p元素的子元素，已经为p元素设定了样式，若要覆盖父元素的属性，可以专门编写一个em的属性。如下：  

```css
em {
    font-family: serif;
}
```

## 为特定元素定制样式  

如果有多个p元素，而想要对其中某一个p元素定制一个特别的样式，则可以在html文件中，对你所选定的那个p元素添加class属性，比如下述代码中，对该p元素添加了class="greentea"，这样就**把该元素加入了一个greentea的类中**：  

```html
<p class="greentea">
    <img src="../images/green.jpg" alt="Green Tea Cooler">
    Chock full of vitamins and minerals, this elixir
    combines the healthful benefits of green tea with
    a twist of chamomile blossoms and ginger root.
</p>
```

另外，要在CSS中创建一个类，并选择这个类中的一个元素，编写一个类选择器：  

```css
p.greentea {
    color: green;
}
```

如果要把更多的元素添加到greentea中，比如blockquote元素。可以这样写：  

```html
<blockquote class='greentea'>
```

对应的CSS文件中可以这样写：  

```css
blockquote.greentea, p.greentea {
    color: green;
}
```

也可以使用更简单的写法，这样这个样式就会应用到greentea这个类的所有元素（所有成员）：  

```css
.greentea {
    color: green;
}
```

另外，元素也可以加入多个类：  

```html
<p class="greentea raspberry blueberry">
```

### 属于多个类的元素的样式  

如果一个元素同时属于多个类，每个类又对该元素定义了不同的样式。那么如何判定该元素的显示样式呢？我们规定采用CSS靠后原则。选择CSS文件中最后列出的那个样式，即是显示的样式。例如下述程序，最后p元素会显示为紫色，因为css文件中，blueberry类的p元素的样式最后定义。  

```html
<p class="greentea raspberry blueberry">
```

```css
p.greentea { color: green; }
p.raspberry { color: blue; }
p.blueberry { color: purple; }
```

## 添加web字体  

如果要为页面添加特殊字体，语法示例如下：  

```css
@font-face {
font-family: "Emblema One";
src: url("http://wickedlysmart.com/hfhtmlcss/chapter8/journal/EmblemaOne-Regular.woff"), url("http://wickedlysmart.com/hfhtmlcss/chapter8/journal/EmblemaOne-Regular.ttf");
}
```

把这个规则放在css文件的最上面，规则以@font-face开头，需要先定义font-family的名称，以便后面使用；src属性告诉浏览器从哪里可以获取这个字体，浏览器会依次加载所有src文件，直到找到他能支持的文件  

可以到[这里](http://www.fontsquirrel.com/)寻找自己喜欢的字体。  

## 盒模型  

每个盒子由一个内容区和可选的内边距，边框和外边距组成。  
**元素的背景颜色或背景图像会延伸到内边距下，但不会延伸到外边距下**  
常用语法示例如下（假设为一个p元素定义了guarantee类）：  

```css
.guarantee {
    line-height: 1.9em; /*文字的行间距*/
    font-style: italic;
    font-family: Georgia, "Times New Roman", Times, serif;
    color: #444444; /*文字颜色*/
    border-color: black; /*边框颜色*/
    border-width: 1px; /*边框宽度*/
    border-style: solid; /*边框样式：实线*/
    background-color: #a7cece; /*背景颜色*/
    padding: 25px; /*内边距大小*/
    padding-left: 80px; /*内边距左侧大小*/
    margin: 30px; /*外边距大小*/
    background-image: url(images/background.gif); /*背景图片*/
    background-repeat: no-repeat; /*背景图片不重复，默认是重复的*/
    background-position: top left; /*背景图片在左上角*/
}
```

## id  

一个元素不能有多个id，但是一个元素可以有多个类；且同一页面上不允许多个元素都有同一id。

```css
#footer { /*选择任意id为footer的元素*/
    color: red;
}
/*比如有多个页面，每个页面中分别有一个元素标记为id="footer"，在这些页面引用该css文件时，每个页面id为footer的元素会被渲染成指定样式*/

p#footer { /*选择id为footer的所有p元素*/
    color: red;
}
/*比如有多个页面，每个页面中分别有一个元素标记为id="footer"，在这些页面引用该css文件时，每个页面id为footer的且是p类型的元素才会被渲染成指定样式*/
```

## 使用多个样式表与媒体查询  

```css
<head>
    <meta charset="utf-8">
    <title>Head First Lounge</title>
    <link type="text/css" href="corporate.css" rel="stylesheet">
    <link type="text/css" href="beverage-division.css" rel="stylesheet">
    <link type="text/css" href="lounge-seattle.css" rel="stylesheet">
</head>
```

这些样式表从上到下排列，最下面的样式表最优先，假设corporate样式表和beverage-division样式表中的body元素都有font-family属性，那么beverage-division的样式优先，因为代码中beverage-division靠后  

如果在多个样式表中添加媒体查询，上述分析会有不同，浏览器会根据媒体类型和你在媒体查询中指定的特征选择合适的样式表。  

```css
<head>
    <meta charset="utf-8">
    <title>Head First Lounge</title>
    <link href="lounge-mobile.css" rel="stylesheet" media="screen and (max-device-width: 480px)">
    <link href="lounge-print.css" rel="stylesheet" media="print">
</head>
```

还可以将媒体查询直接写在CSS中。要把对所有媒体都通用的规则放在@media规则下面，这样一来，就不会不必要的重复规则了。  

```css
@media screen and (min-device-width: 481px) {
    #guarantee {
        margin-right: 250px;
    }
}
@media screen and (max-device-width: 480px) {
    #guarantee {
        margin-right: 30px;
    }
}
@media print {
    body {
        font-family: Times, "Times New Roman", serif;
    }
}
p.specials {
    color: red;
}
```

## div  

可以使用div标记逻辑区，且div可以兼容盒模型语法，若某个div元素被标记为id="elixirs"，它的样式表可以像之前介绍盒模型时那样编写，示例如下：  

```css
#elixirs {
  border-width: thin;
  border-style: solid;
  border-color: #007e7e;
  width: 200px; /*指定内容区宽度*/

  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

  margin-left: 20px;

  text-align: center; /*块中所有元素都会居中*/
  line-height: 1; /*使得div中各个元素的行高基于各元素本身的字体大小，而不是div继承的字体大小，如果写成1em，那么就是12px，且各个元素都会继承12px的行高，格式会不符合预期*/
  background-image: url(images/cocktail.gif);
  background-repeat: repeat-x;
}
```

### 调用子元素  

若某个div元素被标记为id="elixirs"，且有子元素h2，如果要编写该子元素的格式，而不影响div元素外的h2元素的格式，则应用调用子元素的方法，示例如下：  

```css
#exlixirs h2 {
    color: black;
}
```

## span  

div允许你为块级内容建立逻辑划分，span元素采用类似的方式建立内联内容的逻辑分组，示例如下：  

```html
<ul>
    <li><span class="cd">Buddha Bar</span>, <span class="artist">Claude Challe</span></li>
    <li><span class="cd">When It Falls</span>, <span class="artist">Zero 7</span></li>
</ul>
```

```css
.cd {
  font-style: italic;
}

.artist {
  font-weight: bold;
}
```

这样可以使cd类的span元素字体为italic，artist类的span元素加粗  

## CSS靠后原则与从前往后匹配  

需要区分两个概念：靠后原则与从前往后匹配  

### 靠后原则  

（1）[前面提及](#属于多个类的元素的样式)：如果一个元素同时属于多个类，每个类又对该元素定义了不同的样式。那么我们规定，选择CSS文件中最后列出的那个样式，即是显示的样式  
（2）[前面提及](#使用多个样式表与媒体查询)，html中引用多个样式表，且不带有媒体查询，那么最下面的样式表最优先  
（3）CSS的层叠特性分析时，一共5步（见Head first HTML and CSS, Chapter 10, P459-463)，最后一步对于冲突元素（即优先级相同）排序，出现在最后的最重要  

### 从前往后匹配  

（1）字体匹配，font-familt可能列出了大量的字体，但是浏览器不一定能够支持所有字体，需要从前向后扫描，浏览器会显示第一个能支持的字体  
（2）html中引用多个样式表，如果在每个样式表中添加媒体查询，浏览器会根据媒体类型和你在媒体查询中指定的特征选择合适的样式表。  
（3）如果在层叠的所有规则中都没有找到匹配的属性，就要使用继承了。

针对第三条，有一个例子，假设（参考Head first HTML and CSS, P486）：div元素被id标识为main，div元素下有h1子元素，有下述css代码  

```css
#main {
    background: #efe5d0 url(images/background.gif) top left;
    font-size: 105%;
    padding: 15px;
    margin: 0px 10px 10px 10px;
}
h1 {
    font-size: 120%;
    color: #954b4b;
}
```

如果要确定h1元素的样式，那么先考虑层叠，由于只找到h1{...}（没有#main h1，因为没有显式给出），下面再考虑继承与继承覆盖。#main中的font-size指默认体文本字体大小，main中的h1默认为默认体文本字体大小的200%，但是由于h1是div(main)的子元素，因此会用默认体文本字体的120%覆盖默认属性。  

## 参考  

Head First HTML and CSS, 2nd edtion, Chapter 7-11  
