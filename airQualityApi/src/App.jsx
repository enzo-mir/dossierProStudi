import { useState } from "react";
import "./App.css";
import FetchData from "./FetchData";

function App() {
  const [count, setCount] = useState(0);

  return <FetchData />;
}

export default App;
