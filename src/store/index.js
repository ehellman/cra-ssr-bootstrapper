import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '../reducers'

const appState = {
  app: {},
  pages: []
}


export default function configureStore(initialState = appState) {
  const enhancers = []
  const middleware = [thunk]
  
  const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
    ...enhancers
  )
  const rootReducer = combineReducers({
    ...reducers
  })
  const store = createStore(
    rootReducer, 
    initialState,
    composedEnhancers // replace with function ?
  )
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    ); 
  }
  return store
}