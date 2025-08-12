import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import { Suspense } from "react";

// @ts-ignore
import Three from "../test/Three";
// @ts-ignore
import { Underlay } from "../test/Overlay";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
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
