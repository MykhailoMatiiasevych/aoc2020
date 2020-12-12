const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .filter(Boolean)
  .map(s => s.trim())

const directions = [
  // x,y
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const position = input
  .map(v => [v.substring(0, 1), Number(v.substring(1))])
  .reduce(
    ({ position: [x, y], direction }, [command, value]) => {
      switch (command) {
        case 'N':
          return { position: [x, y + value], direction }
        case 'S':
          return { position: [x, y - value], direction }
        case 'E':
          return { position: [x + value, y], direction }
        case 'W':
          return { position: [x - value, y], direction }
        case 'F':
          return {
            position: [
              x + value * directions[direction][0],
              y + value * directions[direction][1],
            ],
            direction,
          }
        case 'L':
          return {
            position: [x, y],
            direction: (direction + 4 - value / 90) % 4,
          }
        case 'R':
          return {
            position: [x, y],
            direction: (direction + value / 90) % 4,
          }
      }
    },
    { position: [0, 0], direction: 1 }
  )
console.log(Math.abs(position.position[0]) + Math.abs(position.position[1]))
