
function orgFromItem(org, item, items, n) {
  org.push({
    n: n,
    item: item
  })
  const m = n + 1
  for (let i = 0; i < item.children.length; i++) {
    const child = items.find((it) => {
      return it.id == item.children[i]
    })
    org = orgFromItem(org, child, items, m)
  }
  return org
}

module.exports = {

  createOrg: function(items) {
    const root = items.find((i) => {
      return !i.parent
    })
    const org = []
    return orgFromItem(org, root, items, 0)
  }
}
