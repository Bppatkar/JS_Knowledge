
// Dry Run (Most Important Part)
//  s = "AABABBA", K = 1
// Start me table fill karo.

/* 
intiall values
| left | right | Window | Map | maxFreq | Replacements | Valid? | bestAnswer |

| ---: | ----: | ------ | --- | ------- | ------------ | ------ | ---------- |

|    0 |     0 | right -left+1| {}   | 0 | 0  | (right-left+1) - maxFreq <k  | 0  |
--------------------------------------------------------------------------------------------
| left | right | Window | Map       | maxFreq | Replacements | Valid? | bestAnswer |
| ---: | ----: | -----: | --------- | ------: | -----------: | :----: | ---------: |
|    0 |     0 |      1 | {A:1}     |       1 |            0 |  ✅ Yes |          1 |
|    0 |     1 |      2 | {A:2}     |       2 |            0 |  ✅ Yes |          2 |
|    0 |     2 |      3 | {A:2,B:1} |       2 |            1 |  ✅ Yes |          3 |
|    0 |     3 |      4 | {A:3,B:1} |       3 |            1 |  ✅ Yes |          4 |
right = 4, character = 'B
|    0 |     4 |      5 | {A:3,B:2} |       3 |            2 |  ❌ No |          4 |
*/