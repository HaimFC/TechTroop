console.log("Arguments: ", process.argv);

const [, , num1, op, num2] = process.argv;

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b
};

if(op in operations){
    console.log(operations[op](Number(num1), Number(num2)));
}
else{
    console.log("Invalid operation");
}

