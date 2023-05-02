import express from 'express'

import * as db from '../db/drawings'
import multer from 'multer'
import { DrawingDbBinary } from '../../models/Drawing'
const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//GET all drawings
router.get('/', async (req, res) => {
  try {
    const fetchedDrawings = await db.getDrawings()
    res.json(fetchedDrawings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
})

//GET Drawing by ID
router.get('/drawing/:id', async (req, res) => {
  try {
    const fetchedDrawing = await db.getDrawingById(Number(req.params.id))

    res.json(fetchedDrawing)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong ', error })
  }
})

//GET Game by ID
router.get('/:id', async (req, res) => {
  try {
    const fetchedGame = await db.getDrawingsAndPromptsForGameId(
      Number(req.params.id)
    )
    res.json(fetchedGame)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
})

//Post a drawing
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (req.file) {
      const newDrawingData: DrawingDbBinary = {
        drawingBinary: req.file.buffer,
        gameId: req.body.gameId,
      }
      console.error('new drawing stuff: ', newDrawingData)
      await db.addDrawing(newDrawingData)
      res.status(201).json({ message: 'added drawing' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
