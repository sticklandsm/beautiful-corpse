import { useAppDispatch } from '../../hooks'
import { changeColour } from '../../slices/canvasSettings'

interface Props {
  colourToChangeTo: string
}

export default function ColourChanger(props: Props) {
  const { colourToChangeTo } = props

  const dispatch = useAppDispatch()

  function changeColourClickHandler(evt: React.MouseEvent<HTMLButtonElement>) {
    evt.preventDefault
    dispatch(changeColour(colourToChangeTo))
  }

  return (
    <div className="">
      <button
        className="rounded-full md:w-14 md:h-14 w-16 h-16"
        onClick={changeColourClickHandler}
        style={{ backgroundColor: colourToChangeTo }}
      ></button>
    </div>
  )
}
