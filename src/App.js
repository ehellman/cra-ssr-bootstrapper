import React, { Component } from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { styled } from 'styletron-react'
import { setMessage } from './actions'
import corgi from './corgi.png'

const Wrapper = styled('div', props => ({
  textAlign: 'center'
}))
Wrapper.displayName = 'App.Wrapper'

const Header = styled('header', props => ({
  backgroundColor: '#222',
  height: '150px',
  padding: '20px',
  color: 'white',
}))
Header.displayName = 'App.Header'

const Title = styled('h1', props => ({
  fontSize: '1.5em',
}))
Title.displayName = 'App.Title'

const Intro = styled('p', props => ({
  fontSize: 'large',
}))
Intro.displayName = 'App.Intro'

const Logo = styled('img', ({ centered }) => ({
  animation: 'logo-spin infinite 20s linear',
  width: '80px',
  height: '80px',
  ...centered && {
    marginRight: 'auto',
    marginLeft: 'auto',
  }
}))
Logo.displayName = 'App.Logo'

const AsyncComponent = Loadable({
  loader: () => import(/* webpackChunkName: "myChunk" */'./SomeComponent'),
  loading: () => <div>Loading...</div>,
  modules: ['myChunk']
})

class App extends Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    nextProps.message && (
      this.setState({ message: nextProps.message })
    )
  }
  componentWillMount() {
    this.props.message && (
      this.setState({ message: this.props.message })
    )
  }
  componentDidMount() {
    this.props.updateMessage('client!')
  }
  render() {
    return (
      <Wrapper>
        <Header>
          <Logo centered src={corgi} />
          <Title>Welcome to {this.state.message}</Title>
        </Header>
        <Intro>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
        <AsyncComponent />
      </Wrapper>
    )
  }
}


export default connect(
  ({ app }) => ({ 
    message: app.message 
  }),
  dispatch => ({
    updateMessage: msg => dispatch(setMessage(msg))
  })
)(App)
