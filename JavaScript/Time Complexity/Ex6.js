const findDuplicates = function (ages) {
    for (let i = 0; i < ages.length; i++) {
        for (let j = i + 1; j < ages.length; j++) {
            if (ages[i] === ages[j]) {
                console.log(`${ages[i]} has a duplicate`)
            }
        }
        //note that this *entire* inner loop runs for each iteration of i
    }
}

const OnFindDups = function(ages){
    const itemSet = new Set();
     for (let i = 0; i < ages.length; i++) {
         itemSet.add(ages[i]);
     }
     if(itemSet.size < ages.length){
        console.log( "there is a duplicate")
     }
}


