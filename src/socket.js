import io from 'socket.io-client'
import bus from './EventBus'

const prod = location.hostname != 'localhost'

let asConnStr, connStr
if (!prod) {
  asConnStr = 'http://localhost:3099'
  connStr = 'http://localhost:3016'
} else {
  asConnStr = 'https://agilesimulations.co.uk:3099'
  connStr = 'https://agilesimulations.co.uk:' + process.env.VUE_APP_PORT
}
console.log('Connecting to: ' + connStr)
const socket = io(connStr)

const connectToAgileSimulations = location.hostname != 'localhost'
let asSocket
if (connectToAgileSimulations) {
  console.log('Connecting to: ' + asConnStr)
  asSocket = io(asConnStr)
}

// Agile Simulations (login)

if (connectToAgileSimulations) {

  bus.on('sendCheckLogin', (data) => { asSocket.emit('sendCheckLogin', data) })

  bus.on('sendRating', (data) => { asSocket.emit('sendRating', data) })

  asSocket.on('loginSuccess', (data) => { bus.emit('loginSuccess', data) })

  asSocket.on('logout', (data) => { bus.emit('logout', data) })
}

socket.on('connect_error', (err) => { bus.emit('connectionError', err) })

socket.on('updateConnections', (data) => { bus.emit('updateConnections', data) })

// Send

bus.on('sendCheckOrganisation', (data) => { socket.emit('sendCheckOrganisation', data) })

bus.on('sendUpdateOrganisation', () => { socket.emit('sendUpdateOrganisation') })

bus.on('sendAddItem', (data) => { socket.emit('sendAddItem', data) })

bus.on('sendDeleteItem', (data) => { socket.emit('sendDeleteItem', data) })

bus.on('sendMoveItem', (data) => { socket.emit('sendMoveItem', data) })

bus.on('sendSaveItemName', (data) => { socket.emit('sendSaveItemName', data) })

bus.on('sendToggleItemAttribute', (data) => { socket.emit('sendToggleItemAttribute', data) })

bus.on('sendAddCheckListItem', (data) => { socket.emit('sendAddCheckListItem', data) })

bus.on('sendSaveCheckListItemName', (data) => { socket.emit('sendSaveCheckListItemName', data) })

bus.on('sendToggleEnableListItem', (data) => { socket.emit('sendToggleEnableListItem', data) })

bus.on('sendToggleHasItem', (data) => { socket.emit('sendToggleHasItem', data) })

// Receive

socket.on('moveItemDone', (data) => { bus.emit('moveItemDone', data) })

socket.on('updateOrganisation', (data) => { bus.emit('updateOrganisation', data) })

socket.on('updateCheckList', (data) => { bus.emit('updateCheckList', data) })

export default bus
