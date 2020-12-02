const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const valid = input.map(s => s.split(/-|:\s|\s/)).filter(([min, max, letter, password]) => {
    const policy = password.replace(new RegExp(`[^${letter}]`, 'g'), '')
    return policy.length >= min && policy.length <= max
})

console.log(valid.length)
