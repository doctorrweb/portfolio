import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import jwt from 'jsonwebtoken'
import { HashRouter } from 'react-router-dom'
import App from './container/app'
import setAuthorizationToken from './helper/authToken'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducer'
import { setAuthentication, setCurrentUser } from './action/index'
import reduxImmutableStateVariant from 'redux-immutable-state-invariant'

const middleware =
  process.env.NODE_ENV !== 'production'
      ? [thunk, reduxImmutableStateVariant()]
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
    <HashRouter hashType='noslash'>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
    document.querySelector('#root')
)

registerServiceWorker()