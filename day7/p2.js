const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt').filter(Boolean)

const addNode = (tree, node) => {
  if (!tree[node.type]) {
    tree[node.type] = []
  }
  return tree[node.type]
}
const addToParent = (tree, parentNode, node) => {
  const parent = addNode(tree, parentNode)
  addNode(tree, node)
  parent.push(node)
  return tree
}
const targetColor = 'shiny gold'
const regex = /(\d+ )?(\w+\s\w+) bags?/g
const tree = input
  .map(s =>
    [...s.matchAll(regex)].map(a => ({
      count: Number((a[1] || '0').trim()) || 0,
      type: a[2],
    }))
  )
  .reduce(
    (tree, [parent, ...children]) =>
      children.reduce((tree, child) => addToParent(tree, parent, child), tree),
    {}
  )

const getChildrenCount = color =>
  tree[color].reduce(
    (sum, child) => sum + child.count * getChildrenCount(child.type),
    1
  )

console.log(getChildrenCount(targetColor) - 1)
