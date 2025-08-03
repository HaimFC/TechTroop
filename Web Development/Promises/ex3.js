// Simulated inventory database
const inventory = {
  'laptop': { price: 999, stock: 5 },
  'mouse': { price: 25, stock: 10 },
  'keyboard': { price: 75, stock: 0 }, // Out of stock
  'monitor': { price: 299, stock: 3 }
};

function checkInventory(items) {
  // TODO: Return a promise that:
  // 1. Waits 500ms (simulating database check)
  // 2. Checks if all items are in stock
  // 3. Resolves with items if all available
  // 4. Rejects with specific item that's out of stock
  
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        items.forEach(element => {
            if(inventory[element].stock === 0){
                reject(new Error(`Item out of stock - ${element}`));
                return;
            }
        });
        resolve(items);
    }, 500)
  })
}

function calculateTotal(items) {
  // TODO: Return a promise that:
  // 1. Waits 200ms
  // 2. Calculates total price including 8% tax
  // 3. Resolves with { subtotal, tax, total }

  return new Promise((resolve, reject) => {
    let sum = 0;
    let tax = 0;
    let afterTax = 0;
    setTimeout(()=>{
        items.forEach((item) => {
            sum += inventory[item].price
        })
        tax = sum * 0.08;
        afterTax = sum+tax;
        resolve({sum, tax, afterTax})
    },200)
  })
}

function processPayment(amount) {
  // TODO: Return a promise that:
  // 1. Waits 1500ms (simulating payment processing)
  // 2. 90% success rate
  // 3. Resolves with { transactionId, amount, status: 'success' }
  // 4. Rejects with payment failure error
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        const transactionId = Math.floor(Math.random() * 1000000);
        resolve({
          transactionId,
          amount,
          status: 'success'
        });
      } else {
        reject(new Error('Payment failed due to network error.'));
      }
    }, 1500);
  });
}

function updateInventory(items) {
  // TODO: Return a promise that:
  // 1. Waits 300ms
  // 2. Reduces stock for each item
  // 3. Resolves with updated inventory status

  return new Promise((resolve, reject) => {
    setTimeout(()=>{
        items.forEach((item)=>{
            inventory[item].stock -= 1;
        })
        resolve("Inventory updated")
    },300)
  })
}

// TODO: Create a complete checkout function that:
// 1. Takes an array of item names
// 2. Chains all the above functions
// 3. Returns a promise with the final order result
// 4. Handles all possible errors appropriately

function checkout(itemNames) {
  return new Promise((resolve, reject) => {
    checkInventory(itemNames)
      .then((items) => {
        return calculateTotal(items);
      })
      .then(({sum, tax, afterTax}) => {
        return processPayment(afterTax);
      })
      .then((paymentResult) => {
        return updateInventory(itemNames).then(() => paymentResult);
      })
      .then((finalResult) => {
       resolve({
          transaction: finalResult,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}


// Test cases:
checkout(['laptop', 'mouse'])           // Should succeed
  .then(result => console.log('Order success:', result))
  .catch(error => console.log('Order failed:', error.message));

checkout(['laptop', 'keyboard'])        // Should fail - keyboard out of stock
  .then(result => console.log('Order success:', result))
  .catch(error => console.log('Order failed:', error.message));

checkout(['monitor', 'mouse', 'laptop']) // Might fail at payment (10% chance)
  .then(result => console.log('Order success:', result))
  .catch(error => console.log('Order failed:', error.message));