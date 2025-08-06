import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-20 ">
        <ProductGrid />
      </main>
      {/* <BottomNavigation /> */}
    </div>
  );
}
