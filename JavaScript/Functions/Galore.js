// ------------ Ex1 -------------
const people_info = [
  {
    name: "guido",
    profession: "bungalow builder",
    age: 17,
    country: "canaland",
    city: "sydurn",
    catchphrase: "what a piece of wood!"
  },
  {
    name: "petra",
    profession: "jet plane mechanic",
    age: 31,
    country: "greenmark",
    city: "bostork",
    catchphrase: "that's my engine, bub"
  },
  {
    name: "damian",
    profession: "nursery assistant",
    age: 72,
    country: "zimbia",
    city: "bekyo",
    catchphrase: "with great responsibility comes great power"
  }
]

const capitalize = function(str) {
  let capitalizedStr = ""
  capitalizedStr += str[0].toUpperCase()      // first letter, capitalized
  capitalizedStr += str.slice(1)              // rest of the string
  return capitalizedStr
}

const getAge = function(age){
    if (age < 21){
        return "an Underage";
    }
    else if (age >= 55){
        return "a 55+";
    }
    else{
        return age + " year old";
    }
}

const getJob = function(job){
    let capJob = "";
    const words = job.split(" ");
    for(let word of words){
        capJob += capitalize(word) + " ";
    }
    return capJob;
}

const combineCC = function(city, country){
    return capitalize(city) + ", " + capitalize(country);
}

const finalSent = function(name, motto){
    let finalMotto = capitalize(name) + " loves to say " + '"' + capitalize(motto.split(" ")[0]);
    finalMotto += " " + motto.split(" ").slice(1).join(" ") + '"';
    return finalMotto;
}

const getSummary = function(person){
    let summary = ""
    summary += capitalize(person.name); // Name
    summary += ` is ${getAge(person.age)}`; // Age.
    summary += ` ${getJob(person.profession)}`; // profession
    summary += `from ${combineCC(person.city, person.country)}.`; // city and country
    summary += ` ${finalSent(person.name, person.catchphrase)}.`; // motto
    return summary;
}

for(person of people_info){
    console.log(getSummary(person));
}



// ------------ Ex2 -------------
const removeSpecials = function(lowercaseWords, specialChars){
    const cleanedWords = [];

    for(let word of lowercaseWords){
        for(special of specialChars){
            if (word.includes(special)) {
                word = word.split(special).join("");
            }
        }
        cleanedWords.push(word);
    }
    return cleanedWords;
}




const mainFunc = function(story, specialChars){
    const words = story.split(" "); // split the words into array
    const lowercaseWords = words.map(word => word.toLowerCase()); // make sure everything ls lowercase
    const cleanedWords = removeSpecials(lowercaseWords, specialChars); //remove all specials
    const countWithReduce = cleanedWords.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1; 
        return acc;
    }, {});
    return countWithReduce;
}

const story = "In the beginning there was light. Then there were wolves. Finally there was a big fire. Ultimately, Shelob the wolf-master put out the fire with her feet. But until then, the fire caused one heck of a lot of damage."
const specialChars = [",", ".", "'", '"', "?", "!", ";"]
let wordCounts = {}
wordCounts = mainFunc(story, specialChars);
console.log(wordCounts);