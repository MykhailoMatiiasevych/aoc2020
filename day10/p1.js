const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean).map(Number)

const sorted = input.sort((a, b) => a - b)
const res = [...sorted, sorted[sorted.length - 1] + 3].reduce(
  ({ current, delta }, v) => {
    delta[v - current - 1]++
    return { current: v, delta }
  },
  { current: 0, delta: [0, 0, 0] }
)

console.log(res.delta[0] * res.delta[2])
