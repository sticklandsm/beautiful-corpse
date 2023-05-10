import request from 'superagent'

const rootUrl = '/api/v1/game/'

//This creates a new game in the DB as wel. It's not a GET.
export async function getNewGameId(rounds: number) {
  const newGameId = await request.post(rootUrl + 'newgame').send({ rounds })

  return newGameId.body.id
}

export async function getGameStatus(gameId: number) {
  const gameStatus = await request.get(rootUrl + 'gamestatus/' + gameId)
  return gameStatus.body
}

export async function nextRound(gameId: number, status: string) {
  const response = await request
    .patch(rootUrl + 'gamestatus/' + gameId)
    .send({ status })
  return response
}

export async function getWholeGameById(gameId: number) {
  const response = await request.get(rootUrl + gameId)

  return response.body
}
