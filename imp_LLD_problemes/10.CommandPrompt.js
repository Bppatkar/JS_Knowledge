//! School Command Prompt
//? defination - Command prompt ek place hoti hai jahan commands run kar ke kaam karaya jata hai.
//? problem - School admin ke common tasks ko direct logic me mix karna messy hota hai.
//? solution - Command prompt commands ko alag alag handle karta hai.

//*! Theory in Hinglish - Socho principal office ka command desk. Wahan se announce, close, aur call teacher jaise kaam chal sakte hain.
//*! Interview Defination - Command prompt is an interface that receives commands and executes them.

//? Example - Green Valley School admin console

// Wrong code
// console.log('Many admin tasks mixed together');

// After fixing the code
class CommandPrompt {
  run(command) {
    return `Running command: ${command}`;
  }
}

const prompt = new CommandPrompt();
console.log(prompt.run('announce holiday'));
