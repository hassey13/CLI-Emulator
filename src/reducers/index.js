import { combineReducers } from 'redux'

import outputsReducer from './outputsReducer'
import directoryReducer from './directoryReducer'

const rootReducer = combineReducers({
  outputs: outputsReducer,
  directory: directoryReducer
})

export default rootReducer
