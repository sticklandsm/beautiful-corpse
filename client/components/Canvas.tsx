import { useState } from 'react'
import { addDrawing, getDrawingById } from '../apis/drawings'
import { useAppDispatch } from '../hooks'
import useCanvas from '../hooks/canvasHook'
import { resetCanvas } from '../slices/canvasSettings'

export default function Canvas() {
  const dispatch = useAppDispatch()
  const canvasRef = useCanvas(1)
  const [drawingId, setDrawingId] = useState('0')

  function changeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setDrawingId(() => evt.target.value)
  }

  const resetCanvasHandler = () => {
    dispatch(resetCanvas(true))
  }

  const toBlobHandler = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.toBlob((blob) => {
      blob && addDrawing({ drawingBinary: blob as Blob, gameId: 1 })
    })
  }
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    getDrawingById(Number(drawingId))
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="drawingID">Enter drawing ID</label>
        <input
          type="text"
          name="drawingId"
          onChange={changeHandler}
          value={drawingId}
        />
      </form>
      <button className="w-20" onClick={resetCanvasHandler}>
        RESET
      </button>
      <button className="w-20" onClick={toBlobHandler}>
        TOBLOB
      </button>

      <canvas id="canvas" ref={canvasRef} />
    </>
  )
}
