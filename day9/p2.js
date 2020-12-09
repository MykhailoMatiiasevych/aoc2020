const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean).map(Number)

const getTargetIndex = () => {
  let i = 25

  const hasPair = (arr, sum) =>
    arr.some((a, _, arr) => arr.some(b => a + b === sum))

  while (hasPair(input.slice(i - 25, i), input[i])) i++

  return i
}
const pos = getTargetIndex()
const target = input[pos]

let maxIndex = pos - 1
let minIndex = maxIndex - 1
let sum = input[minIndex] + input[maxIndex]

while (sum !== target) {
  if (sum > target) {
    sum -= input[maxIndex]
    maxIndex--
  } else if (sum < target) {
    minIndex--
    sum += input[minIndex]
  }
  if (maxIndex <= minIndex) {
    minIndex = maxIndex - 1
    sum = input[minIndex] + input[maxIndex]
  }
}

const res = input
  .slice(minIndex, maxIndex + 1)
  .reduce((r, v) => [Math.min(r[0], v), Math.max(r[1], v)], [
    Number.MAX_SAFE_INTEGER,
    0,
  ])
console.log(res[0] + res[1])
