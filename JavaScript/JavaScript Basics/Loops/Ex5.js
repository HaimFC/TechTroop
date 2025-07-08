const dictionary = {
  "A": ["Aardvark", "Abacus", "Actually", "Atomic"],
  "B": ["Banana", "Bonkers", "Brain", "Bump"],
  "C": ["Callous", "Chain", "Coil", "Czech"]
}

keys = Object.keys(dictionary);
vals = Object.values(dictionary);

for( let index in keys){
    console.log("Words that brgin with " + keys[index]);
    for(let word of vals[index]){
        console.log(word)
    }
}