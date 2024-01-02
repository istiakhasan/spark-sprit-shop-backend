import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'
process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})
let server: Server

process.on('uncaughtException', error => {
  console.log('Uncaught exception is detected...', error)
  process.exit(1)
})

async function abc() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database is connected successfully`)

    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection we are closing our server', error)
    if (server) {
      server.close(() => {
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

abc()

process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
