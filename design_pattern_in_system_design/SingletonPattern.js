// defination - Singleton pattern me class ka sirf ek hi object banta hai.
// problem - School me principal record, timetable config, ya fee settings ka sirf ek hi copy chahiye hota hai.
// solution - Singleton pattern same object ko baar baar return karta hai.

//? Theory in Hinglish - Socho school ka principal office register. Agar 2-3 register ho gaye to confusion hoga. Ek hi register sab log use karte hain.
// Interview Defination - Singleton pattern is a creational design pattern that allows only one instance of a class and provides one shared access point.

//? Example - School Management System me principal office settings ka ek hi object.

// Wrong code
// class SchoolSettings {
//   constructor() {
//     this.schoolName = 'Green Valley School';
//   }
// }
// const settings1 = new SchoolSettings();
// const settings2 = new SchoolSettings();
// console.log(settings1 === settings2); // false, but one object chahiye

// After fixing the code
class SchoolSettings {
  constructor() {
    if (SchoolSettings.instance) {
      return SchoolSettings.instance;
    }

    this.schoolName = 'Green Valley School';
    this.principal = 'Mr. Sharma';
    this.officeContact = '1800-111-222';

    SchoolSettings.instance = this;
  }

  static getInstance() {
    if (!SchoolSettings.instance) {
      SchoolSettings.instance = new SchoolSettings();
    }

    return SchoolSettings.instance;
  }
}

const schoolSettings1 = SchoolSettings.getInstance();
const schoolSettings2 = SchoolSettings.getInstance();

console.log(schoolSettings1 === schoolSettings2);
console.log(schoolSettings1.schoolName);
console.log(schoolSettings2.principal);