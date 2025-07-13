class bankAcc{

    constructor(){
        this._balance = 0;
    }

    checkBalance(){
        console.log(this._balance + "$");
    }

    deposit(value){
        this._balance += value;
        console.log(`New balance: $${this._balance}`);
    }

    withdraw(value){
        this._balance -= value;
        console.log(`New balance: $${this._balance}`);
    }

}

export default bankAcc;