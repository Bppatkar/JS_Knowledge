//! School Message Queue
//? defination - Queue first-in first-out order me messages process karta hai.
//? problem - School notices agar random order me bheje gaye to confusion hoga.
//? solution - Queue notice ko line me lagata hai.

//*! Theory in Hinglish - Socho school canteen line. Jo pehle aaya, pehle served hua.
//*! Interview Defination - Message queue is a FIFO system that processes messages in order.

//? Example - Green Valley School notice queue

// Wrong code
// const notices = ['A', 'B', 'C'];
// console.log(notices);

// After fixing the code
class MessageQueue {
  constructor() {
    this.messages = [];
  }

  enqueue(message) {
    this.messages.push(message);
  }

  dequeue() {
    return this.messages.shift() ?? null;
  }
}

const queue = new MessageQueue();
queue.enqueue('Morning assembly');
queue.enqueue('Sports notice');
console.log(queue.dequeue());
