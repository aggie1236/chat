const SocketIO = require('socket.io')
let io = null
module.exports = {
  init(server) {
    io = SocketIO(server)
    const messages = []

    console.log('socket',server)

    // socket.io server
    // io.on('connection', socket => {
    //   console.log('connection')
    //   socket.on('message', (data) => {
    //     messages.push(data)
    //     console.log(messages)
    //     socket.broadcast.emit('message', data)
    //   })
    // })

    io.on('connection', socket => {
      console.log('connect server:', socket.id)
      socket.on('gallery-connect', ({ type = '', data = null }) => {
        switch (type) {
          case 'HOST':
            socket.on('gallery-host', ({ type = '', data = null }) => {
              if (type) {
                socket.to(socket.id).emit('gallery-host', { type, data })
              }
            })
            socket.on('disconnecting', () => {
              console.log('disconnect server:', socket.id)
              socket.to(socket.id).emit('gallery-host', {
                type: 'DISCONNECT',
                data: { host: socket.id }
              })
            })
            socket.emit('gallery-server', { type: 'CONNECTED' })
            break
          case 'CLIENT':
            const { host = '', tag = '' } = data
            if (!host || !tag) {
              return socket.emit('gallery-host', { type: 'ERROR' })
            }
            const room = io.sockets.adapter.rooms[host] || null
            if (room) {
              if (room.length === 1) {
                socket
                  .join(host)
                  .to(host)
                  .emit('gallery-client', {
                    type: 'CONNECT',
                    data: { client: socket.id, tag }
                  })
                socket.on('gallery-client', ({ type, data }) => {
                  if (type && data) {
                    socket.to(host).emit('gallery-client', { type, data })
                  }
                })
                socket.on('disconnecting', () => {
                  console.log('disconnect server:', socket.id)
                  socket.to(host).emit('gallery-client', {
                    type: 'DISCONNECT',
                    data: { client: socket.id }
                  })
                })
              } else {
                socket.emit('gallery-host', { type: 'FULL' })
              }
            } else {
              socket.emit('gallery-host', { type: 'ERROR' })
            }
            break
          default:
            socket.close()
        }
      })
    })
  }
}
