const SocketIO = require('socket.io')
let io = null
module.exports = {
  init(server) {
    io = SocketIO(server)
    const messages = []
    const members = {}
    io.on('connection', async function(socket) {
      const socketId = socket.id

      console.log('socket connection')

      socket.on('msg', function(msg) {
        console.log('msg', msg)
        messages.push(msg)
        io.emit('uploadMsg', msg)
      })

      socket.on('login', memberData => {
        console.log('login', memberData)
        members[memberData.memberId] = memberData
        io.emit('uploadMember', members)
      })

      socket.on('offline', memberData => {
        console.log('offline', memberData)
        delete members[memberData.memberId]
        io.emit('uploadMember', members)
      })
    })
  }
}
