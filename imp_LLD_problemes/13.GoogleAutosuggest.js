//! School Search Suggestion
//? defination - Suggestion system user ke input ke basis par useful options dikhata hai.
//? problem - School data me exact name ya class dhundhna slow ho sakta hai.
//? solution - Suggestion system matching options jaldi dikhata hai.

//*! Theory in Hinglish - Socho school register search. Naam type karo aur matching student list turant aa jaye.
//*! Interview Defination - Autosuggest is a system that shows matching suggestions as the user types.

//? Example - Green Valley School search box

// Wrong code
// console.log('Search manually without suggestion');

// After fixing the code
class SchoolSearchSuggest {
  constructor(names) {
    this.names = names;
  }

  suggest(prefix) {
    return this.names.filter((name) => name.toLowerCase().startsWith(prefix.toLowerCase()));
  }
}

const searchSuggest = new SchoolSearchSuggest(['Aman', 'Anita', 'Riya', 'Rohit']);
console.log(searchSuggest.suggest('a'));
