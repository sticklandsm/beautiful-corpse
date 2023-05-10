import express from 'express'
import { join } from 'node:path'

import gameRoutes from './routes/games'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/game', gameRoutes)

server.get('*', (req, res) => {
  const appPath = join(__dirname, 'public', 'index.html')
  res.sendFile(appPath)
})

export default server
