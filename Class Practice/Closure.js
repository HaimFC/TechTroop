
function add(num) {
    return function(num2) {
        return num2 + num;
    }
}
console.log(add(5)(2));