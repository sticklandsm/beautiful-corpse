import express from 'express'
import { join } from 'node:path'

import fruitRoutes from './routes/fruits'
import gameRoutes from './routes/games'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)
server.use('/api/v1/game', gameRoutes)

server.get('*', (req, res) => {
  const appPath = join(__dirname, 'public', 'index.html')
  res.sendFile(appPath)
})

export default server
