//! School Login Service
//? defination - Authentication service check karta hai user sach me valid hai ya nahi.
//? problem - School app me koi bhi student ya teacher bina check ke login nahi kar sakta.
//? solution - Authentication service username aur password verify karta hai.

//*! Theory in Hinglish - Socho school gate par ID card check hota hai. Sahi ID ho to entry milti hai.
//*! Interview Defination - Authentication service verifies identity before allowing access.

//? Example - Green Valley School login

// Wrong code
// console.log('Login without checking details');

// After fixing the code
class AuthenticationService {
  constructor() {
    this.users = new Map([
      ['teacher1', 'pass123'],
      ['student1', 'stud123'],
    ]);
  }

  login(username, password) {
    return this.users.get(username) === password ? 'Login successful' : 'Invalid credentials';
  }
}

const authService = new AuthenticationService();
console.log(authService.login('teacher1', 'pass123'));
