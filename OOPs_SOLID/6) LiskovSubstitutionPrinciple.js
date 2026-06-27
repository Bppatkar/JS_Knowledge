//! Liskov Substitution Principle

//* Defination - SubTypes must be substitutable for their base types without altering program behavior.
//? Problem - A subclass changes the behavior of the base class inappropriately (e.g. Ostrich overriding)
//* Solution - Redesign the hirarchy or use composition to ensure appropriate behavior is maintained.

// example
// split Bird into specific Interface (flying bird and bird)


// ---------------------------------------------

//? simple meaning- agar class A ke pass kuch methods hai aur class B ne class A ko extend kiya hai to class B ke pass bhi class A ke methods hone chahiye. Agar class B me class A ke methods nahi hai to ye Liskov Substitution Principle ko violate karega.

//* Interview Defination- The Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program. In simpler terms, if class B is a subclass of class A, then we should be able to use an object of class B wherever an object of class A is expected, without causing any unexpected behavior or errors.

class Animal {
  eat() {
    console.log("Animal is eating");
  }
}

class Bird extends Animal {
  fly() {
    console.log("Bird is flying");
  }
}

class Ostrich extends Bird {
  fly() {
    console.log("Ostrich cannot fly");
  }
}
let ostrich = new Ostrich();
ostrich.eat(); // Output: Animal is eating
ostrich.fly(); // Output: Ostrich cannot fly

/* 
This violates the Liskov principle because ostriches cannot fly, potentially causing unexpected behavior. The optimal approach is to extend the Ostrich class from the Animal class instead:
*/

class OstrichCorrect extends Animal {
  walk() {
    console.log("Ostrich is walking");
  }
}

/* 
By inheriting from the Animal class rather than Bird, the Ostrich class adheres to the Liskov Substitution Principle, ensuring expected behavior in the application.
*/

// ---------------------------------

class Payment {
  processPayment(amt) {
    return `Processing payment of ${amt}`;
  }
}
class CreditCarPayment extends Payment {
  processPayment(amt) {
    return `Processing credit card payment of ${amt}`;
  }
}
class CashPayment extends Payment {
  processPayment(amt) {
    // show error to user that cash payment is not available
    throw new Error("Cash payment is not available");
  }
}

class PaymentProcessor {
  constructor(payment_amt, payment_method) {
    this.payment_amt = payment_amt;
    this.payment_method = payment_method;
  }
  processPayment() {
    return this.payment_method.processPayment(this.payment_amt);
  }
}
const creditCardPayment = new CreditCarPayment();
const cashPayment = new CashPayment();
const paymentProcessor1 = new PaymentProcessor(100, creditCardPayment);
console.log(paymentProcessor1.processPayment()); // Output: Processing credit card payment of 100
console.log(cashPayment.processPayment(100))

//! as per the defination yaha par - CashPayment class ne Payment class ko extend kiya hai lekin CashPayment class me processPayment method ko override kiya hai aur error throw kiya hai. Isse Liskov Substitution Principle violate ho raha hai. Isse avoid karne ke liye hame CashPayment class ko Payment class se extend nahi karna chahiye. Instead hame CashPayment class ko alag se create karna chahiye aur PaymentProcessor class me cash payment ke liye alag se method create karna chahiye.

class CashPaymentCorrect {
  processCashPayment(amt) {
    return `Processing cash payment of ${amt}`;
  }
}

class PaymentProcessorCorrect {
  constructor(payment_amt, payment_method) {
    this.payment_amt = payment_amt;
    this.payment_method = payment_method;
  }
  processPayment() {
    if (this.payment_method instanceof CashPaymentCorrect) {
      return this.payment_method.processCashPayment(this.payment_amt);
    }
  }
}
const cashPaymentCorrect = new CashPaymentCorrect();
const paymmentProcessorCorrect = new PaymentProcessorCorrect(100, cashPaymentCorrect);
console.log(paymmentProcessorCorrect.processPayment()); // Output: Processing cash payment of 100