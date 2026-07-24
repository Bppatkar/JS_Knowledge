// defination - Command pattern ek action ko alag object me pack kar deta hai.
// problem - School me bell ring, holiday announce, ya assembly start ko direct function se handle karna undo ya queue ke liye weak hota hai.
// solution - Command pattern har action ko command object banata hai.

//? Theory in Hinglish - Socho school remote control. Button dabaya aur bell baj gayi. Button ke andar kaam packed hota hai.
// Interview Defination - Command pattern is a behavioral design pattern that turns a request into a standalone object.

//? Example - School Management System me bell ring aur holiday announce karna.

// Wrong code
// function ringBell() {
//   console.log('Bell rung');
// }
// function announceHoliday() {
//   console.log('Holiday announced');
// }
// ringBell();
// announceHoliday();

// After fixing the code
class SchoolReceiver {
  ringBell() {
    console.log('Bell rung');
  }

  announceHoliday() {
    console.log('Holiday announced');
  }
}

class RingBellCommand {
  constructor(receiver) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.ringBell();
  }
}

class AnnounceHolidayCommand {
  constructor(receiver) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.announceHoliday();
  }
}

class SchoolButton {
  setCommand(command) {
    this.command = command;
  }

  press() {
    this.command.execute();
  }
}

const schoolReceiver = new SchoolReceiver();
const ringBellCommand = new RingBellCommand(schoolReceiver);
const holidayCommand = new AnnounceHolidayCommand(schoolReceiver);
const schoolButton = new SchoolButton();

schoolButton.setCommand(ringBellCommand);
schoolButton.press();
schoolButton.setCommand(holidayCommand);
schoolButton.press();
