const initialState = {
  message: ''
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}

const pageState = [
  {
    id: 1,
    name: 'Home',
    path: '/',
    Component: 'Home',
    children: []
  },
  {
    id: 2,
    name: 'List',
    path: '/list',
    Component: 'List',
    children: [
      {
        id: 1,
        name: 'Details',
        Component: 'Details',        
        path: '/:id',
        children: []
      }
    ]
  }
]
function pageReducer(state = pageState, action) {
  switch (action.type) {
    case 'LOAD_PAGES':
      return state
    default:
      return state
  }
}

function peopleReducer(state = [], action) {
  switch (action.type) {
    case 'UPDATE_PEOPLE':
      return [ 
        ...action.payload 
      ]
    default:
      return state
  }
}

export default {
  app: appReducer,
  pages: pageReducer,
  people: peopleReducer,
}