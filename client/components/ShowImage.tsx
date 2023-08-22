import { useEffect, useState } from 'react'

interface Props {
  drawingTag: string
}

export default function ShowImage(props: Props) {
  const { drawingTag } = props

  const drawing = new Image()

  drawing.src = drawingTag

  return (
    <div className=" h-auto relative m-auto ">
      <div className="flex items-center justify-center h-full border-[20px] border-lime-500 text-lime-900 text-3xl font-extrabold  bg-slate-200">
        {<img src={drawingTag} alt="retrieved" />}
      </div>
    </div>
  )
}
