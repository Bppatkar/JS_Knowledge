//! School Attendance and Gate Management
//? defination - School gate management system entry, exit, and attendance ko track karta hai.
//? problem - Agar gate aur attendance ka record alag alag aur mixed ho to students ka track tough ho jata hai.
//? solution - School gate system entry, exit, aur class attendance ko alag classes me manage karta hai.

//*! Theory in Hinglish - Socho school gate par guard, attendance register, aur class monitor sab ka kaam alag hai.
//*! Interview Defination - Gate management system is a school system that controls entry, exit, and attendance tracking.

//? Example - Green Valley School gate system

// Wrong code
// class SchoolGate {
//   manageEverything(studentId) {
//     console.log(`Entry, exit, attendance, and discipline for ${studentId}`);
//   }
// }

// After fixing the code
class EntryGate {
  allowEntry(studentId) {
    return `Student ${studentId} entered the school`;
  }
}

class ExitGate {
  allowExit(studentId) {
    return `Student ${studentId} left the school`;
  }
}

class AttendanceRegister {
  markPresent(studentId) {
    return `Student ${studentId} marked present`;
  }
}

const entryGate = new EntryGate();
const exitGate = new ExitGate();
const attendanceRegister = new AttendanceRegister();

console.log(entryGate.allowEntry(101));
console.log(attendanceRegister.markPresent(101));
console.log(exitGate.allowExit(101));
//! Design a parking lot
// that supports the following operations:

// 1. Singleton Entry and Exit Gates.
// 2. Multiple Entry and Exit Gates. The system should manage parking spaces allocation and vehical tracking efficiently.

//* 1. Singleton Entry and Exit Gates



//* 2. Multiple Entry and Exit Gates