interface Props {
  gameId: string | number
}
export default function TurnFinished(props: Props) {
  const { gameId } = props
  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="flex items-center justify-center   text-teal-500 text-3xl font-extrabold">
        Your Game ID is {gameId}, please give this to whoever you are playing
        with
      </h2>
      <br />
      <div className="p-6 rounded-3xl hover:bg-lime-600 bg-lime-500  text-lime-900 font-extrabold text-xl drop-shadow-lg">
        <a href="/">Go Home</a>
      </div>
    </div>
  )
}
