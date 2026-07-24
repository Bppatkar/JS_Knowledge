//! School Fee Splitter
//? defination - Splitter ek amount ko alag alag parts me baant deta hai.
//? problem - School fee, bus fee, aur lunch fee ko manually split karna messy hota hai.
//? solution - Splitter har part ka share calculate karta hai.

//*! Theory in Hinglish - Socho school fee ko parts me baantna. Tuition alag, transport alag, activity alag.
//*! Interview Defination - Splitter is a system that divides total amount into multiple shares.

//? Example - Green Valley School fee split

// Wrong code
// const totalFee = 10000;
// console.log(totalFee);

// After fixing the code
class FeeSplitter {
  split(totalFee, parts) {
    const amount = totalFee / parts.length;
    return parts.map((part) => ({ part, amount }));
  }
}

const feeSplitter = new FeeSplitter();
console.log(feeSplitter.split(12000, ['tuition', 'transport', 'activity']));
