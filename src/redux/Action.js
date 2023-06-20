import axios from "axios";
import {
  BONUS_POINTS,
  DECREMENT,
  INCREMENT,
  INCREMENT_BY_VALUE,
  INIT_ACCOUNT_PENDING,
  INIT_ACCOUNT_REJECTED,
  INIT_ACCOUNT_SUCCESS,
} from "./Constant";

export const increment = function () {
  return {
    type: INCREMENT,
  };
};

export const decrement = function () {
  return {
    type: DECREMENT,
  };
};

export const incrementByValue = function (value) {
  return {
    type: INCREMENT_BY_VALUE,
    payload: value,
  };
};

export const bonusPoints = function () {
  return {
    type: BONUS_POINTS,
  };
};

export const initAccount = function (id) {
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
    type: INIT_ACCOUNT_REJECTED,
    error: error,
  };
}
function initAccountPending() {
  return {
    type: INIT_ACCOUNT_PENDING,
  };
}
