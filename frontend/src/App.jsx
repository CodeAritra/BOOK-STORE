import HomePage from "./pages/Homepage";
import CartPage from "./pages/Cart";
import OrderPage from "./pages/Order";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import Createproduct from "./pages/admin/Createproduct";
import UserOrder from "./pages/admin/UserOrder";
import { Routes, Route } from "react-router";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createproduct" element={<Createproduct />} />
        <Route path="/userorder" element={<UserOrder />} />
      </Routes>
    </>
  );
};

export default App;
