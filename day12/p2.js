const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .filter(Boolean)
  .map(s => s.trim())

const turn = {
  L: ([x, y]) => [-y, x],
  R: ([x, y]) => [y, -x],
}

const position = input
  .map(v => [v.substring(0, 1), Number(v.substring(1))])
  .reduce(
    ([[x, y], [wx, wy]], [command, value]) => {
      switch (command) {
        case 'N':
          return [
            [x, y],
            [wx, wy + value],
          ]
        case 'S':
          return [
            [x, y],
            [wx, wy - value],
          ]
        case 'E':
          return [
            [x, y],
            [wx + value, wy],
          ]
        case 'W':
          return [
            [x, y],
            [wx - value, wy],
          ]
        case 'L':
        case 'R':
          return [
            [x, y],
            new Array(value / 90).fill(0).reduce(turn[command], [wx, wy]),
          ]
        case 'F':
          return [
            [x + wx * value, y + wy * value],
            [wx, wy],
          ]
      }
    },
    [
      [0, 0],
      [10, 1],
    ]
  )
console.log(Math.abs(position[0][0]) + Math.abs(position[0][1]))
