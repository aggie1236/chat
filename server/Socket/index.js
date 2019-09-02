const SocketIO = require('socket.io')
let io = null
module.exports = {
  init(server) {
    io = SocketIO(server)
    const messages = []
    io.on('connection', async function(socket) {
      const socketId = socket.id
  
      console.log('socket connection')
  
      socket.on('msg',function(msg){
        console.log('msg',msg)
      })
  
      socket.on('TEST',data=>{
        console.log('TEST',data)
      })
    })
  }
}
