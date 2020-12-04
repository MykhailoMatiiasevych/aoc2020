const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]

const res = slopes.reduce(
  (acc, [dx, dy]) =>
    acc *
    input
      .filter((_, i) => i % dy === 0)
      .map((l, i) => l[(i * dx) % l.length])
      .filter(c => c === '#').length,
  1
)
//3521829480
console.log(res)
