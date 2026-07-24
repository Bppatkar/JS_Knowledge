//! School Notice Board Cache
//? defination - In-memory cache data ko RAM me rakhta hai taaki fast access mile.
//? problem - Baar baar notice board database ko read karna slow ho sakta hai.
//? solution - In-memory cache latest school notice ko memory me rakhta hai.

//*! Theory in Hinglish - Socho school ka notice board. Latest notice front me rakho taaki sab jaldi dekh saken.
//*! Interview Defination - In-memory cache is a memory-based storage that keeps data close for fast access.

//? Example - Green Valley School notice cache

// Wrong code
// const notice = { title: 'Holiday', body: 'School closed tomorrow' };
// console.log(notice);

// After fixing the code
class NoticeCache {
  constructor() {
    this.store = {};
  }

  set(key, value) {
    this.store[key] = value;
  }

  get(key) {
    return this.store[key] ?? null;
  }
}

const noticeCache = new NoticeCache();
noticeCache.set('holiday', 'School closed tomorrow');
console.log(noticeCache.get('holiday'));
