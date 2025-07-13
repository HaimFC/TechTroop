// Create a function that get an array and print its duplicates - O(n^2)

const findDups = function(arr){
    for (let i in arr){ // O(n^2)
        for (let j in arr){
            if(arr[i] === arr[j]  && i != j){
                console.log(arr[i]);    
            }
        }
    }
}

//findDups([1,2,3,4,45,6,6,7,8,9,1,2,3]);


// Create a function that get an array and print its duplicates - O(nlogn+n)

const findDupsBetter = function(arr) {
    arr.sort((a, b) => a - b); // O(n log n)
    for (let i = 0; i < arr.length - 1; i++) { // O(n)
        if (arr[i] === arr[i + 1]) {
            console.log(arr[i]);
        }
    }
}

//findDupsBetter([1,2,3,4,45,6,6,7,8,9,1,2,3]);


// Create a function that get an array and print its duplicates - O(n) using Hash (Set)

const findDupsEvenBetter = function(arr) {
    const seen = new Set();

    arr.forEach(element => {
        if(seen.has(element)){
            console.log(element);
        }
        seen.add(element);
    });
}


findDupsEvenBetter([1,2,3,4,45,6,6,7,8,9,1,2,3]);