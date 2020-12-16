const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').map(s => s.trim())

const yourTicketIndex = input.indexOf('your ticket:')

const rules = input
  .slice(0, yourTicketIndex - 1)
  .map(s => s.split(/:\s|\sor\s/g))
  .flatMap(([, ...rules]) => rules)
  .map(s => s.split('-').map(Number))
  .map(([from, to]) => v => v >= from && v <= to)

const errorRate = input
  .slice(yourTicketIndex + 4)
  .filter(Boolean)
  .flatMap(s => s.split(','))
  .map(Number)
  .filter(n => !rules.some(rule => rule(n)))
  .reduce((acc, n) => acc + n)

console.log(errorRate)
