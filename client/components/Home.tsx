import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGameStatus, getNewGameId } from '../apis/game'
import Modal from './Modal'

export default function Home() {
  const navigate = useNavigate()
  const [gameId, setGameId] = useState(0)

  const [newGameShowModal, setNewGameShowModal] = useState(false)
  const [continueGameShowModal, setContinueGameShowModal] = useState(false)
  const [checkGameShowModal, setCheckGameShowModal] = useState(false)

  const [showError, setShowError] = useState(false)
  const [error, setError] = useState(<></>)

  const newGameModalContent = (
    <div className="flex flex-col items-center justify-center dark:bg-slate-800 dark:text-gray-400">
      <div className="md:text-2xl text-lg dark ">
        {`This is an online game based on the pen and paper game Telephone Pictionary. You'll be asked
        to give a prompt. It can be anything from a phrase or a movie title to a friends name. Once submitted, you'll get a link to share with your
        friends. The first person will draw something based on your prompt, and
        the next person will have to guess what the prompt was based only on
        that drawing. This goes on with more people drawing and guessing and
        sharing, and the drawings getting more and more purple monkey
        dishwasher. When a few people have gone, you can go to the Check Game
        section and see all the drawings and how they changed from the original
        prompt. Have fun!`}
      </div>{' '}
      <br />
      <button
        className="p-6 rounded-xl hover:bg-orange-600 bg-orange-500  text-orange-900 font-extrabold text-xl drop-shadow-lg"
        onClick={newGameHandler}
      >
        I got it
      </button>
    </div>
  )

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
          className="relative rounded-3xl text-lg bg-orange-500 text-orange-900 "
          type="submit"
          onSubmit={handleSubmitContinue}
        >
          GO
          {showError && (
            <div className="absolute text-sm bg-black-50 top-0 md:left-full ml-2 px-2 py-1 rounded">
              {error}
            </div>
          )}
        </button>
      </form>
    </div>
  )

  const checkGameModalContent = (
    <div>
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
          className=" relative rounded-3xl text-lg bg-lime-500  text-lime-900"
        >
          GO
          {showError && (
            <div className="md:w-40  absolute text-sm bg-black-50 top-0 md:left-full ml-2 px-2 py-1 rounded">
              {error}
            </div>
          )}
        </button>
      </form>
    </div>
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
                  className="md:p-4 p-1 border-2 w-11/12"
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
        onClick={() => setNewGameShowModal(() => true)}
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
        content={newGameModalContent}
        isOpen={newGameShowModal}
        setIsOpen={setNewGameShowModal}
      />
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
