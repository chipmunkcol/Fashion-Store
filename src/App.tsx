import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BottomNavigation from "./components/BottomNavigation";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Main from "./pages/Main";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import PaymentWidget from "./pages/payment/PaymentWidget";
import PaymentResult from "./pages/payment/PaymentResult";

// @ts-ignore
import { useLikedProducts } from "./hooks/useProducts";
import { useProductStore } from "./stores/useProductStore";
import { useAdminStore } from "./stores/useAdminStore";

function App() {
  const { isAdmin } = useAdminStore()
  // 좋아요 상품의 서버상태 전역상태 동기화 작업
  // useSyncLikedProducts();
  const { data: likedProducts, isSuccess } = useLikedProducts();
  const setterLikedProduct = useProductStore(
    (state) => state.setterLikedProduct
  );
  const isSynced = useRef(false);
  const [] = useState(false)

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
          <Route path="/payment" element={<PaymentWidget />} />
          <Route path="/payment/success" element={<PaymentResult />} />
          <Route path="/payment/fail" element={<PaymentResult />} />
        
          {/* Admin Routes - isAdmin이 true일 때만 렌더링 */}
          {isAdmin && (
           <>
             <Route path="/admin" element={<AdminDashboard />} />
             <Route path="/admin/products" element={<AdminProducts />} />
             <Route path="/admin/orders" element={<AdminOrders />} />
           </>
          )}
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
