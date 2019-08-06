
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import reducer from './reducers';
import App from './views/App.jsx'
// const middleware = [thunk]; // redux-thunk解决异步回调
// const store = createStore(reducer,
//   applyMiddleware(...middleware) // 中间件
// );
// var rootReducer = combineReducers({
//   user,
//   project
// })

const finalCreateStore = compose(applyMiddleware(thunk))(createStore)
const store = finalCreateStore(reducer, {})

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('content')
);
