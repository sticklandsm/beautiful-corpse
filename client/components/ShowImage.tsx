import { useEffect, useState } from 'react'

interface Props {
  drawingTag: string
}

export default function ShowImage(props: Props) {
  const { drawingTag } = props
  return <>{<img src={drawingTag} alt="retrieved" />}</>
}
