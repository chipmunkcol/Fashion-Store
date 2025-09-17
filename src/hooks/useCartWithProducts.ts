import { useQueries, useQuery } from "@tanstack/react-query";
import { apiCart, apiProduct } from "../utils/api";
import { useAdminStore } from "../stores/useAdminStore";
import { Fake_Product } from "../types";

interface CartData {
  id: number;
  userId: number;
  date: string;
  products: Array<{
    productId: number;
    quantity: number;
  }>;
}

interface UseCartWithProductsReturn {
  carts: CartData | null;
  products: Fake_Product[];
  isLoading: boolean;
  error: string | null;
}

const useCartWithProducts = (cartId: number): UseCartWithProductsReturn => {
  const userId = useAdminStore((state) => state.userId);

  // 장바구니 데이터 쿼리
  const { data: cartData, isLoading: cartLoading, error: cartError } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => apiCart(cartId),
    enabled: !!cartId,
  });

  const items = cartData?.products || [];
  const productIds = items.map((item) => item.productId);

  // 상품 정보 쿼리들
  const { data: products, productsLoading } = useQueries({
    queries: productIds.length > 0
      ? productIds.map((id) => ({
          queryKey: ["products", id],
          queryFn: () => apiProduct(id),
          enabled: !!id && !!cartData, // cartData가 있을 때만 실행
        }))
      : [],
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter((data): data is Fake_Product => data !== undefined),
        productsLoading: results.some((result) => result.isFetching),
      };
    },
  });

  return {
    carts: cartData || null, // 명확한 타입
    products: products || [],
    isLoading: cartLoading || productsLoading,
    error: cartError?.message || null,
  };
};

export default useCartWithProducts;
