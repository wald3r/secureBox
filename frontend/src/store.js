import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'
import filesReducer from './reducers/filesReducer'

const reducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  notification: notificationReducer,
  files: filesReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store