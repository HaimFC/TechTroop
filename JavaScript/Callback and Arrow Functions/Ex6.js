const determineWeather = temp => {
  if(temp > 25){
    return "hot"
  }
  return "cold"
}

const commentOnWeather  = temp => {
    const status = determineWeather(temp);
    return "It's "+ status;
};

console.log(commentOnWeather(30));
console.log(commentOnWeather(22)); 