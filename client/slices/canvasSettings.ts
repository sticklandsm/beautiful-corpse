import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type CanvasSettings = {
  lineColour: string
  resetCanvasTrueOrFalse: boolean
}

const initialState: CanvasSettings = {
  lineColour: 'cyan',
  resetCanvasTrueOrFalse: false,
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
  },
})
export const { changeColour, resetCanvas } = canvasSettingsSlice.actions
export default canvasSettingsSlice.reducer
