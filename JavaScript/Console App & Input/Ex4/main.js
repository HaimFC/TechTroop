import { mainInput, withdrawInput, depositInput } from './readAndValid.js';
import bankAcc from './bank.js';

const myAcc = new bankAcc();

let choice = 0;
let secondChoice = 0;
while(choice != 4){
    choice = mainInput();
    if(choice != "Invalid Input"){
        if (choice === 1){
            myAcc.checkBalance();
        }
        else if(choice === 2){
            secondChoice = depositInput();
            if(secondChoice != "Invalid Input")
                myAcc.deposit(secondChoice);
        }
        else if(choice === 3){
            secondChoice = withdrawInput();
            if(secondChoice != "Invalid Input")
                myAcc.withdraw(secondChoice);
        }
    }
}



