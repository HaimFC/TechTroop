const sentence = "the quick brown fox jumps over the lazy dog the fox";
const words = sentence.split(" ");

// Ex1 - With loops only
const countWithLoop = {};
for (let word of words) {
  if (countWithLoop[word]) {
    countWithLoop[word]++;
  } else {
    countWithLoop[word] = 1;
  }
}
console.log("🔹 Using for loop:");
console.log(countWithLoop);

// Using Reduce
const countWithReduce = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});

console.log("🔹 Using reduce:");
console.log(countWithReduce);