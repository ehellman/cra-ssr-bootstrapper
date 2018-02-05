import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loadable from 'react-loadable'
import registerServiceWorker from './registerServiceWorker';

import App from './App';

// preload when browser is ready
window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <App />, 
      document.getElementById('root')
    )
  })
}
// registerServiceWorker();
