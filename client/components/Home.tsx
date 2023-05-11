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
  const [error, setError] = useState(<></>)
  const [roundNumber, setRoundNumber] = useState(0)

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
        </button>
        {showError && (
          <div className="absolute text-sm bg-black-50 top-0 md:left-full ml-2 px-2 py-1 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  )

  const checkGameModalContent = (
    <form className="flex" onSubmit={handleSubmitCheckGame}>
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
      </button>
      {showError && (
        <div className="md:w-36 absolute text-sm bg-black-50 top-0 md:left-full ml-2 px-2 py-1 rounded">
          {error}
        </div>
      )}
    </form>
  )

  function clearErrors() {
    setShowError(false)
    setError(<></>)
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
      setError(<p>You have to type a number</p>)
      setShowError(true)
      return
    }
    getGameStatus(gameId)
      .then((status) => {
        if (!status.success) {
          setError(<p>{status.response}</p>)
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
      setError(<p>You have to type a number</p>)
      setShowError(true)
      return
    }
    getGameStatus(gameId)
      .then((status) => {
        if (!status.success) {
          setError(<p>{status.response}</p>)
          setShowError(true)
          return
        }
        setRoundNumber(status.response.round)
        if (status.response.round < 5) {
          setError(
            <>
              <p className="text-center">
                {' '}
                That game has only had {Number(status.response.round - 1)}{' '}
                rounds. <br />
                Are you sure you want to check it now?{' '}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/showResults/' + gameId)}
                  className="p-4 border-2 w-1/2"
                >
                  Yes
                </button>
              </div>
            </>
          )
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
        className=" md:p-14 p-8 rounded-3xl hover:bg-teal-600  bg-teal-500 text-teal-900 font-extrabold md:text-7xl text-5xl drop-shadow-lg"
        onClick={newGameHandler}
      >
        {' '}
        New Game...
      </button>
      <button
        className=" md:p-14 p-8 rounded-3xl hover:bg-orange-600 bg-orange-500  text-orange-900 font-extrabold md:text-7xl text-5xl drop-shadow-lg"
        onClick={() => setContinueGameShowModal(() => true)}
      >
        {' '}
        Continue Game...
      </button>
      <button
        className=" md:p-14 p-8  rounded-3xl hover:bg-lime-600 bg-lime-500  text-lime-900 font-extrabold  md:text-7xl text-5xl drop-shadow-lg"
        onClick={() => setCheckGameShowModal(() => true)}
      >
        {' '}
        Check Game...
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
