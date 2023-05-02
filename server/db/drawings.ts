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

export async function getDrawingsAndPromptsForGameId(
  gameId: number,
  db = connection
) {
  const gameDrawings = (await db('drawings')
    .where('game_id', gameId)
    .select(
      'id',
      'drawing as drawingBinary',
      'game_id as gameId'
    )) as DrawingBinary[]
  const gamePrompts = (await db('prompts')
    .where('game_id', gameId)
    .select('id', 'prompt', 'game_id as gameId')) as Prompt[]

  const promptsAndDrawings = gamePrompts.map((prompt, index) => {
    if (gameDrawings[index]) {
      return {
        prompt: prompt.prompt,
        drawing: gameDrawings[index].drawingBinary,
        round: index + 1,
      }
    } else {
      return { prompt: 'NA', drawing: 0, round: index + 1 }
    }
  })
  return promptsAndDrawings as gameRound[]
}
