import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

// @ts-ignore
import { supabase } from "../lib/supabase/supabase";
import { Product } from "../types";

interface UseProductsOptions {
  category?: string;
  limit?: number;
  orderBy?: string;
  ascending?: boolean;
  enabled?: boolean;
}

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10분간 fresh
  });
};

export const useLikedProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products", "liked"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_liked", true);

      if (error) throw new Error(error.message);
      return (data as Product[]) || [];
    },
  });
};

export const useToggleLikeOptimized = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      product,
      isCurrentlyLiked,
    }: {
      product: Product;
      isCurrentlyLiked: boolean;
    }) => {
      const { data, error } = await supabase
        .from("products")
        .update({
          is_liked: !isCurrentlyLiked,
        })
        .eq("id", product.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Product;
    },

    onMutate: async ({ product, isCurrentlyLiked }) => {
      await queryClient.cancelQueries({ queryKey: ["products", "liked"] });

      // 이전 데이터 백업
      const previousLikedProducts = queryClient.getQueryData([
        "products",
        "liked",
      ]);

      // 즉시 UI 업데이트
      queryClient.setQueryData<Product[]>(["products", "liked"], (oldData) => {
        if (!oldData) return [];

        if (!isCurrentlyLiked) {
          const mockProduct = { ...product, is_liked: true } as Product;
          return [...oldData, mockProduct];
        } else {
          return oldData.filter((p) => p.id !== product.id);
        }
      });

      return { previousLikedProducts };
    },

    onSuccess: (updatedProduct) => {
      const startTime = performance.now();
      // 쿼리 키를 무효화 하는방법 (서버 재요청 -> 네트워크 비용 + 로딩 시간)
      // queryClient.invalidateQueries({ queryKey: ["products", "liked"] });

      // 즉시 캐시 업데이트 -> 빠름, 네트워크 비용 없음
      if (updatedProduct) {
        queryClient.setQueryData<Product[]>(
          ["products", "liked"],
          (oldData) => {
            if (!oldData) return [updatedProduct];
            return oldData.map((p) =>
              p.id === updatedProduct.id ? updatedProduct : p
            );
          }
        );
      }

      const endTime = performance.now();
      console.log(`성능 체크 : ${endTime - startTime}`);
    },

    onError: (_err, _variable, context) => {
      if (context?.previousLikedProducts) {
        queryClient.setQueryData(
          ["products", "liked"],
          context.previousLikedProducts
        );
      }
    },
  });
};

export const useIsProductLiked = (productId: string) => {
  return useQuery({
    queryKey: ["products", "liked"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_liked", true);

      if (error) throw new Error(error.message);
      return (data as Product[]) || [];
    },
    select: (data: Product[]) => {
      return data.some((product) => product.id === productId);
    },
  });
};

export const useProductLikedCount = () => {
  return useQuery({
    queryKey: ["products", "liked"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_liked", true);

      if (error) throw new Error(error.message);
      return (data as Product[]) || [];
    },
    select: (data: Product[]) => {
      return data.length;
    },
  });
};

interface UseProductsOptions {
  category?: string | undefined;
  limit?: number;
  orderBy?: string;
  ascending?: boolean;
  enabled?: boolean;
  searchQuery?: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  hasNextPage: boolean;
  nextCursor?: number;
}

export const useInfiniteProducts = (options: UseProductsOptions = {}) => {
  const {
    category = null,
    limit = 10,
    orderBy = "created_at",
    ascending = false,
    enabled = true,
    searchQuery = null,
  } = options;

  return useInfiniteQuery({
    queryKey: ["products", category, limit, orderBy, ascending, searchQuery],
    queryFn: async ({ pageParam = 0 }): Promise<ProductsResponse> => {
      // range 방식으로 페이지네이션 (더 효율적)
      const from = pageParam * limit;
      const to = from + limit - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" }) // count 포함
        .range(from, to)
        .order(orderBy, { ascending });

      // 카테고리 필터
      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      // 검색 필터
      if (searchQuery && searchQuery.trim()) {
        query = query.or(
          `name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,tags.cs.{${searchQuery}}`
        );
      }

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      const hasNextPage = data ? data.length === limit : false;

      return {
        products: data || [],
        total: count || 0,
        hasNextPage,
        nextCursor: hasNextPage ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => {
      // lastPage.nextCursor를 사용하여 다음 페이지 결정
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
    initialPageParam: 0,
    enabled,
    // staleTime: 5 * 60 * 1000, // 5분간 fresh
    // gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};
