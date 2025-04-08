import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import UserLayOut from "./componets/Layout/UserLayOut";
import Home from "./pages/Home";
import {Toaster} from "sonner"




function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<UserLayOut />}>
        <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
