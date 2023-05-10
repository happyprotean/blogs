
## 图片懒加载

思路：判断图片是否在当前窗口中，在的话则渲染图片。

## 图片预加载

提前加载页面中的图片，利用浏览器对图片的缓存，在用户真正需要访问图片的时候，可以直接访问浏览器缓存，减少用户等待时间。

### css

利用css属性将图片预加载到屏幕外的背景上，但会增加页面整体的加载时间，因为页面需要多加载图片。

一个优化方案是**在window onload后再设置相应的css**，避免影响页面正常的加载。

```css
#preload-01 { background: url(http://img.netbian.com/file/2020/1123/small5027584d7ae249306584b186d876b4381606145734.jpg) no-repeat -9999px -9999px; }
```

### js

使用Image提前加载图片，且在onload后才执行，避免影响页面正常加载。

```js
function preloader() {
 if (document.images) {
  var img1 = new Image();
  var img2 = new Image();
  var img3 = new Image();
  img1.src = "http://domain.tld/path/to/image-001.gif";
  img2.src = "http://domain.tld/path/to/image-002.gif";
  img3.src = "http://domain.tld/path/to/image-003.gif";
 }
}
function addLoadEvent(func) {
 var oldonload = window.onload;
 if (typeof window.onload != 'function') {
  window.onload = func;
 } else {
  window.onload = function() {
   if (oldonload) {
    oldonload();
   }
   func();
  }
 }
}
addLoadEvent(preloader);
```


## 图片加载流程

Image对象的onload事件，在图片成功加载后调用。利用onload事件可以给Image添加加载中状态，比如加载中的图片。

Image对象的complete 属性来检测图像是否加载完成（每个Image对象都有一个complete属性，当图像处于装载过程中时，该属性值false,当发生了onload、onerror、onabort中任何一个事件后，则表示图像装载过程结束（不管成没成功），此时complete属性为true）

```js
function loadImage(url, width = 200, height = 200) {
  let image = new Image(width, height)
  // 浏览器会发起一次get请求，获取图片bytes数据
  image.src = url
  console.log('complete', image.complete) // false
  // image src加载图片成功后，触发onload回调
  image.onload = function (val) {
    console.log('val', val)
    console.log('complete', image.complete) // true
    document.body.appendChild(image)
  }
  image.onerror = function (val) {
    console.log('val', val) // true
    console.log('complete', image.complete)
  }
}

// 图片加载完后，才会触发onload
window.onload = () => {
  console.log('window loaded')
}

loadImage('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')
```

