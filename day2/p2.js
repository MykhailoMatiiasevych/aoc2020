const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const valid = input
  .map(s => s.split(/-|:\s|\s/))
  .filter(
    ([p1, p2, letter, password]) =>
      (password[p1 - 1] === letter || password[p2 - 1] === letter) &&
      password[p1 - 1] !== password[p2 - 1]
  )

console.log(valid.length)
