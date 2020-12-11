const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .filter(Boolean)
  .map(s => s.trim())

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

const occupiedCount = (state, lineIndex, seatIndex) =>
  directions.reduce((sum, [dl, ds]) => {
    let li = lineIndex + dl,
      si = seatIndex + ds
    while (li >= 0 && li < state.length && si >= 0 && si < state[li].length) {
      if (state[li][si] === 'L') return sum
      if (state[li][si] === '#') return sum + 1
      li += dl
      si += ds
    }
    return sum
  }, 0)

const step = state =>
  state.map((line, lineIndex) =>
    line
      .split('')
      .map((seat, seatIndex) => {
        if (seat === 'L' && occupiedCount(state, lineIndex, seatIndex) === 0)
          return '#'
        if (seat === '#' && occupiedCount(state, lineIndex, seatIndex) >= 5)
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
