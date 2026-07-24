// defination - Observer pattern me ek main object apne saare followers ko update batata hai.
// problem - School bell bajne par har class ko alag alag message bhejna mushkil hota hai.
// solution - Observer pattern list me sabko rakhta hai aur change hote hi notify karta hai.

//? Theory in Hinglish - Socho school bell. Jaise hi bajti hai, sabko pata chal jata hai assembly ya break ka time aa gaya.
// Interview Defination - Observer pattern is a behavioral design pattern where one object notifies many dependent objects when its state changes.

//? Example - School Management System me bell bajne par classes ko notify karna.

// Wrong code
// class SchoolBell {
//   ring() {
//     console.log('Bell rung');
//     console.log('Tell Class 1');
//     console.log('Tell Class 2');
//   }
// }

// After fixing the code
class SchoolBell {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }

  ring(message) {
    this.listeners.forEach((listener) => listener.update(message));
  }
}

class Classroom {
  constructor(name) {
    this.name = name;
  }

  update(message) {
    console.log(`${this.name} heard: ${message}`);
  }
}

class OfficeStaff {
  constructor(name) {
    this.name = name;
  }

  update(message) {
    console.log(`${this.name} heard: ${message}`);
  }
}

const schoolBell = new SchoolBell();
const classOne = new Classroom('Class 1');
const classTwo = new Classroom('Class 2');
const office = new OfficeStaff('Principal Office');

schoolBell.subscribe(classOne);
schoolBell.subscribe(classTwo);
schoolBell.subscribe(office);
schoolBell.ring('Break time is over');