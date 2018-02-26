import React from 'react'
import ReactDOM from 'react-dom'
import './global.css'
import Loadable from 'react-loadable'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import Styletron from 'styletron-client'
import { StyletronProvider } from 'styletron-react'
import { Provider } from 'react-redux'
import configureStore from './store'

const store = configureStore(window.__PRELOADED_STATE__ || {})

// get stylesheets from server render
const styleElements = document.getElementsByClassName('_styletron_hydrate_')

// if there are no elements, no styles came from server
// so Styletron should be initialized empty
const styletronInstance = styleElements.length > 0 ?
  new Styletron(styleElements) :
  new Styletron()

function hydrateApp(Root) {
  return ReactDOM.hydrate(
    <Provider store={store}>
      <StyletronProvider styletron={styletronInstance}>
        <Root />
      </StyletronProvider>
    </Provider>, 
    document.getElementById('root')
  )
}
// preload when browser is ready
window.onload = () => 
  Loadable.preloadReady().then(() => hydrateApp(App))

if (module.hot) {
  module.hot.accept(() => {
    hydrateApp(App);
  })
}

registerServiceWorker()
