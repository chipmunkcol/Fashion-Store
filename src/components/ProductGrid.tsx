import React, { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { useInfiniteProducts } from "../hooks/useProducts";
import { useProductStore } from "../stores/useProductStore";

const ProductGrid: React.FC = () => {
  const { filter, searchQuery } = useProductStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteProducts(filter, searchQuery);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Auto fetch next page when in view
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into single array
  const products = useMemo(() => {
    return data?.pages?.flatMap((page) => page.products) ?? [];
  }, [data]);

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">상품을 불러올 수 없습니다</p>
          <p className="text-sm text-gray-400">
            {error?.message || "네트워크 연결을 확인해주세요"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 btn-primary"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">검색 결과가 없습니다</p>
          <p className="text-sm text-gray-400">다른 검색어를 시도해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Products Grid */}
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Loading More Indicator */}
      {isFetchingNextPage && (
        <div className="mt-6">
          <LoadingSkeleton count={4} />
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      {hasNextPage && (
        <div ref={ref} className="h-10 flex items-center justify-center mt-4">
          <span className="text-sm text-gray-400">
            더 많은 상품 불러오는 중...
          </span>
        </div>
      )}

      {/* End Message */}
      {!hasNextPage && products.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">모든 상품을 확인했습니다</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
