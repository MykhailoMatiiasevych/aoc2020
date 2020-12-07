const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const addNode = (tree, node) => {
  if (!tree[node]) {
    tree[node] = new Set()
  }
  return tree[node]
}
const addToParent = (tree, parentNode, node) => {
  addNode(tree, parentNode)
  const child = addNode(tree, node)
  child.add(parentNode)
  return tree
}
const targetColor = 'shiny gold'
const regex = /(\d+ )?(\w+\s\w+) bags?/g
const tree = input
  .map(s => [...s.matchAll(regex)].map(a => a[2]))
  .reduce(
    (tree, [parent, ...children]) =>
      children.reduce((tree, child) => addToParent(tree, parent, child), tree),
    {}
  )

const getParentColors = (set, color) =>
  [...tree[color]].reduce((set, p) => {
    set.add(p)
    return getParentColors(set, p)
  }, set)

console.log(getParentColors(new Set(), targetColor).size)
