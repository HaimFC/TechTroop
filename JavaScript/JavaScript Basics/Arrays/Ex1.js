const numbers = [1,2,3,4,5,6,7,8,9,10];

console.log("Original " + numbers);

numbers.splice(1,2);
console.log("EX 1--- " + numbers);

numbers[3] = 0;
console.log("EX 2--- " + numbers);

numbers.splice(numbers.length -4, 4);
console.log("EX 3--- " + numbers);

numbers.reverse();
numbers.push(0);
numbers.reverse();

console.log("EX 4--- " + numbers);

console.log("EX 5--- " + numbers);