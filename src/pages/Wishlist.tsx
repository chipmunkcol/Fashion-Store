import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Heart } from "lucide-react";
import React, { useState } from "react";
import Header from "../components/Header";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ProductCard from "../components/ProductCard";
import { useLikedProducts } from "../hooks/useProducts";

const Wishlist: React.FC = () => {
  // const { likedProducts } = useProductStore();
  const { data: likedProductsList, error, isLoading } = useLikedProducts();
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">(
    "newest"
  );
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleSortChange = (newSortBy: typeof sortBy) => {
    setSortBy(newSortBy);
    setShowSortMenu(false);
  };

  const getSortLabel = (sort: typeof sortBy) => {
    switch (sort) {
      case "newest":
        return "최신순";
      case "price-low":
        return "가격 낮은순";
      case "price-high":
        return "가격 높은순";
      default:
        return "최신순";
    }
  };

  if (error) return <div>에러: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-14 pb-20">
        <div className="max-w-screen-sm mx-auto">
          {/* Header Section */}
          <div className="bg-white px-4 py-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary-500 fill-current" />
                <h1 className="text-xl font-bold text-gray-900">찜한 상품</h1>
              </div>
              <div className="text-sm text-gray-500">
                {likedProductsList?.length}개
              </div>
            </div>
            {/* Sort Controls */}
            {likedProductsList && likedProductsList.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  총 {likedProductsList.length}개의 상품을 찜했어요
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    {getSortLabel(sortBy)}
                  </button>

                  <AnimatePresence>
                    {showSortMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]"
                      >
                        {(["newest", "price-low", "price-high"] as const).map(
                          (option) => (
                            <button
                              key={option}
                              onClick={() => handleSortChange(option)}
                              className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                                sortBy === option
                                  ? "text-primary-500 bg-primary-50"
                                  : "text-gray-700"
                              }`}
                            >
                              {getSortLabel(option)}
                            </button>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="px-4">
              <LoadingSkeleton count={6} />
            </div>
          ) : likedProductsList?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 px-4"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                찜한 상품이 없어요
              </h3>
              <p className="text-gray-500 text-center mb-6">
                마음에 드는 상품을 찜해보세요
              </p>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                쇼핑하러 가기
              </button>
            </motion.div>
          ) : (
            <div className="px-4">
              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {likedProductsList &&
                    likedProductsList.map((product, index) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                        }}
                      >
                        <ProductCard product={product} index={index} />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Overlay for sort menu */}
      {showSortMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowSortMenu(false)}
        />
      )}
      {/* <BottomNavigation /> */}
    </div>
  );
};

export default Wishlist;
