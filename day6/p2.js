const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const sum = input
  .join(',')
  .split(',,')
  .reduce(
    (sum, ss) =>
      sum +
      ss
        .split(',')
        .filter(Boolean)
        .map(s =>
          s
            .split('')
            .map(c => 1 << (c.charCodeAt() - 'a'.charCodeAt()))
            .reduce((acc, v) => acc | v)
        )
        .reduce((acc, v) => acc & v) // Diff from p1 - intersection instead of join
        .toString(2)
        .replace(/0/g, '').length,
    0
  )

console.log(sum)
