import request from 'superagent'
import { PromptDB } from '../../models/Prompts'
const rootUrl = '/api/v1/game/'

export async function addPrompt(promptToAdd: PromptDB) {
  try {
    await request.post(rootUrl + 'prompt').send(promptToAdd)
  } catch (error) {
    console.error('Error in API: ', error)
  }
}

export async function getLastPromptbyGameId(gameId: number) {
  try {
    const response = await request.get(rootUrl + 'prompt/' + gameId)

    return response.body as string
  } catch (error) {
    console.error('Error in API: ', error)
  }
}
