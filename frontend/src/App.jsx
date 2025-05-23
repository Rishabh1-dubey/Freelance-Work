import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import UserLayOut from "./componets/Layout/UserLayOut";
import Home from "./pages/Home";
import { Toaster } from "sonner";
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
import AdminHomePages from "./pages/AdminHomePages";
import UserManagementList from "./componets/Admin/UserManagementList";
import ProductManagement from "./componets/Admin/ProductManagement";
import EditProducts from "./componets/Admin/EditProducts";

// subscribing the store
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./componets/Common/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayOut />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/collection/:all" element={<CollectionPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/my-order" element={<MyOrderPage />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
          </Route>

          {/* Adming layout page route */}

          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminHomePages />} />
            <Route path="users" element={<UserManagementList />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
