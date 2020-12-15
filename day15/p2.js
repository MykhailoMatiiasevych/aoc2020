const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const target = 30000000
const state = input[0]
  .split(',')
  .map(Number)
  .reduce(
    ({ map }, n, i) => ({ map: map.set(n, i + 1), turn: i + 1, next: 0 }),
    // Map is much faster then plain object
    { map: new Map() }
  )

const next = state => {
  state.turn++
  const n = state.turn - (state.map.get(state.next) || state.turn)
  state.map.set(state.next, state.turn)
  state.next = n
  return state
}

while (state.turn < target - 1) next(state)

console.log(state.next)
