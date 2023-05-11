import { addDrawing } from '../../apis/drawings'
import { useAppDispatch } from '../../hooks'
import useCanvas from '../../hooks/canvasHook'
import { resetCanvas } from '../../slices/canvasSettings'
import { nextRound } from '../../apis/game'
import ColourChanger from './ColourChanger'
import { useState, useEffect } from 'react'
import Modal from '../Modal'

interface Props {
  drawingSubmitted: boolean
  setDrawingSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  gameId: number
}

export default function Canvas(props: Props) {
  const dispatch = useAppDispatch()
  const [showAreYouSureReset, setShowAreYouSureReset] = useState(false)
  const [showAreYouSureSubmit, setShowAreYouSureSubmit] = useState(false)
  const canvasRef = useCanvas(0.5)

  const coloursList = [
    'blue',
    'red',
    'green',
    'orange',
    'yellow',
    'purple',
    'pink',
    'teal',
    'brown',
    'grey',
    'black',
    'white',
  ]
  const colourlistTwo = [
    'aqua',
    'coral',
    'crimson',
    'fuchsia',
    'indigo',
    'lime',
    'maroon',
    'navy',
    'olive',
    'silver',
    'tan',
    'violet',
  ]

  const colourListThree = [
    'white',
    'black',
    'burnt sienna',
    'yellow ochre',
    'cadmium yellow',
    'lemon yellow',
    'sap green',
    'viridian',
    'ultramarine blue',
    'phthalo blue',
    'alizarin crimson',
    'cadmium red',
  ]

  const colourListFour = [
    'titanium white',
    'ivory black',
    'burnt umber',
    'raw umber',
    'raw sienna',
    'cadmium orange',
    'cerulean blue',
    'cobalt blue',
    'manganese blue',
    'permanent rose',
    'permanent yellow',
    'vermilion',
  ]

  const resetCanvasHandler = () => {
    dispatch(resetCanvas(true))
    setShowAreYouSureReset(false)
  }
  const areYouSureReset = (
    <div className="flex flex-col items-center justify-center ">
      <div className="md:text-3xl text-2xl">
        Are you sure you want to clear the canvas?
      </div>{' '}
      <br />
      <button
        className="p-6 rounded-3xl hover:bg-orange-600 bg-orange-500  text-orange-900 font-extrabold text-xl drop-shadow-lg"
        onClick={resetCanvasHandler}
      >
        Yes I messed up
      </button>
    </div>
  )

  const submitDrawing = async () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.toBlob((blob) => {
      blob && addDrawing(blob as Blob, Number(props.gameId))
    })
    await nextRound(Number(props.gameId), 'prompt')
    props.setDrawingSubmitted(() => true)
  }

  const areYouSureSubmit = (
    <div className="flex flex-col items-center justify-center ">
      <div className="md:text-3xl text-2xl">
        Are you sure you want to Submit?
      </div>{' '}
      <br />
      <button
        className="p-6 rounded-3xl hover:bg-lime-600 bg-lime-500  text-lime-900 font-extrabold text-xl drop-shadow-lg"
        onClick={submitDrawing}
      >
        Yes, I am an Artist
      </button>
    </div>
  )

  return (
    <>
      <div className="flex items-center justify-center ">
        <button
          className="m-3 md:p-9 p-5 rounded-3xl hover:bg-orange-600 bg-orange-500  text-orange-900 font-extrabold md:text-4xl text-xl drop-shadow-lg"
          onClick={() => setShowAreYouSureReset(true)}
        >
          RESET
        </button>
        <Modal
          isOpen={showAreYouSureReset}
          setIsOpen={setShowAreYouSureReset}
          content={areYouSureReset}
        />
        <button
          className="m-3 md:p-9 p-5 rounded-3xl  hover:bg-lime-600 bg-lime-500  text-lime-900  font-extrabold md:text-4xl text-xl drop-shadow-lg"
          onClick={() => setShowAreYouSureSubmit(true)}
        >
          SUBMIT
        </button>
        <Modal
          isOpen={showAreYouSureSubmit}
          setIsOpen={setShowAreYouSureSubmit}
          content={areYouSureSubmit}
        />
      </div>
      <div className="flex items-center justify-center dark:bg-slate-800">
        <div className="flex flex-wrap justify-center items-center ">
          <div className="grid md:grid-cols-2 grid-cols-4 gap-1 bg-black-500 md:py-9 md:px-0 px-10  rounded-full">
            {coloursList.map((colour) => {
              return <ColourChanger key={colour} colourToChangeTo={colour} />
            })}
          </div>

          <div>
            <canvas
              className="md:border-[20px] border-[10px] border-lime-500 text-lime-900 text-3xl  bg-white"
              id="canvas"
              ref={canvasRef}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-4 gap-1 bg-black-500 md:py-9 md:px-0 px-10  rounded-full">
            {colourlistTwo.map((colour) => {
              return <ColourChanger key={colour} colourToChangeTo={colour} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}
