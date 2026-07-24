//! School Supply Exchange
//? defination - Exchange system school items ki buying and selling ko track karta hai.
//? problem - School supply ka rate aur request manually handle karna messy hota hai.
//? solution - Exchange system requests ko match karta hai.

//*! Theory in Hinglish - Socho school canteen me snack exchange nahi, but supply exchange jaisa order matching system.
//*! Interview Defination - Exchange system matches buy and sell requests and tracks updates.

//? Example - Green Valley School supply exchange

// Wrong code
// console.log('Buy and sell requests mixed together');

// After fixing the code
class SupplyExchange {
  constructor() {
    this.requests = [];
  }

  addRequest(type, item, quantity) {
    this.requests.push({ type, item, quantity });
  }

  getRequests() {
    return this.requests;
  }
}

const exchange = new SupplyExchange();
exchange.addRequest('buy', 'Notebook', 10);
exchange.addRequest('sell', 'Pen', 5);
console.log(exchange.getRequests());
