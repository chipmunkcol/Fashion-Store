import { create } from "zustand";
import { Filter } from "../types";

interface ProductState {
  // State
  likedProducts: Set<string>;
  searchQuery: string;
  selectedCategory: string;
  filter: Filter;

  // Actions
  toggleLike: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setFilter: (filter: Partial<Filter>) => void;
  resetFilter: () => void;

  // Getters
  isLiked: (productId: string) => boolean;
}

const defaultFilter: Filter = {
  category: "all",
  sortBy: "newest",
};

export const useProductStore = create<ProductState>((set, get) => ({
  // Initial state
  likedProducts: new Set<string>(["2", "4", "6", "8", "10"]), // Some pre-liked products
  searchQuery: "",
  selectedCategory: "all",
  filter: defaultFilter,

  // Actions
  toggleLike: (productId: string) => {
    set((state) => {
      const newLikedProducts = new Set(state.likedProducts);
      if (newLikedProducts.has(productId)) {
        newLikedProducts.delete(productId);
      } else {
        newLikedProducts.add(productId);
      }
      return { likedProducts: newLikedProducts };
    });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedCategory: (category: string) => {
    set((state) => ({
      selectedCategory: category,
      filter: {
        ...state.filter,
        category: category === "all" ? undefined : category,
      },
    }));
  },

  setFilter: (newFilter: Partial<Filter>) => {
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
    }));
  },

  resetFilter: () => {
    set(() => ({
      filter: defaultFilter,
      selectedCategory: "all",
      searchQuery: "",
    }));
  },

  // Getters
  isLiked: (productId: string) => {
    return get().likedProducts.has(productId);
  },
}));
