// defination - Prototype pattern existing object ki copy banata hai.
// problem - School me same admission template, same notice, ya same student report baar baar manually banana time waste karta hai.
// solution - Prototype pattern ready object ko clone karke naya object bana deta hai.

//? Theory in Hinglish - Socho school me ek notice ready hai. Uski photocopy nikal ke 10 class me bhej do. Har baar new notice likhne ki zarurat nahi.
// Interview Defination - Prototype pattern is a creational design pattern that creates new objects by copying an existing object.

//? Example - School Management System me same report card template ko copy karna.

// Wrong code
// const reportCard = { studentName: 'Aman', className: '5th', section: 'A', marks: 92 };
// const copiedReportCard = {
//   studentName: reportCard.studentName,
//   className: reportCard.className,
//   section: reportCard.section,
//   marks: reportCard.marks,
// };

// After fixing the code
class ReportCard {
  constructor(studentName, className, section, marks) {
    this.studentName = studentName;
    this.className = className;
    this.section = section;
    this.marks = marks;
  }

  clone() {
    return new ReportCard(this.studentName, this.className, this.section, this.marks);
  }
}

const originalReportCard = new ReportCard('Aman', '5th', 'A', 92);
const copiedReportCard = originalReportCard.clone();

console.log(originalReportCard);
console.log(copiedReportCard);
console.log(originalReportCard === copiedReportCard);
