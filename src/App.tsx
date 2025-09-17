import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import BottomNavigation from "./components/BottomNavigation";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Main from "./pages/Main";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import PaymentResult from "./pages/payment/PaymentResult";
import PaymentWidget from "./pages/payment/PaymentWidget";

// @ts-ignore
import { useLikedProducts } from "./hooks/useProducts";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import ProtectedAdminRoute from "./pages/common/ProtectedAdminRoute";
import ProtectedRoute from "./pages/common/ProtectedRoute";
import { useAdminStore } from "./stores/useAdminStore";
import { useProductStore } from "./stores/useProductStore";
import Login from "./pages/Login";

function App() {
  // 좋아요 상품의 서버상태 전역상태 동기화 작업
  // useSyncLikedProducts();
  const { data: likedProducts, isSuccess } = useLikedProducts();
  const setterLikedProduct = useProductStore(
    (state) => state.setterLikedProduct
  );
  const isSynced = useRef(false);
  const [] = useState(false);

  useEffect(() => {
    if (isSuccess && likedProducts && !isSynced.current) {
      const likedProductIds = likedProducts.map((product) => product.id);
      setterLikedProduct(likedProductIds);
      isSynced.current = true; // 한 번만 동기화
    }
  }, [isSuccess, likedProducts, setterLikedProduct]);

  useEffect(() => {
    ReactGA.initialize("G-ZMJJ639LY0");
  }, []);

  return (
    <Router>
      <div className="max-w-screen-sm mx-auto min-h-screen bg-white">
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Home Page */}
          <Route path="/" element={<Main />} />

          {/* Product Detail Page */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Checkout Page */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Payment Result Pages */}
          <Route path="/payment" element={<PaymentWidget />} />
          <Route path="/payment/success" element={<PaymentResult />} />
          <Route path="/payment/fail" element={<PaymentResult />} />

          {/* 인증 필요 */}
          <Route element={<ProtectedRoute />}>
            {/* Wishlist Page */}
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Cart Page */}
            <Route path="/cart" element={<Cart />} />

            <Route path="profile" element={<Profile />} />
          </Route>

          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
