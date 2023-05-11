import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGameStatus, getNewGameId } from '../apis/game'
import Modal from './Modal'

export default function Home() {
  const navigate = useNavigate()
  const [gameId, setGameId] = useState(0)
  const [continueGameShowModal, setContinueGameShowModal] = useState(false)
  const [checkGameShowModal, setCheckGameShowModal] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')

  const continueGameModalContent = (
    <div className="">
      <form onSubmit={handleSubmitContinue}>
        <input
          type="text"
          name="gameId"
          onChange={changeHandler}
          value={gameId ? gameId : ''}
          placeholder="Enter Game ID"
        />
        <button
          className="rounded-3xl text-lg bg-orange-500 text-orange-900 "
          type="submit"
          onSubmit={handleSubmitContinue}
        >
          GO
          {showError && (
            <div className="absolute text-xs bg-black-50 top-0 left-full ml-2 px-2 py-1 rounded">
              {error}
            </div>
          )}
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
        value={gameId ? gameId : ''}
        placeholder="Enter Game ID"
      />
      <button
        type="submit"
        onSubmit={handleSubmitCheckGame}
        className="rounded-3xl text-lg bg-lime-500  text-lime-900"
      >
        GO
        {showError && (
          <div className="absolute text-xs bg-black-50 top-0 left-full ml-2 px-2 py-1 rounded">
            {error}
          </div>
        )}
      </button>
    </form>
  )

  function clearErrors() {
    setShowError(false)
    setError('')
    setGameId(0)
  }

  function changeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setGameId(() => +evt.target.value)
  }

  function handleSubmitContinue(
    evt: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) {
    evt.preventDefault()
    if (!Number(gameId)) {
      setError('You have type a number')
      setShowError(true)
      return
    }
    getGameStatus(gameId)
      .then((status) => {
        if (!status.success) {
          setError(status.response)
          setShowError(true)
          return
        }
        setShowError(false)
        navigate(
          `/game/${gameId}/round/${status.response.round}/${status.response.status}`
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function handleSubmitCheckGame(
    evt: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) {
    evt.preventDefault()
    if (!Number(gameId)) {
      setError('You have type a number')
      setShowError(true)
      return
    }
    getGameStatus(gameId)
      .then((status) => {
        if (!status.success) {
          setError(status.response)
          setShowError(true)
          return
        }
        setShowError(false)
        navigate('/showResults/' + gameId)
      })
      .catch((error) => {
        console.error(error)
      })
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
        onClose={clearErrors}
      />
      <Modal
        content={checkGameModalContent}
        isOpen={checkGameShowModal}
        setIsOpen={setCheckGameShowModal}
        onClose={clearErrors}
      />
    </div>
  )
}
