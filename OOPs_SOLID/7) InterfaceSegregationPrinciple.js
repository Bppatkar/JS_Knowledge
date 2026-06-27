//! Interface Segregation Principle

//* Defination - A class should not be forced to implement methods it dosen't use.
//? Problem - Fat interfaces force classes to implement irrelevant Methods (e.g. Car in the example below is forced to implement Flyable methods, which it doesn't need).
//* Solution- Split Large Interfaces into Smaller , more specific ones.

// examples
// separate Vehicle into Drivable and Flyable interfaces, so that classes can implement only the methods they need.
/* 
fly and drive method work in aeroplane but not in car, so we can create 2 interfaces Drivable and Flyable and implement them in respective classes.
car implements Drivable interface and aeroplane implements both Drivable and Flyable interfaces.
*/

// ------------------------------------------------

//? simple meaning- isme hume class ke methods ko alag alag interface me divide karna hai. Agar class ke pass multiple methods hai to hume unko alag alag interface me divide karna chahiye. Isse hume class ke methods ko use karne me asani hoti hai.

//* Interview Defination- The Interface Segregation Principle (ISP) states that clients should not be forced to depend on interfaces they do not use. In simpler terms, it suggests that a class should not be required to implement methods it does not need, promoting a more focused and cohesive design. It emphasizes breaking down extensive interfaces into smaller, more specific ones, allowing classes to implement only the methods relevant to their functionality. This principle enhances code maintainability, reduces unnecessary dependencies, and improves overall system flexibility.

class DrivingTest {
  constructor(userType) {
    this.userType = userType;
  }
}
class CarDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
}
class BikeDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
}
class TruckDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
}

const carUserTests = {
  startCarTest() {
    return 'Car test started';
  }
}
const bikeUserTests = {
  startBikeTest() {
    return 'Bike test started';
  }
}
const truckUserTests = {
  startTruckTest() {
    return 'Truck test started';
  }
}
Object.assign(CarDrivingTest.prototype, carUserTests);
Object.assign(BikeDrivingTest.prototype, bikeUserTests);
Object.assign(TruckDrivingTest.prototype, truckUserTests);

const carTest = new CarDrivingTest('Car User');
console.log(carTest.startCarTest()); // Output: Car test started
console.log(carTest.startBikeTest()); // Output: TypeError: carTest.startBikeTest is not a function

// ---------------------------------------------

class ProductManager {
  listProducts() {
    console.log('Listing products...');
  }
  updateStock(stock_id, quantity) {
    console.log(`Updating stock... Stock ID: ${stock_id}, Quantity: ${quantity}`);
  }
}
class ProductListing extends ProductManager {
  list_products() {
    console.log('Listing products...');
  }

  updateStock() {
    throw new Error('stock management not required for product listing');
  }
}

// * Fixing the issue by creating separate interfaces for listing and stock management

class ProductListingInterface {
  list_products() {
    console.log('Listing products...');
  }
}
class StockManagementInterface {
  updateStock(stock_id, quantity) {
    console.log(`Updating stock... Stock ID: ${stock_id}, Quantity: ${quantity}`);
  }
}
class ProductListingFixed extends ProductListingInterface {
  list_products() {
    console.log('Listing products...');
  }
}
class StockManagementFixed extends StockManagementInterface {
  updateStock(stock_id, quantity) {
    console.log(`Updating stock... Stock ID: ${stock_id}, Quantity: ${quantity}`);
  }
}

//! as per the defination yaha par - upar wale code mein hamne 2 class banae thi, jisme product manager hi  product list bhi kr rha tha and updateStock bhi kr rha tha, jabki usko dono kaam nahi krne chahiye isiliye fir hamne 2 alg alg class banae and , ProductListingFixed class sirf product listing ke liye responsible hai aur StockManagementFixed class sirf stock management ke liye responsible hai. Dono classes alag alag interface ko implement karte hai. Isse humne Interface Segregation Principle ko follow kiya hai.