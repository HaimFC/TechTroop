const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Name: ", fname => {
    rl.question("Email: ", femail => {
        rl.question("Age: ", fage => {
            rl.question("Favorite Color: ", fcolor => {
                console.log(`Registration Summary:\nName: ${fname} \nEmail: ${femail} \nAge: ${fage} \nFavorite Color: ${fcolor}`);
                rl.close();
                })
            })
        })
    })