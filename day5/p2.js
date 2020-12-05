const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const res =
  input
    .map(s => s.replace(/B|R/g, '1').replace(/F|L/g, '0'))
    .map(s => Number.parseInt(s, 2))
    .sort((a, b) => a - b)
    .find((v, i, a) => i !== 0 && a[i - 1] + 1 !== v) - 1

console.log(res)
