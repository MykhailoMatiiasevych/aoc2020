const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean).map(Number)

const sorted = input.sort((a, b) => a - b)

// Data shows that max group size is 5.
const magic = [, 1, 1, 2, 4, 7]

const res = [0, ...sorted, sorted[sorted.length - 1] + 3]
  .reduce(
    ({ groups, current }, v) => {
      if (v - current < 3) {
        groups[groups.length - 1].push(v)
      } else {
        groups.push([v])
      }
      return { groups, current: v }
    },
    { groups: [[]], current: 0 }
  )
  .groups.map(group => magic[group.length])
  .reduce((acc, v) => acc * v, 1)

console.log(res)
