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
        console.log('socketId')
        io.emit('uploadMsg', msg)
        // io.to(socketId).emit('uploadMsg', msg)
      })

      socket.on('login', memberData => {
        console.log('login', memberData)
        const memberId = memberData.memberId

        members[memberId] = memberData
        members[memberId].socketId = socketId
        io.emit('uploadMember', members)
      })

      socket.on('disconnect', memberData => {
        console.log('offline', memberData)
        delete members[memberData.memberId]
        io.emit('uploadMember', members)
      })
    })
  }
}
