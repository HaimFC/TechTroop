const displayData = function (alertDataFunc, logDataFunc, data) {
  alertDataFunc(data);
  logDataFunc(data);
};
const logData = function(data){}
displayData(console.error, logData, "I like to party")