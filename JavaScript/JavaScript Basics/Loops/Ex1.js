const names = ["Ashley", "Donovan", "Lucas"]
const ages = [23, 47, 18]
const people = []


for(let index in names){
    people.push({name: names[index], age: ages[index]})
}
console.log(people)