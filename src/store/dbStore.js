
const orgFuns = require('./lib/org.js')

const { v4: uuidv4 } = require('uuid')

function newItem(name, parent) {
  return {
    id: uuidv4(),
    name: name,
    isTeam: false,
    parent: parent,
    children: [],
    members: [],
    items: []
  }
}

function _updateOrganisation(db, io) {
  db.itemsCollection.find({}).toArray((err, res) => {
    if (err) throw err
    const org = orgFuns.createOrg(res)
    io.emit('updateOrganisation', org)
  })
}

function _updateCheckList(db, io) {
  db.listCollection.find({}).toArray((err, res) => {
    if (err) throw err
    io.emit('updateCheckList', res)
  })
}

module.exports = {

  checkOrganisation: function(db, io, name, debugOn) {

    if (debugOn) { console.log('checkOrganisation', name) }

    db.itemsCollection.findOne({parent: ''}, (err, res) => {
      if (err) throw err
      if (!res) {
        const item = newItem(name, '')
        db.itemsCollection.insertOne(item, (err) => {
          if (err) throw err
          _updateOrganisation(db, io)
        })
      } else {
        _updateOrganisation(db, io)
      }
    })
    _updateCheckList(db, io)
  },

  addItem: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addItem', data) }

    db.itemsCollection.findOne({id: data.parent}, (err, res) => {
      if (err) throw err
      const item = newItem(data.name, data.parent)
      const children = res.children
      children.push(item.id)
      db.itemsCollection.updateOne({id: data.parent}, {$set: {children: children}}, (err) => {
        if (err) throw err
        db.itemsCollection.insertOne(item, (err) => {
          if (err) throw err
          _updateOrganisation(db, io)
        })
      })
    })
  },

  deleteItem: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteItem', data) }

    db.itemsCollection.findOne({id: data.parent}, (err, res) => {
      if (err) throw err
      const children = []
      for (let i = 0; i < res.children.length; i++) {
        if (res.children[i] != data.id) {
          children.push(res.children[i])
        }
      }
      db.itemsCollection.updateOne({id: data.parent}, {$set: {children: children}}, (err) => {
        if (err) throw err
        db.itemsCollection.deleteOne({id: data.id}, (err) => {
          if (err) throw err
          _updateOrganisation(db, io)
        })
      })
    })
  },

  saveItemName: function(db, io, data, debugOn) {

    if (debugOn) { console.log('saveItemName', data) }

    db.itemsCollection.updateOne({id: data.id}, {$set: {name: data.name}}, (err) => {
      if (err) throw err
      _updateOrganisation(db, io, debugOn)
    })
  },

  toggleItemIsTeam: function(db, io, data, debugOn) {

    if (debugOn) { console.log('toggleItemIsTeam', data) }

    db.itemsCollection.updateOne({id: data.id}, {$set: {isTeam: data.isTeam}}, (err) => {
      if (err) throw err
      _updateOrganisation(db, io, debugOn)
    })
  },

  addCheckListItem: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addCheckListItem', data) }

    const item = {
      id: uuidv4(),
      name: data,
      enabled: false
    }
    db.listCollection.insertOne(item, (err) => {
      if (err) throw err
      _updateCheckList(db, io)
    })
  },

  saveCheckListItemName: function(db, io, data, debugOn) {

    if (debugOn) { console.log('saveCheckListItemName', data) }

    db.listCollection.updateOne({id: data.id}, {$set: {name: data.name}}, (err) => {
      if (err) throw err
      _updateCheckList(db, io)
    })
  },

  toggleEnableListItem: function(db, io, data, debugOn) {

    if (debugOn) { console.log('toggleEnableListItem', data) }

    db.listCollection.updateOne({id: data.id}, {$set: {enabled: data.enabled}}, (err) => {
      if (err) throw err
      _updateCheckList(db, io)
    })
  },

  toggleHasItem: function(db, io, data, debugOn) {

    if (debugOn) { console.log('toggleHasItem', data) }

    db.itemsCollection.findOne({id: data.id}, (err, res) => {
      if (err) throw err
      const items = []
      for (let i = 0; i < res.items.length; i++) {
        if (res.items[i] != data.item) {
          items.push(res.items[i])
        }
      }
      if (data.hasItem) {
        items.push(data.item)
      }
      db.itemsCollection.updateOne({id: data.id}, {$set: {items: items}}, (err) => {
        if (err) throw err
        _updateOrganisation(db, io, debugOn)
      })
    })
  }

}
