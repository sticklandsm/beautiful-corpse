import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGameStatus, getNewGameId } from '../apis/game'
import Modal from './Modal'

export default function Home() {
  const navigate = useNavigate()
  const [gameId, setGameId] = useState(0)
  const [continueGameShowModal, setContinueGameShowModal] = useState(false)
  const [checkGameShowModal, setCheckGameShowModal] = useState(false)

  const continueGameModalContent = (
    <div className="">
      <form onSubmit={handleSubmitContinue}>
        <input
          type="text"
          name="gameId"
          onChange={changeHandler}
          placeholder="Enter Game ID"
        />
        <button
          className="rounded-3xl text-lg bg-orange-500 text-orange-900 "
          type="submit"
          onSubmit={handleSubmitContinue}
        >
          GO
        </button>
      </form>
    </div>
  )

  const checkGameModalContent = (
    <form onSubmit={handleSubmitCheckGame}>
      <input
        type="text"
        name="gameId"
        onChange={changeHandler}
        placeholder="Enter Game ID"
      />
      <button
        type="submit"
        onSubmit={handleSubmitCheckGame}
        className="rounded-3xl text-lg bg-lime-500  text-lime-900"
      >
        GO
      </button>
    </form>
  )

  function changeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setGameId(() => +evt.target.value)
  }

  function handleSubmitContinue(
    evt: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) {
    evt.preventDefault()
    if (gameId === 0) return
    getGameStatus(gameId)
      .then((status) => {
        navigate(`/game/${gameId}/round/${status.round}/${status.status}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleSubmitCheckGame(
    evt: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) {
    evt.preventDefault
    if (gameId === 0) return
    navigate('/showResults/' + gameId)
  }
  function newGameHandler() {
    getNewGameId(3)
      .then((newGameId) => {
        navigate('/game/' + newGameId + '/round/1/prompt')
      })
      .catch((error) => {
        console.error('error in newGameHandler: ', error)
      })
  }

  // backdrop-blur-3xl
  return (
    <div className={`flex flex-col`}>
      <button
        className=" p-14 rounded-3xl hover:bg-teal-600  bg-teal-500 text-teal-900 font-extrabold text-7xl drop-shadow-lg"
        onClick={newGameHandler}
      >
        {' '}
        New Game...
      </button>
      <button
        className=" p-14 rounded-3xl hover:bg-orange-600 bg-orange-500  text-orange-900 font-extrabold text-7xl drop-shadow-lg"
        onClick={() => setContinueGameShowModal(() => true)}
      >
        {' '}
        Continue Game...
      </button>
      <button
        className=" p-14 rounded-3xl hover:bg-lime-600 bg-lime-500  text-lime-900 font-extrabold text-7xl drop-shadow-lg"
        onClick={() => setCheckGameShowModal(() => true)}
      >
        {' '}
        Check Completed Game...
      </button>

      <Modal
        content={continueGameModalContent}
        isOpen={continueGameShowModal}
        setIsOpen={setContinueGameShowModal}
      />
      <Modal
        content={checkGameModalContent}
        isOpen={checkGameShowModal}
        setIsOpen={setCheckGameShowModal}
      />
    </div>
  )
}
