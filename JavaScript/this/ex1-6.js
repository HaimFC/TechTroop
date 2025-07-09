// ----------- EX1 --------------

const person = {
  hungry: true,

  feed: function () {
    if (this.hungry) {
      hungry = false;
      console.log('Im no longer hungry!')
    }
  }
}  

person.feed() //should log "I'm no longer hungry"

// ----------- EX2 --------------

const pump = function (amount) {
  this.liters += amount;
  console.log('You put ' + amount + ' liters in ' + this.name);
};

const garage = {
  car1: {
    name: 'Audi',
    liters: 3,
    fillTank: pump
  },
  car2: {
    name: 'Mercedes',
    liters: 1,
    fillTank: pump
  }
};

garage.car1.fillTank(2);
console.log('Audi should have 5 liters: ',  garage.car1.liters);

garage.car2.fillTank(30);
console.log('Mercedes should have 31 liters: ', garage.car2.liters);

// ----------- EX3 --------------

const pumpFuel = function (plane) {
  plane.fuel += 1;
};

const airplane = {
    fuel: 0,
    fly: function () {
        if (this.fuel < 2) {
            return 'on the ground!';
        }
        else {
            return 'flying!';
        }
    }
};

console.log('The plane should not be able to fly (yet): ' + airplane.fly());

pumpFuel(airplane);
console.log('The plane should STILL not be able to fly: ' + airplane.fly());

pumpFuel(airplane);
console.log('Take off! ' + airplane.fly());

// ----------- EX4 --------------

const tipJar = {
  coinCount: 20,
  tip: function () {
    this.coinCount += 1;
  },
  stealCoins: function (number) {
    this.coinCount -= number;
  }
};


tipJar.tip();
console.log('Tip jar should have 21 coins: ' + tipJar.coinCount);

tipJar.stealCoins(3);
console.log('Tip jar should have 18 coins: ' + tipJar.coinCount);

tipJar.stealCoins(10);
console.log('Tip jar should have 8 coins: ' + tipJar.coinCount);

// ----------- EX5 --------------

const revealSecret = function () {
  return this.secret;
};

const shoutIt = function (person, func) {
  person.revealItAll = func;
  const result = person.revealItAll();
  console.log(person.name + " said: " + result);
};

const avi = {
  name: "Avi",
  secret: "Im scared of snakes!",
};

const narkis = {
  name: "Narkis",
  secret: "I don't have secrets because I'm zen like that.",
};

shoutIt(avi, revealSecret);
shoutIt(narkis, revealSecret);

// ----------- EX6 --------------

const coffeeShop = {
  beans: 40,

  drinkRequirements: {
    latte: 10,
    americano: 5,
    doubleShot: 15,
    frenchPress: 12
  },

  makeDrink: function (drinkType) {
    if (!this.drinkRequirements.hasOwnProperty(drinkType)) {
      console.log("Sorry, we don't make " + drinkType);
      return;
    }

    const requiredBeans = this.drinkRequirements[drinkType];

    if (this.beans < requiredBeans) {
      console.log("Sorry, we're all out of beans!");
      return;
    }

    this.beans -= requiredBeans;
    console.log("Made a " + drinkType + "! Beans left: " + this.beans);
  }
};

coffeeShop.makeDrink("latte");        
coffeeShop.makeDrink("americano");    
coffeeShop.makeDrink("filtered");     
coffeeShop.makeDrink("doubleShot");   
coffeeShop.makeDrink("frenchPress");  

// ----------- EX6.1 --------------

const coffeeShop2 = {
  beans: 40,
  money: 20,
  beanCost: 1, // 1 money per bean

  drinkRequirements: {
    latte: { beanRequirement: 10, price: 5 },
    americano: { beanRequirement: 5, price: 3 },
    doubleShot: { beanRequirement: 15, price: 7 },
    frenchPress: { beanRequirement: 12, price: 4 }
  },

  makeDrink2: function (drinkType) {
    const drink = this.drinkRequirements[drinkType];

    if (!drink) {
      console.log("Sorry, we don't make " + drinkType);
      return;
    }

    if (this.beans < drink.beanRequirement) {
      console.log("Sorry, we're all out of beans!");
      return;
    }

    this.beans -= drink.beanRequirement;
    console.log("Made a " + drinkType + "! Beans left: " + this.beans);
  },

  buyBeans: function (numBeans) {
    const totalCost = numBeans * this.beanCost;

    if (this.money < totalCost) {
      console.log("Not enough money to buy " + numBeans + " beans.");
      return;
    }

    this.money -= totalCost;
    this.beans += numBeans;
    console.log("Bought " + numBeans + " beans. Beans now: " + this.beans + ", Money left: " + this.money);
  },

  buyDrink: function (drinkType) {
    const drink = this.drinkRequirements[drinkType];

    if (!drink) {
      console.log("Sorry, we don't sell " + drinkType);
      return;
    }

    this.money += drink.price;
    console.log("Customer bought a " + drinkType + " for $" + drink.price + ". Money now: " + this.money);
    this.makeDrink(drinkType);
  }
};