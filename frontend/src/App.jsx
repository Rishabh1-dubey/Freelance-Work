import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import UserLayOut from "./componets/Layout/UserLayOut";
import Home from "./pages/Home";
import {Toaster} from "sonner"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./componets/Products/ProductDetails";
import { CheckoutPage } from "./componets/Cart/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./componets/Admin/AdminLayout";




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
        <Route path="/collection/:all" element={<CollectionPage/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/order-confirmation" element={<OrderConfirmation/>}/>
        <Route path="/my-order" element={<MyOrderPage/>}/>
        <Route path="/order/:id" element={<OrderDetailsPage/>}/>

        {/* Adming layout page route */}

        </Route>
        <Route path="/admin" element={<AdminLayout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
