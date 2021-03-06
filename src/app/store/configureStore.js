import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk'
import firebase from '../config/firebase'


//reactReduxFirebase
const rrfConfig = { 
  userPofile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
}

export const configureStore = (preloadedState) => {

    const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore})];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const sotreEnhancers = [middlewareEnhancer];
    const composeEnhancer = composeWithDevTools(
      ...sotreEnhancers, 
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase )
    );

    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancer,
    )

    if (process.env.NODE_ENV !== 'production') {
      if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
          const newRootReducer = require('../reducers/rootReducer').default;
          store.replaceReducer(newRootReducer);
        });
      }
    }

    return store;
}



