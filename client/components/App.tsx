import Header from './Header'
import Footer from './Footer'
import ClientRoutes from '../clientRoutes/ClientRoutes'
import { useEffect, useState } from 'react'
import Modal from './Modal'

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode') || 'true')
  )
  const [howToPlayShowModal, sethowToPlayShowModal] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('showHowToPlay')) {
      sethowToPlayShowModal(false)
    }
  }, [])

  const howToPlayModalContent = (
    <div className="flex flex-col items-center justify-center dark:bg-slate-800 dark:text-gray-400 text-center max-w-3xl">
      <div className="md:text-2xl text-lg dark ">
        <p>
          {`This is an online game based on the pen and paper game Telephone Pictionary. You'll be asked to either draw something specific, or describe a picture of something. Once submitted you'll be given a link to share your interpretation.
         At the very start of the game someone will give a random prompt. It can be anything from a phrase or a movie title to an inside joke or friends name. Once submitted, you'll get a link to share with your friends. The first person will draw something based on that prompt then be given another link to share. The next person will have to guess what the prompt was based only on
        that drawing. This goes on with more people drawing and guessing and
        sharing, the drawings getting more and more purple monkey
        dishwasher. When a few people have gone, you can go to the Check Game
        section and see all the drawings and how they changed from the original
        prompt.`}
        </p>
        <br />
        <p>{`Have fun!`}</p>
      </div>{' '}
      <br />
      <button
        className="p-6 rounded-xl hover:bg-orange-600 bg-orange-500  text-orange-900 font-extrabold text-xl drop-shadow-lg"
        onClick={() => {
          sethowToPlayShowModal(false)
          localStorage.setItem('showHowToPlay', 'true')
        }}
      >
        I got it
      </button>
    </div>
  )

  return (
    <>
      <div className={darkMode ? 'dark ' : ''}>
        <div className="app h-screen dark:bg-slate-800 dark:text-gray-400">
          <Header setDarkMode={setDarkMode} darkMode={darkMode} />
          <ClientRoutes />
        </div>
        <Footer showInstructionsAgain={sethowToPlayShowModal} />
      </div>
      <Modal
        content={howToPlayModalContent}
        isOpen={howToPlayShowModal}
        setIsOpen={sethowToPlayShowModal}
      />
    </>
  )
}

export default App
