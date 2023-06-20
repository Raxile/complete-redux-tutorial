import {
  DECREMENT,
  INCREMENT,
  INCREMENT_BY_VALUE,
  INIT_ACCOUNT_PENDING,
  INIT_ACCOUNT_REJECTED,
  INIT_ACCOUNT_SUCCESS,
} from "./Constant";

export function accountReducer(
  state = { amount: 0, error: "idle", loading: false },
  action
) {
  switch (action.type) {
    case INIT_ACCOUNT_PENDING:
      return { ...state, loading: true };
    case INIT_ACCOUNT_SUCCESS:
      return { ...state, loading: false, amount: action.payload };
    case INIT_ACCOUNT_REJECTED:
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

export function bonasReducer(state = { points: 0 }, action) {
  if (action.type === INCREMENT_BY_VALUE) {
    if (action.payload >= 100) {
      return { points: state.points + 1 };
    } else {
      return state;
    }
  }
  return state;
}
