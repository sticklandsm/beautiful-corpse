import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type CanvasSettings = {
  lineColour: string
  resetCanvasTrueOrFalse: boolean
  brushWidth: number
}

const initialState: CanvasSettings = {
  lineColour: 'black',
  resetCanvasTrueOrFalse: true,
  brushWidth: 5,
}

const canvasSettingsSlice = createSlice({
  name: 'canvasSettings',
  initialState,
  reducers: {
    changeColour: (state, action: PayloadAction<string>) => {
      const newColour = action.payload
      const newCanvasSettings = { ...state, lineColour: newColour }

      return newCanvasSettings
    },
    resetCanvas: (state, action: PayloadAction<boolean>) => {
      const newCanvasSettings = {
        ...state,
        resetCanvasTrueOrFalse: action.payload,
      }

      return newCanvasSettings
    },
    changeBrushWidth: (state, action: PayloadAction<number>) => {
      const newBrushWidth = action.payload
      const newCanvasSettings = { ...state, brushWidth: newBrushWidth }
      return newCanvasSettings
    },
  },
})
export const { changeColour, resetCanvas, changeBrushWidth } =
  canvasSettingsSlice.actions
export default canvasSettingsSlice.reducer
