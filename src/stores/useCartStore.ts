import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "../types";

interface CartState {
  items: CartItem[];
}

export const useCartStore = create<CartState>()();
