## 链接  

### id属性  

id属性可以被看作是唯一标识元素的方法，可以直接链接带有id属性的元素  

```html
<h2 id="chai">Chai Tea, $1,85</h2>
```

要链接到某个页面中标识的目标，只需要在该页面链接后面加上#，再加上目标标识符  

```html
<a href="index.html#chai">See Chai Tea</a>
```

### 为链接添加标题  

添加标题后，鼠标移到一个链接上时，标题会显示为一个工具提示  

```html
<a href="http://wickedlysmart.com/buzz" title="Read all about caffeine on the Buzz">Caffeine Buzz</a>
```

### 链接到一个新窗口  

为\<a\>元素添加target属性，target属性值会告诉浏览器页面的目标窗口。如果使用"_blank"作为目标，浏览器总是打开一个新窗口显示页面。  

```html
<a target="_blank" href="http://wickedlysmart.com/buzz"
title="Read all about caffeine on the Buzz">Caffeine Buzz</a>
```

实际上不必把target命名为“_blank”。如果你给它取了另一个名字，比如“coffee”，那么所有目标名字为“coffee”的链接都会在同一个窗口中打开。下面两个页面会在同一窗口中打开。  

```html
<a target="coffee" href="mission1.html">mission1</a>
<a target="coffee" href="mission2.html">mission2</a>
```

### href和src的区别  

+ 请求资源类型不同
  + href是Hypertext Reference的缩写，表示超文本引用。用来建立当前元素和文档之间的链接。常用的有：link、a。
  + 在请求 src 资源时会将其指向的资源下载并应用到文档中，常用的有script，img 、iframe；

+ 作用结果不同
  + href 用于在当前文档和引用资源之间确立联系；
  + src 用于替换当前内容；

+ 浏览器解析方式不同
  + 若在文档中添加href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。
  + 当浏览器解析到src ，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

## 插入图片  

### 提供图片的候选格式  

使用\<img\>的alt属性，为访问者提供一些提示，告诉他们图像中有什么信息。  

```html
<img src="http://wickedlysmart.com/hfhtmlcss/trivia/pencil.png"
alt="The typical new pencil can draw a line 35 miles long.">
```

### 缩放图片  

使用缩略图，可以减轻网络传输负担，加快页面加载。但是，不要直接使用\<img\>的width和height属性，因为浏览器在按照width和height缩放之前，仍然需要获取整个大图像。

### 图像作为链接  

将\<img\>元素放到\<a\>元素中即可  

```html
<p>
    <a href="html/britain.html">
        <img src="thumbnails/britain.jpg" alt="An iPod in Birmingham at a telephone box">
    </a>
</p>
```

## 使用W3C验证工具  

进入validator.w3.org，将网页的url，或将.html文件上传到该网站，可根据提示对html文件debug，使之符合**工业标准**。

## 使用meta指定字符编码  

在head元素中添加meta元素，指定该页面使用的字符编码  

```html
<head>
    <meta charset="utf-8">
    <title>Title</title>
</head>
```

## video  

为页面添加视频，语法如下：  

```html
<video
  controls <!--添加controls，播放器会添加一些控件-->
  autoplay <!--autoplay表示，一旦页面加载，视频会自动播放-->
  width="512" height="288"  <!--页面中视频的尺寸-->
  src="video/tweetsip.mp4" <!--视频的源位置-->
  poster="images/poster.png" <!--如果愿意，可以提供一个海报图像，视频没有播放的时候会显示该图像-->
  id="video">
</video>
```

HTML5允许任何格式的视频文件，具体支持哪些格式由浏览器决定。如果要处理所有的格式，那么将原来的src属性去除，换成source元素，每个source元素中，添加一类视频。

```html
<video controls autoplay width="512" height="288">
  <source src="video/tweetsip.mp4">
  <source src="video/tweetsip.webm">
  <source src="video/tweetsip.ogv">
  <p>Sorry, your browser doesn't support the video element</p>
</video>
```

对于每个source元素，浏览器都会加载视频文件的元数据，查看能否播放这个视频，这个过程可能会很耗费时间，但可以通过在source元素中给出有关视频文件的MIME类型和编解码器的更多信息，让浏览器更迅速地判断是否能播放视频。  

```html
<video controls autoplay width="512" height="288" >
  <source src="video/tweetsip.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
  <source src="video/tweetsip.webm" type='video/webm; codecs="vp8, vorbis"'>
  <source src="video/tweetsip.ogv" type='video/ogg; codecs="theora, vorbis"'>
  <p>Sorry, your browser doesn't support the video element</p>
</video>

<!--type是可选属性，向浏览器提供信息，帮助它确定能否播放这个文件-->
<!--video/ogg 是视频文件的 MIME类型，指定了容器格式-->
<!--codecs指定使用哪个编解码器来对视频和音频编码-->
```

## 表格  

### 使用伪类设置行的背景颜色  

加入定义了一系列的表格行元素tr，想要给奇数行和偶数行设置不同的背景颜色，则要使用伪类语法:  

```html
tr:nth-child(2n) {
  background-color: red;
}
tr:nth-child(2n+1) {
  background-color: green;
}
```

或者  

```html
tr:nth-child(even) {
  background-color: red;
}
tr:nth-child(odd) {
  background-color: green;
}
```

### 单元格跨行  

使用rowspan属性使单元格跨行，下述代码实现了将“Truth or Consequences, NM”，“4,242 ft”和“7,289”跨行。rowspan指明了跨两行  

```html
<tr>
  <td rowspan="2">Truth or Consequences, NM</td>
  <td class="center">August 9th</td>
  <td class="center">93</td>
  <td rowspan="2" class="right">4,242 ft</td>
  <td rowspan="2" class="right">7,289</td>
  <td class="center">5/5</td>
</tr>
<tr>
  <td class="center">August 27th</td>
  <td class="center">98</td>
  <td class="center">4/5</td>
</tr>
```

## 参考  

Head First HTML and CSS, 2nd edtion, Chapter 2-6, 12-13  
https://blog.csdn.net/lhjuejiang/article/details/80795081  
