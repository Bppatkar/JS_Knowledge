//! School Event Ticketing
//? defination - Ticketing system event seats aur bookings ko manage karta hai.
//? problem - School annual function me seats manually manage karna hard hota hai.
//? solution - Ticketing system available seats aur bookings ko track karta hai.

//*! Theory in Hinglish - Socho school annual function tickets. Kaunse seat available hai aur kaun booked hai, ye system ko pata hona chahiye.
//*! Interview Defination - Ticketing system manages seats, bookings, and availability for an event.

//? Example - Green Valley School annual function booking

// Wrong code
// console.log('Seat booking done without tracking');

// After fixing the code
class EventBooking {
  constructor(totalSeats) {
    this.totalSeats = totalSeats;
    this.bookedSeats = 0;
  }

  bookSeat() {
    if (this.bookedSeats >= this.totalSeats) {
      return 'No seat available';
    }

    this.bookedSeats += 1;
    return `Seat booked. Remaining: ${this.totalSeats - this.bookedSeats}`;
  }
}

const eventBooking = new EventBooking(2);
console.log(eventBooking.bookSeat());
console.log(eventBooking.bookSeat());
