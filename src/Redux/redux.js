import { combineReducers, createStore, applyMiddleware, compose } from "redux"

import userReducer from "./Reducers/userReducer"
import uiReducer from "./Reducers/uiReducer"
import dataReducer from "./Reducers/dataReducer"
import thunk from "redux-thunk"

let combinedReducers = combineReducers({
    user: userReducer,
    ui: uiReducer,
    data: dataReducer
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

let store = createStore(combinedReducers, enhancer)

window.store = store;
export default store 

