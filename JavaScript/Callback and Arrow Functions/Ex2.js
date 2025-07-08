const returnTime = function (time) {
  console.log('The current time is: ' + time)
}

const getTime = function(callback){
    const time = new Date();
    callback(time);
}
getTime(returnTime)