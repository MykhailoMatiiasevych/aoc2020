const readToLines = require('../common/readToLines')
const { mod, inverse } = require('../common/euclid')
const input = readToLines('./input.txt')
  .filter(Boolean)
  .map(s => s.trim())

const res = input[1]
  .split(',')
  .map(Number)
  .map((m, i) => ({ m, a: mod(m - i, m) }))
  .filter(({m}) => !isNaN(m))
  //Garner's Chinese Remainder Algorithm
  .reduce((acc, { a, m }, i,arr) => {
    if (i === 0) {
      return { b: 1, s: mod(a, m), mp: m }
    }
    const b = acc.b * acc.mp
    const d = inverse(b, m)
    const x = mod(d * (a - acc.s), m)
    const s = acc.s + x * b
    return { b, s, mp: m }
  }, {})

console.log(res.s)

