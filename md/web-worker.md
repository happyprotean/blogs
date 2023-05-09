## 介绍

[MDN官网](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)

在浏览器中js的执行是单线程的，即同一时间下所有的任务只能在一个线程上完成，上一个任务执行完毕，才能执行下一个任务。当js代码计算量太大时，会耗费大量的时间，影响其他任务的执行，严重时甚至阻塞UI线程的渲染，出现页面卡顿。

浏览器厂商提供的web worker的接口，就是为了提供让javascript代码运行在多个线程的环境。web worker的工作线程和主线程是分开的，两者互不干扰，相互间通过事件接口进行通信。

## 概念与用法

- worker构造：接受js文件url
  - 可以直接读取js文件
  - 使用URL.createObjectURL构造url

- worker运行的全局上下文与window不同，这个上下文由一个对象表示。
  - worker中访问window会报错，undefined
  - 

- worker线程中可以运行任意的代码，但存在一些意外
  - 不能在worker中操作DOM元素
  - 大部分window对象的方法和属性是可以使用的，

- 主线程和worker线程相互之间使用postMessage来发送消息，通过onmessage event接受消息。数据的交互方式为**传递副本，而不是直接共享数据**。
  - 数据交互前，会对数据使用结构化克隆算法进行深拷贝，所以传递的是副本。
  - structuredClone使用的也是结构化克隆算法

- worker 可以另外生成新的 worker，这些 worker 与它们父页面的宿主相同。

## 示例解析

[使用web worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

## web worker promise化 
