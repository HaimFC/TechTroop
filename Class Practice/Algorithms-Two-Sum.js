// Create function that receives an array of numbers and a target
// The function checks if the sum of any two numbers equals the target

//-----------------------------------------------------------------------------

// Solution with time complexity of O(n^2), Memory Complexity is O(n + 1)
const twoSum = function(arr, target){

    for( let i in arr){ // O(n2)
        for (let j in arr){
            if( i != j && arr[i] + arr[j] === target){
                return true;
            }
        }
    }
    return false;
}

console.log(twoSum([2,7,11,15], 17));
console.log(twoSum([2,7,11,15], 43));

//-----------------------------------------------------------------------------

// Solution with time complexity of O(nlogn + n), Memory Complexity is O(n + 2)
const twoSumBetter = function(arr, target){
    arr.sort((a,b) => a-b); //sort - nlogn
    let rPointer = arr.length - 1;
    let lPointer = 0;

    while(rPointer > lPointer){ // O(n)
        if(arr[rPointer] + arr[lPointer] < target){
            lPointer++;
        }
        else if(arr[rPointer] + arr[lPointer] > target){
            rPointer--;
        }
        else{
            return true;
        }
    }
    return false;
}

console.log(twoSumBetter([2,7,11,15], 17));
console.log(twoSumBetter([2,7,11,15], 43));

//-----------------------------------------------------------------------------

// Solution with time complexity of O(n), Memory Complexity is O(2n)
const twoSumEvenBetter = function(arr, target) {
    const seen = new Set(); 

    for (let num of arr) { //O(n)
        let comp = target - num;
        if (seen.has(comp)) {
            return true;
        }
        seen.add(num);
    }

    return false;
}

console.log(twoSumEvenBetter([2,7,11,15], 17));
console.log(twoSumEvenBetter([2,7,11,15], 43));