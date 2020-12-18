const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .map(s => s.trim())
  .filter(Boolean)

const opSum = /(\d+)\s\+\s(\d+)/
const opMul = /(\d+)\s\*\s(\d+)/
const opMulGroup = /\(([0-9*\s]+)\)/
const groups = /\((\d+)\)/g

const process = s => {
  let str = s
  let match

  while (true) {
    str = str.replace(groups, '$1')

    if (match = str.match(opMulGroup)) {
      const res = match[1]
        .split(' ')
        .map(Number)
        .filter(n => !isNaN(n))
        .reduce((acc, v) => acc * v)
      str = str.replace(match[0], res)
      continue
    }

    if (match = str.match(opSum)) {
      const a = Number(match[1])
      const b = Number(match[2])
      str = str.replace(match[0], a + b)
      continue
    }

    if (match = str.match(opMul)) {
      const a = Number(match[1])
      const b = Number(match[2])
      str = str.replace(match[0], a * b)
      continue
    }

    return Number(str)
  }
}

const res = input.map(process).reduce((sum, v) => sum + v)
console.log(res)
