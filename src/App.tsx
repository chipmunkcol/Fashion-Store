import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Main from "./pages/Main";
import PaymentResult from "./pages/PaymentResult";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  return (
    <Router>
      <div className="max-w-screen-sm mx-auto min-h-screen bg-gray-50">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Main />} />

          {/* Product Detail Page */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Wishlist Page */}
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Cart Page */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout Page */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Payment Result Pages */}
          <Route path="/payment/success" element={<PaymentResult />} />
          <Route path="/payment/fail" element={<PaymentResult />} />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
