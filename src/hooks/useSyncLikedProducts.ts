import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useLikedProducts } from "./useProducts";

export const useSyncLikedProducts = () => {
  // 서버상태 전역상태 동기화 작업
  const { data: likedProducts } = useLikedProducts();
  const setterLikedProduct = useProductStore(
    (state) => state.setterLikedProduct
  );

  useEffect(() => {
    if (likedProducts) {
      const likedProductIds = likedProducts?.map((product) => product.id);
      setterLikedProduct(likedProductIds);
    }
  }, [likedProducts]);
};
