import { useEffect, useState } from 'react'
import Canvas from './canvasElements/Canvas'
import ColourChanger from './canvasElements/ColourChanger'
import { useParams } from 'react-router-dom'
import TurnFinished from './TurnFinished'
import { getLastPromptbyGameId } from '../apis/prompts'

export default function EnterDrawing() {
  const [lastPrompt, setLastPrompt] = useState('')
  const { gameId } = useParams()
  const [drawingSubmitted, setDrawingSubmitted] = useState(false)

  useEffect(() => {
    const fetchPrompt = async () =>
      setLastPrompt((await getLastPromptbyGameId(Number(gameId))) || '')
    fetchPrompt()
  }, [gameId])

  return (
    <div className="h-max">
      {!drawingSubmitted && (
        <>
          <div>
            <p className="flex items-center justify-center   text-orange-700 text-3xl font-extrabold">
              Your prompt is...
            </p>
            <br />
            <p className="flex items-center justify-center  m-auto  text-teal-500 text-3xl font-extrabold">
              {lastPrompt}
            </p>
          </div>
          <div>
            <Canvas
              drawingSubmitted={drawingSubmitted}
              setDrawingSubmitted={setDrawingSubmitted}
              gameId={Number(gameId)}
            />
          </div>
        </>
      )}
      {drawingSubmitted && (
        <>
          <TurnFinished gameId={gameId as string} />{' '}
        </>
      )}
    </div>
  )
}
