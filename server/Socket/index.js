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
        if (msg.channel.channelId === 'all') {
          console.log('allMag')
          io.emit('uploadMsg', msg)
        } else {
          console.log('channelMsg', msg)
          msg.channel.members.forEach(m => {
            console.log('members', members)
            io.to(members[m.memberId].socketId).emit('uploadMsg', msg)
          })
        }
      })

      socket.on('login', memberData => {
        console.log('login', memberData)
        const memberId = memberData.memberId

        members[memberId] = memberData
        members[memberId].socketId = socketId
        io.to(socketId).emit('loginSuccess', memberData)
        io.emit('uploadMember', members)
      })

      // socket.on('newChannel', data => {
      //   // 新增聊天室
      //   console.log('newChannel', data)
      //   socket.join(data.channelId, () => {
      //     console.log(socket.rooms)
      //   })
      // })

      socket.on('inviteMember', data => {
        // 邀請某人加入聊天室
        console.log('inviteMember', data)
        io.to(data.member.socketId).emit('joinChannel', data.channel)
      })

      // socket.on('acceptJoin', channel => {
      //   // 接受聊天室邀請
      //   console.log('acceptJoin', channel)
      //   socket.join(channel.channelId, () => {
      //     let rooms = Object.keys(socket.rooms)
      //     console.log(rooms)
      //     io.to(channel.channelId).emit('comming')
      //   })
      // })

      socket.on('disconnect', memberData => {
        console.log('offline', memberData)
        delete members[memberData.memberId]
        io.emit('uploadMember', members)
      })
      socket.on('error', error => {
        console.log(error)
        io.emit('error', error)
      })
    })
  }
}
