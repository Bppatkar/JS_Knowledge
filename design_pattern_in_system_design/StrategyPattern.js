// defination - Strategy pattern same kaam ke alag alag tarike deta hai.
// problem - School fee ya attendance ka logic if-else me likhenge to code heavy aur hard to change ho jayega.
// solution - Strategy pattern har tarike ko alag object me rakhta hai aur waqt par choose karta hai.

//? Theory in Hinglish - Socho school jana. Kabhi bus, kabhi cycle, kabhi walk. Weather aur distance ke hisaab se option change hota hai.
// Interview Defination - Strategy pattern is a behavioral design pattern that lets you choose an algorithm from a family of algorithms at runtime.

//? Example - School Management System me fee payment ke alag alag tarike.

// Wrong code
// function payFee(method, amount) {
//   if (method === 'cash') {
//     console.log(`Paid ${amount} in cash`);
//   } else if (method === 'online') {
//     console.log(`Paid ${amount} online`);
//   }
// }

// After fixing the code
class CashFeePayment {
  pay(amount) {
    console.log(`Paid ${amount} in cash`);
  }
}

class OnlineFeePayment {
  pay(amount) {
    console.log(`Paid ${amount} online`);
  }
}

class ChequeFeePayment {
  pay(amount) {
    console.log(`Paid ${amount} by cheque`);
  }
}

class SchoolFeeCounter {
  constructor(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  collectFee(amount) {
    this.paymentStrategy.pay(amount);
  }
}

const cashCounter = new SchoolFeeCounter(new CashFeePayment());
const onlineCounter = new SchoolFeeCounter(new OnlineFeePayment());

cashCounter.collectFee(5000);
onlineCounter.collectFee(5200);
