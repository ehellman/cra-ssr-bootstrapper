import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPeople } from '../../actions'

class List extends React.Component {
  componentDidMount() {
    this.props.people.length <= 0 && 
      this.props.getPeople()
  }
  render() {
    const {
      location
    } = this.props
    return (
      <div>
        <h2>List</h2>
        {
          this.props.people.length <= 0
            ? <div>Loading...</div>
            : (
              <React.Fragment>
                {this.props.people.map((person, index) => 
                  <div key={person.name}>
                    <Link 
                      to={location.pathname + '/' + (index + 1)}
                    >
                      {person.name}
                    </Link>
                  </div>
                )}
              </React.Fragment>                
            )
        }
      </div>
    )
  }
}

export default withRouter(
  connect(
    ({ people }) => ({
      people
    }),
    (dispatch) => ({
      getPeople: () => dispatch(fetchPeople())
    })
  )(List)
)