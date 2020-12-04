const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const dx = 3
const trees = input.map((l, i) => l[i*dx % l.length]).filter(c => c==='#').length

console.log(trees)
