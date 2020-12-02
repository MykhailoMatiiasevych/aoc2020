const readToLines = require('../common/readToLines')

const target = 2020

const input = readToLines('./input.txt')
const sorted = input
  .map(Number)
  .filter(Boolean)
  .sort((a, b) => a - b)

function getResult() {
  for (let i = 0; i < sorted.length - 2; i++) {
    for (let j = i + 1; j < sorted.length - 1; j++) {
      for (let k = j + 1; k < sorted.length; k++) {
        if (sorted[i] + sorted[j] + sorted[k] === target)
          return sorted[i] * sorted[j] * sorted[k]
      }
    }
  }
}

/**
 *
 * @param target sum to find
 * @param items items to search within
 * @param remain how many parts remain
 */
function getCombination(target, items, remain) {
  for (let i = 0; i < items.length - remain; i++) {
    if (items[i] > target) return null
    if (remain === 1 && target === items[i]) return items[i]
    if (remain > 1) {
      const res = getCombination(
        target - items[i],
        items.slice(i + 1),
        remain - 1
      )
      if (res) return items[i] * res
    }
  }
}

console.log('Brute force')
console.log(getResult())

console.log('Optimized')
console.log(getCombination(target, sorted, 3))


