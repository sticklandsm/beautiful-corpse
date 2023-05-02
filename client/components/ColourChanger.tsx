import { useAppDispatch } from '../hooks'
import { changeColour } from '../slices/canvasSettings'

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
    <button
      onClick={changeColourClickHandler}
      style={{ backgroundColor: colourToChangeTo }}
    >
      {colourToChangeTo}
    </button>
  )
}
