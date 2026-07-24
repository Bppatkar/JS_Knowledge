// defination - Adapter pattern do alag systems ko compatible banata hai.
// problem - School me purana attendance machine aur naya app alag language bolte hain.
// solution - Adapter pattern beech me translator ka kaam karta hai.

//? Theory in Hinglish - Socho purani TV remote aur new smart TV. Button same nahi hote, to adapter un dono ko baat karne deta hai.
// Interview Defination - Adapter pattern is a structural design pattern that lets incompatible interfaces work together.

//? Example - School Management System me old attendance machine ko new app ke saath use karna.

// Wrong code
// class OldAttendanceMachine {
//   punch(studentId) {
//     console.log(`Punch done for ${studentId}`);
//   }
// }
// const machine = new OldAttendanceMachine();
// machine.markAttendance(12); // method does not exist

// After fixing the code
class OldAttendanceMachine {
  punch(studentId) {
    console.log(`Old machine punch for student ${studentId}`);
  }
}

class AttendanceAdapter {
  constructor(oldAttendanceMachine) {
    this.oldAttendanceMachine = oldAttendanceMachine;
  }

  markAttendance(studentId) {
    this.oldAttendanceMachine.punch(studentId);
  }
}

const oldMachine = new OldAttendanceMachine();
const attendanceAdapter = new AttendanceAdapter(oldMachine);
attendanceAdapter.markAttendance(12);
