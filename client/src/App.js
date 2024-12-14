import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import { Home } from "./Components/Home";
import GetTime from "./Components/GetTime";
import Revoke from "./Components/Revoke";
import GenerateLink from "./Components/GenerateOneTimeLink";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/getTime" element={<GetTime />}/>
        <Route path="/revoke" element={<Revoke />}/>
        <Route path="/generateLink" element={<GenerateLink />}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);