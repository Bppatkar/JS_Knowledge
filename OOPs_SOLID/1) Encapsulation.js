//! Encapsulation -
//? Encapsulation ka simple meaning hai ki hum apne data ko private rakhte hai aur usko access karne ke liye methods provide karte hai. Isse hum apne data ko protect kar sakte hai aur unwanted access se bacha sakte hai.

//* Interview Defination- Encapsulation means building data and methods inside object while restricting direct access to object's data from outside the object. It is a way to hide the internal state of an object and only allow access to it through public methods. This helps to protect the integrity of the object's data and prevent unintended modifications.

//? we create bank account class and we'll hide the balance property and provide methods to access it because we dont want anyone to directly access the balance property.
//? for example - if someone tries to directly access the balance property by doing account.balance, it will return undefined because we have made the balance property private using # symbol. Now, to access the balance property, we have provided methods like deposit, withdraw and getBalance. 

class BankAccount {
  // two ways to make a property private in javascript -
  // 1. using # symbol before the property name
  // 2. using closure (we'll see this in next example)
  // example using closure - let balance = 0; // private variable inside the constructor function and we can access it using methods defined inside the constructor function.
  #balance;

  constructor(owner, initialBalance) {
    this.#balance = initialBalance;
    this.owner = owner;
    // let balance = 0; // private variable
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited: ${amount}. New balance: ${this.#balance}`);
    }
  }
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`Withdrew: ${amount}. New balance: ${this.#balance}`);
    }
  }
  getBalance() {
    console.log(`Owner: ${this.owner}, Current balance: ${this.#balance}`);
  }
}
const account = new BankAccount("John Doe", 1000);
account.deposit(500); // Deposited: 500. New balance: 1500
account.withdraw(200); // Withdrew: 200. New balance: 1300
account.getBalance(); // Owner: John Doe, Current balance: 1300
console.log(account.balance); // undefined, because balance is private and cannot be accessed directly


//! same things using function constructor and closure -
function BankAccountClosure(owner, initialBalance) {

  let _balance = initialBalance; // private variable
  this.owner = owner;

  this.deposit = function (amount) {
    if (amount > 0) {
      _balance += amount;
      console.log(`Deposited: ${amount}. New balance: ${_balance}`);
    }
  };
  this.withdraw = function (amount) {
    if (amount > 0 && amount <= _balance) {
      _balance -= amount;
      console.log(`Withdrew: ${amount}. New balance: ${_balance}`);
    }
  };
}
const accountClosure = new BankAccountClosure("Jane Doe", 2000);
accountClosure.deposit(300);
accountClosure.withdraw(100);
accountClosure._balance; // undefined, because _balance is private and cannot be accessed directly

// --------------------------------------------------------

//? New Example

class Car {
  constructor(brand, model) {
    let speed = 0; // private variable
    this.brand = brand;
    this.model = model;
    this.getSpeed = () => speed;
    this.setSpeed = (val) => speed = val > 0 ? val : 0;
    this.accelerate = function () { this.setSpeed(this.getSpeed() + 10); console.log(`${this.brand} ${this.model} is now going ${this.getSpeed()} km/h`); }
    this.break = function () { this.setSpeed(this.getSpeed() - 10); console.log(`${this.brand} ${this.model} is slowing down ${this.getSpeed()} km/h`); }
  }
}

const myCar = new Car("Toyota", "Camry");
myCar.accelerate();
myCar.break();