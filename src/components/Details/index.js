import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { styled } from 'styletron-react'
import { fetchPeople } from '../../actions'

const Code = styled('code', {
  backgroundColor: '#eee',
  fontSize: '18px',
  padding: '3px 4px'
})

class Details extends React.Component {
  componentDidMount() {
    !this.props.person && 
      this.props.fetchPeople()
  }
  render() {
    return (
      <div>
        <button onClick={this.props.history.goBack}>Back</button>
        <h2>Details</h2>
        Details for <Code>{this.props.match.params.id}</Code>.
        <br />
        {
          this.props.person && (
            <div>Name: {this.props.person.name}</div>
          )
        }
      </div>
    )
  }
}

export default withRouter(
  connect(
    (state, ownProps) => ({
      person: state.people.filter(person => 
        person.id.toString() === ownProps.match.params.id
      )[0]
    }),
    { fetchPeople }
  )(Details)
)