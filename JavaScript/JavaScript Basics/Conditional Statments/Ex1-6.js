// ------------------Ex1--------------------

let age = 20;

if (age >= 18){
    console.log("Is more than 18");
}
else{
    console.log("Is not 18");
}


// ------------------Ex2--------------------

let score = 59;

if(score >= 90 && score <= 100 ){
    console.log("A");
}
else if(score >= 80 && score <= 89 ){
    console.log("B");
}
else if(score >= 70 && score <= 79 ){
    console.log("C");
}
else if(score >= 60 && score <= 69 ){
    console.log("D");
}
else if(score < 60 && score >= 0){
    console.log("F");
}
else{
    console.log("Wrong grade");
}

// ------------------Ex3--------------------

let temperature = 20;
let weather = "sunny";

if (weather === "sunny"){
    if(temperature > 24){
        console.log("Walk to the beach");
    }
    else if(temperature >= 15 && temperature <= 24 ){
        console.log("Go for a walk");
    }
    else{
        console.log("Stay inside and read");
    }
}

else if(weather === "cloudy"){
    if(temperature > 21){
        console.log("Go hiking");
    }
    else{
        console.log("Visit a museum");
    }
}

else{
    console.log("Watch a movie indoors");
}


// ------------------Ex4--------------------

let usernameLength = 6;
let passwordLength = 7;
let userAge = 15;

if(usernameLength < 5){
    console.log("Username must be at least 5 characters");
}
else{
    if(passwordLength < 8){
        console.log("Password must be at least 8 characters");
    }
    else{
        if(userAge < 13){
            console.log("User must be 13 or older");
        }
        else{
            console.log("Account Created");
        }
    }
}


// ------------------Ex5--------------------

let customerType = "premium";
let purchaseAmount = 150;
let dayOfWeek = 6; // 0 = Sunday, 1 = Monday, etc.

if(customerType === "regular"){
    if(purchaseAmount > 100){
        console.log(90 / 100 * purchaseAmount);
    }
    else if(purchaseAmount > 50 && purchaseAmount <= 100){
        console.log(95 / 100 * purchaseAmount);
    }
    else{
        console.log(purchaseAmount);
    }
}
else if(customerType ==="premium"){
    if(dayOfWeek < 5){
        console.log(90 / 100 * purchaseAmount);
    }
    else{
        console.log(85 / 100 * purchaseAmount);
    }
}
else{
    console.log(80 / 100 * purchaseAmount);
}

// ------------------Ex6--------------------

let year = 400;

if(year % 4 === 0){
    if (year % 100 === 0){
        if (year % 400 === 0){
            console.log("It is!");
        }
        else{
            console.log("It is not!");
        }
    }
    else{
        console.log("It is!");
    }
}
else{
    console.log("It is not!");
}


