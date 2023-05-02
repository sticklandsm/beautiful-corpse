import express from 'express'

import * as db from '../db/fruits'

const router = express.Router()

router.get('/', (req, res) => {
  db.getFruits()
    .then((results) => {
      res.json({ fruits: results.map((fruit) => fruit.name) })
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong' })
    })
})

export default router
