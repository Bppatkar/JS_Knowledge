//! Singleton Pattern Implementation in JavaScript
// isme hame simple ye krna hota hai ki - ek class ka sirf ek hi instance create ho aur global access provide ho.

class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }

    Singleton.instance = this;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true