import React from 'react'
import { render } from 'react-dom'
import App from './container/app'
import registerServiceWorker from './registerServiceWorker'


render(
    <App />, 
    document.querySelector('#root')
)

registerServiceWorker()