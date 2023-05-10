import { useEffect, useState } from 'react'

interface Props {
  drawingTag: string
}

export default function ShowImage(props: Props) {
  const { drawingTag } = props
  return (
    <div className="w-full md:w-2/6 h-auto relative m-auto dark:bg-black-300">
      <div className="flex items-center justify-center h-full border-[20px] border-lime-500 text-lime-900 text-3xl font-extrabold">
        {<img src={drawingTag} alt="retrieved" />}
      </div>
    </div>
  )
}
