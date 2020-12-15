const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const target = 2020
const state = input[0]
  .split(',')
  .map(Number)
  .reduce((acc, n, i) => ({ ...acc, [n]: i + 1, turn: i + 1, next: 0 }), {})

const next = state => {
  state.turn++
  const n = state.turn - (state[state.next] || state.turn)
  state[state.next] = state.turn
  state.next = n
  return state
}

while (state.turn < target - 1) next(state)

console.log(state.next)
