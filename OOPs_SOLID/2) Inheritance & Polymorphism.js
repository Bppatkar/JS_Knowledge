//! Inheritance
//? Inheritance ka simple meaning hai ki hum ek class ke properties aur methods ko dusre class me use kar sakte hai. Isse hum code reusability achieve kar sakte hai aur code ko maintain karna easy ho jata hai.

//? for example - we create a parent class called Animal and then we create a child class called Dog which inherits the properties and methods of the Animal class. Now, the Dog class can use the properties and methods of the Animal class without having to redefine them.

class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}
class Dog extends Animal {
  constructor(name, species, breed) {
    super(name, species); // calling the parent class constructor
    this.breed = breed;
  }
  speak() {
    console.log(`${this.name} barks.`);
  }
}
const dog = new Dog("Buddy", "Dog", "Golden Retriever");
dog.speak(); // Buddy barks. (overridden method from Animal class)

//-------------------------------------------------------

//! Polymorphism
//? Polymorphism ka simple meaning hai ki hum ek hi method ko different classes me different ways me implement kar sakte hai (matlab ham ek hi method ko alag alag classes me alag alag tarike se define kar sakte hai). Isse hum code ko flexible aur reusable bana sakte hai.

//? for example - we create a payment system where we have a parent class called Payment and then we create two child classes called CreditCardPayment and PayPalPayment which inherit the properties and methods of the Payment class. Now, both the child classes can implement the pay method in their own way.


class Payment {
  pay(amount) {
    console.log(`Payment of ${amount} is being processed.`);
  }
}

class CreditCardPayment extends Payment {
  pay(amount) {
    console.log(`Payment of ${amount} is being processed through Credit Card.`);
  }
}
class PayPalPayment extends Payment {
  pay(amount) {
    console.log(`Payment of ${amount} is being processed through PayPal.`);
  }
}

const creditCardPayment = new CreditCardPayment();
creditCardPayment.pay(100); // Payment of 100 is being processed through Credit Card.

const payPalPayment = new PayPalPayment();
payPalPayment.pay(100); // Payment of 100 is being processed through PayPal.

// same things we are doing in animal class and dog class and cat class , where we use speak method in both classes but we implement it in different ways. This is called polymorphism.
