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

function pageReducer(state = { pages: [] }, action) {
  switch (action.type) {
    case 'LOAD_PAGES':
      return state
    default:
      return state
  }
}

export default {
  app: appReducer,
  pages: pageReducer,
}