import { useRef, useState } from 'react'
import { RiFileCopy2Line, RiFileCopy2Fill } from 'react-icons/ri'

interface Props {
  gameId: string | number
  roundId: string | number
  nextTurn: string
}
export default function TurnFinished(props: Props) {
  const { gameId, roundId, nextTurn } = props
  const [isCopied, setIsCopied] = useState(false)
  const directoryName = window.location.origin // get the last part of the URL
  // const directoryName = ''
  const pageUrl = `${directoryName}/game/${gameId}/round/${roundId}/${nextTurn}` // construct the URL for the "my-page" page
  const inputRef = useRef(null) // create a ref to the input element

  async function handleCopyClick() {
    try {
      await navigator.clipboard.writeText(pageUrl)
      console.log('Content copied to clipboard')
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center text-center text-teal-500 text-3xl font-extrabold">
        <h2 className="mb-8">
          Your Game ID is{' '}
          <span className="text-4xl text-teal-700">{gameId}</span>, please give
          this to whoever you are playing with.
        </h2>
        <h2 className=" text-orange-500 mb-8">Or send them this link:</h2>
      </div>

      <div className="flex items-center justify-center">
        <input
          className="border-2 border-black-900"
          type="text"
          value={pageUrl}
          readOnly
          ref={inputRef}
        />
        <button className="relative" onClick={handleCopyClick}>
          {isCopied ? (
            <RiFileCopy2Fill size={30} />
          ) : (
            <RiFileCopy2Line size={30} />
          )}
          {isCopied && (
            <div className="absolute text-xs bg-black-50 top-0 left-full ml-2 px-2 py-1 rounded">
              Link Copied
            </div>
          )}
        </button>
      </div>

      <br />
      <div className="p-6 rounded-3xl hover:bg-lime-600 bg-lime-500  text-lime-900 font-extrabold text-xl drop-shadow-lg">
        <a href="/">Go Home</a>
      </div>
    </div>
  )
}
