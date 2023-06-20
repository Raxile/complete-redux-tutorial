import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { createStore } from "redux";
import ReduxLogger from "redux-logger";
import thunk from "redux-thunk";
import { accountReducer, bonasReducer } from "./Reducer";

const store = createStore(
  combineReducers({ account: accountReducer, bonus: bonasReducer }),
  applyMiddleware(ReduxLogger, thunk)
);

export default store;
