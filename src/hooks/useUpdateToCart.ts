import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateCart } from "../utils/api";

interface CartProduct {
  productId: number;
  quantity: number;
}

interface AddCartPayload {
  id?: number;
  userId?: number;
  products: CartProduct[];
}

export const useUpdateToCart = (cartId?: number, userId?: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newItem: AddCartPayload) => apiUpdateCart(newItem),

    onMutate: async (newItem: AddCartPayload) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["cart", cartId] });

      // 이전 상태 백업
      const previousCart = queryClient.getQueryData<any>(["cart", cartId]);

      // 낙관적 UI 업데이트
      queryClient.setQueryData(["cart", cartId], (old: any) => {
        if (!old) return old;

        const updatedProducts = [...old.products];

        newItem.products.forEach((newProd) => {
          const existing = updatedProducts.find(
            (p) => p.productId === newProd.productId
          );
          if (existing) {
            existing.quantity += newProd.quantity;
          } else {
            updatedProducts.push(newProd);
          }
        });

        return {
          ...old,
          products: updatedProducts,
        };
      });

      return { previousCart };
    },

    onError: (err: any, _, context: any) => {
      alert(err?.message || "장바구니 추가에 실패했습니다");

      // 실패 시 롤백
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", cartId], context.previousCart);
      }
    },

    onSettled: () => {
      // 서버 데이터와 동기화
      // queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    },
  });

  // 실제로 호출할 함수
  const handleAddToCart = (productId: number, quantity: number) => {
    mutation.mutate({
      id: cartId,
      userId: userId,
      products: [{ productId, quantity }],
    });
  };

  return { handleAddToCart, isLoading: mutation.status === "pending" };
};
