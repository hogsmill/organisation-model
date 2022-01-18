
const { v4: uuidv4 } = require('uuid')

function newOrg(id, name) {
  return {
    orgId: id,
    name: name,
    parent: '',
    children: [],
    members: []
  }
}

function _updateOrganisation(db, io) {
  db.orgCollection.findOne({}, (err, res) => {
    if (err) throw err
    db.itemsCollection.find({orgId: res.id}).toArray((err, res) => {
      if (err) throw err
      io.emit('updateOrganisation', res)
    })
  })
}

module.exports = {

  checkOrganisation: function(db, io, name, debugOn) {

    if (debugOn) { console.log('checkOrganisation', name) }

    db.orgCollection.findOne({}, (err, res) => {
      if (err) throw err
      if (!res) {
        const id = uuidv4()
        db.orgCollection.insertOne({id: id}, (err) => {
          if (err) throw err
          const org = newOrg(id, name)
          console.log(org)
          db.itemsCollection.insertOne(org, (err) => {
            if (err) throw err
            _updateOrganisation(db, io)
          })
          io.emit('organisationId', id)
        })
      } else {
        io.emit('organisationId', res.id)
        _updateOrganisation(db, io)
      }
    })
  },

  addOrganisationItem: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addOrganisationItem', data) }

    db.itemsCollection.insertOne(data, (err) => {
      if (err) throw err
      _updateOrganisation(db, io)
    })
  },

  editOrganisationItem: function(db, io, data, debugOn) {

    if (debugOn) { console.log('editOrganisationItem', data) }

    db.itemsCollection.findOne({id: data.item.id}, (err, res) => {
      if (err) throw err
      if (res) {
        db.itemsCollection.replaceOne({id: data.item.id}, (err) => {
          _updateOrganisation(db, io)
        })
      }
    })
  },

  deleteOrganisationItem: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteOrganisationItem', data) }

    db.itemsCollection.deleteOne({id: data.item.id}, (err) => {
      if (err) throw err
      _updateOrganisation(db, io, debugOn)
    })
  },

}
