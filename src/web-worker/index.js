
const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');

function add(a, b) {
  self.onmessage = function(e) {
    // worker接受数据并执行操作
    console.log('self', self)
    console.log('Worker: Message received from main script', e);
    const result = e.data[0] * e.data[1];
    if (isNaN(result)) {
      postMessage('Please write two numbers');
    } else {
      const workerResult = 'Result: ' + result;
      console.log('Worker: Posting message back to main script');
      postMessage(workerResult);
    }
  }
}

let arr = [1, 2, [3]]
window.arr = arr

if (window.Worker) {
  const url = URL.createObjectURL(new Blob([`(${add.toString()})()`]))
  // 可以通过本地js文件构造worker
  // const myWorker = new Worker("worker.js");
  // 可以直接通过函数构造worke
  const myWorker = new Worker(url);

  // 向worker传递数据
  first.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  second.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  // 接收worker传递来的数据
  myWorker.onmessage = function(e) {
    console.log('Message received from worker', e);
    result.textContent = e.data;
  }
} else {
  console.log('Your browser doesn\'t support web workers.');
}
