import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import { Suspense } from "react";

// @ts-ignore
import Three from "../test/Three";
// @ts-ignore
import { Underlay } from "../test/Overlay";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../stores/useAdminStore";

export default function Main() {
  const navigate = useNavigate();
  const isAdmin = useAdminStore((state) => state.isAdmin);

  return (
    <div className="flex flex-col min-h-screen">
      {isAdmin() && (
        <div
          onClick={() => navigate("/admin")}
          className="cursor-pointer bg-red-500 text-white text-center py-1"
        >
          관리자 모드
        </div>
      )}
      <Header />
      <main className="flex-1 pb-20 ">
        <div className="w-full h-full relative">
          <Underlay />
          <Suspense fallback={null}>
            <Three />
          </Suspense>
        </div>
        <ProductGrid />
      </main>
      {/* <BottomNavigation /> */}
    </div>
  );
}
