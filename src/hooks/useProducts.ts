import { useInfiniteQuery } from "@tanstack/react-query";
import { generateMoreProducts, mockProducts } from "../data/mockData";
import { Filter, ProductsResponse } from "../types";

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API functions
const fetchProducts = async (
  page: number = 0,
  filter?: Filter,
  searchQuery?: string
): Promise<ProductsResponse> => {
  await delay(800); // Simulate API delay

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

// Custom hook for featured products (first page only)
export const useFeaturedProducts = () => {
  return useInfiniteProducts({ sortBy: "popular" });
};

// Custom hook for all products (for wishlist - fetches all available products)
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
