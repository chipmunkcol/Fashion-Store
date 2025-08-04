import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "../types";

interface CartState {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedOptions?: Record<string, string>
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemCount: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity, selectedOptions = {}) => {
        const { items } = get();
        const optionsKey = JSON.stringify(selectedOptions);
        const existingItemIndex = items.findIndex(
          (item) =>
            item.productId === product.id &&
            JSON.stringify(item.selectedOptions) === optionsKey
        );

        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}_${Date.now()}_${Math.random()}`,
            productId: product.id,
            product,
            quantity,
            selectedOptions,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeFromCart: (itemId) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          set({ items: items.filter((item) => item.id !== itemId) });
        } else {
          const updatedItems = items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          set({ items: updatedItems });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getItemCount: (productId) => {
        const { items } = get();
        return items
          .filter((item) => item.productId === productId)
          .reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
