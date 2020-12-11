const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .filter(Boolean)
  .map(s => s.trim())

const occupiedCount = (state, lineIndex, seatIndex) =>
  state
    .slice(Math.max(0, lineIndex - 1), lineIndex + 2)
    .map(line => line.substring(seatIndex - 1, seatIndex + 2))
    .join('')
    .replace(/[^#]/g, '').length

const step = state =>
  state.map((line, lineIndex) =>
    line
      .split('')
      .map((seat, seatIndex) => {
        if (seat === 'L' && occupiedCount(state, lineIndex, seatIndex) === 0)
          return '#'
        // Do not count current seat
        if (seat === '#' && occupiedCount(state, lineIndex, seatIndex) - 1 >= 4)
          return 'L'
        return seat
      })
      .join('')
  )

let state = input
let newState = step(state)

while (state.join('') !== newState.join('')) {
  state = newState
  newState = step(state)
}

console.log(newState.join('').replace(/[^#]/g, '').length)
