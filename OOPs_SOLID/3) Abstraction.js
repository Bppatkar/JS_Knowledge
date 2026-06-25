//! Abstraction
//? Abstraction ka simple meaning hai ki hum apne data ko hide karte hai aur sirf necessary information ko show karte hai. Isse hum apne code ko simple aur easy to understand bana sakte hai.

//* Interview Defination- Abstraction means hiding the internal details and showing only the essential features of the object. 

//? for example - we create a coffee machine class and we'll hide the internal details of how the coffee is made and provide a method to make coffee. Now, when someone wants to make coffee, they can simply call the makeCoffee method without worrying about the internal details of how the coffee is made.

class CoffeeMachine {
  #boilWater() { return "Boiling water..."; }
  #grindCoffeeBeans() { return "Grinding coffee beans..."; }
  #brewCoffee() { return "Brewing coffee..."; }

  getMeCoffee() {
    console.log(this.#boilWater());
    console.log(this.#grindCoffeeBeans());
    console.log(this.#brewCoffee());
    console.log("Your coffee is ready!");
  }
}
const customerOne = new CoffeeMachine();
customerOne.getMeCoffee();
// Output: u just press getMeCoffee method and it will give you coffee without knowing the internal details of how the coffee is made. This is called abstraction.
// - ----------------------------------------------------

class Shape {
  constructor(name) {
    this.name = name;
  }
  calculateArea() {
    console.log(`Method 'calculatedArea()' is not implemented in ${this.name} class.`);
  }
  display() {
    console.log(`The are of ${this.name} is: ${this.calculateArea()}`);
  }
}
class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }
  calculateArea() {
    return Math.round(Math.PI * this.radius * this.radius);
  }
}
class Rectangle extends Shape {
  constructor(height, width) {
    super("Rectangle");
    this.height = height;
    this.width = width;
  }
  calculateArea() {
    return this.height * this.width;
  }
}
const shape = new Shape("Shape");
shape.display(); // Method 'calculatedArea()' is not implemented in Shape class.
const circle = new Circle(5);
circle.display(); // The area of Circle is: 79
const rectangle = new Rectangle(4, 6);
rectangle.display(); // The area of Rectangle is: 24