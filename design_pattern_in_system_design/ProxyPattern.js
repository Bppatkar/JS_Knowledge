// defination - Proxy pattern asli object ke aage ek guard object rakh deta hai.
// problem - School result ya fee receipt sabko direct nahi dikhani chahiye.
// solution - Proxy pattern check karta hai aur phir asli object tak request bhejta hai.

//? Theory in Hinglish - Socho school gate par guard. Pehle check karta hai ki kaun andar ja sakta hai, phir entry deta hai.
// Interview Defination - Proxy pattern is a structural design pattern that provides a substitute object to control access to another object.

//? Example - School Management System me result sirf authorized logon ko dikhana.

// Wrong code
// class ResultService {
//   getResult(studentId) {
//     return `Result of student ${studentId}`;
//   }
// }
// const resultService = new ResultService();
// console.log(resultService.getResult(7));

// After fixing the code
class ResultService {
  getResult(studentId) {
    return `Result of student ${studentId}: A+`;
  }
}

class ResultServiceProxy {
  constructor(isTeacherOrParent) {
    this.isTeacherOrParent = isTeacherOrParent;
    this.resultService = new ResultService();
  }

  getResult(studentId) {
    if (!this.isTeacherOrParent) {
      return 'Access denied: ask teacher or parent';
    }

    return this.resultService.getResult(studentId);
  }
}

const guestResultProxy = new ResultServiceProxy(false);
const staffResultProxy = new ResultServiceProxy(true);

console.log(guestResultProxy.getResult(7));
console.log(staffResultProxy.getResult(7));
