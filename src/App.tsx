import React from "react";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <ProductGrid />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

export default App;
