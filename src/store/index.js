import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import favouritesReducer from "./reducers/favourites";
import jobsReducer from "./reducers/jobs";
import localStorage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist"
import {encryptTransform} from "redux-persist-transform-encrypt";

export const initialState = {
  favourites: {
    elements: [],
  },
  jobs: {
    elements: [],
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mainReducer = combineReducers({
  favourites: favouritesReducer,
  jobs: jobsReducer,
});

const persistConfig = {
  key: 'root',
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: "REACT_APP_SECRET_PERSIST_KEY",
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, mainReducer)

const configureStore = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(configureStore)

export {configureStore, persistor}