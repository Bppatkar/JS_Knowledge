//! Open Close Principle

//* Defination -Classes should be open for extension but closed for modification.
//? Problem - Adding a new feature requires modifying existing code, (e.g. adding new formate for invoice printing )
//* Solution - Use abstraction (e.g. interfaces) to allow new features without altering existing code.

// example
// InvoicePrinter interface with different implementations like PDFInvoicePrinter, HTMLInvoicePrinter, etc. Each implementation can be added without modifying the existing code.


// ---------------------------------------------
//? Simple meaning- open for extension but closed for modification. Agar hume class me kuch naya add karna hai to hume class ko modify nahi karna chahiye. Hume class ko extend karna chahiye.

//* Interview Defination- The Open/Closed Principle (OCP) states that software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. This means that the behavior of a module can be extended without modifying its source code, allowing for easier maintenance and scalability.

//! very simple example of open close principle
// consider a scenario where a function called calculateSalaries() computes salaries based on predefined job roles and hourly rates stored in an array:

class SalaryCalculator {
  constructor(employees) {
    this.employees = [
      { id: 101, name: "Vijay", role: "developer", hoursWorked: 160 },
      { id: 102, name: "sakshi", role: "designer", hoursWorked: 150 },
      { id: 103, name: "Ayesha", role: "manager", hoursWorked: 170 }
    ]
  }
  calculateSalaries(empId, hourlyRate) {
    let employee = this.employees.find(e => e.id === empId);
    if (employee) {
      return employee.hoursWorked * hourlyRate;
    }
  }
}
/* 
Directly altering the salaryRates array contradicts the Open-Closed Principle. For instance, if you need to incorporate a new role into salary calculations, it's crucial to extend the code without modifying the original structure. To align with this principle, a separate method like addSalaryRate() can be introduced to append new salary rates:
 */
class SalaryCalculatorWithOCP {
  constructor(employees) {
    this.employees = [
      { id: 101, name: "Vijay", role: "developer", hoursWorked: 160 },
      { id: 102, name: "sakshi", role: "designer", hoursWorked: 150 },
      { id: 103, name: "Ayesha", role: "manager", hoursWorked: 170 }
    ];
  }
  calculateSalaries(empId, hourlyRate) {
    let employee = this.employees.find(e => e.id === empId);
    if (employee) {
      return employee.hoursWorked * hourlyRate;
    }
  }
  addNewEmployee(id, name, role, hoursWorked) {
    this.employees.push({ id, name, role, hoursWorked });
  }
}
const salaryCalculator = new SalaryCalculatorWithOCP();
salaryCalculator.addNewEmployee(104, "John", "intern", 120);
console.log(salaryCalculator.calculateSalaries(104, 15)); // Output: 1800

/* 
By employing addSalaryRate() to include new rates, the existing code remains unchanged, aligning with the Open-Closed Principle. 
*/
// --------------------------------

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  applyDiscount(type) {
    if (type === 'seasonal') {
      return this.price * 0.9; // 10% discount
    } else if (type === 'clearance') {
      return this.price * 0.7; // 30% discount
    }
    return this.price;
  }
}

//! fixing it by open close


class ProductWithOCP {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  applyDiscount(howUseWant) {
    // here howUseWant is a class that has applyDiscount method and we can pass any class that has applyDiscount method and it will work. so we are not modifying the ProductWithOCP class but we are extending it by passing a new class that has applyDiscount method.
    return howUseWant.applyDiscount(this.price);
  }
}
class SeasonalDiscount {
  applyDiscount(price) {
    return price * 0.9; // 10% discount
  }
}
class ClearanceDiscount {
  applyDiscount(price) {
    return price * 0.7; // 30% discount
  }
}
const product1 = new ProductWithOCP("Laptop", 1000);
console.log(product1.applyDiscount(new SeasonalDiscount())); // Output: 900
console.log(product1.applyDiscount(new ClearanceDiscount())); // Output: 700


//! as per the defination yaha par - ProductWithOCP class ko modify kiye bina humne new discount type add kiya hai. Humne SeasonalDiscount aur ClearanceDiscount classes create kiya hai jo ProductWithOCP class ke applyDiscount method ko extend karte hai ya override karte hai. Isse humne Open Close Principle ko follow kiya hai.