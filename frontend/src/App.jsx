import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import UserLayOut from "./componets/Layout/UserLayOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayOut />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
