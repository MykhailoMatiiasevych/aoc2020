const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const max = Math.max(
  ...input
    .map(s => s.replace(/B|R/g, '1').replace(/F|L/g, '0'))
    .map(s => Number.parseInt(s, 2))
)

console.log(max)
