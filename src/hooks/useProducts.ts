import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  generateMoreProducts,
  mockProducts,
  userLikedProducts,
} from "../data/mockData";
import { Filter, Product, ProductsResponse } from "../types";

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API functions
const fetchProducts = async (
  page: number = 0,
  filter?: Filter,
  searchQuery?: string
): Promise<ProductsResponse> => {
  await delay(500); // Simulate API delay

  let products = [...mockProducts];

  // Apply search filter
  if (searchQuery && searchQuery.trim()) {
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }

  // Apply category filter
  if (filter?.category && filter.category !== "all") {
    products = products.filter(
      (product) => product.category === filter.category
    );
  }

  // Apply sort
  if (filter?.sortBy) {
    switch (filter.sortBy) {
      case "newest":
        products.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popular":
        products.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "review":
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
  }

  // Pagination
  const pageSize = 20;
  const start = page * pageSize;
  const end = start + pageSize;

  // If we need more products, generate them
  if (page > 0 && start >= mockProducts.length) {
    const additionalProducts = generateMoreProducts(
      page - Math.floor(mockProducts.length / pageSize),
      pageSize
    );
    products = [...products, ...additionalProducts];
  }

  const paginatedProducts = products.slice(start, end);
  const hasNextPage = end < products.length || page < 10; // Allow up to 10 pages for demo

  return {
    products: paginatedProducts,
    hasNextPage,
    nextCursor: hasNextPage ? page + 1 : undefined,
    total: products.length,
  };
};

// Custom hook for infinite product loading
export const useInfiniteProducts = (filter?: Filter, searchQuery?: string) => {
  return useInfiniteQuery({
    queryKey: ["products", filter, searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts(pageParam, filter, searchQuery),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor || 0 : undefined;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    // staleTime: 0,
    // gcTime: 0,
  });
};

// Mock API function for fetching liked products
const fetchLikedProducts = async (filter?: Filter): Promise<Product[]> => {
  await delay(300); // Simulate API delay

  let likedProducts = mockProducts.filter((product) =>
    userLikedProducts.has(product.id)
  );

  // Apply category filter if provided
  if (filter?.category && filter.category !== "all") {
    likedProducts = likedProducts.filter(
      (product) => product.category === filter.category
    );
  }

  // Apply sort if provided
  if (filter?.sortBy) {
    switch (filter.sortBy) {
      case "newest":
        likedProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popular":
        likedProducts.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case "price-low":
        likedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        likedProducts.sort((a, b) => b.price - a.price);
        break;
      case "review":
        likedProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
  }

  return likedProducts;
};

// Custom hook for liked products
export const useLikedProducts = (filter?: Filter) => {
  return useQuery({
    queryKey: ["liked-products", filter],
    queryFn: () => fetchLikedProducts(filter),
    staleTime: 60 * 60 * 1000, // 5 minutes
    gcTime: 60 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for featured products (first page only)
export const useFeaturedProducts = () => {
  return useInfiniteProducts({ sortBy: "popular" });
};

// Custom hook for all products (for wishlist - fetches all available products)
// Mock API function for toggling product like status
const toggleProductLike = async (productId: string): Promise<void> => {
  await delay(200); // Simulate API delay

  if (userLikedProducts.has(productId)) {
    userLikedProducts.delete(productId);
  } else {
    userLikedProducts.add(productId);
  }
};

// Custom hook for toggling product like status
export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleProductLike,
    onSuccess: (_, productId) => {
      // Invalidate queries that might be affected by this change
      queryClient.invalidateQueries({ queryKey: ["liked-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};

export const useProducts = (filter?: Filter, searchQuery?: string) => {
  return useInfiniteQuery({
    queryKey: ["all-products", filter, searchQuery],
    queryFn: async () => {
      // Fetch all pages at once for wishlist
      const allProducts = [];
      let currentPage = 0;
      let hasMore = true;

      while (hasMore && currentPage <= 10) {
        // Limit to prevent infinite loop
        const pageData = await fetchProducts(currentPage, filter, searchQuery);
        allProducts.push(...pageData.products);
        hasMore = pageData.hasNextPage;
        currentPage++;
      }

      return {
        products: allProducts,
        hasNextPage: false,
        nextCursor: undefined,
        total: allProducts.length,
      };
    },
    initialPageParam: 0,
    getNextPageParam: () => undefined, // No pagination needed
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
