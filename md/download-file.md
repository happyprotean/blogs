## 文件下载

通过a链接下载文件，生成的文件名可能来自：

- Content-composition http header（优先级高于download属性）

- 文件url和文件类型

- download（HTML5引入）：只在同域场景、blob:、data:下生效，跨域则无效

  - download="test"：下载文件为：test + 文件类型

  - download="test.png"：下载文件为：test.png，即使文件非png类型，有可能导致文件类型错误，无法打开

### js文件下载

```js
// download可能会不生效
// js生成a链接，模拟点击事件下载文件
export function downloadFile(fileUrl, fileName) {
  if (!fileUrl) return
  const element = document.createElement('a')
  element.href = fileUrl
  if (fileName) {
    element.download = fileName
  }
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
```

```js
export function urlToBlob(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(new Error(`下载文件失败，状态码：${xhr.status}`))
      }
    }
    xhr.onerror = () => {
      reject(new Error('下载文件失败'))
    }
    xhr.send()
  })
}

/**
 * 根据文件url下载文件
 * 支持自定义下载文件的名称
 * @param {*} fileUrl
 * @param {*} fileName
 * @returns
 */
export function downloadFile(fileUrl, fileName) {
  if (!fileUrl) return
  urlToBlob(fileUrl).then(blob => {
    const element = document.createElement('a')
    element.href = URL.createObjectURL(blob) // 生成的url示例：blob:http://sts.travel.test.sankuai.com/b4b0f65a-9413-4eaa-9f0f-6cf018af7982
    if (fileName) {
      element.download = fileName
    }
    document.body.appendChild(element)
    element.click()
    // document.body.removeChild(element)
  })
}
```