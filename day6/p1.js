const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const sum = input
  .join(',') // Join input
  .split(',,') // split to groups
  .reduce(
    (sum, ss) =>
      sum +
      ss
        .split(',') // split inside group
        .filter(Boolean) // Filter empty strings
        .map(
          s =>
            s
              .split('') // split to chars
              .map(c => 1 << (c.charCodeAt() - 'a'.charCodeAt())) // Convert to bin. 0001 - a, 0010 - b ...
              .reduce((acc, v) => acc | v) // join all chars
        )
        .reduce((acc, v) => acc | v) // Join results inside group
        .toString(2) // Convert to binary string
        .replace(/0/g, '').length, // count '1's
    0
  )

console.log(sum)
