import { useState } from 'react'
import { SocialIcon } from 'react-social-icons'

interface Props {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  darkMode: boolean
}

export default function Header(props: Props) {
  const [sandcastleKicked, kickSandcastle] = useState(false)
  const { darkMode, setDarkMode } = props

  const darkModeClickHandler = () => {
    localStorage.setItem('darkMode', String(!darkMode))
    setDarkMode(() => !darkMode)
  }

  return (
    <>
      <nav className="top-0 rounded-md">
        <div className="flex-col sm:flex-row max-w-screen-full flex items-center justify-center mx-auto p-4  ">
          <div className="flex items-center">
            <button
              onClick={() => {
                kickSandcastle(() => !sandcastleKicked)
              }}
              style={{ width: '6rem', height: '6rem' }}
            >
              <img
                src={
                  sandcastleKicked
                    ? '/images/sandcastleKicked.png'
                    : '/images/sandcastle.png'
                }
                alt="sandcastle"
              />
            </button>
            <span className="ml-2"></span>
          </div>
          <div className="flex-col sm:flex-row font-medium flex-1 flex justify-center">
            <a
              className="px-10 py-3 text-xl hover:text-white hover:bg-gray-700 rounded"
              href="/"
            >
              <img
                className="object-scale-down h-20"
                src="/images/pictophoneLogo.png"
                alt="pictophone Logo"
              />
            </a>
          </div>
          <button value="" onClick={darkModeClickHandler}>
            <img
              className="w-24"
              src={
                darkMode
                  ? '/images/dark-mode-toggle-icon.svg'
                  : '/images/light-mode-toggle-icon.svg'
              }
              alt="darkmode toggle"
            />
          </button>

          <div className="items-center ml-auto">
            <SocialIcon url="https://www.linkedin.com/in/sean-stickland-aa26461ab/" />
            <SocialIcon
              className="bg-white rounded-full"
              url="https://github.com/sticklandsm"
            />{' '}
          </div>
        </div>
      </nav>
    </>
  )
}
