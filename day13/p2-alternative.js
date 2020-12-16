const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .filter(Boolean)
  .map(s => s.trim())

const findTimestamp = (base, step, delta, newBase) => {
  let timestamp,
    i = 0
  do {
    timestamp = i++ * step + base
  } while ((timestamp + delta) % newBase !== 0)
  return timestamp
}

const res = input[1]
  .split(',')
  .map(Number)
  .map((m, d) => ({ m, d }))
  .filter(({ m }) => !isNaN(m))
  .reduce((acc, { m, d }) => {
    if (d === 0) return { t: m, step: m }
    return { t: findTimestamp(acc.t, acc.step, d, m), step: acc.step * m }
  }, {})

console.log(res.t)
