// defination - Decorator pattern object me naye features baad me add karta hai.
// problem - School basic service me transport, lunch, ya extra tuition add karna ho to har combination ke liye naya class banana heavy ho jata hai.
// solution - Decorator pattern chhote add-ons jod kar object ko decorate karta hai.

//? Theory in Hinglish - Socho school bag. Same bag me water bottle, lunch box, aur notebook alag alag time par add kar sakte ho. Bag ka base same rehta hai.
// Interview Defination - Decorator pattern is a structural design pattern that adds behavior to objects dynamically.

//? Example - School Management System me student service ke saath transport aur meal add karna.

// Wrong code
// class StudentService {
//   fee() {
//     return 1000;
//   }
// }
// class TransportAndMealStudentService extends StudentService {
//   fee() {
//     return 1500;
//   }
// }

// After fixing the code
class BasicStudentService {
  fee() {
    return 1000;
  }

  description() {
    return 'Basic Student Service';
  }
}

class StudentServiceDecorator {
  constructor(service) {
    this.service = service;
  }

  fee() {
    return this.service.fee();
  }

  description() {
    return this.service.description();
  }
}

class TransportDecorator extends StudentServiceDecorator {
  fee() {
    return super.fee() + 300;
  }

  description() {
    return `${super.description()} + Transport`;
  }
}

class MealDecorator extends StudentServiceDecorator {
  fee() {
    return super.fee() + 200;
  }

  description() {
    return `${super.description()} + Meal`;
  }
}

let studentService = new BasicStudentService();
studentService = new TransportDecorator(studentService);
studentService = new MealDecorator(studentService);

console.log(studentService.description());
console.log(studentService.fee());
