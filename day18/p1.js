const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .map(s => s.trim())
  .filter(Boolean)

const op = /(\d+)\s([+*])\s(\d+)/
const groups = /\((\d+)\)/g

const process = s => {
  let str = s
  let match

  while (true) {
    str = str.replace(groups, '$1')

    if (match = str.match(op)) {
      const a = Number(match[1])
      const b = Number(match[3])
      const res = match[2] === '+' ? a + b : a * b
      str = str.replace(match[0], res)
      continue
    }

    return Number(str)
  }
}

const res = input.map(process).reduce((sum, v) => sum + v)
console.log(res)
