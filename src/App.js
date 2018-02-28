import React, { Component } from 'react'
import { connect } from 'react-redux'
import { styled } from 'styletron-react'
import Navigation from './components/Navigation'
import { setMessage } from './actions'
import { withRouter } from 'react-router-dom'
import corgi from './corgi.png'
import FeatureRouter from './components/FeatureRouter'

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
        <Navigation pages={this.props.pages} />
        <FeatureRouter pages={this.props.pages} />
      </Wrapper>
    )
  }
}

export default withRouter(
  connect(
    ({ app, pages }) => ({ 
      message: app.message,
      pages: pages
    }),
    dispatch => ({
      updateMessage: msg => dispatch(setMessage(msg))
    })
  )(App)
)