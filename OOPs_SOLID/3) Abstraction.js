//! Abstraction
//? Abstraction ka simple meaning hai ki hum apne data ko hide karte hai aur sirf necessary information ko show karte hai. Isse hum apne code ko simple aur easy to understand bana sakte hai.

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