// defination - Builder pattern complex object ko step by step banata hai.
// problem - School me student profile me name, class, section, roll number, house, transport, aur guardian details sab ek saath dena confusing hota hai.
// solution - Builder pattern har detail ko alag step me set karta hai.

//? Theory in Hinglish - Socho school admission form. Pehle naam, phir class, phir section, phir guardian. Ek hi line me sab bologe to mistake ho sakti hai.
// Interview Defination - Builder pattern is a creational design pattern that constructs complex objects step by step.

//? Example - School Management System me student admission profile banana.

// Wrong code
// class StudentProfile {
//   constructor(name, className, section, rollNumber, houseName, transport, guardianName) {
//     this.name = name;
//     this.className = className;
//     this.section = section;
//     this.rollNumber = rollNumber;
//     this.houseName = houseName;
//     this.transport = transport;
//     this.guardianName = guardianName;
//   }
// }
// const wrongProfile = new StudentProfile('Aman', '5th', 'A', 21, 'Blue', true, 'Mr. Kumar');

// After fixing the code
class StudentProfile {
  constructor() {
    this.name = 'Not set';
    this.className = 'Not set';
    this.section = 'Not set';
    this.rollNumber = null;
    this.houseName = 'Not set';
    this.transport = false;
    this.guardianName = 'Not set';
  }
}

class StudentProfileBuilder {
  constructor() {
    this.profile = new StudentProfile();
  }

  setName(name) {
    this.profile.name = name;
    return this;
  }

  setClassName(className) {
    this.profile.className = className;
    return this;
  }

  setSection(section) {
    this.profile.section = section;
    return this;
  }

  setRollNumber(rollNumber) {
    this.profile.rollNumber = rollNumber;
    return this;
  }

  setHouseName(houseName) {
    this.profile.houseName = houseName;
    return this;
  }

  enableTransport() {
    this.profile.transport = true;
    return this;
  }

  setGuardianName(guardianName) {
    this.profile.guardianName = guardianName;
    return this;
  }

  build() {
    return this.profile;
  }
}

const studentProfile = new StudentProfileBuilder()
  .setName('Aman')
  .setClassName('5th')
  .setSection('A')
  .setRollNumber(21)
  .setHouseName('Blue')
  .enableTransport()
  .setGuardianName('Mr. Kumar')
  .build();

console.log(studentProfile);
