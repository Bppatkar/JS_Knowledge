//! SingleResponsibility Principle

//* Defination -  A class should have only one reason to change, meaning it should have a single responsibility.
//? Problem - A class handling multiple responsibilities (e.g., bussiness logic, and presentation logic and data access from db logic)
//* Solution - Split the class into multiple classes, each handling a single responsibility. Each class should have 

// example
// Employee handles salary calculations
// EmployeeRepository handles data access operations

//--------------------------------------------
//? Simple meaning- class ke pass ek hi kaam hona chahiye. Agar class ke pass multiple kaam hai to usko alag alag class me divide kar do.

//* Interview Defination- The Single Responsibility Principle (SRP) suggests that a class, module, or function should serve just one role or responsibility. In simpler terms, it should have a single reason to change.
//-----------------------------------------------------
//! very simple example of single responsibility principle

//! Without SRP: one class doing multiple responsibilities
class UserServiceWithoutSRP {
  createUser(name) {
    console.log(`User created: ${name}`);
  }

  saveToDatabase(name) {
    console.log(`Saving ${name} to database`);
  }

  sendWelcomeEmail(name) {
    console.log(`Sending welcome email to ${name}`);
  }
}

const userService = new UserServiceWithoutSRP();
const userName = "Ali";
userService.createUser(userName);
userService.saveToDatabase(userName);
userService.sendWelcomeEmail(userName);


//! With SRP: each class has one responsibility
class UserCreator {
  createUser(name) {
    console.log(`User created: ${name}`);
  }
}

class UserRepository {
  saveToDatabase(name) {
    console.log(`Saving ${name} to database`);
  }
}

class EmailService {
  sendWelcomeEmail(name) {
    console.log(`Sending welcome email to ${name}`);
  }
}

const userCreator = new UserCreator();
const userRepository = new UserRepository();
const emailService = new EmailService();

userCreator.createUser("Ali");
userRepository.saveToDatabase("Ali");
emailService.sendWelcomeEmail("Ali");



//! as per the defination yaha par - UserCreator, UserRepository, and EmailService classes have single responsibility. Each class has one reason to change. If we want to change the way we create a user, we will only change the UserCreator class. If we want to change the way we save a user to the database, we will only change the UserRepository class. If we want to change the way we send a welcome email, we will only change the EmailService class.