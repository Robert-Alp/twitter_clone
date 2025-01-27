const { parentPort, workerData } = require('worker_threads');

const { pseudo, message } = workerData;
const timestamp = new Date();

parentPort.postMessage({ pseudo, message, timestamp });
