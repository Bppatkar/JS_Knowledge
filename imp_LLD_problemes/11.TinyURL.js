//! School Short Notice Link
//? defination - Short link long address ko chhota bana deta hai.
//? problem - School notice ka long URL ya path share karna hard hota hai.
//? solution - Shortener ek chhota code bana kar original link ko map karta hai.

//*! Theory in Hinglish - Socho school notice ka long address. Uska short code banana easy hai.
//*! Interview Defination - URL shortener is a system that converts a long link into a short code.

//? Example - Green Valley School notice short link

// Wrong code
// const longLink = 'https://school.com/notices/annual-function-2026';
// console.log(longLink);

// After fixing the code
class ShortLinkService {
  constructor() {
    this.map = new Map();
  }

  shorten(longUrl) {
    const shortCode = `gv-${this.map.size + 1}`;
    this.map.set(shortCode, longUrl);
    return shortCode;
  }

  resolve(shortCode) {
    return this.map.get(shortCode) ?? null;
  }
}

const shortLinkService = new ShortLinkService();
const code = shortLinkService.shorten('https://school.com/notices/annual-function-2026');
console.log(code);
console.log(shortLinkService.resolve(code));
