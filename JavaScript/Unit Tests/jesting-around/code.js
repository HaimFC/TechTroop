class Exercises{
    isEven(n) {
        return n % 2 == 0 ? true : false
    }

    //should remove at least one element from the array `arr`
    removeAtLeastOne(arr) {
        let numItemsToRemove = Math.floor(Math.random() * (arr.length - 1)) + 1
        arr.splice(0, numItemsToRemove)
        return arr
    }

    //should return a clean string without these symbols: "!", "#", ".", ",", "'"
    simplify(str) {
        let symbols = ["!", "#", ".", ",", "'"]
        return str.split("").filter(c => symbols.indexOf(c) == -1).join("")
    }

    validate(arr) {
        let trueCounter = 0;
        let falseCounter = 0;

        arr.forEach(val => {
            if (typeof val === "boolean") {
                if (val === true) {
                    trueCounter++;
                } else {
                    falseCounter++;
                }
            }
        });

        if (trueCounter === 0 && falseCounter === 0) {
            return { error: "Need at least one boolean" };
        }

        return trueCounter > falseCounter;
    }
}
module.exports = Exercises;