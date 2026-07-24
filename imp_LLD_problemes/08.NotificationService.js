//! School Notification Service
//? defination - Notification service important message ko sab tak pahunchata hai.
//? problem - School notice ek ek karke bhejna time waste karta hai.
//? solution - Notification service same message ko teacher, student, aur parent tak bhejta hai.

//*! Theory in Hinglish - Socho school notice. Ek message sab logon tak ek saath jana chahiye.
//*! Interview Defination - Notification service is a system that sends messages to multiple receivers.

//? Example - Green Valley School notice system

// Wrong code
// console.log('Message sent to one person only');

// After fixing the code
class NotificationService {
  send(message, receivers) {
    receivers.forEach((receiver) => {
      console.log(`${receiver} got: ${message}`);
    });
  }
}

const notificationService = new NotificationService();
notificationService.send('Annual function tomorrow', ['Teacher', 'Student', 'Parent']);
