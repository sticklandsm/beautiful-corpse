import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addPrompt } from '../apis/prompts'
import { nextRound } from '../apis/game'
import { getLastDrawingByGameId } from '../apis/drawings'
import ShowImage from './ShowImage'
import TurnFinished from './TurnFinished'

export default function EnterPrompt() {
  const { gameId, roundId } = useParams()
  const [drawingTag, setDrawingTag] = useState('')

  const [promptState, setPromptState] = useState('')
  const [promptSubmitted, changePromptSubmitted] = useState(false)

  useEffect(() => {
    if (roundId === '1') return
    getLastDrawingByGameId(Number(gameId))
      .then((fetchedDrawingTag) => {
        setDrawingTag(() => fetchedDrawingTag)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [gameId])

  function changeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setPromptState(() => evt.target.value)
  }
  async function handleSubmit(
    evt: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) {
    evt.preventDefault()
    const promptToAdd = { prompt: promptState, gameId: Number(gameId) }

    await addPrompt(promptToAdd)
    await nextRound(Number(gameId), 'drawing')
    changePromptSubmitted(() => true)
  }

  return (
    <>
      {roundId !== '1' && <ShowImage drawingTag={drawingTag} />}
      {!promptSubmitted && (
        <>
          <h2>Enter prompt</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="gameId">Enter Prompt</label>
            <input
              type="text"
              name="prompt"
              onChange={changeHandler}
              placeholder="Enter Prompt"
            />
            <button type="submit" onSubmit={handleSubmit}>
              GO
            </button>
          </form>
        </>
      )}
      {promptSubmitted && (
        <>
          <TurnFinished gameId={gameId as string} />{' '}
        </>
      )}
    </>
  )
}
