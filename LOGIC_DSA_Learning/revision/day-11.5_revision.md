# Day 11.5 Revision — Prefix Hash

Prefix sum remembers cumulative state.

```text
currentPrefix - previousPrefix = target
previousPrefix = currentPrefix - target
```

HashMap remembers previous prefix states for fast lookup.

Important:
```js
map.set(0, -1);
```
