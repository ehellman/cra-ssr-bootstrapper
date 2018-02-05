import React, { Component } from 'react'
import Loadable from 'react-loadable'
import './App.css'


const AsyncComponent = Loadable({
  loader: () => import(/* webpackChunkName: "myChunk" */'./SomeComponent'),
  loading: () => <div>Loading...</div>,
  modules: ['myChunk']
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('./logo.svg')} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AsyncComponent />
      </div>
    )
  }
}

export default App
