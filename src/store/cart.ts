import { Book } from "@/types";
import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (item: Book) =>
    set((state: { cart: Book[] }) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (isbn13: string) =>
    set((state: { cart: Book[] }) => ({
      cart: state.cart.filter((cartItem: Book) => cartItem.isbn13 !== isbn13),
    })),
  clearCart: () => set({ cart: [] }),
}));
