import { current } from '@reduxjs/toolkit'
import { DrawingBinary, DrawingDbBinary, Drawing } from '../../models/Drawing'
import { Prompt, gameRound, PromptDB } from '../../models/Prompts'
import connection from './connection'

export async function getDrawings(db = connection) {
  return (await db('drawings').select(
    'id',
    'drawing as drawingBinary',
    'game_id as gameId'
  )) as Drawing[]
}

export async function addDrawing(
  drawingToAdd: DrawingDbBinary,
  db = connection
) {
  return await db('drawings').insert({
    drawing: drawingToAdd.drawingBinary,
    game_id: drawingToAdd.gameId,
  })
}

export async function addPrompt(promptToAdd: PromptDB, db = connection) {
  return await db('prompts').insert({
    prompt: promptToAdd.prompt,
    game_id: promptToAdd.gameId,
  })
}

export async function getDrawingById(id: number, db = connection) {
  return (await db('drawings')
    .where('id', id)
    .select('id', 'drawing as drawingBinary', 'game_id as gameId')
    .first()) as DrawingBinary
}

export async function getLastDrawingByGameId(gameId: number, db = connection) {
  const result = (await db('drawings')
    .where('game_id', gameId)
    .orderBy('id', 'desc')
    .limit(1)
    .select('drawing as drawingBinary')
    .first()) as DrawingBinary

  return result?.drawingBinary
}

export async function getLastPromptByGameId(gameId: number, db = connection) {
  const result = (await db('prompts')
    .where('game_id', gameId)
    .orderBy('id', 'desc')
    .limit(1)
    .select('prompt')
    .first()) as { prompt: string }

  return result.prompt
}

export async function getDrawingsAndPromptsForGameId(
  gameId: number,
  db = connection
) {
  const gameDrawings = (await db('drawings')
    .where('game_id', gameId)
    .select('drawing as drawingBinary')) as DrawingBinary[]
  const gamePrompts = (await db('prompts')
    .where('game_id', gameId)
    .select('id', 'prompt', 'game_id as gameId')) as Prompt[]

  const promptsAndDrawings = gamePrompts.map((prompt, index) => {
    if (!gameDrawings[index]) {
      return {
        prompt: prompt.prompt,
        drawing: '',
        round: index + 1,
      }
    }
    const base64 = gameDrawings[index].drawingBinary.toString('base64')
    const cleanBase64 = `data:image/png;base64,${base64}`

    if (gameDrawings[index]) {
      return {
        prompt: prompt.prompt,
        drawing: cleanBase64,
        round: index + 1,
      }
    } else {
      return { prompt: 'NA', drawing: 0, round: index + 1 }
    }
  })
  return promptsAndDrawings as gameRound[]
}

export async function newGame(rounds: number, db = connection) {
  const idOfNewGame = await db('game').insert(
    { round: 1, number_of_rounds: rounds, status: 'prompt' },
    'id'
  )

  return idOfNewGame
}

export async function getGameStatus(gameId: number, db = connection) {
  const status = await db('game')
    .where('id', gameId)
    .first()
    .select('round', 'status')
  return status
}

export async function setGameStatus(
  gameId: number,
  status: string,
  db = connection
) {
  const currentRound = (await db('game')
    .where('id', gameId)
    .select('round')) as { round: number }[]

  const response = await db('game')
    .where('id', gameId)
    .update({ status, round: currentRound[0].round + 1 })
  return response
}
