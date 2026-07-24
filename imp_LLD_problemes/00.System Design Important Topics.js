//! School Management System Overview
//? defination - School management system ek aisa system hai jo school ke logon, classes, attendance, fees, aur notices ko manage karta hai.
//? problem - School me alag alag kaam manual karne se confusion aur time waste hota hai.
//? solution - School management system classes ko divide karke har kaam ko clear responsibility deta hai.

//*! Theory in Hinglish - Socho school ek chhota city hai. Principal, vice principal, teachers, students, attendance, fees, aur timetable sab alag kaam karte hain.
//*! Interview Defination - School management system is a system that manages school operations through organized classes and responsibilities.

//? Example - Green Valley School

// Wrong code
// class School {
//   run() {
//     console.log('Principal work + teacher work + attendance work + fee work all mixed');
//   }
// }

// After fixing the code
class Principal {
  announceMeeting() {
    return 'Principal announces meeting';
  }
}

class VicePrincipal {
  manageDiscipline() {
    return 'Vice Principal manages discipline';
  }
}

class Teacher {
  teachSubject(subject) {
    return `Teacher teaches ${subject}`;
  }
}

class Student {
  attendClass(className) {
    return `Student attends ${className}`;
  }
}

const principal = new Principal();
const vicePrincipal = new VicePrincipal();
const teacher = new Teacher();
const student = new Student();

console.log(principal.announceMeeting());
console.log(vicePrincipal.manageDiscipline());
console.log(teacher.teachSubject('Math'));
console.log(student.attendClass('5th A'));
