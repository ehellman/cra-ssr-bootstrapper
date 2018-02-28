import React from 'react'
import ReactDOM from 'react-dom'
import './global.css'
import Loadable from 'react-loadable'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import Styletron from 'styletron-client'
import { StyletronProvider } from 'styletron-react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store'

const store = configureStore(window.__PRELOADED_STATE__ || {})

// get stylesheets from server render
const styleElements = document.getElementsByClassName('_styletron_hydrate_')

// if there are no elements, no styles came from server
// so Styletron should be initialized empty
const styletronInstance = styleElements.length > 0 ?
  new Styletron(styleElements) :
  new Styletron()

// if application is client only, pass ReactDOM.render
// if server render is enabled, pass ReactDOM.hydrate
function renderApp(renderFunction, Root) {
  return renderFunction(
    <Provider store={store}>
      <StyletronProvider styletron={styletronInstance}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </StyletronProvider>
    </Provider>, 
    document.getElementById('root')
  )
}
// preload when browser is ready
window.onload = () => 
  Loadable.preloadReady().then(() => 
    renderApp(ReactDOM.hydrate, App)
  )

if (module.hot) {
  module.hot.accept(() => {
    renderApp(ReactDOM.render, App);
  })
}

registerServiceWorker()
