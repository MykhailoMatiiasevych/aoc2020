const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const data = input
  .join(',')
  .split(',,')
  .map(s =>
    s
      .split(/,|\s|:/)
      .reduce(
        (acc, _, i, a) => (i % 2 !== 0 ? { ...acc, [a[i - 1]]: a[i] } : acc),
        {}
      )
  )
  .filter(p => p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid)

console.log(data.length)
