const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean).map(Number)

let i = 25

const hasPair = (arr, sum) =>
  arr.some((a, _, arr) => arr.some(b => a + b === sum))

while (hasPair(input.slice(i - 25, i), input[i])) i++

console.log(input[i])
