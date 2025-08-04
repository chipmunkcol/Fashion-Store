import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import PaymentResult from "./components/PaymentResult";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  return (
    <Router>
      <div className="max-w-screen-sm mx-auto min-h-screen bg-gray-50">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 pb-20 ">
                  <ProductGrid />
                </main>
                <BottomNavigation />
              </div>
            }
          />

          {/* Product Detail Page */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Cart Page */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout Page */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Payment Result Pages */}
          <Route path="/payment/success" element={<PaymentResult />} />
          <Route path="/payment/fail" element={<PaymentResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
