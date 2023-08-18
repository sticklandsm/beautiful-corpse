interface Props {
  showInstructionsAgain: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Footer(props: Props) {
  return (
    <>
      <div className="absolute bottom-0 text-center w-full dark:bg-slate-800 dark:text-gray-400">
        <button
          className="md:p-3 p-3 rounded-3xl hover:bg-teal-600  bg-teal-500 text-teal-900 font-extrabold md:text-xl text-xl drop-shadow-lg "
          onClick={() => props.showInstructionsAgain(() => true)}
        >
          {' '}
          Show Instructions Again
        </button>
        <h2>&copy; SandCastle Ink 2023</h2>
      </div>
    </>
  )
}
