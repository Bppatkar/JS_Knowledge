//! School Library Recent Books Cache
//? defination - Cache ek temporary storage hota hai jo frequent data ko fast access ke liye rakhta hai.
//? problem - Same book details bar bar fetch karne se system slow ho sakta hai.
//? solution - Cache recent school library books ko yaad rakhta hai.

//*! Theory in Hinglish - Socho school library ka recent books shelf. Jo book abhi abhi use hui hai, wahi paas me rakho.
//*! Interview Defination - Cache is a fast temporary storage that keeps frequently used data for quick access.

//? Example - Green Valley School library cache

// Wrong code
// class Library {
//   getBook(id) {
//     return `Book ${id} loaded every time from main store`;
//   }
// }

// After fixing the code
class LibraryCache {
  constructor(limit = 3) {
    this.limit = limit;
    this.cache = new Map();
  }

  getBook(id) {
    if (this.cache.has(id)) {
      const book = this.cache.get(id);
      this.cache.delete(id);
      this.cache.set(id, book);
      return book;
    }

    const book = `Book ${id} from main library`;

    if (this.cache.size >= this.limit) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(id, book);
    return book;
  }
}

const libraryCache = new LibraryCache(2);
console.log(libraryCache.getBook(1));
console.log(libraryCache.getBook(2));
console.log(libraryCache.getBook(1));
