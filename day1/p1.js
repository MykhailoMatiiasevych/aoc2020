const readToLines = require('../common/readToLines')

const target = 2020

const input = readToLines('./input.txt')
const sorted = input.map(Number).filter(Boolean).sort((a,b) => a-b)
let i = 0,
    j = 1

while (true) {
    const result = sorted[i] + sorted[j]
    if (result === target) break

    if (result > target || j + 1 === sorted.length) {
        i++
        j = i + 1
    } else {
        j++
    }
}

console.log(sorted[i] * sorted[j])
