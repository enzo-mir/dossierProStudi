import "./assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { stateAdmin } from "./store/state.store";
import Home from "./pages/Home";
import { PrivateNav } from "./PrivateNav";
import Pendus from "./pages/Pendus";
import Undefined from "./pages/Undefined";

function App() {
  const word = stateAdmin((state) => state.word);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Undefined />} />
        <Route path="/" element={<Home />} />
        {word && (
          <Route element={<PrivateNav word={word} />}>
            <Route path="/pendus" element={<Pendus word={word} />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
