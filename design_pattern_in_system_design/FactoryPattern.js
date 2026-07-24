// defination - Factory pattern object banane ka kaam ek alag class ko deta hai.
// problem - School me har jagah teacher, student, ya vice principal ka object direct banana messy ho jata hai.
// solution - Factory pattern ek central method deta hai jo sahi object bana kar deta hai.

//? Theory in Hinglish - Socho school office. Student bole "ID card do", teacher bole "attendance sheet do". Office sahi cheez de deta hai, baccha khud nahi banata.
// Interview Defination - Factory pattern is a creational design pattern that creates objects through a common interface without exposing creation logic.

//? Example - School Management System me role ke hisaab se object banana.

// Wrong code
// const role = 'teacher';
// let person;
// if (role === 'teacher') {
//   person = { name: 'Mrs. Iyer', subject: 'Math' };
// } else if (role === 'student') {
//   person = { name: 'Aman', className: '5th A' };
// }
// console.log(person);

// After fixing the code
class Teacher {
  constructor(name, subject) {
    this.role = 'Teacher';
    this.name = name;
    this.subject = subject;
  }
}

class Student {
  constructor(name, className) {
    this.role = 'Student';
    this.name = name;
    this.className = className;
  }
}

class VicePrincipal {
  constructor(name) {
    this.role = 'VicePrincipal';
    this.name = name;
  }
}

class SchoolPersonFactory {
  createPerson(type, name, extraInfo = '') {
    if (type === 'teacher') {
      return new Teacher(name, extraInfo);
    }

    if (type === 'student') {
      return new Student(name, extraInfo);
    }

    if (type === 'vicePrincipal') {
      return new VicePrincipal(name);
    }

    throw new Error('Invalid school role');
  }
}

const personFactory = new SchoolPersonFactory();
const teacher = personFactory.createPerson('teacher', 'Mrs. Iyer', 'Math');
const student = personFactory.createPerson('student', 'Aman', '5th A');

console.log(teacher);
console.log(student);