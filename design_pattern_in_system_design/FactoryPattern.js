//! Factory Pattern
//? ye hme ek interface provide krta h jisse hm object create kr skte h without exposing the creation logic to the client and refer to the newly created object using a common interface.

//* Example: 
//? Suppose we have a shape interface and we want to create different shapes like Circle, Square, and Rectangle. Instead of creating objects of these shapes directly, we can use a factory class to create them.

class ShapeFactory {
  createShape(type) {
    if (type === 'circle') {
      return {
        type: 'circle',
        draw: () => console.log('Drawing a circle')
      }
    } else if (type === 'square') {
      return {
        type: 'square',
        draw: () => console.log('Drawing a square')
      }
    }
    throw new Error('Invalid shape type');
  }
}

const shapeFactory = new ShapeFactory();
let circle = shapeFactory.createShape('circle');
circle.draw(); // Output: Drawing a circle
let square = shapeFactory.createShape('square');
square.draw(); // Output: Drawing a square