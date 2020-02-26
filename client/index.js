import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import jwt from 'jsonwebtoken'
import { BrowserRouter } from 'react-router-dom'
import App from './container/app'
import setAuthorizationToken from './helper/authToken'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducer'
import { setAuthentication, setCurrentUser } from './action/index'
//import 'antd/dist/antd.css'

const middleware =
  process.env.NODE_ENV !== 'production'
      ? [thunk]
      : [thunk]
const creatStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

const store = creatStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const token = localStorage.getItem('token')
if (token) {
    setAuthorizationToken(token)
    store.dispatch(setAuthentication(true))
    store.dispatch(setCurrentUser(jwt.decode(token)))
}

setAuthorizationToken(token)

render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.querySelector('#root')
)

registerServiceWorker()