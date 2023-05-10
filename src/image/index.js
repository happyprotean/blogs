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