import React from "react";
import { useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByValue,
  initAccount,
} from "../redux/Action";

const Accounts = () => {
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(incrementByValue(Number(e.target[0].value)));
  };
  return (
    <div>
      <button onClick={() => dispatch(increment())}> Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(initAccount(1))}>1 click</button>
      <button onClick={() => dispatch(initAccount(2))}>2 click</button>
      <form onSubmit={submitHandler}>
        <input type="text" name="value" />
        <button type="submit">Increment by value</button>
      </form>
    </div>
  );
};

export default Accounts;
