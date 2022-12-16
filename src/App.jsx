import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";

import Home from "./components/pages/Home";
import ChainInfo from "./components/pages/ChainInfo";
import FakeBayc from "./components/pages/fakeBayc";
import WrongNetwork from "./components/pages/WrongNetwork";
import FakeNefturians from "./components/pages/fakeNefturians";
import FakeMeebits from "./components/pages/fakeMeebits";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/chain-info">Chain Info</a>
          </li>
          <li>
            <a href="/fakeBayc">Fake BAYC</a>
          </li>
          <li>
            <a href="/fakeNefturians">Fake Nefturians</a>
          </li>
          <li>
            <a href="/fakeMeebits">Fake Meebits</a>
          </li>
        </ul>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chain-info" element={<ChainInfo />} />
          <Route path="/fakeBayc" element={<FakeBayc />} />
          <Route path="/fakeBayc/:tokenId" element={<FakeBayc />} />
          <Route path="/WrongNetwork" element={<WrongNetwork />} />
          <Route path="/fakeNefturians" element={<FakeNefturians />} />
          <Route path="/fakeNefturians/:address" element={<FakeNefturians />} />
          <Route path="/fakeMeebits" element={<FakeMeebits />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
