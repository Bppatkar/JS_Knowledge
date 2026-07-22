# OOPS Notes

This folder contains simple JavaScript files for OOPS concepts.

It includes topics like encapsulation, inheritance, abstraction, and the main SOLID principles.

These files are made for easy learning and quick revision.

## Basics of OOPS

- **Class**: A blueprint for creating objects.
- **Object**: An instance of a class.

- **Method**: A function defined within a class.
- **Property**: A variable defined within a class.
- **Constructor**: A special method used to initialize objects.
- **Super**: A keyword used to access the parent class's methods and properties.
- **This**: A keyword used to refer to the current instance of a class.

---

## Definition of OOPS

- **OOPS** stands for **Object-Oriented Programming System**. It is a programming paradigm that uses objects and classes to structure code in a way that is modular, reusable, and easy to maintain.

### Simple Example of OOPS in JavaScript

```javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  speak() {
    console.log(`${this.name} sounds like ${this.sound}`);
  }
}

class Dog extends Animal {
  constructor(name, sound, breed) {
    super(name, sound);
    this.breed = breed;
  }
  speak() {
    console.log(`${this.name} the ${this.breed} says ${this.sound}`);
  }
}
class Cat extends Animal {
  constructor(name, sound, breed) {
    super(name, sound);
    this.breed = breed;
  }
  speak() {
    console.log(`${this.name} the ${this.breed} says ${this.sound}`);
  }
}

const dog = new Dog('Tommy', 'Woof', 'Golden Retriever');
const cat = new Cat('Mimi', 'Meow', 'Persian');
dog.speak(); // Output: Tommy the Golden Retriever says Woof
cat.speak(); // Output: Mimi the Persian says Meow
```

### every OOPs concept in single line [definition]

- **Encapsulation**: data which is not accessible from outside the class.
- **Inheritance**: a mechanism where a class can inherit properties and methods from its parent class.
- **Abstraction**: the process of hiding complex implementation details and showing only essential features of an object.
- **Polymorphism**: the ability of an object to take on many forms.

---

# SOLID Principles

### Defination - They are a set of principles that help developers design software that is easy to maintain, extend, and understand.

#### SOLID vs OOPs

```text
- OOPs is a programming paradigm that focuses on organizing code into objects and classes, while SOLID is a set of principles that guide the design of object-oriented software.
- SOLID principles are a subset of OOPs concepts that help developers write code that is more maintainable, flexible, and scalable.
- SOLID principles are not a replacement for OOPs, but rather a set of guidelines that can be applied to OOPs design to improve its quality.
```

### The SOLID principles are:

- 1. **Single Responsibility Principle** - A class should have only one reason to change.
- 2. **Open/Closed Principle** - Software entities should be open for extension but closed for modification.
- 3. **Liskov Substitution Principle** - Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.
- 4. **Interface Segregation Principle** - Clients should not be forced to depend on interfaces they do not use.
- 5. **Dependency Inversion Principle** - High-level modules should not depend on low-level modules. Both should depend on abstractions.
  

---
# Revision Notes

## 🧱 OOP Concepts (4 Pillars)
- 1. **Encapsulation** – Data (variables) ko private rakhna aur sirf public methods (getter/setter) ke through access dena, taaki unwanted interference na ho.

- 2. **Inheritance** – Parent class ki properties aur methods child class ko mil jaati hain (code reusability), aur child apni extra cheeze bhi add kar sakta hai.

- 3. **Polymorphism** – Ek hi method/naam, alag-alag classes mein alag kaam (e.g., animal.speak() – cat meows, dog barks). Overloading aur Overriding se achieve hota hai.

- 4. **Abstraction** – Andar ki complex implementation ko hide karke sirf user ko jaroori cheezein (interface/abstract methods) dikhana, jaise car mein steering wheel hai, engine ki wiring nahi.

## 🛠️ SOLID Principles (5 Rules)
- 1. **SRP (Single Responsibility)** – Ek class ka sirf ek hi kaam (ek hi reason to change). Jaise Invoice class sirf invoice data rakhe, usme print ya save ka logic mat daalo.

- 2. **OCP (Open/Closed)** – Classes Extension ke liye open honi chahiye (naya feature child class bana kar add karo), lekin Modification ke liye closed (purani tested class mein change mat karo).

- 3. **LSP (Liskov Substitution)** – Child class, parent class ki jagah aa sakni chahiye bina program ka behaviour bigaade. Agar parent mein fly() hai toh child Penguin mein fly() override karke throw Error mat karo, warna substitute nahi kar paayegi.

- 4. **ISP (Interface Segregation)** – Bade-bade fat interfaces mat banao. Chhote-chhote specific interfaces banao, taaki kisi class ko woh methods implement na karne padein jo usse zaroorat hi nahi (jaise Worker interface ko Eat aur Work mein tod do).

- 5. **DIP (Dependency Inversion)** – High-level class (jo kaam karwata hai) ko Low-level class (jo actual kaam karta hai) ko directly create/call nahi karna chahiye. Dono ko abstraction (interface) ke through baat karni chahiye, aur dependencies bahar se (constructor) inject karo.