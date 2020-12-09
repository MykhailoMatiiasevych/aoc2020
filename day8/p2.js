const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const run = input => {
  const visited = new Array(input.length)
  let pointer = 0
  let acc = 0

  while (pointer < input.length && !visited[pointer]) {
    visited[pointer] = true
    const [cmd, ...args] = input[pointer].split(' ')

    if (cmd === 'nop') {
      pointer++
    } else if (cmd === 'acc') {
      acc += Number(args[0])
      pointer++
    } else if (cmd === 'jmp') {
      pointer += Number(args[0])
    }
  }
  return { end: pointer >= input.length, acc }
}

const getResult = () => {
  for (let i = 0; i < input.length; i++) {
    const [cmd, ...args] = input[i].split(' ')
    let newCmd = null
    if (cmd === 'nop') {
      newCmd = 'jmp'
    } else if (cmd === 'jmp') {
      newCmd = 'nop'
    }
    if (newCmd) {
      const mod = [...input]
      mod[i] = `${newCmd} ${args.join(' ')}`
      const result = run(mod)
      if (result.end) return result
    }
  }
}

console.log(getResult().acc)
