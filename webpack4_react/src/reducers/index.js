import { combineReducers } from 'redux'
import {reducer as globalReducer} from './globalReducer'
import {reducer as userReducer} from './userReducer'
import {reducer as projectReducer} from './projectReducer'



export default combineReducers({
  global: globalReducer,
  user: userReducer,
  project: projectReducer
})
