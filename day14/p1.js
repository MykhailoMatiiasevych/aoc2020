const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .filter(Boolean)
  .map(s => s.trim())

const res = input.reduce(
  ({ sum, mask, arr }, s) => {
    const [comm, val] = s.split(' = ')
    if (comm === 'mask') return { sum, mask: val.split(''), arr }
    const index = Number(comm.split(/\[|\]/)[1])
    if (arr[index]) sum -= arr[index]
    const valBin = Number(val).toString(2).split('')
    arr[index] = Number.parseInt(
      mask
        .reduce(
          (res, m, i) =>
            m === 'X' ? res : [...res.slice(0, i), m, ...res.slice(i + 1)],
          new Array(mask.length - valBin.length).fill('0').concat(valBin)
        )
        .join(''),
      2
    )
    sum += arr[index]
    return { sum, mask, arr }
  },
  { sum: 0, mask: [], arr: [] }
)

console.log(res.sum)
