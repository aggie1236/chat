const express = require('express')
const http = require('http')

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const socket = require('./socket')

config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  // app.listen(port, host)
  server.listen(port)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
  socket.init(server)

  // io.on('connection', async function(socket) {
  //   const socketId = socket.id

  //   console.log('socket connection')

  //   socket.on('msg',function(msg){
  //     console.log('msg',msg)
  //   })

  //   socket.on('TEST',data=>{
  //     console.log('TEST',data)
  //   })
  // })

}
start()
