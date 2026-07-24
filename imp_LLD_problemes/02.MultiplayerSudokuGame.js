//! School Class Timetable Game
//? defination - Timetable system school ke subjects, teachers, aur classes ko match karta hai.
//? problem - Agar timetable manually banaya jaye to class clash aur teacher clash ho sakta hai.
//? solution - Timetable system har class ka subject, teacher, aur room alag se manage karta hai.

//*! Theory in Hinglish - Socho school ka timetable ek puzzle hai. Subject, teacher, aur room ko sahi place par fit karna hota hai.
//*! Interview Defination - Timetable system is a scheduling system that assigns subjects, teachers, and rooms without conflicts.

//? Example - Green Valley School timetable

// Wrong code
// class Timetable {
//   makeSchedule() {
//     console.log('Everything mixed in one place');
//   }
// }

// After fixing the code
class Subject {
  constructor(name) {
    this.name = name;
  }
}

class SchoolTeacher {
  constructor(name) {
    this.name = name;
  }
}

class TimetableSlot {
  constructor(subject, teacher, room) {
    this.subject = subject;
    this.teacher = teacher;
    this.room = room;
  }
}

const math = new Subject('Math');
const schoolTeacher = new SchoolTeacher('Mrs. Iyer');
const slot = new TimetableSlot(math, schoolTeacher, 'Room 101');

console.log(slot);
