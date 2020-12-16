const gcd = (a, b) => {
  let r = b,
    rn = a,
    w = 1,
    wn = 0,
    z = 0,
    zn = 1

  while (rn > 0) {
    const q = Math.floor(r / rn)
    ;[r, rn] = [rn, r - q * rn]
    ;[z, zn] = [zn, z - q * zn]
    ;[w, wn] = [wn, w - q * wn]
  }
  return { r, z, w }
}

const inverse = (a, m) => {
  const { r, z } = gcd(a, m)
  if (r !== 1) throw 'Bad mod inverse'
  return (z + m) % m
}

const mod = (a, m) => {
  const res = a % m
  return res < 0 ? m + res : res
}

const lcm = (a, b) => a * b / gcd(Math.max(a, b), Math.min(a, b)).r

module.exports = {
  gcd,
  inverse,
  mod,
  lcm
}
