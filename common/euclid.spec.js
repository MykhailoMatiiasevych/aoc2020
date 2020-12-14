const { gcd } = require('./euclid')

console.assert(
  JSON.stringify(gcd(181, 150)) === JSON.stringify({ r: 1, z: -29, w: 35 })
)
