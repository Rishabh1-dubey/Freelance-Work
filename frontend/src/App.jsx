import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import UserLayOut from "./componets/Layout/UserLayOut";
import Home from "./pages/Home";
import {Toaster} from "sonner"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";




function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<UserLayOut />}>
        <Route index element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/collection/:collection" element={<CollectionPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
