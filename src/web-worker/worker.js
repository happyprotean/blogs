// onmessage直接挂在worker对象上，不能const onmessage，否则onmessage不能执行
onmessage = function(e) {
  // worker接受数据并执行操作
  console.log('self', self)
  console.log('Worker: Message received from main script', e);
  const result = e.data[0] * e.data[1];
  e.data[2][0] = -999
  if (isNaN(result)) {
    postMessage('Please write two numbers');
  } else {
    const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  }
}