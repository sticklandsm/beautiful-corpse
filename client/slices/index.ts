import { combineReducers } from '@reduxjs/toolkit'

import fruits from './fruits'
import canvasSettings from './canvasSettings'

export default combineReducers({
  fruits,
  canvasSettings,
})
