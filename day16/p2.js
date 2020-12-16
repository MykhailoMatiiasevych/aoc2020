const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').map(s => s.trim())

const yourTicketIndex = input.indexOf('your ticket:')
const ids = new Array(yourTicketIndex - 1).fill(0).map((v, i) => i)

// Collect information about fields
const fields = input
  .slice(0, yourTicketIndex - 1)
  .map(s => s.split(/:\s|\sor\s/g))
  .reduce((acc, [name, ...rulesDef]) => {
    const rules = rulesDef
      .map(s => s.split('-').map(Number))
      .map(([from, to]) => v => v >= from && v <= to)
    return [
      ...acc,
      { name, finalPosition: -1, possiblePositions: new Set(ids), rules },
    ]
  }, [])

const fieldsMatch = number =>
  fields.filter(({ rules }) => rules.some(rule => rule(number)))

// All tickets
input
  .slice(yourTicketIndex + 4)
  .filter(Boolean)
  .map(s => s.split(',').map(Number))
  // Filter tickets with values, that don't match any of the field's rules
  .filter(numbers => numbers.every(number => !!fieldsMatch(number).length))
  .forEach(numbers =>
    numbers.forEach((number, i) => {
      // Find possible fields for the number from the ticket
      const possibleFields = fieldsMatch(number)
      // And remove NOT possible fields from fields
      fields
        .filter(field => possibleFields.indexOf(field) < 0)
        .forEach(({ possiblePositions }) => possiblePositions.delete(i))
    })
  )

// There are fields with single possible position, apparently.
// Save it and remove this position from other tickets
while (!fields.every(({ finalPosition }) => finalPosition >= 0)) {
  const singlePossible = fields.find(
    ({ possiblePositions }) => possiblePositions.size === 1
  )
  const finalPosition = singlePossible.possiblePositions.values().next().value
  singlePossible.finalPosition = finalPosition
  singlePossible.possiblePositions.clear()
  fields.forEach(({ possiblePositions }) =>
    possiblePositions.delete(finalPosition)
  )
}

// Decode yourTicket using final positions
const yourTicket = input[yourTicketIndex + 1].split(',').map(Number)
const res = fields
  .filter(({ name }) => name.startsWith('departure'))
  .reduce((res, { finalPosition }) => res * yourTicket[finalPosition], 1)

console.log(res)
