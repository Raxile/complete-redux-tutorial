import { useSelector } from "react-redux";
import "./App.css";
import Accounts from "./components/Accounts";
import Bonous from "./components/Bonous";

function App() {
  const { account, bonus } = useSelector((state) => state);
  return (
    <div className="App">
      <h1>Redux demo with react redux</h1>
      <h2>Ammount:{account.amount}</h2>
      <h2>bonus:{bonus.points}</h2>
      <hr />
      <Accounts />
      <hr />
      <Bonous />
    </div>
  );
}

export default App;
