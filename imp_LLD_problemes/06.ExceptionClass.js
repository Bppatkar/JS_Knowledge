//! School Error Handling
//? defination - Exception handling unexpected problem ko safely manage karta hai.
//? problem - Agar student admission me data galat ho to system crash nahi hona chahiye.
//? solution - Exception class error ko clear message me convert karti hai.

//*! Theory in Hinglish - Socho school form me mistake ho gayi. System ko break nahi hona chahiye, bas error message aana chahiye.
//*! Interview Defination - Exception handling is a way to manage errors without stopping the whole program.

//? Example - Green Valley School admission validation

// Wrong code
// function admitStudent(age) {
//   if (age < 5) {
//     throw 'Too young';
//   }
// }

// After fixing the code
class SchoolError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SchoolError';
  }
}

function admitStudent(age) {
  if (age < 5) {
    throw new SchoolError('Student is too young for admission');
  }

  return 'Admission successful';
}

try {
  console.log(admitStudent(6));
} catch (error) {
  console.log(error.message);
}
