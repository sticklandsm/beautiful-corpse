/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
  content: JSX.Element
}

export default function Modal(props: Props) {
  const { isOpen, content, setIsOpen, onClose } = props

  return (
    <>
      <div
        className={` cursor-default fixed inset-0 ${
          isOpen ? 'flex' : 'hidden'
        } justify-center items-center z-50`}
        style={{ backdropFilter: 'blur(5px)' }}
        onClick={() => {
          if (onClose) onClose()
          setIsOpen(false)
        }}
      >
        <div
          onClick={(evt) => evt.stopPropagation()}
          className="text-gray-400  cursor-default bg-slate-800   p-6 rounded-lg shadow-lg"
        >
          {content}
        </div>
      </div>
    </>
  )
}
