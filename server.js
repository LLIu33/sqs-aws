var SQSProcessor = require('sqs-processor');

var queue = new SQSProcessor({
  accessKeyId: 'aws id',
  secretAccessKey: 'aws secret',
  region: 'aws region',
  queueUrl: 'queue url'
});

queue.startPolling(
  function worker(message, callback) {
    // Do something with the message
    console.log(message)
    // Then remove the message from the queue
    callback();
  },
  function error(queueError) {
    // Oh no, we received an error!
    // No worries, we'll just log it and let ops worry about it
    console.error(queueError);
  }
);

setTimeout(function() {
  queue.stopPolling(function stop() {
    console.log('stopped polling');
  });
}, 10000);