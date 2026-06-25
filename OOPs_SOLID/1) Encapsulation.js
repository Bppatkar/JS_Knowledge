//! Encapsulation -
//? Encapsulation ka simple meaning hai ki hum apne data ko private rakhte hai aur usko access karne ke liye methods provide karte hai. Isse hum apne data ko protect kar sakte hai aur unwanted access se bacha sakte hai.

//? we create bank account class and we'll hide the balance property and provide methods to access it because we dont want anyone to directly access the balance property.
//? for example - if someone tries to directly access the balance property by doing account.balance, it will return undefined because we have made the balance property private using # symbol. Now, to access the balance property, we have provided methods like deposit, withdraw and getBalance. 

class BankAccount {
  #balance;

  constructor(owner, initialBalance) {
    this.#balance = initialBalance;
    this.owner = owner;
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