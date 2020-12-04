const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const between = (n, low, high) => n >= low && n <= high

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
  .filter(
    p =>
      between(Number(p.byr), 1920, 2002) &&
      between(Number(p.iyr), 2010, 2020) &&
      between(Number(p.eyr), 2020, 2030) &&
      ((/\d+in/.test(p.hgt) &&
        between(Number(p.hgt.replace(/[^\d]/g, '')), 59, 76)) ||
        (/\d+cm/.test(p.hgt) &&
          between(Number(p.hgt.replace(/[^\d]/g, '')), 150, 193))) &&
      /^#[0-9a-f]{6}$/.test(p.hcl) &&
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(p.ecl) &&
      /^[0-9]{9}$/.test(p.pid)
  )

console.log(data.length)
