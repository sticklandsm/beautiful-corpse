import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { changeBrushWidth } from '../../slices/canvasSettings'

interface Props {}
export default function BrushChanger(props: Props) {
  const lineColour = useAppSelector((state) => state.canvasSettings.lineColour)
  const currentBrush = useAppSelector(
    (state) => state.canvasSettings.brushWidth
  )
  // const [currentBrush, setCurrentBrush] = useState(5)
  const dispatch = useAppDispatch()

  function changeBrushClickHandler(
    evt: React.MouseEvent<HTMLButtonElement>,
    increaseOrDecrease: number
  ) {
    evt.preventDefault()
    dispatch(changeBrushWidth(currentBrush + increaseOrDecrease))
  }

  return (
    <>
      <div>
        <div className="flex md:flex-col flex-row-reverse  justify-center items-center  rounded-2xl md:w-28 md:h-[28rem] w-screen bg-black-900">
          <button
            onClick={(evt) =>
              currentBrush < 135 && changeBrushClickHandler(evt, 10)
            }
            className="md:pb-0 pb-3 md:h-1/3 md:w-auto w-1/3 text-9xl text-gray-400"
          >
            +
          </button>

          <div className="md:h-1/3 md:w-auto w-1/3 flex justify-center items-center">
            <div
              className="flex justify-center items-center rounded-full"
              style={{
                height: 5 + currentBrush + 'px',
                width: 5 + currentBrush + 'px',
                backgroundColor:
                  lineColour === 'black' ? 'white' : 'transparent',
              }}
            >
              <div
                className="rounded-full"
                style={{
                  backgroundColor: lineColour,
                  height: currentBrush + 'px',
                  width: currentBrush + 'px',
                }}
              ></div>
            </div>
          </div>
          <button
            onClick={(evt) =>
              currentBrush !== 10 && changeBrushClickHandler(evt, -10)
            }
            className="md:pb-0 pb-3 md:h-1/3 md:w-auto w-1/3 text-9xl text-gray-400"
          >
            -
          </button>
        </div>
      </div>
    </>
  )
}
