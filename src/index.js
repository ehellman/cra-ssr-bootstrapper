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


const store = {
  mainMenu: {
    isOpen: false,
    primaryMenuItems: [],
    toolbarMenuitems: []
  },
  miniCart: { isOpen: false},
  appShellData: {
    // store from server
  },
  quickSearch: {
    isOpen: false,
    searchText: "",
    history: [],
  },
  footer: {},
  currentUser: { email: "" },
  cart: {
    addedItems: [],
    removedItems: [
      // to track which items the customer has removed, quantity is irrelevant
    ]
  },
  currency: "SEK",
  isLoading: false,
  isShippingFree: false,
  items: [],
  subTotal: 0,
}