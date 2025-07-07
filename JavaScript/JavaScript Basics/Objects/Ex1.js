let p1 = {
    name: "Haim",
    age: 29,
    city: "Beer Sheva"
};
let p2 = {
    name: "Maor",
    age: 37,
    city: "Beer Sheva"
};

if(p1.name === p2.name){
    console.log("Same name!");
}
if(p1.city === p2.city){
    console.log("Same city!");
}
else{
    console.log("Not the same city!");
}

if(Math.abs(p1.age - p2.age) <= 10){
    console.log(p1.name + " wanted to date " + p2.name);
}
else{
    console.log(p1.name + " wanted to date " + p2.name + " but couldn't");
}




