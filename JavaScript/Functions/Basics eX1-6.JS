// ------------------ Ex1 --------------------

const isEven = function(number){
    if(number % 2 == 0){
        return true;
    }
    return false;
}

// ------------------ Ex2 --------------------

const func  = function(array){
    for (let val of array){
        console.log(isEven(val))
    }
}
let arr = [1,2,3,4];
func(arr);
// ------------------ Ex3 --------------------

const checkExists = function(array, num){
    for(let val of array){
        if (val === num)
        {
            return true;
        }
    }
    return false;
}
console.log(checkExists([1, 2, 3], 2));
console.log(checkExists([1, 2, 3], 5));
// ------------------ Ex4 --------------------

let calculator = {
    add: function(num1, num2){
        return num1+num2;
    },
    subtract: function(num1, num2){
        return num1-num2
    }
}

const result1 = calculator.add(20, 1)
const result2 = calculator.subtract(30, 9)

console.log(calculator.add(result1, result2)) //should print 42


// ------------------ Ex5 --------------------

const increaseByNameLength = function(money, name){
    return money * name.length;
}

const makeRegal = function(name){
    return "His Royal Highness, " + name;
}

const turnToKing = function(name, money){
    name = name.toUpperCase()
    money = increaseByNameLength(money, name)
    name = makeRegal(name)

    console.log(name + " has " + money + " gold coins")
}

turnToKing("martin luther", 100) // should print "His Royal Highness, MARTIN LUTHER has 1300 gold coins"

// ------------------ Ex6 --------------------

const armNumbers = function() {
    armNums = [];
    for(let i = 100; i <= 999; i++){
        if ((i % 10) ** 3 +(Math.floor(i / 10) % 10) ** 3 +Math.floor(i / 100) ** 3=== i){
            armNums.push(i);
        }
    }
    return armNums;
}

console.log(armNumbers());
