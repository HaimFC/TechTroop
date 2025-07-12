const StringFormatter = function(){

    const CapitalizeFirst = function(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const ToSkewerCase = function(str){
        return str.replace(/ /g, "-");
    }

    return {
        capitalizeFirst: CapitalizeFirst,
        toSkewerCase: ToSkewerCase
    };
}

const formatter = StringFormatter()

console.log(formatter.capitalizeFirst("dorothy")); //should return Dorothy
console.log(formatter.toSkewerCase("blue box")); //should return blue-box

