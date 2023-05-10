import express from 'express'

import * as db from '../db/drawings'
import multer from 'multer'
import { DrawingDbBinary } from '../../models/Drawing'
import { PromptDB } from '../../models/Prompts'
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
    res.status(500).json({ message: 'Something went wrong: ', error })
  }
})

//GET Drawing by ID
// router.get('/drawing/:id', async (req, res) => {
//   try {
//     const fetchedDrawing = await db.getDrawingById(Number(req.params.id))

//     res.json(fetchedDrawing)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Something went wrong: ', error })
//   }
// })

//GET Last Drawing by GameID
router.get('/drawing/:gameid', async (req, res) => {
  try {
    const fetchedDrawingBinary = await db.getLastDrawingByGameId(
      Number(req.params.gameid)
    )

    if (!fetchedDrawingBinary) {
      res.status(404).json({ message: 'Drawing not found' })
    } else {
      res.set('Content-Type', 'image/png')

      res.json(fetchedDrawingBinary.toString('base64'))
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong: ', error })
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
    res.status(500).json({ message: 'Something went wrong: ', error })
  }
})

//

//GET last prompt by gameId
router.get('/prompt/:gameid', async (req, res) => {
  try {
    const fetchedPrompt = await db.getLastPromptByGameId(
      Number(req.params.gameid)
    )

    if (!fetchedPrompt) {
      res.status(404).json({ message: 'Prompt not found' })
    } else {
      res.json(fetchedPrompt)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong: ', error })
  }
})

// Post a drawing
router.post('/drawing', upload.single('file'), async (req, res) => {
  try {
    if (req.file) {
      const newDrawingData: DrawingDbBinary = {
        drawingBinary: req.file.buffer,
        gameId: req.body.gameId,
      }

      await db.addDrawing(newDrawingData)
      res.status(201).json({ message: 'added drawing' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong: ', error })
  }
})

//Post a prompt
router.post('/prompt', async (req, res) => {
  try {
    if (!req.body)
      throw new Error('req.body is empty when trying to post a prompt')
    await db.addPrompt(req.body as PromptDB)
    res.status(201).json({ message: 'added drawing' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong: ', error })
  }
})

//Post a new game
router.post('/newgame', async (req, res) => {
  try {
    if (!req.body)
      throw new Error('req.body is empty when trying to post a new game')
    const fetchedGameId = await db.newGame(Number(req.body.rounds))
    res.status(201).json(fetchedGameId[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
})

//get whos turn it is for a specific game
router.get('/gamestatus/:id', async (req, res) => {
  try {
    const fetchedStatus = await db.getGameStatus(Number(req.params.id))

    res.json(fetchedStatus)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong: ', error })
  }
})

//patch to set status of game
router.patch('/gamestatus/:id', async (req, res) => {
  try {
    const response = await db.setGameStatus(
      Number(req.params.id),
      req.body.status
    )

    res.status(201).json({ response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong: ', error })
  }
})

export default router
