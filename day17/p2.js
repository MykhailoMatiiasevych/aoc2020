const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
  .map(s => s.trim())
  .filter(Boolean)

const d = [-1, 0, 1]
const buildKey = (x, y, z, w) => `${x}:${y}:${z}:${w}`
const parseKey = key => key.split(':').map(Number)
const getNeighbors = key => {
  const [x, y, z, w] = parseKey(key)
  return d
    .reduce(
      (acc1, dx) =>
        d.reduce(
          (acc2, dy) =>
            d.reduce(
              (acc3, dz) =>
                d.reduce(
                  (acc4, dw) => [
                    ...acc4,
                    buildKey(x + dx, y + dy, z + dz, w + dw),
                  ],
                  acc3
                ),
              acc2
            ),
          acc1
        ),
      []
    )
    .filter(n => n !== key)
}

const activeNeighborsCount = (state, key) =>
  getNeighbors(key).reduce((sum, nKey) => (state.has(nKey) ? sum + 1 : sum), 0)

const doSteps = (state, remainSteps) => {
  if (remainSteps === 0) return state
  const newState = new Set()
  const inactive = new Set()
  state.forEach(key => {
    getNeighbors(key)
      .filter(key => !state.has(key))
      .forEach(key => inactive.add(key))
  })

  state.forEach(key => {
    const count = activeNeighborsCount(state, key)
    if (count >= 2 && count <= 3) newState.add(key)
  })
  inactive.forEach(key => {
    const count = activeNeighborsCount(state, key)
    if (count === 3) newState.add(key)
  })
  return doSteps(newState, remainSteps - 1)
}

// Key: x:y:z
const state = input.reduce(
  (a1, s, y) =>
    s
      .split('')
      .reduce(
        (acc, c, x) => (c === '#' ? acc.add(buildKey(x, y, 0, 0)) : acc),
        a1
      ),
  new Set()
)

const totalSteps = 6

console.log(doSteps(state, totalSteps).size)
