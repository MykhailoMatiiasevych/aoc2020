const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .filter(Boolean)
  .map(s => s.trim())

function* createReplacer(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

const getAddresses = (mask, addr) => {
  const res = []
  const power = mask.filter(c => c === 'X').length
  for (let i = 0; i < Math.pow(2, power); i++) {
    const iBin = i.toString(2).split('')
    const replacer = createReplacer(
      new Array(power - iBin.length).fill('0').concat(iBin)
    )
    const newAddr = mask.map((c, j) =>
      c === '0' ? addr[j] : c === '1' ? '1' : replacer.next().value
    )
    res.push(newAddr)
  }
  return res
}

const res = input.reduce(
  ({ sum, mask, arr }, s) => {
    const [comm, val] = s.split(' = ')
    if (comm === 'mask') return { sum, mask: val.split(''), arr }
    const value = Number(val)
    const addr = Number(comm.split(/\[|\]/)[1]).toString(2)
    getAddresses(
      mask,
      new Array(mask.length - addr.length).fill('0').join('') + addr
    ).forEach(addr => {
      const index = Number.parseInt(addr.join(''), 2)
      if (arr[index]) sum -= arr[index]
      arr[index] = value
      sum += value
    })
    return { sum, mask, arr }
  },
  { sum: 0, mask: [], arr: [] }
)

console.log(res.sum)
