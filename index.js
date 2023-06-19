import axios from "axios";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxLogger from "redux-logger";
import thunk from "redux-thunk";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const INCREMENT_BY_VALUE = "INCREMENT_BY_VALUE";
const INIT_ACCOUNT_PENDING = "INIT_ACCOUNT_PENDING";
const INIT_ACCOUNT_SUCCESS = "INIT_ACCOUNT_SUCCESS";
const INIT_ACCOUNT_ERROR = "INIT_ACCOUNT_ERROR";

//store
const store = createStore(
  combineReducers({ account: accountReducer, bonas: bonasReducer }),
  applyMiddleware(ReduxLogger.default, thunk.default)
);

//Async Api call

//const history = [];

//Action Creater

const initAccount = function (id) {
  return async (dispatch, getState) => {
    try {
      dispatch(initAccountPending());
      const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
      // console.log(data);
      dispatch(initAccountSuccess(data.amount));
    } catch (error) {
      dispatch(initAccountError(error.message));
    }
  };
};

function initAccountSuccess(value) {
  return {
    type: INIT_ACCOUNT_SUCCESS,
    payload: value,
  };
}
function initAccountError(error) {
  return {
    type: INIT_ACCOUNT_ERROR,
    error: error,
  };
}
function initAccountPending() {
  return {
    type: INIT_ACCOUNT_PENDING,
  };
}

const increment = function () {
  return {
    type: INCREMENT,
  };
};

const decrement = function () {
  return {
    type: DECREMENT,
  };
};

const incrementByValue = function (value) {
  return {
    type: INCREMENT_BY_VALUE,
    payload: value,
  };
};

// getUser();

//reducer
function accountReducer(
  state = { amount: 0, error: "idle", loading: false },
  action
) {
  switch (action.type) {
    case INIT_ACCOUNT_PENDING:
      return { ...state, loading: true };
    case INIT_ACCOUNT_SUCCESS:
      return { ...state, loading: false, amount: action.payload };
    case INIT_ACCOUNT_ERROR:
      return { ...state, loading: false, error: action.error };
    case INCREMENT:
      return { amount: state.amount + 1 };
    case DECREMENT:
      return { amount: state.amount - 1 };
    case INCREMENT_BY_VALUE:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}
function bonasReducer(state = { points: 0 }, action) {
  if (action.type === INCREMENT_BY_VALUE) {
    if (action.payload >= 100) {
      return { points: state.points + 1 };
    } else {
      return state;
    }
  }
  return state;
}

//global state
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });
//console.log(store.getState());

// setInterval(() => {
// }, 5000);
store.dispatch(initAccount(1));
//store.dispatch({ type: "increment" });
//console.log(store.getState());
