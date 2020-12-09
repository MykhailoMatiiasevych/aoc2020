const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const visited = new Array(input.length)
let pointer = 0
let acc = 0

while (!visited[pointer]) {
  visited[pointer] = true
  const [cmd, ...args] = input[pointer].split(' ')

  if (cmd === 'nop') {
    pointer++
  } else if(cmd === 'acc') {
    acc += Number(args[0])
    pointer++
  } else if(cmd === 'jmp') {
    pointer += Number(args[0])
  }
}

console.log(acc)
