const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .filter(Boolean)
  .map(s => s.trim())

const target = Number(input[0])
const res = input[1]
  .split(',')
  .map(Number)
  .filter(n => !isNaN(n))
  .reduce(([bus, delay], n) => {
    const busDelay = n - target%n
    return busDelay < delay ? [n, busDelay]: [bus,delay]
  }, [0, Number.MAX_SAFE_INTEGER])

console.log(res[0]*res[1])
