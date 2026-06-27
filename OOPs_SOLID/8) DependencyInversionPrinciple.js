//! Dependency Inversion Principle

//* Defination -  High Level modules should depends on asbtractions, not on low level modules. Abstractions should not depend on details. Details should depend on abstractions.
//? Problem - Tight coupling between high-level and low-level modules (e.g., computer depends on specific input/output devices). Changes in low-level modules can break high-level modules, making the system less flexible and harder to maintain.
//* Solution - Use Dependency Injection and abstractions to decouple modules. High-level modules should not depend on low-level modules; both should depend on abstractions (e.g., interfaces).

// example 
// Computer depends on InputDevice and outputDevice interface instead of concrete key

// -------------------------------

//? simple meaning-  High level and Low Level ko interface ke through connect karna chahiye, mltb dono ke beech abstraction layer hona chahiye . matlab high level module ko low level module pe depend nahi karna chahiye. dono ko abstraction ke through connect karna chahiye. jaise ki interfaces isse classes losely coupled ho jati hai aur agar low level module me kuch change hota hai to high level module pe effect nahi padta.

//! aise smjho ek dalal (broker) aayega beech mein jo kahega ki boss se jo bhi bat karni hai wo mujhe bol do, mai boss ko bol dunga. jo bhi kaam karna hai wo mai kar dunga. isse dono ke beech me direct connection nahi hoga. isse dono loosely coupled ho jate hai. aur agar boss me kuch change hota hai to dalal ko bol do, dalal boss se baat karega aur aapko farak nahi padega.

/*
//* [Desi language mein kahu to - ] 
High-level module (jo kaam karwata hai, jaise NotificationService) ko low-level module (jo kaam karta hai, jaise EmailSender, SMSSender) par directly depend nahi hona chahiye.

Dono ko abstraction (interface / contract) ke through baat karni chahiye.Isse loose coupling aati hai – agar low-level module mein change aaye toh high-level module ko farak nahi padta.  Aur testing bhi aasan ho jaati hai (mock kar sakte hain).

Yaani:  “High-level class ko low-level class ka object khud create nahi karna chahiye, balki usse bahar se (inject) karna chahiye aur ek common interface par depend hona chahiye.”
*/
//* Interview Defination- The Dependency Inversion Principle (DIP) states that high-level modules should not depend on low-level modules. Instead, both should depend on abstractions (e.g., interfaces). In simpler terms, it suggests that the design of a system should be structured in a way that high-level components are not tightly coupled to low-level components, promoting flexibility and maintainability. By depending on abstractions rather than concrete implementations, the system becomes more modular and easier to modify or extend without affecting other parts of the codebase.


// Example for Dependency Inversion Principle
// High-level module depends on an abstraction, not a concrete implementation.
//! ❌ Bad Example(DIP Violation)

// Low-level module
class EmailSender1 {
  sendEmail(message) {
    console.log(`Sending email: ${message}`);
  }
}

// High-level module (directly depends on EmailSender)
class NotificationService1 {
  constructor() {
    this.emailSender = new EmailSender1(); // ❌ tight coupling
  }

  notify(message) {
    this.emailSender.sendEmail(message);
  }
}

// Usage
const service = new NotificationService1();
service.notify("Hello!");

//! Problem: NotificationService directly creates EmailSender.
// Agar humein SMS ya Push notification add karna ho toh class change karni padegi.
// Testing mushkil(real email sender ke bina test nahi kar sakte).

//! ✅ Good Example(Following DIP)
// Hum ek abstraction banayenge – jaise ek Sender interface(JavaScript mein hum object ki shape ya common method ka contract use karte hain).

// Abstraction (contract) – koi bhi sender ko ek 'send' method hona chahiye
class Sender {
  send(message) {
    throw new Error("Method 'send' must be implemented");
  }
}

// Low-level module 1
class EmailSender extends Sender {
  send(message) {
    console.log(`Sending email: ${message}`);
  }
}

// Low-level module 2
class SMSSender extends Sender {
  send(message) {
    console.log(`Sending SMS: ${message}`);
  }
}

// High-level module – ab yeh Sender interface par depend karta hai
class NotificationService {
  constructor(sender) { // Dependency Injection
    this.sender = sender; // ✅ abstraction par depend
  }

  notify(message) {
    this.sender.send(message);
  }
}

// Usage
const emailSender = new EmailSender();
const smsSender = new SMSSender();

const emailService = new NotificationService(emailSender);
emailService.notify("Hello via Email!");

const smsService = new NotificationService(smsSender);
smsService.notify("Hello via SMS!");

/// --------------------------------

class CreditCardPayment {
  processPayment(amount) {
    console.log(`Processing credit card payment of $${amount}`);
  }
}
class OrderProcessor extends CreditCardPayment {
  constructor(paymentMethod) {
    super();
    this.paymentMethod = paymentMethod;
  }
  processOrder(amount) {
    this.paymentMethod.processPayment(amount);
  }
}
//? OrderProccessor class poori tarah se CreditCardPayment class pe depend hai, agar humein future me koi aur payment method add karna ho toh OrderProcessor class me change karna padega. isse humne DIP violate kiya hai.

//* Fix karne ke liye hum ek abstraction create karenge jisse OrderProcessor class ko low level module pe depend nahi karna padega.

class PaymentMethod {
  processPayment(amount) {
    throw new Error("Method 'processPayment' must be implemented");
  }
}
class CreditCardPayment1 extends PaymentMethod {
  processPayment(amount) {
    console.log(`Processing credit card payment of $${amount}`);
  }
}
class PayPalPayment extends PaymentMethod {
  processPayment(amount) {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}
class OrderProcessor1 extends PaymentMethod {
  constructor(paymentMethod) {
    super();
    this.paymentMethod = paymentMethod;
  }
  processOrder(amount) {
    this.paymentMethod.processPayment(amount);
  }
}

const creditCardPayment = new CreditCardPayment1();
const orderProcessor1 = new OrderProcessor1(creditCardPayment);
orderProcessor1.processOrder(100);


//! as per the defination yaha par - OrderProcessor1 class ab PaymentMethod abstraction pe depend kar rahi hai, na ki CreditCardPayment1 class pe. Agar humein future me koi aur payment method add karna ho toh humein sirf PaymentMethod ko implement karna padega aur OrderProcessor1 class me koi change nahi karna padega. Isse humne Dependency Inversion Principle ko follow kiya hai.